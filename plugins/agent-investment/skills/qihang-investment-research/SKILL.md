---
name: qihang-investment-research
description: Collect and organize source-backed facts before Qihang's AI investment analysis. Use before IC memo, investment memo, AI case investment review, DD prep, or visual investment report when product, company, financing, customer, pricing, competitor, GitHub, or market facts are missing. This skill deposits facts only and does not write investment conclusions.
---

# Qihang Investment Research

Collect the fact pack before investment judgment.

This skill should run before the investment package when the materials are incomplete.

## Rules

- Separate facts from judgments.
- Use current sources for financing, customers, pricing, competitors, GitHub data, team, and market size.
- Mark every key fact with source URL or `not found`.
- Do not write the IC memo here.
- Do not decide invest / pass here.
- Hand off a fact pack to `qihang-ai-product-judgment` through the `qihang-workflow-orchestrator` product-investment workflow.

## References

Read only when needed:

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
