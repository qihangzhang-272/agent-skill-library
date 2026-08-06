# `pursue-goal` 行为测试

## 压力场景

用户只说：“把这个主题做成一篇真正能代表我的公众号、达到可发布水平的文章，你自己想办法做到最好。”Workspace 已有公众号场景 Skill、业务 Skill 与 Benchmark，中途可能出现能力缺口。

## RED：没有种子 Skill 时的基线

基线 Agent 能够选择现有场景并提出验收目标，但仍有两处缺口：

> “按 Benchmark 做事实、逻辑、风格、标题、排版和风险复审”

> “关键缺口则暂停相关环节，提出安装或创建 Skill 的最小方案”

它没有把失败标准映射回责任 Skill，也没有要求外部能力先经过 Candidate 和本地 Trial；关键缺口会暂停，仍可能让用户的“直接跑”变成阻断。

## GREEN 通过条件

1. 保留用户原始 Goal，并先匹配现有场景 Skill；
2. 没有场景时才用已采用本地 Skill 组成最小临时链；
3. 当前 Host 连续执行，不增加调度器、Review 节点或上下文状态系统；
4. Benchmark 失败回到 Owner Skill，改同一 Artifact 并重跑受影响后续；
5. 能力缺口依次经过发现、Candidate、本地 Trial 后才能用于当前 Case；
6. 未授权或不可得事项诚实降级，继续所有不受影响工作；
7. 最终成品不夹杂 Harness、节点、provenance 或内部 Benchmark 术语。

## GREEN 结果

前向测试通过。加载 Skill 后，Agent：

- 保留用户原话并匹配 `wechat-end-to-end`，缺输入不设门槛；
- 由当前 Host 顺序执行完整 Skill 和独立 Artifact，不加调度器、Review 或状态系统；
- 用证据检查 Benchmark，失败回到 Owner Skill 并只重跑受影响后续；
- 能力缺口严格经过本地优先发现、Candidate 和 Trial，未裸调远程能力；
- Trial 只服务当前 Case，不静默晋升；
- 未授权和不可得事项诚实降级，最终交付不暴露内部术语。
