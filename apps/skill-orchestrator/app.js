const data = window.SKILL_ORCHESTRATOR_DATA || {
  generatedAt: null,
  skills: [],
  orchestrations: [],
};

const stateOptions = ["pending", "running", "blocked", "done", "failed"];
const stateLabels = {
  pending: "待跑",
  running: "运行中",
  blocked: "卡住",
  done: "完成",
  failed: "失败",
  missing: "缺技能",
};

const skillById = new Map((data.skills || []).map((skill) => [skill.id, skill]));

let selectedWorkflowId = data.orchestrations?.[0]?.id || null;
let selectedNodeId = null;
let inputState = loadJson("skill-orchestrator-inputs", {});
let runState = loadJson("skill-orchestrator-run-state", {});

const elements = {
  generatedAt: document.querySelector("#generatedAt"),
  skillCount: document.querySelector("#skillCount"),
  workflowCount: document.querySelector("#workflowCount"),
  availableCount: document.querySelector("#availableCount"),
  workflowList: document.querySelector("#workflowList"),
  skillList: document.querySelector("#skillList"),
  skillSearch: document.querySelector("#skillSearch"),
  workflowTitle: document.querySelector("#workflowTitle"),
  workflowPurpose: document.querySelector("#workflowPurpose"),
  entryInputs: document.querySelector("#entryInputs"),
  progressText: document.querySelector("#progressText"),
  progressFill: document.querySelector("#progressFill"),
  nodeGraph: document.querySelector("#nodeGraph"),
  nodeTitle: document.querySelector("#nodeTitle"),
  nodeInput: document.querySelector("#nodeInput"),
  nodeOutput: document.querySelector("#nodeOutput"),
  nodeSkills: document.querySelector("#nodeSkills"),
  nodeAcceptance: document.querySelector("#nodeAcceptance"),
  statusControls: document.querySelector("#statusControls"),
  promptPreview: document.querySelector("#promptPreview"),
  copyPromptBtn: document.querySelector("#copyPromptBtn"),
  resetStateBtn: document.querySelector("#resetStateBtn"),
  copyStatus: document.querySelector("#copyStatus"),
};

init();

function init() {
  elements.generatedAt.textContent = data.generatedAt
    ? `数据生成：${data.generatedAt}`
    : "请先生成 data.js";
  elements.skillCount.textContent = `${data.skills?.length || 0} skills`;
  elements.workflowCount.textContent = String(data.orchestrations?.length || 0);
  elements.availableCount.textContent = `${data.skills?.length || 0}`;

  elements.skillSearch.addEventListener("input", renderSkills);
  elements.copyPromptBtn.addEventListener("click", copyFullPrompt);
  elements.resetStateBtn.addEventListener("click", resetCurrentWorkflow);

  renderWorkflows();
  renderSkills();
  selectWorkflow(selectedWorkflowId);
}

function loadJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function selectedWorkflow() {
  return data.orchestrations.find((workflow) => workflow.id === selectedWorkflowId);
}

function renderWorkflows() {
  elements.workflowList.innerHTML = "";

  for (const workflow of data.orchestrations || []) {
    const button = document.createElement("button");
    button.className = "workflow-button";
    if (workflow.id === selectedWorkflowId) button.classList.add("is-active");
    button.type = "button";
    button.innerHTML = `
      <strong>${escapeHtml(workflow.title)}</strong>
      <span>${escapeHtml(workflow.purpose || "")}</span>
    `;
    button.addEventListener("click", () => selectWorkflow(workflow.id));
    elements.workflowList.appendChild(button);
  }
}

function renderSkills() {
  const query = elements.skillSearch.value.trim().toLowerCase();
  elements.skillList.innerHTML = "";

  const filtered = (data.skills || []).filter((skill) => {
    const haystack = `${skill.id} ${skill.section} ${skill.path} ${skill.description}`.toLowerCase();
    return !query || haystack.includes(query);
  });

  for (const skill of filtered) {
    const row = document.createElement("div");
    row.className = "skill-row";
    row.innerHTML = `
      <strong>${escapeHtml(skill.id)}</strong>
      <span>${escapeHtml(skill.section || "unknown")} · <code>${escapeHtml(skill.path || "")}</code></span>
    `;
    elements.skillList.appendChild(row);
  }
}

