# 技能库宪法

这份文档定义本仓库的长期约束。它的作用是防止技能库退化成资料堆、prompt 收藏夹或一次性实验目录。

## 第一定位

本仓库是 Agent 运行能力库。

它可以承担收藏职能，但收藏必须服务于后续调用：agent 在项目初始化或执行某条工作流时，能够判断应该选哪些技能、从哪里取得、如何配置、如何验收。

## 分层约束

| 层 | 责任 | 约束 |
| --- | --- | --- |
| `skills/` | 保存启航自培养技能、已晋升外部技能包和启航轻量外部索引 | 不放未晋升的外部完整 skill、网页 prompt 正文、UI 库源码、一次性实验结果 |
| `catalog/skills.yml` | 保存技能总账 | 每个技能必须记录来源、用途、触发场景、迁移边界、验证状态 |
| `catalog/claude-plugins.json` | 保存 Claude Code 插件分发映射 | 只记录哪些源技能进入哪些可安装插件，不复制正文 |
| `plugins/` | 保存由脚本生成或同步的 Claude Code 可安装插件 | 只分发自培养、高频复用技能；不作为源内容维护；源内容仍以 `skills/` 和 `catalog/` 为准 |
| `.claude-plugin/` | 保存 marketplace manifest | 只放 Claude Code marketplace 所需元数据 |
| `docs/` | 保存治理规则、收录流程、组合搭配和调用链 | 不放具体项目产物或外部来源清单 |
| `apps/` | 保存辅助管理界面 | 不做自动 runner，不替代 agent 判断 |
| `local-experiments/` | 保存本地实验 | 默认不进入正式技能库 |

## 收录判断

每次新增或迁移一个技能前，必须回答：

1. 它解决什么 Agent 工作问题？
2. 它是启航自培养技能，还是外部 GitHub repo 索引？
3. 什么时候应该触发？
4. 输入需要什么？
5. 输出应该是什么？
6. 依赖哪些来源、工具、网页、仓库或项目配置？
7. 许可证和复制边界是否清楚？
8. 是只做索引，还是允许 vendored 到 `skills/`？
9. 是否应该进入 Claude Code plugin 分发层？
10. 如何验证它确实可用？

没有回答清楚这些问题时，只能进入候选索引，不能进入正式技能包。

## 复制边界

- 外部技能默认先进入 `qihang-skill-index`。
- 网页 prompt 只记录入口、用途、选择策略和访问方式，不复制正文。
- UI 库源码不复制，只记录使用场景、配置参考和文档入口。
- 只有当外部技能被启航明确晋升，且来源、边界和调用链清楚时，才允许新增本地技能包。
- 禁止为了“先收着”把外部仓库完整复制进 `skills/`。

## 调用链优先级

调用链比技能数量重要。

一个技能进入正式库后，至少要能解释它在某条链路里的位置：

- topic -> writing -> md2wechat。
- product-analysis -> AI-native 产品视角 -> agent-investment 投资工作包 -> IC Memo -> 可选可视化。产品、投资、研报和可视化不做成平行分类。
- 技术开发范式和项目初始化。
- 写作、改写和内容定稿。
- 运营、同步和治理。

### 熵减调用链原则

索引可以丰富，执行链路必须克制。

- `qihang-skill-index` 是外部技能和前端库的资产层，不是把所有参考源串起来执行的工作流。
- `qihang-workflow-orchestrator` 是唯一默认工作流调度入口；它的 `SKILL.md` 只保留路由表，具体 workflow 必须压缩到 `references/`，不得再创建子调度器技能。
- 一条工作流只暴露必要节点；多个外部参考源只能在同一个选择节点里择一使用，不能被机械串成多段调用链。
- 不为了“管理复杂度”新增包装技能。只有当某个判断被启航反复使用、能用自己的语言稳定复述，并且明显降低后续执行成本时，才允许沉淀为新的本地技能。
- product-analysis 这类链路应保持：`ai-product-analyzer` 或 `qihang-ai-product-judgment` 提供启航的 AI-native 产品视角，`agent-investment` 工作包提供竞争格局、单位经济、投资评分、估值、DD、跟踪和 IC Memo 成稿，最后按需前端自生成可视化。不要先按“是否准确适用 OSS investment”分类。
- 被吸收的外部投资技能只能作为 `agent-investment` 的 references 使用，不再和启航自培养技能平行暴露为默认运行入口。
- 可视化研报页不再编排外部前端技能；执行者直接生成前端，并遵守前端宪法。
- 前端宪法：现代风、全展开、不堆叠、不把核心内容藏进折叠组件；首屏显示对象、verdict、总分或决策状态、高信号事实；页面结构沿用 IC Memo 的自然顺序，不由 orchestrator 重新发明论证顺序；前端不得删减上游研报内容，只能做可视化、分组、排序、强调和版式呈现；桌面和移动都要验收，文字不能溢出或重叠。
- 复杂度必须从基础能力逐步增加：能用现有栈和一个主参考解决，就不引入第二个参考；只有明确出现信息密度、组件能力、数据表格、交互状态或审美验收不足时，才升级到更复杂来源。

如果暂时没有明确调用链，它可以被收录为候选，但不应被标记为核心能力。

## Claude Code 插件约束

Claude Code plugin 是分发层，不是源内容层。

默认只有自培养技能、已晋升外部技能和 `qihang-skill-index` 进入插件分发层。外部技能、外部 prompt 集合、外部 UI/设计技能和一次性迁移包，优先进入 `qihang-skill-index` 的 GitHub 索引；只有当它们被启航明确晋升、边界清楚，并且能进入稳定调用链时，才允许新增本地技能。

- marketplace manifest 固定放在 `.claude-plugin/marketplace.json`。
- 每个插件固定放在 `plugins/<plugin-name>/`。
- 每个插件的 manifest 固定放在 `plugins/<plugin-name>/.claude-plugin/plugin.json`。
- 插件里的技能固定放在 `plugins/<plugin-name>/skills/<skill-name>/SKILL.md`。
- 不允许把 `skills/`、`agents/`、`hooks/` 放进 `.claude-plugin/`。
- 插件不得引用插件目录外部文件；需要的技能文件必须复制进插件目录。
- 插件必须写 semver 版本号；只要某个插件包含的技能正文、支撑文件或 manifest 变化，就必须 bump 对应插件版本。
- 当前默认插件范围：`agent-product` 分发产品洞察技能，`agent-writing` 分发选题调研和启航写作风格技能，`agent-investment` 分发启航 AI 投资 IC Memo 工作包，`qihang-skill-pack` 分发外部 GitHub 技能源索引和已跑通工作流入口。

## 维护原则

- 源内容先改 `skills/` 和 `catalog/`，再重新生成 `plugins/`。
- `plugins/` 里不要手工补丁式修改技能正文。
- 每次改变可分发插件时，运行 `scripts/build-claude-plugins.ps1`。
- 每次改变可分发插件内容时，同步更新 `catalog/claude-plugins.json` 中对应插件的 `version`。
- 每次改变索引结构时，同步更新 `docs/governance/catalog-schema.md`。
- 每次改变调用链时，同步更新对应 `docs/workflows/`。
