const data = window.SKILL_ORCHESTRATOR_DATA || {
  generatedAt: null,
  skills: [],
};

const storageKey = "agent-skill-composer-state";
const skillById = new Map((data.skills || []).map((skill) => [skill.id, skill]));

let composer = loadComposer();
let selectedNodeId = composer.nodes[0]?.id || null;

const elements = {
  generatedAt: document.querySelector("#generatedAt"),
  skillCount: document.querySelector("#skillCount"),
  visibleSkillCount: document.querySelector("#visibleSkillCount"),
  skillSearch: document.querySelector("#skillSearch"),
  skillList: document.querySelector("#skillList"),
  chainTitle: document.querySelector("#chainTitle"),
  finalOutput: document.querySelector("#finalOutput"),
  chainContext: document.querySelector("#chainContext"),
  dropZone: document.querySelector("#dropZone"),
  chainCount: document.querySelector("#chainCount"),
  emptyState: document.querySelector("#emptyState"),
  chainNodes: document.querySelector("#chainNodes"),
  linkLayer: document.querySelector("#linkLayer"),
  selectedTitle: document.querySelector("#selectedTitle"),
  nodeRole: document.querySelector("#nodeRole"),
  nodeInput: document.querySelector("#nodeInput"),
  nodeOutput: document.querySelector("#nodeOutput"),
  nodeAcceptance: document.querySelector("#nodeAcceptance"),
  moveLeftBtn: document.querySelector("#moveLeftBtn"),
  moveRightBtn: document.querySelector("#moveRightBtn"),
  removeNodeBtn: document.querySelector("#removeNodeBtn"),
  promptPreview: document.querySelector("#promptPreview"),
  copyPromptBtn: document.querySelector("#copyPromptBtn"),
  clearChainBtn: document.querySelector("#clearChainBtn"),
  exportChainBtn: document.querySelector("#exportChainBtn"),
  importChainInput: document.querySelector("#importChainInput"),
  copyStatus: document.querySelector("#copyStatus"),
};

init();

function init() {
  elements.generatedAt.textContent = data.generatedAt ? `数据生成：${data.generatedAt}` : "请先生成 data.js";
  elements.skillCount.textContent = `${data.skills?.length || 0} skills`;

  elements.chainTitle.value = composer.title;
  elements.finalOutput.value = composer.finalOutput;
  elements.chainContext.value = composer.context;

  elements.skillSearch.addEventListener("input", renderSkillList);
  elements.chainTitle.addEventListener("input", updateBrief);
  elements.finalOutput.addEventListener("input", updateBrief);
  elements.chainContext.addEventListener("input", updateBrief);

  elements.dropZone.addEventListener("dragover", handleCanvasDragOver);
  elements.dropZone.addEventListener("drop", handleCanvasDrop);
  elements.dropZone.addEventListener("dragleave", () => elements.dropZone.classList.remove("is-over"));
  elements.chainNodes.addEventListener("dragover", handleNodeDragOver);
  elements.chainNodes.addEventListener("drop", handleNodeDrop);

  for (const field of [elements.nodeRole, elements.nodeInput, elements.nodeOutput, elements.nodeAcceptance]) {
    field.addEventListener("input", updateSelectedNodeFromFields);
  }

  elements.moveLeftBtn.addEventListener("click", () => moveSelected(-1));
  elements.moveRightBtn.addEventListener("click", () => moveSelected(1));
  elements.removeNodeBtn.addEventListener("click", removeSelectedNode);
  elements.copyPromptBtn.addEventListener("click", copyPrompt);
  elements.clearChainBtn.addEventListener("click", clearChain);
  elements.exportChainBtn.addEventListener("click", exportChain);
  elements.importChainInput.addEventListener("change", importChain);

  window.addEventListener("resize", drawLinks);

  render();
}

function loadComposer() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) return normalizeComposer(JSON.parse(stored));
  } catch {
    localStorage.removeItem(storageKey);
  }

  return normalizeComposer({
    title: "",
    context: "",
    finalOutput: "",
    nodes: [],
  });
}

function normalizeComposer(value) {
  return {
    title: value.title || "",
    context: value.context || "",
    finalOutput: value.finalOutput || "",
    nodes: Array.isArray(value.nodes) ? value.nodes.map(normalizeNode) : [],
  };
}

