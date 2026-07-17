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
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function markdownForLinkValidation(content) {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`\r\n]*`/g, "");
}

function findSkillRoot(path) {
  let current = dirname(path);
  while (current.startsWith(root)) {
    if (existsSync(join(current, "SKILL.md"))) return current;
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return null;
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
const codexMarketplacePath = join(root, ".agents", "plugins", "marketplace.json");
if (!existsSync(codexMarketplacePath))
  errors.push(`缺少 Codex marketplace: ${rel(codexMarketplacePath)}`);
const codexMarketplace = existsSync(codexMarketplacePath)
  ? json(codexMarketplacePath)
  : { plugins: [] };
const codexEntries = new Map(
  (Array.isArray(codexMarketplace.plugins) ? codexMarketplace.plugins : []).map((item) => [
    item.name,
    item,
  ]),
);
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

  const codexPath = join(root, "plugins", name, ".codex-plugin", "plugin.json");
  if (!existsSync(codexPath)) {
    errors.push(`缺少 Codex plugin manifest: ${rel(codexPath)}`);
    continue;
  }
  const codexManifest = json(codexPath);
  if (codexManifest.name !== name)
    errors.push(`Codex plugin name 不一致: ${name} -> ${codexManifest.name}`);
  if (codexManifest.version !== manifest.version)
    errors.push(
      `双端版本不一致: ${name} claude=${manifest.version}, codex=${codexManifest.version}`,
    );
  if (codexManifest.skills !== "./skills/")
    errors.push(`Codex skills 路径不一致: ${name} -> ${codexManifest.skills}`);
  if (!codexManifest.author?.name)
    errors.push(`Codex author.name 缺失: ${name}`);
  const codexInterface = codexManifest.interface;
  for (const field of [
    "displayName",
    "shortDescription",
    "longDescription",
    "developerName",
    "category",
  ])
    if (typeof codexInterface?.[field] !== "string" || !codexInterface[field].trim())
      errors.push(`Codex interface.${field} 缺失: ${name}`);
  if (
    !Array.isArray(codexInterface?.capabilities) ||
    codexInterface.capabilities.some((value) => typeof value !== "string" || !value.trim())
  )
    errors.push(`Codex interface.capabilities 无效: ${name}`);
  if (
    !Array.isArray(codexInterface?.defaultPrompt) ||
    codexInterface.defaultPrompt.length < 1 ||
    codexInterface.defaultPrompt.length > 3 ||
    codexInterface.defaultPrompt.some(
      (value) => typeof value !== "string" || !value.trim() || value.length > 128,
    )
  )
    errors.push(`Codex interface.defaultPrompt 无效: ${name}`);

  const codexEntry = codexEntries.get(name);
  if (!codexEntry) errors.push(`Codex marketplace 未登记 plugin: ${name}`);
  else {
    if (codexEntry.source?.source !== "local")
      errors.push(`Codex source 类型不一致: ${name} -> ${codexEntry.source?.source}`);
    if (codexEntry.source?.path !== `./plugins/${name}`)
      errors.push(`Codex source 路径不一致: ${name} -> ${codexEntry.source?.path}`);
    if (!["AVAILABLE", "INSTALLED_BY_DEFAULT", "NOT_AVAILABLE"].includes(
      codexEntry.policy?.installation,
    ))
      errors.push(`Codex installation policy 无效: ${name}`);
    if (!["ON_INSTALL", "ON_USE"].includes(codexEntry.policy?.authentication))
      errors.push(`Codex authentication policy 无效: ${name}`);
    if (typeof codexEntry.category !== "string" || !codexEntry.category.trim())
      errors.push(`Codex category 缺失: ${name}`);
  }
}
for (const name of entries.keys())
  if (!pluginNames.includes(name)) errors.push(`marketplace 指向不存在的 plugin: ${name}`);
for (const name of codexEntries.keys())
  if (!pluginNames.includes(name)) errors.push(`Codex marketplace 指向不存在的 plugin: ${name}`);

const files = walk(root);
const skills = new Map();
const skillFiles = files.filter((file) =>
  /^plugins\/[^/]+\/skills\/[^/]+\/SKILL\.md$/.test(rel(file).replaceAll("\\", "/")),
);
for (const path of skillFiles) {
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
  const skillRoot = findSkillRoot(path);
  for (const match of markdownForLinkValidation(read(path)).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (!target || /^(https?:\/\/|mailto:|#)/i.test(target) || /[{}]/.test(target)) continue;
    const localPath = target.split("#")[0];
    const candidates = [
      resolve(dirname(path), localPath),
      ...(skillRoot ? [resolve(skillRoot, localPath)] : []),
    ];
    if (localPath && !candidates.some((candidate) => existsSync(candidate)))
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
  const changed = new Set(git(diff).split(/\r?\n/).filter(Boolean));
  if (head === "WORKTREE")
    for (const path of git(["ls-files", "--others", "--exclude-standard"])
      .split(/\r?\n/)
      .filter(Boolean))
      changed.add(path);
  const changedPlugins = new Set([...changed].filter((path) => path.startsWith("plugins/")).map((path) => path.split("/")[1]));
  for (const name of changedPlugins) {
    const path = `plugins/${name}/.claude-plugin/plugin.json`;
    let previous;
    try { previous = JSON.parse(git(["show", `${base}:${path}`], true)).version; } catch { continue; }
    if (previous === json(join(root, path)).version)
      errors.push(`plugin 内容已变化但版本未升级: ${name} (${previous})`);
  }
  const chainChanged = [...changed].some((path) => path.includes("workflow-orchestrator/references/chains/"));
  if (chainChanged && ![...changed].some((path) => path.startsWith("docs/workflows/")))
    errors.push("chain 已变化，但 docs/workflows/ 没有同步更新");
}

if (errors.length) {
  console.error("仓库语义校验失败：\n" + [...new Set(errors)].map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log(`仓库语义校验通过：${pluginNames.length} plugins，${skills.size} skills。`);
