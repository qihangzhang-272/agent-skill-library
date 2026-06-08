# 技能库宪法

这份文档定义本仓库的长期约束。它的作用是防止技能库退化成资料堆、prompt 收藏夹或一次性实验目录。

## 第一定位

本仓库是 Agent 运行能力库。

它可以承担收藏职能，但收藏必须服务于后续调用：agent 在项目初始化或执行某条工作流时，能够判断应该选哪些技能、从哪里取得、如何配置、如何验收。

## 分层约束

| 层 | 责任 | 约束 |
| --- | --- | --- |
| `skills/` | 保存已确认可复用的技能包或保守迁移的外部 skill 子集 | 只放可被 agent 读取和复用的能力，不放网页 prompt 正文、UI 库源码、一次性实验结果 |
| `catalog/skills.yml` | 保存技能总账 | 每个技能必须记录来源、用途、触发场景、迁移边界、验证状态 |
| `catalog/claude-plugins.json` | 保存 Claude Code 插件分发映射 | 只记录哪些源技能进入哪些可安装插件，不复制正文 |
| `plugins/` | 保存由脚本生成或同步的 Claude Code 可安装插件 | 不作为源内容维护；源内容仍以 `skills/` 和 `catalog/` 为准 |
| `.claude-plugin/` | 保存 marketplace manifest | 只放 Claude Code marketplace 所需元数据 |
| `sections/` | 保存板块入口、优先级和已收录能力 | 不放完整技能正文 |
| `docs/` | 保存治理规则、收入流程、组合搭配和调用链 | 不放具体项目产物 |
| `apps/` | 保存辅助管理界面 | 不做自动 runner，不替代 agent 判断 |
| `local-experiments/` | 保存本地实验 | 默认不进入正式技能库 |

## 收录判断

每次新增或迁移一个技能前，必须回答：

1. 它解决什么 Agent 工作问题？
2. 属于哪个 section？
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

- 外部技能默认先做索引。
- 网页 prompt 只记录入口、用途、选择策略和访问方式，不复制正文。
- UI 库源码不复制，只记录使用场景、配置参考和文档入口。
- 只有许可证、复用价值、边界和验证方式清楚时，才允许把技能包复制到 `skills/`。
- 复制后的技能必须记录上游 URL、commit、许可证、迁移范围和排除范围。

## 调用链优先级

调用链比技能数量重要。

一个技能进入正式库后，至少要能解释它在某条链路里的位置：

- 投资 / 产品问题到研报。
- PRD 到前端实现。
- 技术开发范式和项目初始化。
- 写作、改写和内容定稿。
- 运营、同步和治理。

如果暂时没有明确调用链，它可以被收录为候选，但不应被标记为核心能力。

## Claude Code 插件约束

Claude Code plugin 是分发层，不是源内容层。

- marketplace manifest 固定放在 `.claude-plugin/marketplace.json`。
- 每个插件固定放在 `plugins/<plugin-name>/`。
- 每个插件的 manifest 固定放在 `plugins/<plugin-name>/.claude-plugin/plugin.json`。
- 插件里的技能固定放在 `plugins/<plugin-name>/skills/<skill-name>/SKILL.md`。
- 不允许把 `skills/`、`agents/`、`hooks/` 放进 `.claude-plugin/`。
- 插件不得引用插件目录外部文件；需要的技能文件必须复制进插件目录。
- 插件必须写 semver 版本号；只要某个插件包含的技能正文、支撑文件或 manifest 变化，就必须 bump 对应插件版本。

## 维护原则

- 源内容先改 `skills/` 和 `catalog/`，再重新生成 `plugins/`。
- `plugins/` 里不要手工补丁式修改技能正文。
- 每次改变可分发插件时，运行 `scripts/build-claude-plugins.ps1`。
- 每次改变可分发插件内容时，同步更新 `catalog/claude-plugins.json` 中对应插件的 `version`。
- 每次改变索引结构时，同步更新 `docs/governance/catalog-schema.md`。
- 每次改变调用链时，同步更新对应 `docs/workflows/` 或 `docs/sections/<section>/`。
