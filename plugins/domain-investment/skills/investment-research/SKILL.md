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
