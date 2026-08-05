# Chain: Investment IC Memo

## 何时使用

用于判断 AI 产品、公司、开源项目或基础设施是否值得投资、跟踪或放弃，并交付 IC Memo。用户明确需要网页研报时，再运行可选的视觉 Skill。

当前 Codex App task 或 Claude Code session 是唯一执行者；`workflow-orchestrator` 只选择本 chain，不是第二调度器。唯一业务节点单位是本地 Skill，外部 MCP、Prompt、Agent、API 或脚本只能作为某个本地 Skill 的内部能力使用。

## 顺序与产物

| 顺序 | 本地 Skill（同时是 nodeId） | 可读输入 | 独立 Artifact |
| --- | --- | --- | --- |
| 01 | `domain-writing:topic-research-deposition` | Run 原始材料与研究目标 | `01-source-intake.md` |
| 02 | `domain-investment:investment-research` | `node-output:topic-research-deposition` | `02-fact-pack.md` |
| 03 | `domain-investment:investment-ai-product-judgment` | `node-output:investment-research` | `03-product-judgment.md` |
| 04 | `domain-investment:investment-competitive-landscape` | `node-output:investment-research`、`node-output:investment-ai-product-judgment` | `04-competitive-landscape.md` |
| 05 | `domain-investment:investment-unit-economics` | `node-output:investment-research`、`node-output:investment-ai-product-judgment`、`node-output:investment-competitive-landscape` | `05-unit-economics.md` |
| 06 | `domain-investment:investment-scorecard` | `node-output:investment-research`、`node-output:investment-ai-product-judgment`、`node-output:investment-competitive-landscape`、`node-output:investment-unit-economics` | `06-investment-scorecard.md` |
| 07 | `domain-investment:investment-valuation-returns` | `node-output:investment-research`、`node-output:investment-ai-product-judgment`、`node-output:investment-competitive-landscape`、`node-output:investment-unit-economics`、`node-output:investment-scorecard` | `07-valuation-returns.md` |
| 08 | `domain-investment:investment-dd` | `node-output:investment-research`、`node-output:investment-ai-product-judgment`、`node-output:investment-competitive-landscape`、`node-output:investment-unit-economics`、`node-output:investment-scorecard`、`node-output:investment-valuation-returns` | `08-dd-questions.md` |
| 09 | `domain-investment:investment-thesis-tracking` | `node-output:investment-research`、`node-output:investment-ai-product-judgment`、`node-output:investment-competitive-landscape`、`node-output:investment-unit-economics`、`node-output:investment-scorecard`、`node-output:investment-valuation-returns`、`node-output:investment-dd` | `09-thesis-tracking.md` |
| 10 | `domain-investment:investment-ic-memo-writer` | `node-output:topic-research-deposition`、`node-output:investment-research`、`node-output:investment-ai-product-judgment`、`node-output:investment-competitive-landscape`、`node-output:investment-unit-economics`、`node-output:investment-scorecard`、`node-output:investment-valuation-returns`、`node-output:investment-dd`、`node-output:investment-thesis-tracking` | `10-ic-memo.md` |
| 11（可选） | `domain-investment:investment-visual-report` | `node-output:investment-ic-memo-writer` | `11-visual-report.html` |

这些输入只是 Skill 可以读取的上游业务产物，不是分支、审批任务或额外节点。10 个必选 Skill 按表中顺序运行；用户请求可视化时再追加第 11 个 Skill，它只读 Memo，不回头读取 01–09。

节点 01 负责广泛搜索与原始证据沉淀；节点 02 负责把 01 结构化为 Fact Pack，只对 01 明确记录的关键缺口、冲突或过期事实做定向补查，不重复全量搜索。

节点 11 的条件是 `visualizationRequested == true`，缺省为 `false`。Host 在 Run 开始前决定是否纳入。

## 执行规则

1. 到达节点时才读取该 Skill 的 `SKILL.md` 与 `quality-contract.yaml`；不要在 Run 开始时预载整条链。
2. 只加载 `SKILL.md` 针对本案明确路由的 references、assets 和 scripts，再按合同完成分析并写出可独立阅读的 Artifact。按需加载不降低 standalone 质量。
3. 质量合同只约束业务内容和独立产物；运行日志不写进投资人报告。
4. 下游发现必需内容缺失时，指出责任 Skill 和缺失内容，返回补做后继续；信息确实不可获得时，公开缺口、影响、保守处理和再核验条件，然后继续。
5. 旧标识或运行上下文缺失只能提醒，不能阻止用户要求的运行。

运行产物放在 `<project-root>/.asl/runs/<run-id>/artifacts/`，不得写入技能库。IC Memo 和视觉报告都必须使用投资人可读的中文，真实外部来源使用可读、可点击链接；内部运行术语和审计记录只留在工作区。

只有用户明确表达的反馈才能进入反馈记录。Skill、合同或 chain 的稳定修改仍需精确 diff 和一次明确确认后进入 Git。

完整读取整个 package 是导入 Skill、首次起草质量合同或更新合同时的维护动作，不是每次节点运行的前置动作。