function selectWorkflow(workflowId) {
  selectedWorkflowId = workflowId;
  const workflow = selectedWorkflow();
  selectedNodeId = workflow?.nodes?.[0]?.id || null;

  renderWorkflows();
  renderWorkflow();
}

function renderWorkflow() {
  const workflow = selectedWorkflow();
  if (!workflow) return;

  elements.workflowTitle.textContent = workflow.title;
  elements.workflowPurpose.textContent = workflow.purpose || "";

  renderInputs(workflow);
  renderGraph(workflow);
  renderNodeDetail(workflow);
  updatePromptPreview(workflow);
}

function renderInputs(workflow) {
  elements.entryInputs.innerHTML = "";
  const workflowInputs = inputState[workflow.id] || {};

  for (const input of workflow.entryInputs || []) {
    const wrapper = document.createElement("label");
    wrapper.className = "input-group";

    const field = input.type === "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

    field.className = "input-field";
    field.placeholder = input.placeholder || "";
    field.value = workflowInputs[input.id] || "";
    if (input.type !== "textarea") field.type = input.type || "text";

    field.addEventListener("input", () => {
      inputState[workflow.id] = {
        ...(inputState[workflow.id] || {}),
        [input.id]: field.value,
      };
      saveJson("skill-orchestrator-inputs", inputState);
      updatePromptPreview(workflow);
    });

    const caption = document.createElement("span");
    caption.textContent = input.label;

    wrapper.appendChild(caption);
    wrapper.appendChild(field);
    elements.entryInputs.appendChild(wrapper);
  }
}

function renderGraph(workflow) {
  elements.nodeGraph.innerHTML = "";
  const nodes = workflow.nodes || [];
  const doneCount = nodes.filter((node) => nodeStatus(workflow.id, node) === "done").length;
  const total = nodes.length;
  const progress = total ? Math.round((doneCount / total) * 100) : 0;

  elements.progressText.textContent = `${doneCount} / ${total} done`;
  elements.progressFill.style.width = `${progress}%`;

  nodes.forEach((node, index) => {
    const status = nodeStatus(workflow.id, node);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `node-card status-${status}`;
    if (node.id === selectedNodeId) card.classList.add("is-active");
    card.innerHTML = `
      <span class="node-index">${index + 1}</span>
      <strong>${escapeHtml(node.title)}</strong>
      <span>${escapeHtml(node.output || "")}</span>
      <span class="status-badge status-${status}">${stateLabels[status] || status}</span>
      <span>${skillSummary(node.skills || [])}</span>
    `;
    card.addEventListener("click", () => {
      selectedNodeId = node.id;
      renderWorkflow();
    });
    elements.nodeGraph.appendChild(card);
  });
}

function renderNodeDetail(workflow) {
  const node = workflow.nodes?.find((item) => item.id === selectedNodeId) || workflow.nodes?.[0];
  if (!node) return;

  elements.nodeTitle.textContent = node.title;
  elements.nodeInput.textContent = node.input || "-";
  elements.nodeOutput.textContent = node.output || "-";
  elements.nodeAcceptance.innerHTML = listHtml(node.acceptance || []);
  elements.nodeSkills.innerHTML = skillPillsHtml(node.skills || []);

  elements.statusControls.innerHTML = "";
  const current = nodeStatus(workflow.id, node);
  for (const option of stateOptions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "status-button";
    if (option === current) button.classList.add("is-active");
    button.textContent = stateLabels[option];
    button.addEventListener("click", () => setNodeStatus(workflow.id, node.id, option));
    elements.statusControls.appendChild(button);
  }
}

function nodeStatus(workflowId, node) {
  const stored = runState[workflowId]?.[node.id];
  if (stored) return stored;
  const hasMissingSkill = (node.skills || []).some((skillId) => !skillById.has(skillId));
  return hasMissingSkill ? "missing" : "pending";
}

function setNodeStatus(workflowId, nodeId, status) {
  runState[workflowId] = {
    ...(runState[workflowId] || {}),
    [nodeId]: status,
  };
  saveJson("skill-orchestrator-run-state", runState);
  renderWorkflow();
}

