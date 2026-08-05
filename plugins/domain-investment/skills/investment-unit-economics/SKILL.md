---
name: investment-unit-economics
description: Analyze business model quality, revenue quality, customer economics, AI readiness, and value creation for AI investment cases. Use when an IC memo needs ARR, NDR, LTV/CAC, CAC payback, gross margin, inference cost, pricing, revenue concentration, pilot readiness, or value creation logic.
---

# Investment Unit Economics

Answer whether product value can become durable economics. Standalone and workflow use apply the same calculation, segmentation, evidence, benchmark, AI-cost, deployment-gate, and value-creation standards.

## References

- Read `references/unit-economics.md` for ARR, cohorts, LTV/CAC, retention, revenue quality, and margin waterfall.
- Read `references/ai-readiness.md` for data readiness, ownership, 30-day pilot, and deployment realism.
- Read `references/value-creation-plan.md` for revenue, margin, operations, and EBITDA value-creation levers.

References are internal methods, not nested Skills. Do not invoke another Agent, MCP workflow, spreadsheet Skill, document Skill, or presentation Skill.

## Input and rework

In the investment Workflow, read `02-fact-pack.md`, `03-product-judgment.md`, and `04-competitive-landscape.md`; write one independent `05-unit-economics.md`.

If an input lacks material evidence or judgment, tell the Host which responsible Skill must add what and why; do not reconstruct the responsible analysis. For unavailable operating metrics or benchmarks, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it, then continue.

## Output

```text
Business model
Pricing model
Revenue quality
Customer economics
Retention / expansion
CAC and payback
Gross margin / inference cost
Customer concentration
AI readiness / deployment gate
Value creation levers
Risks
Formula and calculation register
Benchmark basis and comparability limits
Evidence references and periods
Assumptions
Unknowns and decision impact
```

For every material metric provide value, formula or definition, period, segment, and source. If the data cannot support a calculation, mark it unknown and explain the impact; never substitute zero, a peer value, or an unexplained benchmark. Complete the required calculations and analytical methods wherever inputs permit.

Do not invoke the next Skill; finish the Artifact and let the Workflow continue.
