---
name: investment-ic-memo-writer
description: Write the final library-standard investment committee memo from completed investment workflow node outputs. Use only after fact collection, AI product judgment, competitive landscape, unit economics, scorecard, valuation, DD, and thesis tracking have produced handoffs. This skill does not search or create new analysis.
---

# Investment IC Memo Writer

This is the final writing node for `domain-investment`.

It consumes completed node outputs. It must not search for new facts or invent missing analysis.

## References

Read when relevant:

- `references/memo-assembly.md` for final assembly rules.
- `references/pe-deal-addendum.md` only for PE deal terms, value creation, and 100-day planning.
- `references/quality-checklist.md` before delivery.

## Required Memo Structure

```text
1. Executive Summary
2. Investment Recommendation
3. Company / Product Overview
4. AI-native Product Judgment
5. Market & Competitive Landscape
6. Business Model & Unit Economics
7. Technical / OSS / Ecosystem Moat
8. Valuation / Return Logic
9. Investment Scorecard
10. Key Risks & One-Vote Veto
11. Due Diligence Priorities
12. Thesis Tracking & Watch Triggers
13. Sources, Unknowns, Verification Gaps
```

## Rules

- Keep facts, judgments, assumptions, and unknowns visibly separate.
- Preserve upstream node judgments. Reorganize them, but do not erase contradictions.
- Do not downgrade the memo into a scorecard-only output.
- Do not hide weak points. IC memo credibility depends on explicit risks.
- If a section lacks evidence, write `not enough evidence` and list what is missing.
