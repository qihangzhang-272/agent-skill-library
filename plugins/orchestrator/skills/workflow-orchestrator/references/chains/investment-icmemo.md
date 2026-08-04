# Chain: Investment IC Memo

## 工作流边界

- Workflow ID：`investment-ic-memo`。
- 本链固定为顺序执行：10 个必选 Skill，加 1 个运行前决定是否纳入的可选 Skill。
- 当前可见的 Codex App task 或 Claude Code session 是唯一执行者。`workflow-orchestrator` 只选择本 chain，不执行节点、不持有 Run、不重试节点，也不是第二调度器。
- 唯一业务节点单位是 Skill。研究对象、问题定界、搜索工具、Prompt、MCP、Agent、API 和脚本都不能被提升为平行业务节点。
- 每个 Skill 必须产生一个独立 Artifact；最终成品不能替代任何上游 Artifact。

## 适用

用于判断 AI 产品、公司、开源项目、基础设施或具体 case 是否值得投资、继续跟踪或放弃，并交付 IC Memo、DD 问题、thesis tracking；用户明确需要网页或可视化研报时，再交付 HTML 视觉报告。

不适用于只有泛泛行业观点、只需要一句产品点评、只维护技能索引，或只需要公众号文章而不需要投资判断的任务。

## Run 输入与冻结条件

Plan 生成前至少确认：

- 研究对象、对象类型和核心投资问题；
- 用户提供的 PDF、deck、链接、笔记或其他原始材料；
- 输出用途、时间范围和证据要求；
- `visualizationRequested`，缺省为 `false`。
- 每个节点的 `gapPolicy.boundedAttempts.limit`。未另行声明时冻结为 `2`，按每个允许 unknown 的 obligation 分别计算；一次 attempt 必须是可引用的不同来源或验证方法，不是重复改写同一查询。

节点 11 的唯一首版条件是 `visualizationRequested == true`。Host 必须在 Run 开始前把它解析为包含或排除并冻结在 Plan 中，不能运行到一半临时改变拓扑。

## Skill 节点与 Artifact

| 顺序 | nodeId | 本地 Skill | 必需输入绑定 | 独立 Artifact |
| --- | --- | --- | --- | --- |
| 01 | `source-intake` | `domain-writing:topic-research-deposition` | Run 原始材料与研究目标 | `artifacts/01-source-intake.md` |
| 02 | `fact-pack` | `domain-investment:investment-research` | `node-output:source-intake` | `artifacts/02-fact-pack.md` |
| 03 | `product-judgment` | `domain-investment:investment-ai-product-judgment` | `node-output:fact-pack` | `artifacts/03-product-judgment.md` |
| 04 | `competitive-landscape` | `domain-investment:investment-competitive-landscape` | `node-output:fact-pack`、`node-output:product-judgment` | `artifacts/04-competitive-landscape.md` |
| 05 | `unit-economics` | `domain-investment:investment-unit-economics` | `node-output:fact-pack`、`node-output:product-judgment`、`node-output:competitive-landscape` | `artifacts/05-unit-economics.md` |
| 06 | `investment-scorecard` | `domain-investment:investment-scorecard` | `node-output:fact-pack`、`node-output:product-judgment`、`node-output:competitive-landscape`、`node-output:unit-economics` | `artifacts/06-investment-scorecard.md` |
| 07 | `valuation-returns` | `domain-investment:investment-valuation-returns` | `node-output:fact-pack`、`node-output:product-judgment`、`node-output:competitive-landscape`、`node-output:unit-economics`、`node-output:investment-scorecard` | `artifacts/07-valuation-returns.md` |
| 08 | `dd-questions` | `domain-investment:investment-dd` | `node-output:fact-pack`、`node-output:product-judgment`、`node-output:competitive-landscape`、`node-output:unit-economics`、`node-output:investment-scorecard`、`node-output:valuation-returns` | `artifacts/08-dd-questions.md` |
| 09 | `thesis-tracking` | `domain-investment:investment-thesis-tracking` | `node-output:fact-pack`、`node-output:product-judgment`、`node-output:competitive-landscape`、`node-output:unit-economics`、`node-output:investment-scorecard`、`node-output:valuation-returns`、`node-output:dd-questions` | `artifacts/09-thesis-tracking.md` |
| 10 | `ic-memo` | `domain-investment:investment-ic-memo-writer` | `node-output:source-intake`、`node-output:fact-pack`、`node-output:product-judgment`、`node-output:competitive-landscape`、`node-output:unit-economics`、`node-output:investment-scorecard`、`node-output:valuation-returns`、`node-output:dd-questions`、`node-output:thesis-tracking` | `artifacts/10-ic-memo.md` |
| 11（可选） | `visual-report` | `domain-investment:investment-visual-report` | `node-output:source-intake`、`node-output:fact-pack`、`node-output:product-judgment`、`node-output:competitive-landscape`、`node-output:unit-economics`、`node-output:investment-scorecard`、`node-output:valuation-returns`、`node-output:dd-questions`、`node-output:thesis-tracking`、`node-output:ic-memo` | `artifacts/11-visual-report.html` |

