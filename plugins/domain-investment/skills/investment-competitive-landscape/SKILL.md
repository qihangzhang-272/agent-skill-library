---
name: investment-competitive-landscape
description: Build the market and competitive landscape layer for an AI investment memo. Use when an IC memo, investment memo, product investment report, or AI case review needs market sizing, competitor mapping, positioning, moat assessment, bull/base/bear scenarios, or why-now context.
---

# Investment Competitive Landscape

Every investment memo needs a competitive landscape layer.

This node answers: what market is this case in, who matters, and why this company can or cannot win?

Standalone use and managed-workflow use MUST apply the same market definition, competitor coverage, data comparability, moat tests, counterevidence, and scenario discipline. A workflow may bind inputs and output path, but it cannot abbreviate the analysis.

## References

Read when relevant as internal methods of this Skill:

- `references/competitive-analysis.md` for competitor mapping, positioning, moat assessment, and bull/base/bear scenarios.
- `references/frameworks.md` for 2x2 matrix axes.
- `references/schemas.md` for M&A and scenario tables.
- `references/sector-overview.md` for sector size, value chain, drivers, and market structure.
- `references/idea-generation.md` for thematic sweep and idea shortlist logic.
- `references/market-researcher-agent.md` for integrating sector, landscape, comparable evidence, and thematic-candidate logic inside this Skill. The legacy filename does not denote a separate Agent.

Do not invoke any reference as a Skill or Agent. Do not call a comps, idea-generation, note-writing, or presentation Skill from this node.

## Managed Workflow Contract

When the frozen Workflow binds this node, consume exactly:

- `node-output:fact-pack` (`02-fact-pack.md`);
- `node-output:product-judgment` (`03-product-judgment.md`).

Both inputs must already be accepted and current. If source facts or product judgments are insufficient, reject the responsible upstream obligation instead of filling it invisibly here.

Produce exactly one independent node Artifact: `artifacts/04-competitive-landscape.md`.

The direct consumer is `investment-unit-economics`. It must accept all required quality obligations and handoff sections. A rejection returns this node to `REWORK` with the missing obligation and required supplement.

## Output

```text
Status: READY / READY-WITH-GAPS / REWORK
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
Counterevidence and disconfirming cases:
Evidence references and periods:
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
Handoff for investment-unit-economics:
```

Every market number and competitor metric must have a dated source and comparable definition. Missing data must be shown as unknown or estimate with its basis, never left blank or invented.

Completion states:

- `READY`: required market, competitor, positioning, moat, scenario, and evidence obligations are satisfied.
- `READY-WITH-GAPS`: only external market or competitor data remains unavailable; copy the Plan-frozen limit, used attempts and `exhausted=true`, then record attempts, reason, impact, fallback, and revisit trigger. Market definition, universe construction, moat tests, and scenarios themselves cannot be gaps.
- `REWORK`: the universe, metric definitions, citations, competing explanations, or required synthesis is incomplete and can still be corrected.

After consumer acceptance, return control to the current Host owner. Do not invoke `investment-unit-economics` or any later Skill, and do not advance the Workflow yourself.
