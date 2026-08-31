# `cultivate-workflow` 行为测试

## 压力场景

用户已经三次按“研究→写作→视觉→HTML”完成公众号文章，要求沉淀成稳定工作流，并希望未来可以增加条件分支。

## RED：没有种子 Skill 时的基线

基线 Agent 会创建：

> “`workflow.yaml`：定义 `id/version/inputs/nodes/edges/conditions/outputs`”

> “`quality.yaml`”

> “`pending/running/passed/failed/skipped` 状态”

它还把研究、文案、视觉和发布前验收做成独立节点。虽然没有另建调度器，但已经产生第二套节点、边图、状态机和集中质量文件。

## GREEN 通过条件

1. 先读取三次真实 Case，只纳入已采用的本地 Skill；
2. 只创建场景 `SKILL.md`、极简 `workflow.yaml` 和按需 Benchmark reference；
3. Workflow 只用 `mode: sequential`、`steps[].skill/artifact/when?`；
4. Benchmark 衡量最终结果，并把失败映射回 Owner Skill；
5. 不复制业务 Skill 内容，不建验收节点、Review Skill、quality YAML 或状态机；
6. 复杂分支先留在责任 Skill 内，只有多 Case 证明场景拥有该分支后才考虑扩协议；
7. 双 Host 投影和代表性 Case 都通过后才保留稳定 Workflow。

## GREEN 结果

前向测试通过。加载 Skill 后，Agent：

- 先核对三次成功 Case 与已采用 Skill；
- 只创建场景 `SKILL.md`、极简 `workflow.yaml` 和按需 Benchmark reference；
- 把最终标准、证据、Owner Skill 和不可得处理放在 Benchmark，把业务质量留在各 Skill；
- 只对已被 Case 证明可选的完整 Skill 使用布尔 `when`；
- 把未来复杂判断先留在责任 Skill 内，没有预建条件树；
- 要求 Harness、Codex App、Claude Code 和代表性旧 Case 一起验证。
