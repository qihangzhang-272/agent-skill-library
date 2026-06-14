# Agent Skill Library

私有高质量技能库，用来沉淀个人可复用的 Agent 工作能力。

本仓库不是普通 prompt 收藏夹，也不是某个知识库的附属仓库。它是一个 Agent 运行能力库和项目初始化配置参考库：

- 第一用户是仓库维护者本人。
- 主要使用者是被维护者配置和调用的 Codex、Claude 和后续 agent。
- 仓库记录哪些能力值得用、什么时候用、怎么组合、如何配置到具体项目。
- 外部技能优先以地址、索引、来源和调用方式沉淀；只有明确可迁移且边界清楚的技能包才 vendored 到 `skills/`。
- 网页 prompt、UI 库源码、项目资料和一次性实验结果不进入正式技能包。

## 仓库职能

本仓库只承担两个核心职能：

1. **工作流编排**：把已经验证过的技能链沉淀到 `orchestrations/` 和 `docs/workflows/`。HTML 编排台只是辅助工具，不是源头。
2. **技能收藏索引**：外部好用技能和技能源优先记录在 `qihang-skill-index`，URL 默认使用 GitHub repo 根目录。除非边界、许可证和复用价值都清楚，否则不把外部仓库整包搬进来。

Claude Code plugin 只作为自培养技能和轻量索引的分发层。目前默认只分发：

- `agent-product`：`ai-product-analyzer`
- `agent-writing`：`topic-research-deposition`、`qihang-writing-style`
- `qihang-skill-pack`：`qihang-skill-index`、`qihang-workflow-orchestrator`
- `agent-investment`：启航 AI 投资 IC Memo 工作包，包含研究、产品判断、竞争格局、单位经济、评分、估值、DD、跟踪和成稿节点

## 索引入口

| 入口 | 用途 |
| --- | --- |
| `skills/` | 只放启航自培养技能和启航维护的轻量索引 |
| `skills/qihang-skill-index/` | 外部 GitHub 技能 / 技能源 repo 根目录索引 |
| `catalog/skills.yml` | 本地正式技能总账、调用链角色和插件分发关系 |
| `orchestrations/` | 已验证工作流编排 |
| `docs/workflows/` | 跨技能工作流说明 |

## Claude Code 插件市场

本仓库现在同时提供 Claude Code plugin marketplace 分发层。它只负责分发自培养、会高频复用的技能，不承载外部收藏目录：

- Marketplace manifest：`.claude-plugin/marketplace.json`
- 插件分发目录：`plugins/`
- 插件分发索引：`catalog/claude-plugins.json`
- 生成脚本：`scripts/build-claude-plugins.ps1`

`plugins/` 不是源内容目录。源技能仍维护在 `skills/`，分发映射维护在 `catalog/claude-plugins.json`。每次改变自培养技能进入哪个插件后，运行：

```powershell
.\scripts\build-claude-plugins.ps1
```

然后用 Claude Code 验证：

```powershell
claude plugin validate .
```

## 当前正式技能

| 技能 | 来源 | 状态 |
| --- | --- | --- |
| `ai-product-analyzer` | `skills/ai-product-analyzer/` | 自培养产品洞察技能，进入 `agent-product` 插件 |
| `qihang-writing-style` | `skills/qihang-writing-style/` | 自培养启航写作风格技能，进入 `agent-writing` 插件 |
| `topic-research-deposition` | `skills/topic-research-deposition/` | 已沉淀为公众号选题搜索与素材截图工作流 |
| `qihang-ai-investment-orchestrator` | `skills/qihang-ai-investment-orchestrator/` | 启航 AI 投资工作包入口，进入 `agent-investment` 插件 |
| `qihang-ic-memo-writer` | `skills/qihang-ic-memo-writer/` | 投资节点产出后的最终 IC Memo 写作技能，进入 `agent-investment` 插件 |
| `qihang-skill-index` | `skills/qihang-skill-index/` | 启航外部 GitHub 技能源索引，进入 `qihang-skill-pack` 插件 |
| `qihang-workflow-orchestrator` | `skills/qihang-workflow-orchestrator/` | 三条已跑通工作流的调用入口，进入 `qihang-skill-pack` 插件 |

## 当前运行链

| 调用链 | 文档 | 作用 |
| --- | --- | --- |
| topic -> writing -> md2wechat | `skills/qihang-workflow-orchestrator/` | 从选题素材沉淀到启航风格正文，再通过 `qihang-skill-index` 查 md2wechat 并进入公众号排版/草稿箱 |
| product -> frontend-design | `docs/workflows/prd-to-frontend.md` | 从产品洞察推进到前端 brief、设计来源选择、实现计划和浏览器验收 |
| product -> investment IC memo -> visual report | `docs/workflows/investment-product-to-research-report.md` | 从 AI-native 产品判断进入启航投资工作包，产出 IC Memo、DD 问题树、watch triggers，并可继续做全展开可视化研报 |

## 可视化编排

- 本地编排台：`apps/skill-orchestrator/index.html`
- 数据生成：运行 `.\scripts\build-skill-orchestrator-data.ps1`

编排台不运行 Claude，也不做本地 runner。它从当前 `skills/` 扫描技能，支持拖拽拼出动态技能链，实时生成整条链的 Claude handoff prompt。只有反复验证后值得沉淀的链路，才从页面导出 JSON 放进 `orchestrations/`。

## 文档入口

- 文档总目录见 [docs/README.md](docs/README.md)。
- 仓库治理和引用原则见 [docs/governance/](docs/governance/)。
- 技能库宪法见 [docs/governance/library-constitution.md](docs/governance/library-constitution.md)。
- 索引和记录方式见 [docs/governance/catalog-schema.md](docs/governance/catalog-schema.md)。
- 收录、协作、Linear 和跨技能调用链见 [docs/workflows/](docs/workflows/)。
- 外部 GitHub 技能源索引见 [github-skill-index.md](skills/qihang-skill-index/references/github-skill-index.md)。

## 维护规则

1. 新增技能前先判断它是启航自培养技能，还是外部 GitHub repo 索引。
2. 每个本地技能必须记录来源、用途、触发场景、迁移方式和验证状态。
3. 外部 repo 默认先进入 `qihang-skill-index`，URL 使用 repo 根目录。
4. 每次新增或删除本地正式技能都更新 `catalog/skills.yml`。
5. Linear 项目用于跟踪收录、审查、去重和重构任务。

## 重要边界

`ai-product-analyzer` 是明确需要跨环境复用的例外：它随包携带必要 `references/`，可独立复制到项目或用户级 skills 目录。

`qihang-skill-index` 是外部技能的统一收纳入口。`humanizer-zh`、`md2wechat`、`frontend-design`、GSAP、TypeUI、Taste Skill、Impeccable 等外部来源只保留 GitHub 索引，不再把完整文件堆进 `skills/`。

`oss-investment-scorecard` 已从独立默认技能降级为 `agent-investment` 内部 reference。运行时不要直接调用旧入口，应通过 `qihang-ai-investment-orchestrator` 和 `qihang-investment-scorecard` 使用其结构。

本仓库和 Product Hunter 没有长期关系。历史上从某个本地目录借用过内容，只作为导入 provenance，不构成本仓库的上游、资料源或同步关系。
