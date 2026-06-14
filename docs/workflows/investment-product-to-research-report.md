# 投资 / 产品问题到研报调用链

日期：2026-06-08

定位：这是一条轻量调用链，用来把启航的 AI-native 产品判断接到 `oss-investment-scorecard` 的结构化输出，再承接成可视化研报页。它不是新的研报框架，不复制上游正文，也不替代 `ai-product-analyzer` 或 `oss-investment-scorecard`。

## 适用场景

当输入是下面任一类型时，优先进入这条链：

- 评估一个 AI 产品、开源项目、创业公司或技术基础设施是否值得关注。
- 从 BP / Pitch Deck 逻辑判断一个产品是否成立。
- 从 VC 视角判断项目是否值得投资、继续跟踪或放弃。
- 把零散产品观察整理成研报、IC memo、case note 或 DD 问题树。

不适用场景：

- 只需要一句产品点评。
- 只需要维护技能索引或搬运资料。
- 没有明确研究对象，只有泛泛行业观点。

## 输入要求

最小输入：

- 研究对象名称。
- 对象类型：产品、公司、开源项目、基础设施、客户案例、市场方向。
- 当前问题：投资判断、产品复盘、BP 审查、竞品比较、研报准备、DD 准备。

增强输入：

- 官网、GitHub、文档、融资新闻、客户案例、deck、demo、公开访谈。
- 想要输出的深度：quick note、case memo、research report、IC memo。
- 目标读者：自己阅读、客户咨询、投资讨论、团队复盘。

## 技能选择

| 节点 | 优先技能 / 来源 | 用途 |
| --- | --- | --- |
| AI-native 产品视角 | `skills/ai-product-analyzer/` | 做 BP 逻辑链、产品成立性、叙事和商业模式判断 |
| 结构化投资输出 | `skills/oss-investment-scorecard/` | 把产品判断组织成 fact sheet、macro gate、scorecard、verdict、IC thesis、DD 和 watch triggers |
| 可视化承接 | `qihang-skill-index` 中的前端来源 | 把 OSS investment 结构化结果做成现代、全展开的可视化研报页 |

## 调用链

```text
研究对象
-> 研究问题定界
-> 事实收集
-> AI-native 产品 / BP 逻辑判断
-> OSS investment 结构化
-> 可视化研报页
```

结构化和可视化不是二选一。如果用户说“产品投资分析研报”“可视化研报页”“HTML 研报”，默认链路是：

```text
AI-native 产品视角 -> OSS investment 结构化 -> 可视化
```

只有当用户明确说 IC memo、DD 问题树或只要文字版时，才停在结构化文字结果。

## 1. 研究问题定界

先把问题限定清楚，不要直接开始写研报。

必须回答：

- 这次两个判断轴的权重是什么：产品是否成立，以及项目是否值得继续投资、跟踪或放弃。
- 研究对象处于哪个阶段：概念、demo、早期产品、开源增长、商业化、融资中、规模化。
- 这次输出是内部阅读材料、对外咨询材料，还是投资决策材料。
- 最终要给出 verdict、watch trigger，还是只是整理 case。

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

## 3. 产品 / BP 逻辑判断

触发 `ai-product-analyzer`，重点不是复述产品功能，而是判断 BP 逻辑是否成立。

最少要产出：

- 一句话定位是否清晰。
- Problem 是否真实、高频、高价值。
- Solution 是否直接回应问题。
- 产品形态是否让价值可见。
- Why Now 是否有独立成立的窗口。
- 市场、商业模式、竞争、traction、团队和资金用途是否互相支撑。
- 综合判定：好案例、反面教材、待观察。

如果出现下面情况，研报要显式标记风险：

- AI 只是旧范式的包装。
- 产品价值依赖“未来模型一定变好”。
- 商业模式把固定订阅收入和高变动推理成本硬绑在一起。
- 没有明确 NOT Positioning，竞争边界模糊。
- traction 只有不可证伪大数字，没有可检查行为证据。

## 4. OSS Investment 结构化

`oss-investment-scorecard` 在这条链里是结构化输出层，不是适用性分类器。

使用方式：

- 先读取本地 `skills/oss-investment-scorecard/SKILL.md`，再按需读取它的 `references/`、`cases/` 或 `template/`。
- `qihang-skill-index` 只保留上游 GitHub 来源和更新线索，不作为运行时入口。
- 用上游结构组织最终成果；不在本 workflow 里重写一套投资框架。
- 如果某些 OSS 字段对非开源产品不贴合，标注“改写 / 不适用 / 待验证”，不要因此跳过结构化输出。

结构化结果至少保留：

- Macro gate：窗口、开源结构优势、AI cycle premium。
- 五维 scorecard：社区、团队、技术护城河、商业化、退出路径。
- 一票否决项检查。
- IC thesis。
- DD priority list。
- Watch triggers。

## 5. 结构化和可视化

最终结构以 `oss-investment-scorecard` 为主，嵌入 `ai-product-analyzer` 的 AI-native 产品判断。

```text
AI-native 产品判断
-> OSS investment fact sheet
-> Macro gate
-> Scorecard table
-> Verdict / IC thesis
-> DD priority list
-> Watch triggers
-> Sources and uncertainty
```

输出形态按需求裁剪，但不改变上游结构来源：

- quick note：只保留 verdict、产品最强/最弱判断、scorecard 摘要、下一步。
- case memo：保留产品判断、scorecard、DD priority 和 watch triggers。
- research report：保留完整结构和来源。
- IC memo：强化 verdict、IC thesis、关键风险、DD 条件。

如果输出形态是可视化研报页，沿用 `oss-investment-scorecard` 结构，不在 workflow 里重新规定论证顺序。

页面默认现代、全展开、少折叠、不堆叠卡片；优先用分区、矩阵、时间线、评分条和逻辑图表达已有研报结构。

## 6. 质量门

研报交付前检查：

- 事实和判断是否分开。
- 当前事实是否带来源或明确标记未找到。
- 是否给出明确 verdict，而不是只罗列信息。
- 是否说明最强论点和最弱缺口。
- 是否有 DD priority，而不是假装信息完整。
- 是否说明 watch trigger，方便后续复查。

## 7. 收录反馈

每次跑完这条链后，只把可复用部分沉淀回本仓库：

- 新发现的高质量技能来源 -> `qihang-skill-index`。
- 可复用调用方式 -> 本文档或相关 workflow。
- 具体公司研报、客户材料、deck 内容 -> 不进入正式技能库。
- 一次性实验记录 -> `local-experiments/`。