function normalizeNode(node) {
  const skill = skillById.get(node.skillId);
  return {
    id: node.id || createNodeId(node.skillId || "node"),
    skillId: node.skillId || "",
    title: node.title || skill?.id || node.skillId || "未命名节点",
    role: node.role || defaultRole(skill),
    input: node.input || "",
    output: node.output || "",
    acceptance: node.acceptance || "",
  };
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(composer));
}

function render() {
  renderSkillList();
  renderChain();
  renderSelectedNode();
  renderPrompt();
  persist();
}

function renderSkillList() {
  const query = elements.skillSearch.value.trim().toLowerCase();
  const skills = (data.skills || []).filter((skill) => {
    const haystack = `${skill.id} ${skill.title} ${skill.directory} ${skill.path} ${skill.description}`.toLowerCase();
    return !query || haystack.includes(query);
  });

  elements.visibleSkillCount.textContent = String(skills.length);
  elements.skillList.innerHTML = "";

  for (const skill of skills) {
    const card = document.createElement("article");
    card.className = "skill-card";
    card.draggable = true;
    card.dataset.skillId = skill.id;
    card.innerHTML = `
      <div>
        <strong>${escapeHtml(skill.id)}</strong>
        <span>${escapeHtml(skill.directory || "skills")}</span>
      </div>
      <p>${escapeHtml(shortText(skill.description || skill.path || "", 110))}</p>
      <div class="skill-card-footer">
        <code>${escapeHtml(skill.path || "")}</code>
        <button type="button" aria-label="Add ${escapeHtml(skill.id)}">+</button>
      </div>
    `;
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", skill.id);
      event.dataTransfer.effectAllowed = "copy";
    });
    card.querySelector("button").addEventListener("click", () => addSkillNode(skill.id));
    elements.skillList.appendChild(card);
  }
}

function renderChain() {
  elements.chainNodes.innerHTML = "";
  elements.chainCount.textContent = `${composer.nodes.length} nodes`;
  elements.emptyState.hidden = composer.nodes.length > 0;

  composer.nodes.forEach((node, index) => {
    const skill = skillById.get(node.skillId);
    const card = document.createElement("article");
    card.className = "chain-node";
    if (node.id === selectedNodeId) card.classList.add("is-active");
    card.draggable = true;
    card.dataset.nodeId = node.id;
    card.innerHTML = `
      <div class="node-topline">
        <span class="node-index">${index + 1}</span>
        <span class="node-meta">${escapeHtml(skill?.directory || "missing")}</span>
      </div>
      <strong>${escapeHtml(node.title)}</strong>
      <p>${escapeHtml(node.role || defaultRole(skill))}</p>
      <code>${escapeHtml(skill?.path || "skill missing")}</code>
    `;
    card.addEventListener("click", () => {
      selectedNodeId = node.id;
      render();
    });
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("application/x-node-id", node.id);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("is-dragging");
    });
    elements.chainNodes.appendChild(card);
  });

  requestAnimationFrame(drawLinks);
}

function renderSelectedNode() {
  const node = selectedNode();
  const disabled = !node;

  elements.selectedTitle.textContent = node ? node.title : "未选择节点";
  for (const control of [
    elements.nodeRole,
    elements.nodeInput,
    elements.nodeOutput,
    elements.nodeAcceptance,
    elements.moveLeftBtn,
    elements.moveRightBtn,
    elements.removeNodeBtn,
  ]) {
    control.disabled = disabled;
  }

  elements.nodeRole.value = node?.role || "";
  elements.nodeInput.value = node?.input || "";
  elements.nodeOutput.value = node?.output || "";
  elements.nodeAcceptance.value = node?.acceptance || "";
}

function renderPrompt() {
  elements.promptPreview.value = buildPrompt();
}

function updateBrief() {
  composer.title = elements.chainTitle.value;
  composer.finalOutput = elements.finalOutput.value;
  composer.context = elements.chainContext.value;
  renderPrompt();
  persist();
}

function updateSelectedNodeFromFields() {
  const node = selectedNode();
  if (!node) return;

  node.role = elements.nodeRole.value;
  node.input = elements.nodeInput.value;
  node.output = elements.nodeOutput.value;
  node.acceptance = elements.nodeAcceptance.value;
  renderChain();
  renderPrompt();
  persist();
}

function selectedNode() {
  return composer.nodes.find((node) => node.id === selectedNodeId);
}