function resetCurrentWorkflow() {
  if (!selectedWorkflowId) return;
  delete runState[selectedWorkflowId];
  delete inputState[selectedWorkflowId];
  saveJson("skill-orchestrator-run-state", runState);
  saveJson("skill-orchestrator-inputs", inputState);
  renderWorkflow();
}

function updatePromptPreview(workflow) {
  elements.promptPreview.value = buildFullPrompt(workflow);
}

async function copyFullPrompt() {
  const prompt = elements.promptPreview.value;
  try {
    await navigator.clipboard.writeText(prompt);
    elements.copyStatus.textContent = "已复制";
  } catch {
    elements.promptPreview.focus();
    elements.promptPreview.select();
    document.execCommand("copy");
    elements.copyStatus.textContent = "已选中并复制";
  }
  window.setTimeout(() => {
    elements.copyStatus.textContent = "待复制";
  }, 1800);
}

function buildFullPrompt(workflow) {
  if (!workflow) return "";
  const workflowInputs = inputState[workflow.id] || {};
  const missingSkills = collectMissingSkills(workflow);

  const inputLines = (workflow.entryInputs || []).map((input) => {
    const value = workflowInputs[input.id] || `[未填写：${input.label}]`;
    return `- ${input.label}：${value}`;
  });

  const nodeLines = (workflow.nodes || []).map((node, index) => {
    const skills = (node.skills || []).map((skillId) => {
      const skill = skillById.get(skillId);
      return skill ? `${skillId} (${skill.path})` : `${skillId} (missing, 按节点说明降级)`;
    });

    return [
      `${index + 1}. ${node.title}`,
      `   - 参考技能：${skills.join("；") || "无"}`,
      `   - 输入：${node.input || "-"}`,
      `   - 输出：${node.output || "-"}`,
      `   - 执行要点：`,
      ...(node.instructions || []).map((item) => `     - ${item}`),
      `   - 验收标准：`,
      ...(node.acceptance || []).map((item) => `     - ${item}`),
    ].join("\n");
  });

  const rules = workflow.handoffRules || [];
  const artifacts = workflow.finalArtifacts || [];

  return [
    `你现在要按 agent-skill-library 的工作流执行一整条技能链。`,
    ``,
    `# 工作流`,
    `- ID：${workflow.id}`,
    `- 名称：${workflow.title}`,
    `- 目的：${workflow.purpose || "-"}`,
    ``,
    `# 输入`,
    ...inputLines,
    ``,
    `# 可用性`,
    missingSkills.length
      ? `以下技能当前没有在本仓库 skills/**/SKILL.md 中找到：${missingSkills.join("、")}。遇到这些节点时，不要编造技能正文；按节点说明和已有技能降级执行，并明确标记缺口。`
      : `本链路引用的技能当前都能在本仓库 skills/**/SKILL.md 中找到。`,
    ``,
    `# 执行顺序`,
    ...nodeLines,
    ``,
    `# 最终产物`,
    ...artifacts.map((artifact) => `- ${artifact}`),
    ``,
    `# 执行规则`,
    ...rules.map((rule) => `- ${rule}`),
    ``,
    `请从第 1 个节点开始，严格顺序执行。每完成一个节点，先输出该节点产物摘要和下一节点输入，再继续。最后汇总所有产物、缺失信息、风险和下一步。`,
  ].join("\n");
}

function collectMissingSkills(workflow) {
  const missing = new Set();
  for (const node of workflow.nodes || []) {
    for (const skillId of node.skills || []) {
      if (!skillById.has(skillId)) missing.add(skillId);
    }
  }
  return [...missing];
}

function skillSummary(skills) {
  const available = skills.filter((skillId) => skillById.has(skillId)).length;
  const total = skills.length;
  if (!total) return "0 skills";
  return `${available}/${total} skills available`;
}

function skillPillsHtml(skills) {
  if (!skills.length) return "-";
  return `<div class="skill-pills">${skills.map((skillId) => {
    const skill = skillById.get(skillId);
    const status = skill ? "done" : "missing";
    const label = skill ? skill.path : "missing";
    return `<span class="skill-pill status-${status}"><code>${escapeHtml(skillId)}</code> ${escapeHtml(label)}</span>`;
  }).join("")}</div>`;
}

function listHtml(items) {
  if (!items.length) return "-";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
