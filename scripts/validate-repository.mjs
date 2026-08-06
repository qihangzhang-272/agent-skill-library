#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const read = (path) => readFileSync(path, "utf8");
const json = (path) => JSON.parse(read(path));
const rel = (path) => relative(root, path);
const posix = (path) => path.replaceAll("\\", "/");

function parseSemVer(value) {
  const match = String(value).match(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/,
  );
  if (!match) return undefined;
  return {
    core: match.slice(1, 4).map(BigInt),
    prerelease: match[4]?.split(".") ?? [],
  };
}

function compareSemVer(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left.core[index] !== right.core[index]) return left.core[index] > right.core[index] ? 1 : -1;
  }
  if (!left.prerelease.length || !right.prerelease.length)
    return Number(!left.prerelease.length) - Number(!right.prerelease.length);
  for (let index = 0; index < Math.max(left.prerelease.length, right.prerelease.length); index += 1) {
    const leftPart = left.prerelease[index];
    const rightPart = right.prerelease[index];
    if (leftPart === undefined || rightPart === undefined) return Number(leftPart !== undefined) - Number(rightPart !== undefined);
    if (leftPart === rightPart) continue;
    const leftNumeric = /^\d+$/.test(leftPart);
    const rightNumeric = /^\d+$/.test(rightPart);
    if (leftNumeric && rightNumeric) return BigInt(leftPart) > BigInt(rightPart) ? 1 : -1;
    if (leftNumeric !== rightNumeric) return leftNumeric ? -1 : 1;
    return leftPart < rightPart ? -1 : 1;
  }
  return 0;
}

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