function addSkillNode(skillId, index = composer.nodes.length) {
  const skill = skillById.get(skillId);
  if (!skill) return;

  const node = normalizeNode({
    id: createNodeId(skillId),
    skillId,
    title: skill.id,
    role: defaultRole(skill),
    input: defaultInput(skill),
    output: defaultOutput(skill),
    acceptance: "完成后先输出本节点产物摘要，再进入下一节点。",
  });

  composer.nodes.splice(index, 0, node);
  selectedNodeId = node.id;
  render();
}

function handleCanvasDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  elements.dropZone.classList.add("is-over");
}

function handleCanvasDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  elements.dropZone.classList.remove("is-over");
  const skillId = event.dataTransfer.getData("text/plain");
  if (skillId) addSkillNode(skillId);
}

function handleNodeDragOver(event) {
  event.preventDefault();
  const types = Array.from(event.dataTransfer.types || []);
  event.dataTransfer.dropEffect = types.includes("application/x-node-id") ? "move" : "copy";
}

function handleNodeDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  const targetCard = event.target.closest(".chain-node");
  const targetIndex = targetCard
    ? composer.nodes.findIndex((node) => node.id === targetCard.dataset.nodeId)
    : composer.nodes.length;

  const movedNodeId = event.dataTransfer.getData("application/x-node-id");
  if (movedNodeId) {
    moveNodeToIndex(movedNodeId, targetIndex);
    return;
  }

  const skillId = event.dataTransfer.getData("text/plain");
  if (skillId) addSkillNode(skillId, targetIndex < 0 ? composer.nodes.length : targetIndex);
}

function moveNodeToIndex(nodeId, targetIndex) {
  const currentIndex = composer.nodes.findIndex((node) => node.id === nodeId);
  if (currentIndex < 0 || targetIndex < 0) return;
  const [node] = composer.nodes.splice(currentIndex, 1);
  const normalizedTarget = currentIndex < targetIndex ? targetIndex - 1 : targetIndex;
  composer.nodes.splice(Math.max(0, normalizedTarget), 0, node);
  selectedNodeId = node.id;
  render();
}

function moveSelected(delta) {
  const index = composer.nodes.findIndex((node) => node.id === selectedNodeId);
  const target = index + delta;
  if (index < 0 || target < 0 || target >= composer.nodes.length) return;
  const [node] = composer.nodes.splice(index, 1);
  composer.nodes.splice(target, 0, node);
  selectedNodeId = node.id;
  render();
}

function removeSelectedNode() {
  const index = composer.nodes.findIndex((node) => node.id === selectedNodeId);
  if (index < 0) return;
  composer.nodes.splice(index, 1);
  selectedNodeId = composer.nodes[Math.min(index, composer.nodes.length - 1)]?.id || null;
  render();
}

function clearChain() {
  composer = normalizeComposer({
    title: "",
    context: "",
    finalOutput: "",
    nodes: [],
  });
  selectedNodeId = null;
  elements.chainTitle.value = "";
  elements.finalOutput.value = "";
  elements.chainContext.value = "";
  render();
}

async function copyPrompt() {
  const prompt = elements.promptPreview.value;
  try {
    await navigator.clipboard.writeText(prompt);
    elements.copyStatus.textContent = "已复制整条链 prompt。";
  } catch {
    elements.promptPreview.focus();
    elements.promptPreview.select();
    document.execCommand("copy");
    elements.copyStatus.textContent = "已选中并复制整条链 prompt。";
  }
  setTimeout(() => {
    elements.copyStatus.textContent = "链路变化会实时刷新 prompt。";
  }, 1800);
}

