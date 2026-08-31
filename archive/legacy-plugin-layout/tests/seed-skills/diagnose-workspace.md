# `diagnose-workspace` 行为测试

## 压力场景

用户说：“我的个人工作区好像又乱了，帮我检查。不要删文件，公众号生产区不要动。”可能存在 inbox 残留、重复 Skill、失效 Host 投影、Case Artifact 混入 Workspace、来源 commit 过期。

## RED：没有种子 Skill 时的基线

基线 Agent 正确选择只读检查并承诺不自动移动或删除，但只给出了通用清单。它没有明确：

- Workspace、Case、inbox 与生产区的可验证边界；
- 应复用 Harness validation 与双 Host verify；
- Candidate、Trial、active Skill 与上游更新的不同含义；
- 来源缺失、边界污染、运行阻断与可选整理的严重性区别；
- Secret 只看路径、不读取内容的限制。

## GREEN 通过条件

1. 先确定并尊重 Workspace、Case、inbox、生产和交付边界；
2. 复用 Harness 与 Host 检查，不另造健康状态系统；
3. 检查活动闭包、生命周期泄漏、来源身份、真实重复、投影、Git、inbox 与 Secret 越界；
4. 上游新版本只标成升级 Candidate，不自动覆盖；
5. 报告按阻断、污染、来源/升级、可选整理、无需处理分组，每项有路径和证据；
6. 不读 Secret 值，不评价业务结论；
7. 不自动移动、归档、重命名、更新、采用或删除，生产区保持不动。

## GREEN 结果

前向测试通过。加载 Skill 后，Agent：

- 明确 Workspace、Case、inbox 与排除的生产区，并拒绝沿旧链接追入；
- 复用 Harness/Host 校验，补查生命周期、Artifact 泄漏、来源、重复、Git 与 inbox；
- Secret 只报告路径，不读取值；
- 把上游新 commit 视为升级候选而非错误；
- 按阻断、污染、来源/升级、可选整理、无需处理输出路径、证据、影响和最小建议；
- 明确不移动、归档、重命名、更新、采用、删除或触碰生产区。