function gitIgnoredPaths(paths) {
  if (!paths.length) return new Set();
  const input = paths.map((path) => posix(rel(path))).join("\0") + "\0";
  let output = "";
  try {
    output = execFileSync("git", ["check-ignore", "-z", "--stdin"], {
      cwd: root,
      encoding: "utf8",
      input,
      stdio: ["pipe", "pipe", "ignore"],
    });
  } catch (error) {
    if (error.status !== 1) throw error;
    output = error.stdout ?? "";
  }
  return new Set(output.split("\0").filter(Boolean));
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

const allFiles = walk(root);
const ignoredFiles = gitIgnoredPaths(allFiles);
const files = allFiles.filter((path) => !ignoredFiles.has(posix(rel(path))));
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

const investmentChain = [
  ["01", "topic-research-deposition", "01-source-intake.md"],
  ["02", "investment-research", "02-fact-pack.md"],
  ["03", "investment-ai-product-judgment", "03-product-judgment.md"],
  ["04", "investment-competitive-landscape", "04-competitive-landscape.md"],
  ["05", "investment-unit-economics", "05-unit-economics.md"],
  ["06", "investment-scorecard", "06-investment-scorecard.md"],
  ["07", "investment-valuation-returns", "07-valuation-returns.md"],
  ["08", "investment-dd", "08-dd-questions.md"],
  ["09", "investment-thesis-tracking", "09-thesis-tracking.md"],
  ["10", "investment-ic-memo-writer", "10-ic-memo.md"],
  ["11", "investment-visual-report", "11-visual-report.html"],
];
const investmentInputRefs = new Map([
  ["topic-research-deposition", []],
  ["investment-research", ["topic-research-deposition"]],
  ["investment-ai-product-judgment", ["investment-research"]],
  ["investment-competitive-landscape", ["investment-research", "investment-ai-product-judgment"]],
  ["investment-unit-economics", ["investment-research", "investment-ai-product-judgment", "investment-competitive-landscape"]],
  ["investment-scorecard", ["investment-research", "investment-ai-product-judgment", "investment-competitive-landscape", "investment-unit-economics"]],
  ["investment-valuation-returns", ["investment-research", "investment-ai-product-judgment", "investment-competitive-landscape", "investment-unit-economics", "investment-scorecard"]],
  ["investment-dd", ["investment-research", "investment-ai-product-judgment", "investment-competitive-landscape", "investment-unit-economics", "investment-scorecard", "investment-valuation-returns"]],
  ["investment-thesis-tracking", ["investment-research", "investment-ai-product-judgment", "investment-competitive-landscape", "investment-unit-economics", "investment-scorecard", "investment-valuation-returns", "investment-dd"]],
  ["investment-ic-memo-writer", ["topic-research-deposition", "investment-research", "investment-ai-product-judgment", "investment-competitive-landscape", "investment-unit-economics", "investment-scorecard", "investment-valuation-returns", "investment-dd", "investment-thesis-tracking"]],
  ["investment-visual-report", ["investment-ic-memo-writer"]],
]);

const investmentChainPath = join(
  root,
  "plugins/orchestrator/skills/workflow-orchestrator/references/chains/investment-icmemo.md",
);
const investmentWorkflowPath = join(root, "docs/workflows/investment-product-to-research-report.md");
const investmentChainText = read(investmentChainPath);
const investmentWorkflowText = read(investmentWorkflowPath);
const parsedChainRows = [...investmentChainText.matchAll(
  /^\|\s*(\d{2})(（可选）)?\s*\|\s*`(?:domain-[a-z-]+:)?([^`]+)`\s*\|\s*([^|\r\n]+?)\s*\|\s*`([^`/]+)`\s*\|$/gm,
)];
const chainRows = parsedChainRows.map((match) => [match[1], match[3], match[5]]);
if (JSON.stringify(chainRows) !== JSON.stringify(investmentChain))
  errors.push("investment-icmemo chain 必须精确声明 10 个必选 Skill + 1 个可选 Visual Skill 及其独立 Artifact");
for (const match of parsedChainRows) {
  const optionalMarkerIsCorrect = match[1] === "11" ? match[2] === "（可选）" : match[2] === undefined;
  if (!optionalMarkerIsCorrect)
    errors.push(`investment-icmemo 的 ${match[1]} 节点必选/可选标记不符合冻结 10+1 拓扑`);
  const skillId = match[3];
  const actualRefs = [...match[4].matchAll(/`node-output:([^`]+)`/g)].map((item) => item[1]);
  const expectedRefs = investmentInputRefs.get(skillId);
  if (!expectedRefs || JSON.stringify(actualRefs) !== JSON.stringify(expectedRefs))
    errors.push(`investment-icmemo 的 ${skillId} 输入绑定与冻结 10+1 拓扑不一致`);
}

for (const text of [investmentChainText, investmentWorkflowText]) {
  if (!text.includes("<project-root>/.asl/runs/<run-id>/"))
    errors.push("投研 chain 与说明必须使用项目 .asl/runs/<run-id>/ 作为运行目录");
  if (/research\/\{?(?:YYYY|date)|10-visual-report|09-ic-memo/i.test(text))
    errors.push("投研 chain 或说明仍包含旧研究目录/旧 Artifact 编号");
}
if (!/visualizationRequested\s*(?:==|=|`)?\s*true/i.test(investmentChainText))
  errors.push("投研 chain 未声明 visualizationRequested=true 的冻结可选条件");
if (!investmentChainText.includes("唯一执行者") || !investmentChainText.includes("不是第二调度器"))
  errors.push("投研 chain 未明确当前 Host Session 是唯一执行者且不存在第二调度器");

const investmentSkillRoots = new Map([
  ["topic-research-deposition", "plugins/domain-writing/skills/topic-research-deposition"],
  ...investmentChain.slice(1).map(([, skill]) => [skill, `plugins/domain-investment/skills/${skill}`]),
]);
const artifactBySkill = new Map(investmentChain.map(([, skill, artifact]) => [skill, artifact]));

function parseContractList(text, from, to) {
  const start = text.indexOf(from);
  const end = text.indexOf(to, start + from.length);
  return start >= 0 && end > start ? text.slice(start + from.length, end) : "";
}

function parseBuiltFrom(text) {
  const block = parseContractList(text, "  builtFrom:\n", "  obligations:\n");
  return [...block.matchAll(/^    - ([^\r\n]+)$/gm)].map((match) => match[1]);
}

