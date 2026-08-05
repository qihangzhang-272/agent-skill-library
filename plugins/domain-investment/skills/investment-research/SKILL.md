---
name: investment-research
description: Collect and organize source-backed facts before AI investment analysis. Use before IC memo, investment memo, AI case investment review, DD prep, or visual investment report when product, company, financing, customer, pricing, competitor, GitHub, or market facts are missing. This skill deposits facts only and does not write investment conclusions.
---

# Investment Research

Collect the fact pack before investment judgment. Standalone and workflow use the same fact, source, counterevidence, and unknown-handling standard, but a managed workflow reuses the evidence already deposited by `topic-research-deposition` instead of repeating its broad search.

## Modes

- **Standalone:** collect the required evidence and build the Fact Pack directly.
- **Managed investment Workflow:** treat `01-source-intake.md` as the source register and broad-search result. Structure it into the Fact Pack. Search only to resolve an explicitly named gap, contradiction, or stale time-sensitive fact that materially affects later judgment; never rerun a blanket search across the same source surfaces.

## Rules

- Separate facts from judgments.
- In standalone mode, recheck time-sensitive financing, customer, pricing, competitor, GitHub, team, and market facts with current sources. In the managed Workflow, retain current dated evidence from `01-source-intake.md` and target only its explicit stale or missing items.
- When a search is actually needed, use `agent-reach` by default; treat individual platforms as reach surfaces and use direct commands or ordinary web search only as fallback.
- Give every key fact a source URL or mark it `not found`.
- Do not write the IC Memo or decide invest/pass here.
- Treat references as internal methods, never nested Skills or Agents.

## References

- Read `references/agent-reach-search.md` only for standalone collection or a targeted missing-source check.
- Read `references/public-company-research.md` only for public-company filings, management, industry, competition, and risk facts.
- Read `references/deal-sourcing.md` only for discovery, shortlists, outreach context, or sourcing logic.
- Read `references/funding-digest.md` and `references/sector-seeds.md` only when the case needs rounds, capital-market activity, sector watchlists, or deal flow.

## Input and rework

In the investment Workflow, read `01-source-intake.md` and write one independent `02-fact-pack.md`. Do not repeat the broad source collection already completed in node 01.

If the input lacks material scope or evidence, tell the Host which responsible Skill must add what and why; do not silently perform the responsible Skill’s work. If a fact remains unavailable after reasonable checks, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it, then continue.

## Fact Pack output

```text
Research object and object type
Core investment question
Materials reviewed
Reference methods used and why
Product facts
Business facts
Technical / OSS facts
Market and competitor facts
Funding and ownership facts
Customer / traction facts
Contradictions and counterevidence
Assumptions
Unknowns and decision impact
Source list
```

Keep company claims, third-party claims, verified facts, assumptions, and judgments visibly separate. Never infer a missing metric from peers or treat `not found` as zero.

The Artifact is complete only when the business obligations in `quality-contract.yaml` are satisfied. Do not invoke the next Skill; finish the Artifact and let the Workflow continue.
