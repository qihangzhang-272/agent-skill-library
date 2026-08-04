---
name: investment-research
description: Collect and organize source-backed facts before AI investment analysis. Use before IC memo, investment memo, AI case investment review, DD prep, or visual investment report when product, company, financing, customer, pricing, competitor, GitHub, or market facts are missing. This skill deposits facts only and does not write investment conclusions.
---

# Investment Research

Collect the fact pack before investment judgment.

Standalone use and managed-workflow use MUST apply the same fact, source, counterevidence, and unknown-handling standard. A workflow may bind inputs and an Artifact path, but it never permits a shorter analysis.

## Rules

- Separate facts from judgments.
- Use current sources for financing, customers, pricing, competitors, GitHub data, team, and market size.
- Default search and access tool: `agent-reach`. Treat GitHub, company官网, 工商/招投标, 公众号/知乎, 抖音/小红书/微博/B站, LinkedIn, Reddit/X, YouTube 等平台为 agent-reach 的 reach surfaces，而不是独立的强制搜索步骤；只有当 agent-reach 不可用、覆盖不全、或用户明确要求直连某平台时，才退回到直接平台命令或普通 web 搜索。See `references/agent-reach-search.md`.
- Mark every key fact with source URL or `not found`.
- Do not write the IC memo here.
- Do not decide invest / pass here.
- Treat reference files as internal methods of this Skill, never as nested Skills or Agents.
- Return the completed fact pack to the current Host owner; never invoke the next Skill.

## References

Read only when needed:

- `references/agent-reach-search.md` for the default agent-reach reach layer, source surfaces, depth, and fallback policy.
- `references/public-company-research.md` for public-company filings, management, industry, competitive, and risk fact collection.
- `references/deal-sourcing.md` for target discovery, company shortlists, founder/company outreach context, or sourcing logic.
- `references/funding-digest.md` and `references/sector-seeds.md` for funding rounds, capital-market activity, sector watchlists, and deal-flow summaries.

## Managed Workflow Contract

When the frozen Workflow binds this node, consume exactly `node-output:source-intake`, including its accepted `01-source-intake.md` Artifact and Handoff. Do not proceed from an unaccepted or stale input.

Produce exactly one independent node Artifact: `artifacts/02-fact-pack.md`.

The direct consumer is `investment-ai-product-judgment`. It must accept all required quality obligations and handoff sections. If it rejects the fact pack, revise this node’s Artifact and return it for acceptance; do not let another Skill silently fill the missing research.

## Fact Pack Output

```text
Status: READY / READY-WITH-GAPS / REWORK
Research object:
Object type:
Core investment question:
Materials reviewed:
Reference methods used and why:
Product facts:
Business facts:
Technical / OSS facts:
Market and competitor facts:
Funding and ownership facts:
Customer / traction facts:
Contradictions and counterevidence:
Assumptions:
Unknowns with attempts and decision impact:
  attemptRefs:
  boundedAttempts:
    limit:
    used:
    exhausted:
  reason:
  decisionImpact:
  fallback:
  revisitTrigger:
Source list:
Handoff for investment-ai-product-judgment:
```

Each key fact must have an evidence reference. Keep company claims, third-party claims, verified facts, assumptions, and judgments visibly separate. Do not infer a missing metric from peers or treat `not found` as zero.

Completion states:

- `READY`: all required fact-pack obligations are satisfied.
- `READY-WITH-GAPS`: a genuinely unavailable external fact remains; copy the Plan-frozen attempt limit, record used attempts and `exhausted=true`, then record attempt references, reason, decision impact, fallback, and revisit trigger.
- `REWORK`: research, provenance, required coverage, or fact/claim separation is incomplete and can still be corrected.

The Artifact is not complete merely because the file exists. After the consumer accepts it, return control to the current Host owner. Do not invoke `investment-ai-product-judgment`, an orchestrator, or any later Skill, and do not advance the Workflow yourself.