function duplicateYamlMappingKeys(text) {
  const rootMap = { indent: -1, path: "$", keys: new Set() };
  const stack = [rootMap];
  const duplicates = [];

  for (const line of text.split("\n")) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const listMapping = line.match(/^(\s*)-\s+([A-Za-z][A-Za-z0-9]*)\s*:(?:\s*(.*))?$/);
    if (listMapping) {
      const indent = listMapping[1].length;
      while (stack.length > 1 && stack.at(-1).indent >= indent) stack.pop();
      const parent = stack.at(-1);
      const item = { indent: indent + 1, path: `${parent.path}[]`, keys: new Set() };
      item.keys.add(listMapping[2]);
      stack.push(item);
      if ((listMapping[3] ?? "") === "")
        stack.push({ indent: indent + 2, path: `${item.path}.${listMapping[2]}`, keys: new Set() });
      continue;
    }
    if (/^\s*-\s+/.test(line)) continue;

    const mapping = line.match(/^(\s*)([A-Za-z][A-Za-z0-9]*)\s*:(?:\s*(.*))?$/);
    if (!mapping) continue;
    const indent = mapping[1].length;
    while (stack.length > 1 && stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1);
    const key = mapping[2];
    if (parent.keys.has(key)) duplicates.push(`${parent.path}.${key}`);
    else parent.keys.add(key);
    if ((mapping[3] ?? "") === "")
      stack.push({ indent, path: `${parent.path}.${key}`, keys: new Set() });
  }
  return duplicates;
}

