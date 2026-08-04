---
name: investment-unit-economics
description: Analyze business model quality, revenue quality, customer economics, AI readiness, and value creation for AI investment cases. Use when an IC memo needs ARR, NDR, LTV/CAC, CAC payback, gross margin, inference cost, pricing, revenue concentration, pilot readiness, or value creation logic.
---

# Investment Unit Economics

This node answers: can the business turn product value into durable economics?

Standalone use and managed-workflow use MUST apply the same calculation, segmentation, evidence, benchmark, AI-cost, deployment-gate, and value-creation standards. Workflow use cannot replace the analysis with a few summary metrics.

## References

Read when relevant as internal methods of this Skill:

- `references/unit-economics.md` for ARR, cohorts, LTV/CAC, retention, revenue quality, and margin waterfall.
- `references/ai-readiness.md` for data readiness, owner, 30-day pilot, and deployment realism.
- `references/value-creation-plan.md` for revenue, margin, operations, and EBITDA value-creation levers.

References are methods, not nested Skills. Apply them within this node; do not invoke another Agent, MCP workflow, spreadsheet Skill, document Skill, or presentation Skill.

## Managed Workflow Contract

When the frozen Workflow binds this node, consume exactly:

- `node-output:fact-pack` (`02-fact-pack.md`);
- `node-output:product-judgment` (`03-product-judgment.md`);
- `node-output:competitive-landscape` (`04-competitive-landscape.md`).

All three inputs must be accepted and current. Reject missing upstream evidence or judgments to the responsible node; do not silently reconstruct them here.

Produce exactly one independent node Artifact: `artifacts/05-unit-economics.md`.

The direct consumer is `investment-scorecard`. It must accept all required quality obligations and handoff sections. Rejection returns this node to `REWORK` with the missing obligation and required supplement.

## Output

```text
Status: READY / READY-WITH-GAPS / REWORK
Business model:
Pricing model:
Revenue quality:
Customer economics:
Retention / expansion:
CAC and payback:
Gross margin / inference cost:
Customer concentration:
AI readiness / deployment gate:
Value creation levers:
Risks:
Formula and calculation register:
Benchmark basis and comparability limits:
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
Handoff for investment-scorecard:
```

For every material metric, provide the value, formula or definition, period, segment, and source. If inputs do not support a calculation, mark it unknown and explain the decision impact; never substitute zero, a peer value, or an unexplained benchmark.

Completion states:

- `READY`: all required economic, benchmark, deployment, and value-creation obligations are satisfied.
- `READY-WITH-GAPS`: only an external operating metric or benchmark remains unavailable; copy the Plan-frozen limit, used attempts and `exhausted=true`, and make the missing value, sensitivity, impact, fallback, and revisit trigger explicit. Calculations and required analysis cannot be gaps.
- `REWORK`: calculations, definitions, periods, evidence, segmentation, or applicable internal methods remain incomplete and can be corrected.

After consumer acceptance, return control to the current Host owner. Do not invoke `investment-scorecard`, valuation, memo writing, or any later Skill, and do not advance the Workflow yourself.
