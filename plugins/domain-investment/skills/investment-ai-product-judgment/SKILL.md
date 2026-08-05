---
name: investment-ai-product-judgment
description: Run the library's AI-native product judgment inside the investment workflow. Use after facts are collected and before market, unit economics, scorecard, DD, or IC memo writing. This skill evaluates whether the AI product is genuinely AI-native, commercially coherent, narratively clear, and product/BP-valid.
---

# Investment AI Product Judgment

Answer whether the AI product itself makes sense. Standalone and workflow use execute the same BP logic, AI-native tests, specialist methods, evidence discipline, and counterargument work.

## References

Always read `references/ai-product-analyzer.md` as an internal method.

Read selectively:

- `references/business-model.md` for pricing, inference cost, revenue quality, subscription vs usage, margin, bundling, or business-model risk.
- `references/data-agent.md` for data agents, BI, Text-to-SQL, enterprise data workflows, context layers, or analytics agents.
- `references/narrative-audit.md` for positioning, pitch deck, NOT positioning, narrative line, or old-paradigm packaging risk.

References do not create nested Skill or Agent calls. Apply their methods inside this Skill and state which ones were used.

## Input and rework

In the investment Workflow, read `02-fact-pack.md` and write one independent `03-product-judgment.md`.

If the fact pack is materially thin, stale, or unsupported, tell the Host which responsible Skill must add what and why; do not perform missing source research here. If a fact remains unavailable after reasonable checks, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it, then continue without inventing facts.

## Output

```text
AI-native product judgment
Reference usage
One-sentence positioning
Problem validity
Solution validity
Product form
Why now
Market fit
Business model
Competition
Traction
Team / GTM
Financial / ask
Verdict: good case / bad case / watch
Strongest product argument
Weakest product gap
Best counterargument and response
Narrative line
Evidence references
Assumptions
Unknowns and decision impact
```

Every material judgment must point to evidence in the fact pack or be labeled as an assumption. Complete every applicable analytical section; unavailable evidence is a gap, while missing analysis requires correction.

Do not invoke the next Skill; finish the Artifact and let the Workflow continue.