function exportChain() {
  const blob = new Blob([JSON.stringify(composer, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(composer.title || "skill-chain")}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importChain(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      composer = normalizeComposer(JSON.parse(String(reader.result)));
      selectedNodeId = composer.nodes[0]?.id || null;
      elements.chainTitle.value = composer.title;
      elements.finalOutput.value = composer.finalOutput;
      elements.chainContext.value = composer.context;
      render();
    } catch {
      elements.copyStatus.textContent = "导入失败：JSON 不可解析。";
    }
    event.target.value = "";
  };
  reader.readAsText(file);
}

function buildPrompt() {
  if (!composer.nodes.length) {
    return [
      "请先在左侧把需要的 skills 拖到中间链路。",
      "链路生成后，这里会实时出现给 Claude 的整条链 handoff prompt。",
    ].join("\n");
  }

  const title = composer.title || "未命名技能链";
  const finalOutput = composer.finalOutput || "按节点定义产出完整成果";
  const context = composer.context || "[这里填写项目背景、输入材料、约束和目标读者]";

  const nodeBlocks = composer.nodes.map((node, index) => {
    const skill = skillById.get(node.skillId);
    return [
      `${index + 1}. ${node.title}`,
      `   - 使用技能：${node.skillId}`,
      `   - 技能路径：${skill?.path || "未在当前技能库中找到"}`,
      `   - 技能定位：${skill?.description || "请按节点职责降级执行，不要编造技能正文。"}`,
      `   - 节点职责：${node.role || "[未填写]"}`,
      `   - 节点输入：${node.input || "[承接上一节点输出或全局输入]"}`,
      `   - 节点输出：${node.output || "[未填写]"}`,
      `   - 验收要求：${node.acceptance || "完成后先输出本节点产物摘要，再进入下一节点。"}`,
    ].join("\n");
  });

  return [
    "你现在要按 agent-skill-library 中由人工拖拽编排出来的技能链执行任务。",
    "",
    "# 链路目标",
    `- 名称：${title}`,
    `- 最终成果：${finalOutput}`,
    "",
    "# 全局输入和背景",
    context,
    "",
    "# 执行顺序",
    ...nodeBlocks,
    "",
    "# 执行规则",
    "- 严格按上面的节点顺序执行，不要跳过前置节点。",
    "- 每个节点必须显式说明：输入是什么、调用了哪个 skill、产出了什么。",
    "- 如果某个 skill 在当前环境不可用，不要编造 skill 内容；按该节点职责和已有上下文降级执行，并标记缺口。",
    "- 每完成一个节点，先输出该节点产物摘要，再进入下一节点。",
    "- 事实、判断、推断和待确认问题必须分开。",
    "- 最终汇总所有产物、未完成项、风险和下一步。",
  ].join("\n");
}

function drawLinks() {
  const cards = [...elements.chainNodes.querySelectorAll(".chain-node")];
  const svg = elements.linkLayer;
  svg.innerHTML = "";
  if (cards.length < 2) return;

  const canvasRect = elements.chainNodes.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${canvasRect.width} ${canvasRect.height}`);
  svg.setAttribute("width", canvasRect.width);
  svg.setAttribute("height", canvasRect.height);

  for (let index = 0; index < cards.length - 1; index += 1) {
    const from = cards[index].getBoundingClientRect();
    const to = cards[index + 1].getBoundingClientRect();
    const x1 = from.right - canvasRect.left;
    const y1 = from.top + from.height / 2 - canvasRect.top;
    const x2 = to.left - canvasRect.left;
    const y2 = to.top + to.height / 2 - canvasRect.top;
    const mid = Math.max(24, (x2 - x1) / 2);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${x1 + mid} ${y1}, ${x2 - mid} ${y2}, ${x2} ${y2}`);
    path.setAttribute("class", "link-path");
    svg.appendChild(path);
  }
}

function defaultRole(skill) {
  if (!skill) return "";
  return `参考 ${skill.id}，完成本节点在整条链中的专业判断或生成任务。`;
}

function defaultInput(skill) {
  if (!skill) return "";
  if (skill.id === "ai-product-analyzer") return "全局输入材料、产品信息、上一节点输出。";
  if (skill.id === "topic-research-deposition") return "选题、搜索范围、平台约束和素材保存要求。";
  if (skill.id === "qihang-writing-style") return "已沉淀素材、核心判断、目标平台和需要改写或成稿的文稿。";
  if (skill.id === "qihang-skill-index") return "需要查找、选择、验证或安装的外部 GitHub repo 根目录。";
  return "全局输入材料和上一节点输出。";
}

function defaultOutput(skill) {
  if (!skill) return "";
  if (skill.id === "ai-product-analyzer") return "结构化产品分析、关键判断、最强论点、最弱缺口。";
  if (skill.id === "topic-research-deposition") return "按平台归档的原始素材、截图证据和待确认缺口。";
  if (skill.id === "qihang-writing-style") return "符合启航风格的公众号或社媒文稿，以及必要的修订说明。";
  if (skill.id === "qihang-skill-index") return "可用外部 repo 根目录、适用场景、安装/引用边界和是否应沉淀的判断。";
  return "本节点可交付产物。";
}

function createNodeId(seed) {
  return `${seed}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "") || "skill-chain";
}

function shortText(value, maxLength) {
  const normalized = String(value).replace(/\s+/g, " ").trim();
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength - 1)}...` : normalized;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
