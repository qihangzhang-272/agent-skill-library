# 投资研究到 IC Memo 与可视化研报工作流

日期：2026-08-04

## 定位

这是一条由 10 个必选 Skill 和 1 个可选 Skill 构成的完整投研工作流。它从原始材料开始，依次形成来源沉淀、事实包、产品判断、竞争格局、单位经济、评分、估值回报、DD、thesis tracking 和 IC Memo；用户在运行前明确需要可视化时，再由第 11 个 Skill 把完整 Memo 转成 HTML。

可执行的节点顺序和 Artifact 绑定以 `plugins/orchestrator/skills/workflow-orchestrator/references/chains/investment-icmemo.md` 为准。本文解释如何选择、运行和验收这条链，不另建宏观节点，也不复制一套平行调度逻辑。

`workflow-orchestrator` 只是让 Host 找到这份 chain 的薄路由入口。当前可见的 Codex App task 或 Claude Code session 始终是唯一执行者；Harness 只保存 Plan、事件、Artifact 引用并执行确定性检查，三者都不能成为第二个业务调度器。

## 适用场景

以下请求优先匹配本工作流：

- 判断一个 AI 产品、开源项目、创业公司、技术基础设施或客户 case 是否值得投资、继续跟踪或放弃；
- 从 BP、Pitch Deck、demo 或产品资料形成完整投资判断；
- 从 VC / 投研视角分析市场、商业模式、竞争格局、回报逻辑和 DD 优先级；
- 交付 IC Memo、DD 问题、watch triggers，或在此基础上交付可视化研报页。

以下请求不应自动进入本工作流：

- 只需要一句产品点评；
- 只需要维护技能索引或搬运资料；
- 没有明确研究对象，只有泛泛行业观点；
- 只需要公众号文章，不需要投资判断。

## Run 输入

Plan 生成前至少需要：

- 研究对象名称和类型；
- 核心投资问题；
- 用户已有的 PDF、deck、链接、笔记、demo 或其他原始材料；
- 最终用途、目标读者、研究时间范围和证据限制；
- 是否需要 `11-visual-report.html`。
- 每个节点允许 unknown 时的 `gapPolicy.boundedAttempts.limit`；缺省冻结为每项 obligation `2` 次可引用的不同来源或验证方法。

官网、GitHub、文档、融资新闻、客户案例、公开访谈和历史研究都可以成为输入，但“未提供”不等于允许编造。需要网页或当前事实时，只能由已冻结的本地 Skill 通过其已声明能力访问；不能在稳定 Run 中临时搜索和插入新 Skill。

## 唯一 Skill 顺序

| 顺序 | Skill | 本节点完整职责 | 独立 Artifact |
| --- | --- | --- | --- |
| 01 | `topic-research-deposition` | 定界研究对象和问题，保存原始来源、抓取状态、证据覆盖与缺口；不写投资结论 | `01-source-intake.md` |
| 02 | `investment-research` | 把来源整理为可追溯事实包，分开事实与判断，标记当前性和缺失事实；不做 invest / pass 决策 | `02-fact-pack.md` |
| 03 | `investment-ai-product-judgment` | 判断产品是否真正 AI-native，问题、方案、产品形态、叙事、商业逻辑、团队和 GTM 是否成立 | `03-product-judgment.md` |
| 04 | `investment-competitive-landscape` | 定义市场、价值链、竞品分组、定位、护城河、战略背景和 bull / base / bear | `04-competitive-landscape.md` |
| 05 | `investment-unit-economics` | 分析定价、收入质量、留存扩张、CAC/payback、毛利、推理成本、客户集中和部署可行性 | `05-unit-economics.md` |
| 06 | `investment-scorecard` | 执行 macro gate、维度评分、deal-screening verdict、一票否决、DD priority 和投资建议 | `06-investment-scorecard.md` |
| 07 | `investment-valuation-returns` | 选择估值方法和 comps，说明 entry、回报驱动、IRR/MOIC 场景、退出路径和数据限制 | `07-valuation-returns.md` |
| 08 | `investment-dd` | 形成关键 DD 问题、管理层和专家访谈问题、data-room request、red flags 与改变结论的证据 | `08-dd-questions.md` |
| 09 | `investment-thesis-tracking` | 把当前判断变成可证伪 thesis、watch triggers、催化剂日历、KPI 和退出/停止跟踪条件 | `09-thesis-tracking.md` |
| 10 | `investment-ic-memo-writer` | 只消费已验收上游 Artifact，忠实组装最终 IC Memo；不搜索、不创造缺失分析 | `10-ic-memo.md` |
| 11（可选） | `investment-visual-report` | 读取 01–10 核对证据谱系，以完整 Memo 作为唯一结论源并转成单文件、全展开 HTML；不重新研究、不改结论 | `11-visual-report.html` |

