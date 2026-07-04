# Agent Skill Library

私有高质量技能库，用来沉淀个人可复用的 Agent 工作能力。

本仓库不是普通 prompt 收藏夹，也不是某个知识库的附属仓库。它是一个 Agent 运行能力库和项目初始化配置参考库：

- 第一用户是仓库维护者本人。
- 主要使用者是被维护者配置和调用的 Codex、Claude 和后续 agent。
- 仓库记录哪些能力值得用、什么时候用、怎么组合、如何配置到具体项目。
- 外部技能优先以地址、索引、来源和调用方式沉淀；只有明确可迁移且边界清楚的技能包才 vendored 进 `plugins/*/skills/`。
- 网页 prompt、UI 库源码、项目资料和一次性实验结果不进入正式技能包。

## 仓库职能

本仓库承担两个核心职能：

1. **工作流编排**：把已经验证过的技能链沉淀到 `plugins/orchestrator/skills/qihang-workflow-orchestrator/references/chains/`，并在 `docs/workflows/` 写跨技能调用链说明。
2. **技能分发**：通过 Claude Code plugin marketplace 分发自培养、高频复用的技能。外部好用技能和技能源优先记录在 `qihang-skill-index`，URL 默认使用 GitHub repo 根目录；除非边界、许可证和复用价值都清楚，否则不把外部仓库整包搬进来。

## 三层 plugins 架构

本仓库已重构为三层 plugins 架构。源技能维护在 `plugins/` 下，按角色分层：

| 层 | 目录 | 职责 |
| --- | --- | --- |
| **Foundation（基础层）** | `plugins/foundation/` | 元层：`principles` 个人操作手册 + `skill-architecture` 元技能（新增技能/领域/链时的脚手架与协议） |
| **Orchestrator + Index（调度与索引层）** | `plugins/orchestrator/`、`plugins/skill-index/` | `qihang-workflow-orchestrator` 路由已验证工作流；`qihang-skill-index` 索引本地与外部 GitHub 技能 |
| **Domain（领域层）** | `plugins/domain-writing/`、`plugins/domain-investment/`、`plugins/domain-product/` | 按领域组织的瓦技能（tile skills），每个领域一条 chain，瓦技能只承接一个节点 |
| **Commons（共享层）** | `plugins/commons/` | 跨领域共享的通用能力（当前为前端范式占位预留） |

每个 plugin 都有 `.claude-plugin/plugin.json`，技能正文放在 `plugins/<plugin>/skills/<skill>/SKILL.md`（裸 name，三层渐进披露：SKILL.md → references/ → assets/）。

## 索引入口

| 入口 | 用途 |
| --- | --- |
| `plugins/foundation/skills/skill-architecture/` | 元技能：新增技能/领域/链时生成 spec 合规骨架，强制落盘协议 |
| `plugins/skill-index/skills/qihang-skill-index/` | 外部 GitHub 技能 / 技能源 repo 索引，探测与提示安装 |
| `plugins/orchestrator/skills/qihang-workflow-orchestrator/references/chains/` | 已验证工作流的 chain 定义（落盘协议、节点顺序、过程包文件名） |
| `docs/workflows/` | 跨技能工作流说明 |
| `docs/governance/` | 仓库级原则、架构边界、引用策略 |

## Claude Code 插件市场

本仓库提供 Claude Code plugin marketplace 分发层。它只分发自培养、会高频复用的技能，不承载外部收藏目录：

- Marketplace manifest：`.claude-plugin/marketplace.json`
- 插件分发目录：`plugins/`
- 当前分发 7 个 plugin：`foundation` / `orchestrator` / `skill-index` / `domain-writing` / `domain-investment` / `domain-product` / `commons`

三层架构下，`plugins/` 既是源内容目录也是分发目录——源技能直接维护在 `plugins/<plugin>/skills/`，不再有独立的 `skills/` 源目录或 `catalog/` 总账。

新增 plugin 或改变技能归属后，运行：

```powershell
claude plugin validate . --strict
```

## 当前正式技能

按三层架构分组：

### Foundation（基础层）

| 技能 | 路径 | 用途 |
| --- | --- | --- |
| `principles` | `plugins/foundation/skills/principles/` | 启航个人操作手册：认知原型、DO/DON'T、CALIBRATION。被动参考库，不是全局强制规则 |
| `skill-architecture` | `plugins/foundation/skills/skill-architecture/` | 元技能：新增技能/领域/链时生成 spec 合规骨架，强制落盘协议，更新 marketplace.json |

### Orchestrator + Index（调度与索引层）

| 技能 | 路径 | 用途 |
| --- | --- | --- |
| `qihang-workflow-orchestrator` | `plugins/orchestrator/skills/qihang-workflow-orchestrator/` | 已跑通工作流的统一路由入口，具体 chain 压缩在 `references/chains/` |
| `qihang-skill-index` | `plugins/skill-index/skills/qihang-skill-index/` | 两层生态索引：本地技能 vs GitHub 外部技能，探测与提示安装 |

### Domain（领域层）

