# 技能库架构

## 核心判断

收藏和运行不是同一个东西。

- 收藏：记录一个技能、repo、prompt 或资料入口可能有用。
- 运行：Agent 在具体项目里能按调用链选择、配置并使用对应能力。

本仓库的目标是运行能力库，不是资料仓库。它既可以承担收藏职能，但收藏必须服务于后续可调用、可配置、可验证的 Agent 工作流。

## 基本区分

- 调用链清楚比技能数量多更重要。
- `plugins/*/skills/` 里只放启航自培养技能、已晋升外部技能包和启航维护的轻量索引。
- 没有确认迁移边界的内容先做索引，不急着复制。
- 网页 prompt、UI 库源码、项目资料和一次性实验不进入正式技能包。
- 历史本地目录只作为导入 provenance，不构成本仓库的上游关系。

## 三层 plugins 架构

本仓库已重构为三层 plugins 架构。源技能直接维护在 `plugins/` 下，按角色分层，不再有独立的 `skills/` 源目录或 `catalog/` 总账。

| 层 | 目录 | 保存什么 | 不保存什么 |
| --- | --- | --- | --- |
| **Foundation** | `plugins/foundation/` | 元层：`principles` 个人操作手册 + `skill-architecture` 元技能 | 领域专属 know-how、具体调用链 |
| **Orchestrator + Index** | `plugins/orchestrator/`、`plugins/skill-index/` | 工作流路由入口 + 外部 GitHub 技能索引 | 具体项目产物、技能正文副本 |
| **Domain** | `plugins/domain-writing/`、`plugins/domain-investment/`、`plugins/domain-product/` | 按领域组织的瓦技能（tile skills），每个领域一条 chain | 第二个领域调度器、跨领域共享能力 |
| **Commons** | `plugins/commons/` | 跨领域共享的通用能力 | 领域专属能力 |
| **分发层** | `.claude-plugin/` | Claude Code marketplace manifest | 技能正文、agents、hooks、commands |
| **文档层** | `docs/` | 治理规则、收录流程、组合搭配、调用链 | 外部来源清单、一次性实验页面或临时运行结果 |

每个 plugin 都有 `.claude-plugin/plugin.json`，技能正文放在 `plugins/<plugin>/skills/<skill>/SKILL.md`（裸 name，三层渐进披露：SKILL.md → references/ → assets/）。

## 引用关系

以前端设计为例：

- `plugins/skill-index/skills/qihang-skill-index/` 保存外部设计技能和 UI 来源的 GitHub repo 根目录索引。
- `plugins/orchestrator/skills/qihang-workflow-orchestrator/SKILL.md` 只保存工作流路由；具体 chain 压缩在它的 `references/chains/`，避免把调度器写成第二套文档系统。
- `docs/workflows/prd-to-frontend.md` 保存从模糊需求到前端实现的调用链。
- `.claude-plugin/marketplace.json` 是分发入口，`plugins/` 既是源内容目录也是分发目录——三层架构下源技能直接维护在 `plugins/<plugin>/skills/`。

这种分层保证 agent 在项目初始化时能先判断要用哪些能力，再选择是否拉取、配置或调用对应 skill。

## 新增技能/领域/链

新增时不手创建 skill 文件夹，用 `skill-architecture` 元技能生成 spec 合规骨架，它会：

1. 在 `plugins/` 下建 `domain-<name>/`，含 `.claude-plugin/plugin.json`。
2. 瓦技能放 `skills/<skill>/SKILL.md`（裸 name，三层渐进披露）。
3. 强制定义落盘协议：在 orchestrator 的 `references/chains/` 下新建 `<name>.md`。
4. orchestrator `SKILL.md` 路由表加一行指向新 chain。
5. 在 `.claude-plugin/marketplace.json` 注册新 plugin。
6. 跑 `claude plugin validate . --strict`。

详见 `plugins/foundation/skills/skill-architecture/SKILL.md`。
