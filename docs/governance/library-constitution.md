# 技能库宪法

这份文档定义本仓库的长期约束。它的作用是防止技能库退化成资料堆、prompt 收藏夹或一次性实验目录。

## 第一定位

本仓库是 Agent 运行能力库，不是资料仓库。

收藏和运行不是同一个东西：

- 收藏：记录一个技能、repo、prompt 或资料入口可能有用。
- 运行：Agent 在具体项目里能按调用链选择、配置并使用对应能力。

它可以承担收藏职能，但收藏必须服务于后续调用：agent 在项目初始化或执行某条工作流时，能够判断应该选哪些技能、从哪里取得、如何配置、如何验收。

本仓库不绑定任何单一外部知识库、Obsidian vault、Notion workspace 或历史项目目录。如果某个技能来自一个本地目录，它只是导入 provenance，不代表本仓库和那个目录存在长期关系。本仓库只记录"这个能力是否值得复用、如何调用、如何配置到新项目"。

## 当前主线

- 写作发布：服务于 topic -> writing -> Baoyu 配图、排版与草稿箱发布的公众号链路。
- 产品分析：服务于 product-analysis 的端到端链路，默认串联 AI-native 产品判断、domain-investment 投资工作包、IC Memo 和可选 `investment-visual-report` 可视化研报页。
- 技术 / 开发范式：服务于文档驱动、评估充分、可稳定交付的端到端开发管线。
- 运营：服务于技能库治理、GitHub 仓库维护和自动化协作。

## 分层约束

本仓库采用三层 plugins 架构，源技能直接维护在 `plugins/` 下，不再有独立的 `skills/` 源目录或 `catalog/` 总账。

| 层 | 目录 | 责任 / 保存什么 | 约束 / 不保存什么 |
| --- | --- | --- | --- |
| `plugins/foundation/` | 元层：`principles` Agent 操作原则 + `skill-architecture` 元技能 | 不放领域专属 know-how 或具体调用链 |
| `plugins/orchestrator/` | `workflow-orchestrator` 工作流路由入口 | `SKILL.md` 只做路由，具体 chain 压缩到 `references/chains/`；不再创建子调度器技能 |
| `plugins/skill-index/` | `external-skill-index` 外部 GitHub 技能索引 | 只做索引，不 vendored 外部仓库正文 |
| `plugins/domain-*/` | 按领域组织的瓦技能（tile skills） | 每个领域一条 chain，瓦技能只承接一个节点；不放第二个领域调度器 |
| `.claude-plugin/` | 保存 marketplace manifest | 只放 Claude Code marketplace 所需元数据 |
| `docs/` | 保存治理规则、收录流程、组合搭配和调用链 | 不放具体项目产物或外部来源清单 |

每个 plugin 都有 `.claude-plugin/plugin.json`，技能正文放在 `plugins/<plugin>/skills/<skill>/SKILL.md`（裸 name，三层渐进披露：SKILL.md → references/ → assets/）。

新增或修改架构时不手创建 skill 文件夹，用 `skill-architecture` 元技能生成 spec 合规骨架。瓦技能是核心，可独立存在；chain 是可选的主动编排，加瓦技能不触发自动改 chain。三场景（加瓦技能 / 建新 domain / 主动建 chain）及从零建库路径，见 `plugins/foundation/skills/skill-architecture/SKILL.md`。

## 收录判断

每次新增或迁移一个技能前，必须回答：

1. 它解决什么 Agent 工作问题？
2. 它是本地维护技能，还是外部 GitHub repo 索引？
3. 什么时候应该触发？
4. 输入需要什么？
5. 输出应该是什么？
6. 依赖哪些来源、工具、网页、仓库或项目配置？
7. 许可证和复制边界是否清楚？
8. 是只做索引，还是允许 vendored 进 `plugins/*/skills/`？
9. 是否应该进入 Claude Code plugin 分发层？
10. 如何验证它确实可用？

没有回答清楚这些问题时，只能进入候选索引，不能进入正式技能包。

## 引用策略与复制边界

正式库里不默认复制大段资料、网页 prompt 或 UI 库源码。优先保存索引、来源、调用方式和验证状态。这条规则优先级高于"先搬进来再说"——复制会带来短期方便，但会增加授权、同步和维护成本。

**允许写入技能的内容**：这个技能解决什么问题、什么时候触发、输入需要什么、输出是什么格式、依赖哪些来源/工具/项目配置、依赖哪些模板/案例/脚本。

**不允许复制的内容**：网页 prompt 原文、UI 库源码、项目资料正文、未验证技能包的大段内容、仍在快速演进没有稳定边界的判断理论。

**允许复制的例外**：只有同时满足以下条件才可以复制正文——内容是自己创建或明确可再分发的；复制后不会造成双写，或已把来源文件标为废弃。

- 外部技能默认先进入 `external-skill-index`。
- 只有当外部技能经维护者明确晋升，且来源、边界和调用链清楚时，才允许新增本地技能包。
- 禁止为了"先收着"把外部仓库完整复制进 `plugins/`。

**外部完整技能迁移**：如果用户明确要求"直接迁移"某个外部技能，先确认它是候选收藏还是要晋升为本地可调用技能包。候选收藏先进入 `external-skill-index`；明确晋升后才允许放进 `plugins/*/skills/`。新增本地技能包时必须记录上游仓库 URL、上游 commit、许可说明、是否替代了本地旧技能——这些字段填在 `external-skill-index` 登记表的 Notes 列（5 字段登记法见 `plugins/skill-index/skills/external-skill-index/references/registration-guide.md`），不再用独立 yaml 块记录。如果外部技能被吸收到本库工作包，只保留为 `references/`，不要再把旧技能作为平行 runtime 入口分发。