| 领域 | 技能 | 路径 |
| --- | --- | --- |
| **domain-writing** | `qihang-writing-style` | `plugins/domain-writing/skills/qihang-writing-style/` |
| | `topic-research-deposition` | `plugins/domain-writing/skills/topic-research-deposition/` |
| **domain-investment** | `qihang-investment-research` | `plugins/domain-investment/skills/qihang-investment-research/` |
| | `qihang-ai-product-judgment` | `plugins/domain-investment/skills/qihang-ai-product-judgment/` |
| | `qihang-competitive-landscape` | `plugins/domain-investment/skills/qihang-competitive-landscape/` |
| | `qihang-unit-economics` | `plugins/domain-investment/skills/qihang-unit-economics/` |
| | `qihang-investment-scorecard` | `plugins/domain-investment/skills/qihang-investment-scorecard/` |
| | `qihang-valuation-returns` | `plugins/domain-investment/skills/qihang-valuation-returns/` |
| | `qihang-investment-dd` | `plugins/domain-investment/skills/qihang-investment-dd/` |
| | `qihang-thesis-tracking` | `plugins/domain-investment/skills/qihang-thesis-tracking/` |
| | `qihang-ic-memo-writer` | `plugins/domain-investment/skills/qihang-ic-memo-writer/` |
| | `investment-visual-report` | `plugins/domain-investment/skills/investment-visual-report/` |
| **domain-product** | `ai-product-analyzer` | `plugins/domain-product/skills/ai-product-analyzer/` |

## 当前运行链

调用链由 `qihang-workflow-orchestrator` 路由，chain 定义在 `plugins/orchestrator/skills/qihang-workflow-orchestrator/references/chains/`，跨技能说明在 `docs/workflows/`。

| 调用链 | chain 定义 | 文档 | 作用 |
| --- | --- | --- | --- |
| 公众号选题 → 启航写作 → md2wechat 排版 | `chains/wechat-writing.md` | - | agent-reach 沉淀素材 → 启航写作技能成稿 → md2wechat 进入公众号排版/草稿箱 |
| 产品洞察 → 前端实现 | `chains/product-frontend.md` | `docs/workflows/prd-to-frontend.md` | 从产品洞察推进到前端 brief、设计来源选择、实现计划、浏览器验收 |
| AI case → 投研 IC memo → 可视化研报 | `chains/investment-icmemo.md` | `docs/workflows/investment-product-to-research-report.md` | 从 AI-native 产品判断进入启航投资工作包，产出 IC Memo、DD 问题树、watch triggers，并可承接为全展开可视化研报 |

## 端到端交付铁律（所有链继承）

1. 任何端到端 workflow 必须先创建 run folder（项目文件夹），不允许散落文件。run folder 建在「用户当前工作项目目录」下，**绝不写进 `plugins/` 或本技能库 repo**；不确定项目根就先问用户。
2. 每个有保留价值的中间产物必须按所选 chain 定义落盘。
3. 最终交付物不得替代过程包——成品与过程包同时存在。

## 维护原则

- 调用链清楚比技能数量多更重要。
- 大的资料源、复杂项目、网页 prompt 集合、UI 库和工具链，默认只做索引。
- 小而清楚的技能包，只有在许可证、来源、迁移范围和复用场景明确时，才 vendored 进 `plugins/*/skills/`。
- 分类优先服务调用链，不为了分类完整而增加空目录。
- 新增技能/领域/链时，用 `skill-architecture` 元技能生成骨架，不要手创建 skill 文件夹——保证架构一致。
- 需要提交时，commit 信息使用 `YYYY-MM-DD HH:mm｜中文变更描述`。

## 重要边界

- `ai-product-analyzer` 是明确需要跨环境复用的例外：它随包携带必要 `references/`，可独立复制到项目或用户级 skills 目录。
- `qihang-skill-index` 是外部技能的统一收纳入口。`humanizer-zh`、`md2wechat`、`frontend-design`、GSAP、TypeUI、Taste Skill、Impeccable 等外部来源只保留 GitHub 索引，不再把完整文件堆进仓库。
- `oss-investment-scorecard` 已从独立默认技能降级为 `qihang-investment-scorecard` 的内部 reference。运行时不要直接调用旧入口；产品投资链由 `qihang-workflow-orchestrator` 路由，再通过 `qihang-investment-scorecard` 使用其结构。
- 投资工作包只暴露研究、产品判断、竞争格局、单位经济、评分、估值、DD、跟踪、成稿、可视化研报节点；不要在 `domain-investment` 里再放第二个投资调度器。
- 本仓库和 Product Hunter 没有长期关系。历史上从某个本地目录借用过内容，只作为导入 provenance，不构成本仓库的上游、资料源或同步关系。

## 相关文档

- [docs/README.md](docs/README.md) — 文档总目录
- [docs/governance/architecture.md](docs/governance/architecture.md) — 技能库整体架构、分层和边界
- [docs/governance/library-constitution.md](docs/governance/library-constitution.md) — 技能库长期约束、收录判断
- [docs/governance/project-purpose.md](docs/governance/project-purpose.md) — 仓库为什么存在、给谁用
- [docs/governance/reference-policy.md](docs/governance/reference-policy.md) — 引用式技能库规则，资料正文不复制
- [docs/governance/catalog-schema.md](docs/governance/catalog-schema.md) — 技能总账记录方式
- [docs/workflows/](docs/workflows/) — 跨技能工作流说明
