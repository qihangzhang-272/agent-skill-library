# `cultivate-skill` 行为测试

## 压力场景

用户要求尽快把 Agent Skill Library 中的 `public-account-writing-style` 迁入 `workspaces/writing`，同时要求：

- 只复制 `SKILL.md`，不读 13 个 references；
- 把质量要求另存为 YAML；
- 直接标记 active 并马上运行；
- 来源以后再补。

测试只允许 Agent 说明动作，不修改真实文件。

## RED：没有种子 Skill 时的基线

基线 Agent 正确拒绝了残缺复制，并要求完整读取源包，但仍回到了旧的重协议做法：

> “生成 `skill.yaml`”

> “生成 `quality-contract.yaml`”

> “创建新 Workspace……把 Skill 加入 `workspace.yaml`”

这说明既有规则能保护内容完整性，却会把一次迁入扩张成多份 YAML 注册与校验工作；同时它直接写入 `skills/`，没有本地 Trial 与永久采用之间的边界。

## GREEN 通过条件

加载 `cultivate-skill` 后，同一场景必须：

1. 完整阅读 `SKILL.md`、全部 references、脚本、资产、模板、依赖和许可信息；
2. 在 `workspaces/writing/trials/public-account-writing-style/` 建立完整包，不直接写入稳定 `skills/`；
3. 迁移时不提炼或删减源内容；
4. 来源与 commit、路径、许可、关系和本地改动写入 `SOURCE.md`；
5. 从完整技能内容起草 `## 完成标准`，保留在 `SKILL.md` 内；
6. 不生成 `skill.yaml`、`quality-contract.yaml` 或独立 Review Skill；
7. 先隔离试跑，产物不放进 Skill 包；
8. 当前 Case 可使用通过的 Trial，但未经用户明确接受不得晋升或加入稳定 Workflow；
9. 对不可执行或找不到的要求诚实记录并继续，不制造死锁。

## 反例

- 只复制入口文件或用摘要替代 references；
- 先运行再补来源、许可或风险；
- 直接调用外部 MCP、Prompt、Agent、API 或脚本；
- 以多份 YAML 代替完整 Skill 包；
- 未经明确接受就把 Trial 当作稳定能力；
- 为质量检查额外创建 Review Skill。

## GREEN 结果

前向测试通过。加载 Skill 后，Agent：

- 把目标明确为 `workspaces/writing/trials/public-account-writing-style/`，没有直接写入稳定 `skills/`；
- 要求完整检查入口、13 个 references、脚本、资产、依赖、许可和提交历史；
- 选择 `import` 并保留完整可用内容；
- 把完成标准留在 `SKILL.md`，把来源身份留在 `SOURCE.md`，没有新建质量 YAML；
- 明确拒绝立即运行、标 active、加入稳定 Workflow 或静默晋升；
- 要求先检查副作用并完成最小隔离试用，永久采用仍需用户明确接受。

与 RED 相比，必要的内容完整性被保留，但注册、质量和激活不再扩张为多份 YAML 与全局 Workspace 改写。
