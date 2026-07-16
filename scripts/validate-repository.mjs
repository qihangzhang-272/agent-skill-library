#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const read = (path) => readFileSync(path, "utf8");
const json = (path) => JSON.parse(read(path));
const rel = (path) => relative(root, path);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function git(args, quiet = false) {
  return execFileSync("git", ["-c", "core.autocrlf=false", ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: quiet ? ["ignore", "pipe", "ignore"] : undefined,
  }).trim();
}

const arg = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? fallback : process.argv[index + 1];
};

const marketplace = json(join(root, ".claude-plugin", "marketplace.json"));
const entries = new Map(marketplace.plugins.map((item) => [item.name, item]));
const pluginNames = readdirSync(join(root, "plugins"), { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((item) => item.name);

for (const name of pluginNames) {
  const path = join(root, "plugins", name, ".claude-plugin", "plugin.json");
  if (!existsSync(path)) {
    errors.push(`缺少 plugin manifest: ${rel(path)}`);
    continue;
  }
  const manifest = json(path);
  const entry = entries.get(name);
  if (!entry) errors.push(`marketplace 未登记 plugin: ${name}`);
  else {
    if (entry.version !== manifest.version)
      errors.push(`版本不一致: ${name} marketplace=${entry.version}, plugin=${manifest.version}`);
    if (entry.source !== `./plugins/${name}`)
      errors.push(`source 不一致: ${name} -> ${entry.source}`);
  }
}
for (const name of entries.keys())
  if (!pluginNames.includes(name)) errors.push(`marketplace 指向不存在的 plugin: ${name}`);

const files = walk(root);
const skills = new Map();
for (const path of files.filter((file) => file.endsWith("SKILL.md"))) {
  const name = read(path).match(/^name:\s*([^\r\n]+)$/m)?.[1].trim();
  if (!name) errors.push(`SKILL.md 缺少 name: ${rel(path)}`);
  else if (skills.has(name)) errors.push(`技能重名: ${name} (${skills.get(name)}, ${rel(path)})`);
  else skills.set(name, rel(path));
}

const chainFiles = files.filter((path) =>
  rel(path).replaceAll("\\", "/").startsWith(
    "plugins/orchestrator/skills/workflow-orchestrator/references/chains/",
  ),
);
for (const path of chainFiles)
  for (const match of read(path).matchAll(/domain-[a-z-]+:([a-z0-9-]+)/g))
    if (!skills.has(match[1])) errors.push(`chain 引用了不存在的技能: ${match[0]} (${rel(path)})`);

for (const path of files.filter((file) => file.endsWith(".md"))) {
  for (const match of read(path).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (!target || /^(https?:\/\/|mailto:|#)/i.test(target)) continue;
    const localPath = target.split("#")[0];
    if (localPath && !existsSync(resolve(dirname(path), localPath)))
      errors.push(`失效的相对链接: ${rel(path)} -> ${target}`);
  }
}

const forbidden = [
  ["已废弃名称", /md2wechat/i],
  ["旧写作目录", /writing[\\/]wechat[\\/]drafts/i],
  ["硬编码用户目录", /C:\\Users\\[^\\]+\\/i],
  ["过期私有仓库描述", /Private Claude Code marketplace|GitHub 私有仓库/i],
];
for (const path of files.filter((file) => /\.(md|json)$/i.test(file)))
  for (const [label, pattern] of forbidden)
    if (pattern.test(read(path))) errors.push(`${label}: ${rel(path)}`);

const runFolder = "writing/drafts/{YYYY-MM-DD}-{topic-slug}/";
const runFolderDocs = [
  "plugins/orchestrator/skills/workflow-orchestrator/references/chains/wechat-writing.md",
  "plugins/domain-writing/skills/topic-research-deposition/SKILL.md",
  "plugins/domain-writing/skills/topic-research-deposition/references/wechat-writing-research.md",
  "plugins/domain-writing/skills/topic-research-deposition/references/quality-checklist.md",
];
for (const path of runFolderDocs)
  if (!read(join(root, path)).includes(runFolder))
    errors.push(`WeChat run folder 未统一为 ${runFolder}: ${path}`);

const base = arg("--base");
const head = arg("--head", "WORKTREE");
if (base && !/^0+$/.test(base)) {
  const diff = head === "WORKTREE" ? ["diff", "--name-only", base, "--"] : ["diff", "--name-only", `${base}...${head}`, "--"];
  const changed = git(diff).split(/\r?\n/).filter(Boolean);
  const changedPlugins = new Set(changed.filter((path) => path.startsWith("plugins/")).map((path) => path.split("/")[1]));
  for (const name of changedPlugins) {
    const path = `plugins/${name}/.claude-plugin/plugin.json`;
    let previous;
    try { previous = JSON.parse(git(["show", `${base}:${path}`], true)).version; } catch { continue; }
    if (previous === json(join(root, path)).version)
      errors.push(`plugin 内容已变化但版本未升级: ${name} (${previous})`);
  }
  const chainChanged = changed.some((path) => path.includes("workflow-orchestrator/references/chains/"));
  if (chainChanged && !changed.some((path) => path.startsWith("docs/workflows/")))
    errors.push("chain 已变化，但 docs/workflows/ 没有同步更新");
}

if (errors.length) {
  console.error("仓库语义校验失败：\n" + [...new Set(errors)].map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log(`仓库语义校验通过：${pluginNames.length} plugins，${skills.size} skills。`);
