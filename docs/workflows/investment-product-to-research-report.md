# 投资研究到 IC Memo 与可视化研报

这是一条由当前 Codex App task 或 Claude Code session 顺序执行的投研链。`workflow-orchestrator` 只负责选择 [Investment IC Memo chain](../../plugins/orchestrator/skills/workflow-orchestrator/references/chains/investment-icmemo.md)，不执行节点，也不维护第二套上下文。

## 何时使用

适合从 BP、Pitch Deck、PDF、链接、产品资料或已有笔记形成完整投资判断，并交付 IC Memo、尽调问题和跟踪条件。只要一句产品点评、泛行业观点或公众号文章时，不需要启动整条链。

开始前尽量明确研究对象、核心投资问题、已有材料、目标读者和时间范围。缺少旧 key 或历史运行信息不构成阻断；Host 使用当前可读材料继续，并把事实缺口写清楚。

## 唯一执行顺序

节点顺序、可读输入和 Artifact 的唯一事实表是 [Investment IC Memo chain](../../plugins/orchestrator/skills/workflow-orchestrator/references/chains/investment-icmemo.md)，本说明不复制第二份。当前结构是 10 个必选 Skill，用户请求可视化时再追加只读取 Memo 的第 11 个 Skill；多项读取关系只是业务资料依赖，不会生成分支、审批或额外调度任务。

## 每个节点怎么跑

1. 到达节点时才读取它的 `SKILL.md` 和 `quality-contract.yaml`；不要在 Run 开始时预载 11 个 Skill。
2. 按 `SKILL.md` 对当前任务的路由，只加载本案明确需要的 references、assets 和 scripts，再读取 chain 声明的上游 Artifact。
3. 按质量合同完成完整业务义务，写出独立 Artifact；按需加载不等于缩写，不能因为它只是长链中的一环就缩水。
4. 对照质量合同检查业务内容。下游发现可补做的缺失时，返回责任 Skill 补齐；确实不可获得时，说明缺口、决策影响、保守处理和再核验条件后继续。

每份质量合同只保留四类信息：合同 ID、起草依据、必需业务义务和独立 Artifact。它不要求每个输入建立一笔交接事务，也不要求把运行证明写进业务报告。

完整读取整个 Skill package 只发生在 Skill 导入、质量合同首次起草或合同更新时；日常运行依赖已经形成的合同与 Skill 自己的 reference 路由。

## 产物与最终交付

所有文件进入用户项目的 `<project-root>/.asl/runs/<run-id>/artifacts/`，不进入技能库仓库。前 9 个 Artifact 保留完整分析，Memo 忠实组装它们，不重新搜索；视觉报告忠实呈现 Memo，不补研究、不改结论。

最终 Memo 和 HTML 面向中文投资人：正文使用业务语言，英文缩写首次出现时解释，外部来源用可读名称和可点击链接。运行标识和内部检查记录留在工作区，不出现在投资人报告中。

只有用户明确说出的评价、纠正或偏好才进入反馈记录。普通编辑、沉默、运行耗时或打开文件等行为不自动解释为反馈。
