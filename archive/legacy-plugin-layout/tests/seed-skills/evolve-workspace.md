# `evolve-workspace` 行为测试

## 压力场景

用户明确反馈：“开头太像 AI，总是先解释背景；以后我的文章直接从真实冲突切入，而且这次视觉图太多。”Workspace 有写作 Skill、视觉 Skill、场景 Benchmark 和历史 Case。

## RED：没有种子 Skill 时的基线

基线 Agent 已正确区分“以后”的长期偏好和“这次”的单次反馈，但仍提出：

> “视觉 Skill 暂只加入‘每张图必须有独立信息价值’的检查项”

> “给对应场景 Benchmark 增加‘背景式开头’和‘视觉冗余’回归用例”

这会把一次视觉反馈提前写入长期 Skill，并把同一个开头偏好同时扩散到写作 Skill 与场景 Benchmark；同时没有明确保存现有外部 Skill 的来源和本地修改关系。

## GREEN 通过条件

1. 只记录用户明确反馈，不读取或推断点击、耗时、沉默等行为；
2. “以后”定位为长期写作偏好，“这次视觉图太多”只修当前 Case；
3. 找到最小 Owner，完整读取其 package 后再改；
4. 当前 Case 改同一 Artifact 并重跑受影响后续；
5. 长期规则只写一个权威位置，不同时扩散到 Profile、Skill 和 Benchmark；
6. 持久修改用当前 Case 和相关历史 Case 回归；
7. `SOURCE.md` 保留来源与本地改动，上游更新只成为 Candidate；
8. 保存聚焦 Git diff，不增加偏好数据库、评分器、Review Skill 或遥测 Hook。

## GREEN 结果

前向测试通过。加载 Skill 后，Agent：

- 原样记录反馈并把“以后”与“这次”拆成长期和单 Case 范围；
- 只把长期开头偏好归给写作 Skill，视觉密度只改当前 Artifact；
- 不重复修改 Profile、Workflow、Benchmark 或视觉 Skill；
- 在完整读取写作包和 `SOURCE.md` 后做最小规则改动；
- 用当前 Case 与一个历史 Case 验证长期变化，只在必要时补回归例；
- 展示结果和规则 diff，更新来源差异并保存一个聚焦中文时间戳提交。