## 调用链优先级

调用链比技能数量重要。

瓦技能可独立存在，不要求进任何 chain。进 chain 是可选的主动编排（见 `plugins/foundation/skills/skill-architecture/references/chain-authoring.md`）。当某个瓦技能确实进了某条 chain 时，要能解释它的位置：

- topic -> writing -> Baoyu 配图、排版与草稿箱发布。
- product-analysis -> AI-native 产品视角 -> domain-investment 投资工作包 -> IC Memo -> 可选可视化。产品、投资、研报和可视化不做成平行分类。
- 技术开发范式和项目初始化。
- 写作、改写和内容定稿。
- 运营、同步和治理。

### 熵减调用链原则

索引可以丰富，执行链路必须克制。

- `external-skill-index` 是外部技能和前端库的资产层，不是把所有参考源串起来执行的工作流。
- `workflow-orchestrator` 是唯一默认工作流调度入口；它的 `SKILL.md` 只保留路由表，具体 chain 必须压缩到 `references/chains/`，不得再创建子调度器技能。
- 一条工作流只暴露必要节点；多个外部参考源只能在同一个选择节点里择一使用，不能被机械串成多段调用链。
- 不为了"管理复杂度"新增包装技能。只有当某个判断经维护者反复使用、已提炼为可稳定复述的判断，并且明显降低后续执行成本时，才允许沉淀为新的本地技能。
- product-analysis 这类链路应保持：`ai-product-analyzer` 或 `investment-ai-product-judgment` 提供本库的 AI-native 产品视角，`domain-investment` 工作包提供竞争格局、单位经济、投资评分、估值、DD、跟踪和 IC Memo 成稿，最后按需由 `investment-visual-report` 可视化。不要先按"是否准确适用 OSS investment"分类。
- 被吸收的外部投资技能只能作为 `domain-investment` 的 references 使用，不再和本地维护技能平行暴露为默认运行入口。
- 可视化研报页不再编排外部前端技能；执行者直接生成前端，并遵守前端宪法。
- 前端宪法：现代风、全展开、不堆叠、不把核心内容藏进折叠组件；首屏显示对象、verdict、总分或决策状态、高信号事实；页面结构沿用 IC Memo 的自然顺序，不由 orchestrator 重新发明论证顺序；前端不得删减上游研报内容，只能做可视化、分组、排序、强调和版式呈现；桌面和移动都要验收，文字不能溢出或重叠。
- 复杂度必须从基础能力逐步增加：能用现有栈和一个主参考解决，就不引入第二个参考；只有明确出现信息密度、组件能力、数据表格、交互状态或审美验收不足时，才升级到更复杂来源。

如果暂时没有明确调用链，它可以被收录为候选，但不应被标记为核心能力。

## Claude Code 插件约束

Claude Code plugin 既是分发层也是源内容层——三层架构下，源技能直接维护在 `plugins/<plugin>/skills/`，不再有独立的 `skills/` 源目录或 `catalog/` 总账。

默认只有本地维护技能、已晋升外部技能和 `external-skill-index` 进入插件分发层。外部技能、外部 prompt 集合、外部 UI/设计技能和一次性迁移包，优先进入 `external-skill-index` 的 GitHub 索引；只有当它们经维护者明确晋升、边界清楚，并且能进入稳定调用链时，才允许新增本地技能。

- marketplace manifest 固定放在 `.claude-plugin/marketplace.json`。
- 每个插件固定放在 `plugins/<plugin-name>/`。
- 每个插件的 manifest 固定放在 `plugins/<plugin-name>/.claude-plugin/plugin.json`。
- 插件里的技能固定放在 `plugins/<plugin-name>/skills/<skill-name>/SKILL.md`。
- 不允许把 `skills/`、`agents/`、`hooks/` 放进 `.claude-plugin/`。
- 插件不得引用插件目录外部文件；需要的技能文件必须复制进插件目录。
- 插件必须写 semver 版本号；只要某个插件包含的技能正文、支撑文件或 manifest 变化，就必须 bump 对应插件版本，并同步 marketplace 中的版本。
- 当前默认插件范围：`foundation` 分发元层技能，`orchestrator` 分发工作流路由入口，`skill-index` 分发外部 GitHub 技能源索引，`domain-writing` 分发选题调研和公众号编辑写作技能，`domain-investment` 分发 AI 投资 IC Memo 工作包，`domain-product` 分发产品洞察技能。不为"以后可能用"预建空插件——需要跨领域共享能力时，用 `skill-architecture` 元技能按需新建。

字段级约定（marketplace.json / plugin.json 的具体字段含义和记录粒度）见 `catalog-schema.md`。

## 维护原则

- 源技能直接维护在 `plugins/<plugin>/skills/`，不存在"先生成再分发"的两步流程。
- 改动技能正文后，同步 bump 对应插件 `plugins/<plugin>/.claude-plugin/plugin.json` 的 `version`。
- 新增技能/领域/链时，用 `skill-architecture` 元技能生成骨架，不要手创建 skill 文件夹。
- 每次改变可分发插件内容时，运行 `claude plugin validate . --strict` 与 `node scripts/validate-repository.mjs --base HEAD`；两项均通过才允许推送。
- 调用链的节点顺序、输入和 Artifact 只在 orchestrator 的 `references/chains/` 维护；`docs/workflows/` 只解释用途和边界并链接权威 chain，不复制事实表。
- 每次改变索引结构时，同步更新 `docs/governance/`。
