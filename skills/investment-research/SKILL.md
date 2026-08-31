---
name: investment-research
description: Collect and organize source-backed facts before AI investment analysis. Use before IC memo, investment memo, AI case investment review, DD prep, or visual investment report when product, company, financing, customer, pricing, competitor, GitHub, or market facts are missing. This skill deposits facts only and does not write investment conclusions.
---

# Investment Research

Collect the fact pack before investment judgment.

This skill should run before the investment package when the materials are incomplete.

## Rules

- Separate facts from judgments.
- Use current sources for financing, customers, pricing, competitors, GitHub data, team, and market size.
- Default search and access tool: `agent-reach`. Treat GitHub, company官网, 工商/招投标, 公众号/知乎, 抖音/小红书/微博/B站, LinkedIn, Reddit/X, YouTube 等平台为 agent-reach 的 reach surfaces，而不是独立的强制搜索步骤；只有当 agent-reach 不可用、覆盖不全、或用户明确要求直连某平台时，才退回到直接平台命令或普通 web 搜索。See `references/agent-reach-search.md`.
- Mark every key fact with source URL or `not found`.
- Do not write the IC memo here.
- Do not decide invest / pass here.
- Hand off a fact pack to `investment-ai-product-judgment` through the `workflow-orchestrator` product-investment workflow.

## References

Read only when needed:

- `references/agent-reach-search.md` for the default agent-reach reach layer, source surfaces, depth, and fallback policy.
- `references/public-company-research.md` for public-company filings, management, industry, competitive, and risk fact collection.
- `references/deal-sourcing.md` for target discovery, company shortlists, founder/company outreach context, or sourcing logic.
- `references/funding-digest.md` and `references/sector-seeds.md` for funding rounds, capital-market activity, sector watchlists, and deal-flow summaries.

## Fact Pack Output

```text
Research object:
Object type:
Core investment question:
Materials reviewed:
Product facts:
Business facts:
Technical / OSS facts:
Market and competitor facts:
Funding and ownership facts:
Customer / traction facts:
Missing facts:
Source list:
Ready for next node: yes/no
```

## 完成标准

- Standalone 模式使用当次取得的现行来源；Mode 内连续调用 复用 01-source-intake 的有日期证据，只对其明确缺口、冲突或过期事实定向补查，不重复全量搜索，并写明事实适用期间
- 每项关键事实都有可定位证据、来源日期和事实适用期间；无证据内容不得冒充事实
- 事实包覆盖公司、产品、技术与 OSS、市场、客户、商业模式、团队、所有权、融资、竞争、风险和关键时间线等适用区域
- 事实、公司口径、第三方观点、推断、假设、反证和来源冲突分别呈现
- 把缺失事实转成可执行核验方向，并说明其对产品、竞争、经济性、评分和估值判断的影响
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；不得将未知写成零或事实
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
