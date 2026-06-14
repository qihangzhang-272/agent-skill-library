# 技能库架构

## 核心判断

收藏和运行不是同一个东西。

- 收藏：记录一个技能、repo、prompt 或资料入口可能有用。
- 运行：Agent 在具体项目里能按调用链选择、配置并使用对应能力。

本仓库的目标是运行能力库，不是资料仓库。它既可以承担收藏职能，但收藏必须服务于后续可调用、可配置、可验证的 Agent 工作流。

## 基本区分

- 调用链清楚比技能数量多更重要。
- `skills/` 里只放启航自培养技能和启航维护的轻量索引。
- 没有确认迁移边界的内容先做索引，不急着复制。
- 网页 prompt、UI 库源码、项目资料和一次性实验不进入正式技能包。
- 历史本地目录只作为导入 provenance，不构成本仓库的上游关系。

## 分层

| 层 | 保存什么 | 不保存什么 |
| --- | --- | --- |
| `catalog/` | 技能索引、来源路径、状态、触发场景、迁移边界 | 长篇资料正文 |
| `sections/` | 分板块入口、优先级、已收录能力、待补方向 | 具体技能包正文 |
| `docs/` | 治理规则、收录流程、组合搭配、调用链 | 一次性实验页面或临时运行结果 |
| `skills/` | 启航自培养技能、轻量外部 GitHub 索引 | 外部完整 skill、未验证来源、网页 prompt 原文、UI 库源码 |
| `plugins/` | Claude Code 可安装插件分发结果 | 源技能正文的手工维护副本 |
| `.claude-plugin/` | Claude Code marketplace manifest | 技能正文、agents、hooks、commands |
| `orchestrations/` | 跨技能工作流定义、节点顺序、输入输出、验收标准 | 具体项目产物、技能正文 |
| `apps/` | 本地辅助界面，例如技能可视化编排台 | 业务项目源码、自动 runner |
| `local-experiments/` | 本地实验、人工评审、一次性 demo | 正式技能库内容 |

## 引用关系

以 `frontend-design` 为例：

- `skills/qihang-skill-index/` 保存外部设计技能的 GitHub 来源索引。
- `docs/sections/frontend-design/ui-call-chain.md` 保存从模糊需求到前端实现的调用链。
- `docs/sections/frontend-design/prompt-index.md` 只保存网页 prompt 入口，不复制正文。
- `orchestrations/` 保存跨技能链路，`apps/skill-orchestrator/` 将链路可视化并生成整条链 handoff prompt。
- `catalog/claude-plugins.json` 决定哪些源技能进入 Claude Code 插件，`plugins/` 和 `.claude-plugin/` 是分发结果。
- `local-experiments/` 保存本地网页实验，不进入正式库。

这种分层保证 agent 在项目初始化时能先判断要用哪些能力，再选择是否拉取、配置或调用对应 skill。