每个输入绑定都指向一个明确上游 Artifact，不表示宏观节点或隐藏子链。节点 11 读取已验收的 01–10：`10-ic-memo.md` 是唯一结论来源，01–09 只用于核对证据谱系、完整性和冲突；它只做可视化，不重新研究、不补结论。若核对发现冲突，必须拒收 Memo 并回到责任节点，不能自行裁决。

## 落盘协议

所有运行内容都属于用户当前项目，固定放在：

```text
<project-root>/.asl/runs/<run-id>/
├── run.yaml
├── plan.lock.yaml
├── host-binding.lock.yaml
├── ownership.lock.yaml
├── events.jsonl
└── artifacts/
    ├── 01-source-intake.md
    ├── 02-fact-pack.md
    ├── 03-product-judgment.md
    ├── 04-competitive-landscape.md
    ├── 05-unit-economics.md
    ├── 06-investment-scorecard.md
    ├── 07-valuation-returns.md
    ├── 08-dd-questions.md
    ├── 09-thesis-tracking.md
    ├── 10-ic-memo.md
    └── 11-visual-report.html  # 仅在 Plan 纳入节点 11 时存在
```

不得把业务产物写入 `plugins/` 或本技能库仓库。上表是 Workflow 的逻辑输出路径；发生返工时，Harness 必须保留旧 Artifact revision、Handoff 和事件，不得用新结果伪造或覆盖历史。

## 节点执行与质量

对每个纳入 Plan 的 Skill，当前 Host 依次执行：

1. 读取该 Skill 的完整 package 和 Plan 锁定的质量合同，而不是只读本 chain 的摘要。
2. 写 `node.start`，传入精确的上游 Artifact refs、Skill ref 和质量合同 ref。
3. 按该 Skill 的完整要求完成分析。Standalone 与 Workflow 使用同一核心质量合同；处在长链中不能缩短核心研究、判断或交付。
4. 写一个能独立阅读的 Artifact。聊天摘要、统一薄模板或只有 `Next-node handoff` 的几行文字都不能替代 Artifact。
5. 由 Harness 检查路径、引用、digest、必需字段等确定性义务；由直接消费者判断证据和结论是否足够支持自己的工作。
6. 只有独立 Artifact、确定性验证、直接消费者接受和同 attempt 的 `node.complete` 全部存在，节点才算完成。

节点 Skill 中“停止”“等待下一条指令”或“handoff 给 orchestrator”等 standalone 文案，只表示该 Skill 自己不得调用下一 Skill，不能在本链中增加一个未写入 Plan 的 checkpoint。Artifact 被消费者接受后，仍由当前 Host 按冻结顺序决定是否进入下一节点。Skill 的 standalone 触发描述也不能改变本链中已冻结的位置和输入。

事实查找和材料访问只能发生在已冻结的本地 Skill 所声明的内部能力中。进入 `investment-ic-memo-writer` 后不得重新搜索或创造新分析；稳定 Run 中不得临时搜索、安装或插入外部 Skill。

## 消费者拒收与返工

- 消费者发现输入太薄、缺少生产者质量合同中的必需义务，或证据不足以支持本节点时，必须写 `handoff.rejected` 并停止下游推进。
- 拒收必须指出 obligation、对消费者的影响、真正责任 nodeId 和所需补充；返工回到责任 Skill 的新 attempt，而不是默认退回紧邻节点。
- 不新增 Review Skill，也不让 Harness 代做投资判断。
- 责任节点产出新 Artifact revision 后，所有引用旧 digest 的下游 Artifact 都必须失效并按顺序重新运行。旧 Artifact、Handoff 和事件必须保留。

## `accepted-with-gaps`

如果质量合同允许未知项，且预先限定的查找或验证尝试已经耗尽，消费者可以接受带缺口结果继续。Handoff 必须保留：

- `attemptRefs`；
- Plan 中冻结的 `boundedAttempts.limit`、实际 `used` 和 `exhausted=true`；
- 信息不可得的原因；
- 对投资判断和后续节点的影响；
- 保守 fallback；
- `revisitTrigger`。

下游必须传播这些限制，不能把“未找到”写成零、否或已证实事实。只要安全和权限允许、后续执行仍有意义，就继续；安全越界、缺少授权或执行已无意义时才暂停。

`accepted-with-gaps` 不得在运行后临时发明尝试上限。Handoff 的 limit 必须与当前不可变 Plan 中该节点的 `gapPolicy.boundedAttempts.limit` 一致。

## 最终交付

- 未纳入视觉节点时，Workflow 最终交付合同验收 `10-ic-memo.md`。
- 纳入视觉节点时，`investment-visual-report` 先作为 Memo 的直接消费者验收上游，再由 Workflow 最终交付合同验收 `11-visual-report.html`。
- IC Memo 必须保留事实、判断、假设、未知项、来源缺口、DD priority 和 watch triggers 的边界。
- 视觉报告必须忠实承接完整 Memo，单文件、零外部依赖、全部核心内容展开，不得删减或重新论证。

## 明确反馈与演化

只有用户明确表达的反馈才能写入反馈记录或形成 Workflow / Skill 修改提案。沉默、普通编辑、运行耗时、文件是否被打开等信号一律不解释为偏好。稳定定义只能通过精确 diff 和一次明确的人类确认进入 Git；本 Run 不自动修改 Skill、chain 或索引。
