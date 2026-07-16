# 投资 / 产品问题到 IC Memo 与可视化研报调用链

日期：2026-06-14

定位：这是一条轻量但完整的调用链，用来把本库的 AI-native 产品判断接入 `domain-investment` 工作包，最终产出 IC Memo、DD 问题树、watch triggers，并按需承接成可视化研报页。

它不是把多个投研来源机械串起来，也不是让 `oss-investment-scorecard` 独立承担全部结构。旧 OSS scorecard 只作为 `investment-scorecard` 的 reference。

## 适用场景

当输入是下面任一类型时，优先进入这条链：

- 评估一个 AI 产品、开源项目、创业公司或技术基础设施是否值得投资、继续跟踪或放弃。
- 从 BP / Pitch Deck 逻辑判断一个产品是否成立，并进一步形成投资判断。
- 从 VC / 投研视角判断项目的市场、商业模式、竞争格局、回报逻辑和 DD 优先级。
- 把零散产品观察整理成 IC memo、research report、case note 或可视化研报页。

不适用场景：

- 只需要一句产品点评。
- 只需要维护技能索引或搬运资料。
- 没有明确研究对象，只有泛泛行业观点。
- 只需要公众号文章，不需要投资判断。

## 输入要求

最小输入：

- 研究对象名称。
- 对象类型：产品、公司、开源项目、基础设施、客户案例、市场方向。
- 当前问题：投资判断、产品复盘、BP 审查、竞品比较、IC memo、DD 准备。

增强输入：

- 官网、GitHub、文档、融资新闻、客户案例、deck、demo、公开访谈。
- 想要输出的深度：quick note、case memo、research report、IC memo、visual report。
- 目标读者：自己阅读、客户咨询、投资讨论、团队复盘。

## 技能选择

| 节点 | 优先技能 / 来源 | 用途 |
| --- | --- | --- |
| 事实收集 | `topic-research-deposition` + `investment-research` | 搜索和沉淀事实，不做投资结论 |
| 工作流总入口 | `workflow-orchestrator` -> `references/chains/investment-icmemo.md` | 路由投资工作流，避免把具体 workflow 写进 `SKILL.md` |
| AI-native 产品视角 | `investment-ai-product-judgment` | 做 BP 逻辑链、产品成立性、叙事和商业模式判断 |
| 竞争格局 | `investment-competitive-landscape` | 市场定义、竞品分组、定位、护城河、bull/base/bear |
| 单位经济 | `investment-unit-economics` | 定价、收入质量、毛利、推理成本、CAC/payback、AI readiness |
| 投资评分 | `investment-scorecard` | 使用旧 OSS scorecard reference 和 deal screening 形成 scorecard / veto / verdict |
| 估值回报 | `investment-valuation-returns` | comps、估值方法、回报驱动、IRR/MOIC 场景 |
| DD | `investment-dd` | 尽调问题、管理层问题、专家访谈、data-room request、一票否决 |
| 跟踪 | `investment-thesis-tracking` | thesis、watch triggers、catalyst calendar、复盘节奏 |
| 成稿 | `investment-ic-memo-writer` | 把节点 handoff 合成为 IC Memo，不再搜索或新增分析 |
| 可视化承接 | `investment-visual-report` | 把完整 IC Memo 做成现代、全展开的可视化研报页 |

## 调用链

默认链路：

```text
研究对象
-> 研究问题定界
-> 事实收集
-> AI-native 产品 / BP 逻辑判断
-> 竞争格局
-> 单位经济
-> 投资评分
-> 估值和回报逻辑
-> DD priority
-> thesis tracking
-> IC Memo
-> 可选可视化研报页
```

结构化、IC Memo 和可视化不是三选一。

如果用户说“产品投资分析研报”“这个 AI case 值不值得投”“出 IC memo”，默认链路是：

```text
产品判断 -> 投资判断 -> IC Memo
```

如果用户继续说“可视化”“HTML 研报”“页面”，再把完整 IC Memo 承接成页面。页面不得删减 memo 内容。

## 1. 研究问题定界

先把问题限定清楚，不要直接开始写研报。

必须回答：

- 这次两个判断轴的权重是什么：产品是否成立，以及项目是否值得继续投资、跟踪或放弃。
- 研究对象处于哪个阶段：概念、demo、早期产品、开源增长、商业化、融资中、规模化。
- 这次输出是内部阅读材料、对外咨询材料，还是投资决策材料。
- 最终要给出 verdict、watch trigger，还是完整 IC Memo。

输出：