这里没有“研究问题定界”“产品判断”“投资判断”“成稿”等额外宏观节点。研究问题定界属于 Skill 01；其余每一行就是唯一业务执行单位。

节点 11 由 Plan 参数 `visualizationRequested` 控制，缺省为 `false`。是否纳入必须在 Run 开始前决定并冻结，不能在运行中临时把视觉 Skill 插入已有 Plan。

## Run 目录与 Artifact

本工作流的所有过程和成品进入用户当前项目：

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
    └── 11-visual-report.html
```

节点 11 未纳入 Plan 时，最后一个文件不存在。业务产物不得写入 `plugins/` 或技能库仓库。每个 Artifact 必须能独立阅读；最终 Memo 或视觉页不能取代过程包。

## 事实与证据纪律

Skill 01 和 Skill 02 必须建立事实底座：

- 产品：定位、核心用户、关键场景、功能边界、demo 或截图；
- 商业：定价、客户、商业模式、融资和销售路径；
- 技术：架构主张、开源许可、差异点和依赖栈；
- 市场：竞品、替代方案、平台风险和分发渠道；
- 证据：每个关键事实的来源 URL、文件引用或明确的“未找到”。

涉及融资、客户、GitHub 数据、定价、团队、竞争和市场数据等可变事实时必须重新验证。媒体叙事不是事实，官网口号不是 traction。“未找到”只表示当前有界尝试没有取得证据，不能被改写为“不存在”。允许推断，但必须说明所依据的事实。

进入 Skill 10 后不得重新搜索。Memo 发现上游证据或分析不足时，应拒收对应 Artifact 并退回责任 Skill，而不是在写作阶段偷偷补研究。

## 完整执行，不得缩水

本工作流不提供统一的 `Node / Facts / Judgments / Next-node handoff` 输出模板，因为这种包装很容易替代 Skill 自己的完整产物。

每个节点开始前，Host 必须读取该 Skill 的完整 `SKILL.md`、实际需要的 references / assets，以及 Plan 锁定的质量合同。Workflow 调用与 standalone 调用使用同一核心质量义务；长链中的一环不能比单独调用时更薄、更短或更少验证。

对每个节点，完成条件同时包括：

1. 同 attempt 的 `node.start`；
2. 一个独立 Artifact；
3. Harness 对确定性义务的验证；
4. 直接消费者对语义输入的接受；
5. 同 attempt 的 `node.complete`，outcome 为 `accepted` 或 `accepted-with-gaps`。

字数、Token 数和“文件已经存在”都不能替代这些条件。

## 直接消费者验收

下游 Skill 在开始工作前，是其所有声明输入的直接消费者。它需要判断：

- 上游是否完成了该 Skill 质量合同中的必需义务；
- 证据和结论是否足够支持自己继续；
- facts、judgments、assumptions 和 unknowns 是否保持边界；
- Artifact 引用和 revision 是否准确。

如果不足，消费者必须写 `handoff.rejected`，指出缺失 obligation、业务影响、真正责任 nodeId 和需要补充的内容。下游停止推进，责任 Skill 以新 attempt 返工。不能新增独立 Review Skill，也不能让 Harness 冒充投资专业判断。

最后一个节点没有下游 Skill 时，由 Workflow 最终交付合同充当消费者。纳入视觉节点时，Skill 11 是 Memo 的直接消费者；未纳入时，Memo 直接进入最终交付验收。

## `accepted-with-gaps`

研究任务可能在合理尝试后仍拿不到私有客户、精确收入、deck、融资条款或单位经济数据。质量合同允许未知项且预先限定的尝试已耗尽时，消费者可以接受带缺口 Artifact 继续，但 Handoff 必须写清：

- 已尝试的来源或方法；
- Plan 预先冻结的尝试上限、实际使用数和 `exhausted=true`；
- 仍不可得的原因；
- 对估值、评分、DD 或最终 verdict 的影响；
- 当前采用的保守 fallback；
- 何时应重新检查。

后续 Skill 和 Memo 必须继续传播限制，不能把未知当作零、否或已经证实。只要安全和权限允许、后续仍有意义，就继续完成可完成部分；缺少授权、安全越界或执行已经没有意义时才暂停。

尝试上限不能在失败后临时声明或提高；Handoff 必须引用当前不可变 Plan 中相同的 `gapPolicy.boundedAttempts.limit`。

## 失效与重新运行

消费者拒收并触发上游修正后：

1. 责任 Skill 写新的 attempt 和 Artifact revision；
2. 所有引用旧 digest 的下游 Artifact 标记失效；
3. 当前 Host Session 仍是 owner 时，在同一个 Run 中按顺序重跑受影响节点；
4. 旧 Artifact、Handoff 和事件全部保留；
5. 只有 Host 或 Session 变化时才创建 linked Run，并显式导入仍有效的 Artifact。

重跑不是从隐藏 checkpoint 恢复，也不切割 Codex App 或 Claude Code 已持有的聊天上下文。

## IC Memo 最终要求

Skill 10 的详细写作合同由 `investment-ic-memo-writer` 拥有。最终 Memo 至少忠实覆盖：

1. Executive Summary；
2. Investment Recommendation；
3. Company / Product Overview；
4. AI-native Product Judgment；
5. Market & Competitive Landscape；
6. Business Model & Unit Economics；
7. Technical / OSS / Ecosystem Moat；
8. Valuation / Return Logic；
9. Investment Scorecard；
10. Key Risks & One-Vote Veto；
11. Due Diligence Priorities；
12. Thesis Tracking & Watch Triggers；
13. Sources, Unknowns, Verification Gaps。

Memo 只能重组上游已验收内容，不能抹掉矛盾、弱点和来源缺口，也不能退化为 scorecard-only。缺少证据的章节必须明确说明证据不足及缺失内容。

## 可选视觉报告

纳入 Skill 11 时：

- 读取已验收的 01–10；投资结论、推荐、评分和措辞强度只使用 `10-ic-memo.md`，01–09 仅用于核对证据谱系、完整性和冲突；
- 如果 Memo 与 01–09 有未处理冲突，拒收 Memo 并返回责任节点，不在视觉层自行选择结论；
- 页面完整保留 Memo 内容，只做可视化、分组、排序、强调和版式呈现；
- 默认交付一个单文件、零外部依赖的静态 HTML；
- 首屏显示研究对象、verdict、总分或决策状态和最高信号事实；
- 核心内容全部展开，不藏入 tab、accordion 或嵌套折叠；
- 顺序忠于 Memo：产品判断、竞争和经济性、估值、评分、风险、DD、thesis、来源缺口；
- 桌面和移动端都必须检查溢出、重叠和可读性。

视觉节点发现 Memo 不足时，应拒收 Memo 并让 Skill 10 或真正负责内容的上游 Skill 返工，不能在 HTML 中自行修正研究。

## 明确反馈与工作流演化

只有用户明确说出的评价、纠正、偏好或改进要求可以写入反馈记录。普通编辑、沉默、运行时间、是否打开文件以及其他含义不明确的行为统一不看。

明确反馈可以形成精确的 Skill、质量合同或 Workflow 变更提案，但稳定定义只能在展示具体 diff 并获得一次明确人类确认后进入 Git。具体公司研报、客户材料和本次 Run 产物不进入技能库；本工作流也不会在运行结束时自动修改 chain、Skill 或外部技能索引。
