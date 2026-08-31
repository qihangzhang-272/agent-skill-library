---
name: investment-competitive-landscape
description: Build the market and competitive landscape layer for an AI investment memo. Use when an IC memo, investment memo, product investment report, or AI case review needs market sizing, competitor mapping, positioning, moat assessment, bull/base/bear scenarios, or why-now context.
---

# Investment Competitive Landscape

Every investment memo needs a competitive landscape layer.

This node answers: what market is this case in, who matters, and why this company can or cannot win?

## References

Read when relevant:

- `references/competitive-analysis.md` for competitor mapping, positioning, moat assessment, and bull/base/bear scenarios.
- `references/frameworks.md` for 2x2 matrix axes.
- `references/schemas.md` for M&A and scenario tables.
- `references/sector-overview.md` for sector size, value chain, drivers, and market structure.
- `references/idea-generation.md` for thematic sweep and idea shortlist logic.
- `references/market-researcher-agent.md` for sector -> landscape -> comps -> ideas workflow logic.

## Output

```text
Market definition:
Industry-defining metrics:
Market size / growth:
Value chain:
Competitor universe:
Competitor grouping:
Positioning visualization:
Target company position:
Moat assessment:
Bull / base / bear:
Strategic context:
Competitive risks:
Handoff to IC memo:
```

## 完成标准

- 明确市场边界、规模与增长口径、价值链、利润池、行业经济性、why-now 与适用的行业定义指标
- 覆盖直接竞争、间接替代、现状方案、邻近和潜在进入者，并说明纳入或排除依据
- 关键竞品对比采用一致字段、期间、单位和可追溯来源，未知项不得用主观评分伪装为事实
- 判断定位、差异化、分发、数据、技术、成本和转换壁垒，同时呈现削弱护城河的反证
- 形成竞争或经营层面的 bull/base/bear 情景、可观察信号、时间范围和对后续经济性及估值的影响，不在本节点创造估值
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；市场定义、竞争宇宙、护城河检验和情景分析仍必须完成
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