```text
研究对象：
研究类型：
核心问题：
目标输出：
当前已知材料：
缺失材料：
```

## 2. 事实收集

事实层和判断层要分开。当前信息可能变化，涉及融资、客户、GitHub 数据、定价、团队、竞品时，必须重新查证。

事实收集至少覆盖：

- 产品：定位、核心用户、关键场景、功能边界、demo 或截图。
- 商业：定价、客户、商业模式、融资、销售路径。
- 技术：架构主张、开源许可、技术差异、依赖栈。
- 市场：竞品、替代方案、平台风险、分发渠道。
- 证据：每条关键事实的来源 URL 或“未找到”。

规则：

- 未找到不等于不存在，必须标记为“未找到 / 待验证”。
- 可以做推断，但必须写明“基于哪些事实推断”。
- 不把媒体叙事当成事实，不把官网口号当成 traction。
- 搜索在这里完成。进入 `investment-ic-memo-writer` 后不再搜索。

## 3. 投资工作包执行

触发 `workflow-orchestrator`，读取 `references/chains/investment-icmemo.md`，再按节点渐进加载 `domain-investment` 中的业务技能。

每个节点必须输出：

```text
Node:
Inputs used:
References loaded:
Facts:
Judgments:
Assumptions:
Unknowns:
Next-node handoff:
```

节点职责：

- `investment-ai-product-judgment`：产品是否成立，是否 AI-native，叙事和 BP 逻辑是否连贯。
- `investment-competitive-landscape`：市场、竞品、替代方案、定位、护城河。
- `investment-unit-economics`：收入质量、推理成本、毛利、CAC、部署可行性。
- `investment-scorecard`：投资评分、macro gate、deal-screening verdict、一票否决。
- `investment-valuation-returns`：估值方法、comps、回报驱动、退出路径。
- `investment-dd`：DD 优先级、问题树、data-room request、red flags。
- `investment-thesis-tracking`：watch triggers、catalyst calendar、可证伪 thesis。

## 4. IC Memo 成稿

触发 `investment-ic-memo-writer`。

成稿规则：

- 只消费前面节点 handoff，不重新搜索，不新增未验证事实。
- 保留 facts、judgments、assumptions、unknowns 的边界。
- 保留弱点、矛盾和来源缺口，不把它们写成“未来可解决”的空话。
- 输出以 IC Memo 为默认，不退化成 scorecard-only。

默认 memo 结构：

```text
1. Executive Summary
2. Investment Recommendation
3. Company / Product Overview
4. AI-native Product Judgment
5. Market & Competitive Landscape
6. Business Model & Unit Economics
7. Technical / OSS / Ecosystem Moat
8. Valuation / Return Logic
9. Investment Scorecard
10. Key Risks & One-Vote Veto
11. Due Diligence Priorities
12. Thesis Tracking & Watch Triggers
13. Sources, Unknowns, Verification Gaps
```

## 5. 可视化承接

如果输出形态是可视化研报页，页面只做可视化承接，不重新论证。

前端宪法：

- 可视化由 `investment-visual-report` 承接，不通过 `external-skill-index` 选择 Type/UI/设计技能。
- 前端不得删减上游 IC Memo 内容；只能做可视化、分组、排序、强调和版式呈现。
- 默认交付一个静态 HTML/CSS 文件；只有已有目标项目或明确要求时才使用项目栈。
- 首屏必须显示研究对象、verdict、总分或决策状态、最高信号事实。
- 核心报告内容全部展开，不把关键判断藏进折叠、tab 或嵌套卡片。
- 视觉结构服务于 IC Memo 的自然顺序：产品判断 -> 投资判断 -> DD -> watch triggers -> 来源缺口。
- 桌面和移动都要检查，文字不能溢出，核心信息不能重叠。

## 6. 质量门

研报交付前检查：

- 事实和判断是否分开。
- 当前事实是否带来源或明确标记未找到。
- 是否给出明确 verdict，而不是只罗列信息。
- 是否说明最强论点和最弱缺口。
- 是否有 DD priority，而不是假装信息完整。
- 是否说明 watch trigger，方便后续复查。
- 如果做可视化，是否保留了全部 memo 内容。

## 7. 收录反馈

每次跑完这条链后，只把可复用部分沉淀回本仓库：

- 新发现的高质量技能来源 -> `external-skill-index`。
- 可复用调用方式 -> 本文档或相关 workflow。
- 具体公司研报、客户材料、deck 内容 -> 不进入正式技能库。
- 一次性实验记录 -> 不进入正式技能库，只保留实验结论。