for (const [skill, skillRootRel] of investmentSkillRoots) {
  const skillRoot = join(root, skillRootRel);
  const skillPath = join(skillRoot, "SKILL.md");
  const contractPath = join(skillRoot, "quality-contract.yaml");
  const artifact = artifactBySkill.get(skill);
  const skillText = read(skillPath);

  if (!skillText.includes(artifact)) errors.push(`${skill} 未声明独立 Artifact ${artifact}`);
  if (skillText.includes(`artifacts/${artifact}`))
    errors.push(`${skill} 的 SKILL.md 不得给相对 artifacts/ 的 Artifact 路径重复添加目录前缀`);
  if (!existsSync(contractPath)) {
    errors.push(`投研 Skill 缺少质量合同: ${posix(rel(contractPath))}`);
    continue;
  }

  const contractText = read(contractPath).replaceAll("\r\n", "\n");
  const contractId = contractText.match(/^  id: ([^\r\n]+)$/m)?.[1];
  const artifactPath = contractText.match(/^    path: ([^\r\n]+)$/m)?.[1];
  const mediaType = contractText.match(/^    mediaType: (text\/(?:markdown|html))$/m)?.[1];

  const singletonStructure = [
    /^apiVersion: asl-wep\/v0\.1\.0-draft\.3$/gm,
    /^kind: SkillQualityContract$/gm,
    /^metadata:$/gm,
    /^spec:$/gm,
    /^  builtFrom:$/gm,
    /^  obligations:$/gm,
    /^  artifact:$/gm,
  ];
  const duplicateKeys = duplicateYamlMappingKeys(contractText);
  const unsupportedYamlSyntax = [
    /^\s*(?:-\s+)?["'][^"']+["']\s*:/m,
    /^\s*(?:\?|\{|\[)/m,
    /^\s*(?:-\s+)?!/m,
    /:\s*!/m,
    /:\s*[>|][+-]?\s*$/m,
  ].some((pattern) => pattern.test(contractText));
  if (!contractText.startsWith("apiVersion: asl-wep/v0.1.0-draft.3\nkind: SkillQualityContract\n")
    || singletonStructure.some((pattern) => [...contractText.matchAll(pattern)].length !== 1)
    || duplicateKeys.length
    || unsupportedYamlSyntax
    || /\t|^---$|(?:^|\s)[&*!][A-Za-z0-9_-]+/m.test(contractText))
    errors.push(`${skill} 的质量合同 envelope 不正确`);
  if (contractId !== `${skill}.quality`) errors.push(`${skill} 的质量合同 metadata.id 不正确`);

  const builtFrom = parseBuiltFrom(contractText);
  if (!builtFrom.includes("SKILL.md") || new Set(builtFrom).size !== builtFrom.length)
    errors.push(`${skill} 的 builtFrom 必须包含 SKILL.md 且不能重复`);
  for (const packageFile of builtFrom) {
    const packagePath = resolve(skillRoot, packageFile);
    if (relative(skillRoot, packagePath).startsWith("..")
      || !existsSync(packagePath)
      || !statSync(packagePath).isFile())
      errors.push(`${skill} 的 builtFrom 指向不存在的 package 文件: ${packageFile}`);
  }

  if (artifactPath !== artifact)
    errors.push(`${skill} 的质量合同 artifact.path 不正确`);
  const expectedMediaType = artifact.endsWith(".html") ? "text/html" : "text/markdown";
  if (mediaType !== expectedMediaType)
    errors.push(`${skill} 的质量合同 artifact.mediaType 不正确`);
  if (!/^    independent: true$/m.test(contractText))
    errors.push(`${skill} 的质量合同必须要求独立 Artifact`);

  const obligations = parseContractList(contractText, "  obligations:\n", "  artifact:\n");
  const obligationBlocks = obligations.split(/(?=    - id: )/).filter((item) => item.trim());
  const obligationIds = obligationBlocks.map((item) => item.match(/^    - id: ([^\r\n]+)$/m)?.[1]);
  if (!obligationBlocks.length || obligationIds.some((id) => !id))
    errors.push(`${skill} 的质量合同至少需要一个业务义务`);
  if (new Set(obligationIds).size !== obligationIds.length)
    errors.push(`${skill} 的质量合同 obligation id 重复`);
  if (!obligationBlocks.some((block) => /^      required: true$/m.test(block)))
    errors.push(`${skill} 的质量合同至少需要一个 required 业务义务`);
  for (const block of obligationBlocks) {
    const exactlyOne = (pattern) => [...block.matchAll(pattern)].length === 1;
    if (!exactlyOne(/^      requirement: .+$/gm) || !exactlyOne(/^      required: (?:true|false)$/gm))
      errors.push(`${skill} 的质量合同存在缺失 requirement/required 的义务`);
  }
}

for (const [, skillRootRel] of investmentSkillRoots) {
  const skillRoot = join(root, skillRootRel);
  for (const path of walk(skillRoot).filter(
    (item) => item.endsWith(".md")
      && !item.endsWith("SKILL.md")
      && !ignoredFiles.has(posix(rel(item))),
  )) {
    const text = read(path);
    if (/^---\r?\nname:\s*/m.test(text))
      errors.push(`投研 Skill package 内仍藏有伪独立 Skill: ${posix(rel(path))}`);
  }
}

const hiddenWorkflowPatterns = [
  ["远程 Skill 路径", /\/mnt\/skills\//i],
  ["隐藏 Skill 调用", /\b(?:invoke|invokes|hand to)\s+`[a-z0-9-]+`/i],
  ["强制 Excel Skill", /use the xlsx skill|read xlsx skill/i],
  ["强制 DOCX Skill", /use docx skill|required:\s*.*docx skill/i],
  ["动态 MCP Agent", /mcp__[a-z0-9_-]+__|tools:\s*.*mcp__/i],
  ["外部交付目录", /\/mnt\/user-data\/outputs|present_files/i],
];
for (const [skill, skillRootRel] of investmentSkillRoots) {
  if (skill === "topic-research-deposition") continue;
  for (const path of walk(join(root, skillRootRel)).filter(
    (item) => /\.(md|html)$/i.test(item)
      && !item.endsWith("SKILL.md")
      && !ignoredFiles.has(posix(rel(item))),
  )) {
    if (path.endsWith("quality-contract.yaml")) continue;
    for (const [label, pattern] of hiddenWorkflowPatterns)
      if (pattern.test(read(path))) errors.push(`${skill} 仍包含${label}: ${posix(rel(path))}`);
  }
}

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
    const current = json(join(root, path)).version;
    const previousSemVer = parseSemVer(previous);
    const currentSemVer = parseSemVer(current);
    if (!previousSemVer || !currentSemVer)
      errors.push(`plugin 版本不是合法 SemVer: ${name} (${previous} -> ${current})`);
    else if (compareSemVer(currentSemVer, previousSemVer) <= 0)
      errors.push(`plugin 内容已变化但版本未严格升级: ${name} (${previous} -> ${current})`);
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
