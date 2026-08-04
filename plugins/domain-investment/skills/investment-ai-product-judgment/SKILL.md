---
name: investment-ai-product-judgment
description: Run the library's AI-native product judgment inside the investment workflow. Use after facts are collected and before market, unit economics, scorecard, DD, or IC memo writing. This skill evaluates whether the AI product is genuinely AI-native, commercially coherent, narratively clear, and product/BP-valid.
---

# Investment AI Product Judgment

This node answers: does the AI product itself make sense?

Standalone use and managed-workflow use MUST execute the same BP logic, AI-native tests, relevant specialist methods, evidence discipline, and counterargument work. Workflow use cannot collapse this Skill into a short opinion.

## References

Always read as an internal method:

- `references/ai-product-analyzer.md`

Read selectively as internal methods:

- `references/business-model.md` for pricing, inference cost, revenue quality, subscription vs usage, margin, bundling, or business-model risk.
- `references/data-agent.md` for data agent, BI, Text-to-SQL, enterprise data workflow, context layer, or analytics agent products.
- `references/narrative-audit.md` for positioning, pitch deck, NOT positioning, narrative line, or old-paradigm packaging risk.

Reference files do not create nested Skill or Agent calls. Apply their methods inside this Skill and record which ones were used.

## Managed Workflow Contract

When the frozen Workflow binds this node, consume exactly `node-output:fact-pack`, including the accepted `02-fact-pack.md` Artifact and Handoff. Reject a thin, stale, or unsupported fact pack instead of silently performing the missing upstream research.

Produce exactly one independent node Artifact: `artifacts/03-product-judgment.md`.

The direct consumer is `investment-competitive-landscape`. It must accept every required obligation and handoff section. A rejection returns to this node as `REWORK`; the contract must not be weakened for workflow convenience.

## Output

```text
Status: READY / READY-WITH-GAPS / REWORK
AI-native product judgment:
Reference usage:
One-sentence positioning:
Problem validity:
Solution validity:
Product form:
Why now:
Market fit:
Business model:
Competition:
Traction:
Team / GTM:
Financial / ask:
Verdict: good case / bad case / watch
Strongest product argument:
Weakest product gap:
Best counterargument and response:
Narrative line:
Evidence references:
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
Handoff for investment-competitive-landscape:
```

Every material judgment must point to evidence in the accepted fact pack or be labeled as an assumption. Missing evidence must remain unknown; do not manufacture product, traction, pricing, or team facts.

Completion states:

- `READY`: the full product-judgment obligations are met and evidence-backed.
- `READY-WITH-GAPS`: only a genuinely unavailable external fact may remain; propagate the Plan-frozen limit, used attempts, `exhausted=true`, and its explicit effect on the verdict. Missing analysis is always `REWORK`.
- `REWORK`: a required analysis section, evidence mapping, counterargument, or applicable internal method is missing but can be completed.

After consumer acceptance, return control to the current Host owner. Do not invoke `investment-competitive-landscape`, any reference as a Skill, or any later node, and do not advance the Workflow yourself.
