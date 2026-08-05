---
name: investment-competitive-landscape
description: Build the market and competitive landscape layer for an AI investment memo. Use when an IC memo, investment memo, product investment report, or AI case review needs market sizing, competitor mapping, positioning, moat assessment, bull/base/bear scenarios, or why-now context.
---

# Investment Competitive Landscape

Answer what market the case is in, who matters, and why the company can or cannot win. Standalone and workflow use apply the same market definition, competitor coverage, comparability, moat, counterevidence, and scenario standards.

## References

Read as relevant internal methods:

- `references/competitive-analysis.md` for mapping, positioning, moat, and bull/base/bear scenarios.
- `references/frameworks.md` for 2x2 matrix axes.
- `references/schemas.md` for M&A and scenario tables.
- `references/sector-overview.md` for sector size, value chain, drivers, and structure.
- `references/idea-generation.md` for thematic sweep and shortlist logic.
- `references/market-researcher-agent.md` for integrating sector, landscape, comparable evidence, and thematic candidates. The legacy filename is not a separate Agent.

Do not invoke references or another analytical capability as a Skill from this node.

## Input and rework

In the investment Workflow, read `02-fact-pack.md` and `03-product-judgment.md`; write one independent `04-competitive-landscape.md`.

If source facts or product judgments are materially insufficient, tell the Host which responsible Skill must add what and why; do not invisibly reconstruct the responsible analysis. For unavailable market or competitor facts, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it, then continue.

## Output

```text
Market definition
Industry-defining metrics
Market size / growth
Value chain
Competitor universe and grouping
Positioning visualization
Target company position
Moat assessment
Bull / base / bear
Strategic context
Competitive risks
Counterevidence and disconfirming cases
Evidence references and periods
Assumptions
Unknowns and decision impact
```

Every market number and competitor metric needs a dated source and comparable definition. Show missing data as unknown or a labeled estimate with basis. Market definition, universe construction, moat tests, and scenarios must still be completed.

Do not invoke the next Skill; finish the Artifact and let the Workflow continue.
