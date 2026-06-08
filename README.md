# Agent Skill Library

私有高质量技能库，用来沉淀个人可复用的 Agent 工作能力。

本仓库不是普通 prompt 收藏夹，也不是某个知识库的附属仓库。它是一个 Agent 运行能力库和项目初始化配置参考库：

- 第一用户是仓库维护者本人。
- 主要使用者是被维护者配置和调用的 Codex、Claude 和后续 agent。
- 仓库记录哪些能力值得用、什么时候用、怎么组合、如何配置到具体项目。
- 外部技能优先以地址、索引、来源和调用方式沉淀；只有明确可迁移且边界清楚的技能包才 vendored 到 `skills/`。
- 网页 prompt、UI 库源码、项目资料和一次性实验结果不进入正式技能包。

## 分类

| 板块 | 用途 |
| --- | --- |
| `sections/investment/` | VC、投资评估、融资判断、IC 论述、DD 问题 |
| `sections/product/` | 产品分析、案例研究、用户/场景/商业模式判断 |
| `sections/frontend-design/` | 前端设计、UI/UX、视觉风格、设计提示词和界面生成质量控制 |
| `sections/technology/` | 技术架构、AI 基础设施、工程可行性 |
| `sections/development-paradigms/` | AI Agent Native 开发范式、TDD、review、调试 |
| `sections/operations/` | 自动化、工作流、知识库同步、投稿与治理 |

## 当前种子技能

| 技能 | 板块 | 来源 | 状态 |
| --- | --- | --- | --- |
| `oss-investment-scorecard` | investment | `skills/oss-investment-scorecard/` | 已从 `lucy-cxy/oss-investment-scorecard` 完整迁移 |
| `ai-product-analyzer` | product | `skills/ai-product-analyzer/` | 已迁移为自包含技能包 |
| `greensock-gsap-skills` | frontend-design | `skills/greensock-gsap-skills/` | 已保守迁移 GSAP 官方 AI skills |
| `awesome-design-skills` | frontend-design | `skills/awesome-design-skills/` | 已保守迁移 5 个已验证风格 skill |
| `typeui-fundamentals` | frontend-design | `skills/typeui-fundamentals/` | 已迁移 TypeUI 基础 UI/UX 原则 skill |

## 当前运行链

| 调用链 | 文档 | 作用 |
| --- | --- | --- |
| 投资 / 产品问题到研报 | `docs/workflows/investment-product-to-research-report.md` | 把产品判断、投资评分、DD 问题树整理成研报、case memo 或 IC memo |
| PRD 到前端实现 | `docs/workflows/prd-to-frontend.md` | 把模糊需求或 PRD 推进到页面结构、组件计划、前端实现和浏览器验收 |

## 可视化编排

- 本地编排台：`apps/skill-orchestrator/index.html`
- 编排定义：`orchestrations/`
- 数据生成：运行 `.\scripts\build-skill-orchestrator-data.ps1`

编排台不运行 Claude，也不做本地 runner。它展示当前技能库、工作流节点、技能可用性和人工状态，并生成整条链的 Claude handoff prompt。

## 文档入口

- 文档总目录见 [docs/README.md](docs/README.md)。
- 仓库治理和引用原则见 [docs/governance/](docs/governance/)。
- 收录、协作、Linear 和跨板块调用链见 [docs/workflows/](docs/workflows/)。
- 各板块的来源、调用链和索引见 [docs/sections/](docs/sections/)。

## 维护规则

1. 新增技能前先判断它属于哪个板块。
2. 每个技能必须记录来源、用途、触发场景、迁移方式和验证状态。
3. 外部技能默认先做索引；只有许可证、边界和复用价值清楚时才复制。
4. 每次收录都更新 `catalog/skills.yml`。
5. Linear 项目用于跟踪收录、审查、去重和重构任务。

## 重要边界

`oss-investment-scorecard` 已经作为单独 skill 包放在本仓库中，替代之前临时整理的 `vc-investment-evaluator`。

`ai-product-analyzer` 是明确需要跨环境复用的例外：它随包携带必要 `references/`，可独立复制到项目或用户级 skills 目录。

`frontend-design` 板块当前采用“保守迁移 + 引用索引”策略：GSAP 官方 skills、Awesome Design Skills 的已验证风格目录、TypeUI fundamentals 可以进入 `skills/`；21st.dev、designprompts.dev 等网页 prompt 只记录入口，不复制 prompt 正文。

本仓库和 Product Hunter 没有长期关系。历史上从某个本地目录借用过内容，只作为导入 provenance，不构成本仓库的上游、资料源或同步关系。
