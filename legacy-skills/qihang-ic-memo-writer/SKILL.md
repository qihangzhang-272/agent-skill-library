---
name: qihang-ic-memo-writer
description: Write the final Qihang-style investment committee memo from completed investment workflow node outputs. Use only after fact collection, AI product judgment, competitive landscape, unit economics, scorecard, valuation, DD, and thesis tracking have produced handoffs. This skill does not search or create new analysis.
---

# Qihang IC Memo Writer

This is the final writing node for `agent-investment`.

It consumes completed node outputs. It must not search for new facts or invent missing analysis.

## References

Read when relevant:

- `references/ic-memo.md` for PE IC memo structure.
- `references/initiating-coverage.md` and `references/initiating-coverage/*` for institutional research report assembly.
- `references/strip-profile.md`, `references/tear-sheet.md`, and `references/tear-sheet/*` for company profile and fact-sheet density.
- `references/cim-builder.md`, `references/teaser.md`, `references/pitch-deck.md`, and `references/pitch-deck/*` for banking-style material organization.
- `references/ib-check-deck.md` for professional quality checks.
- `references/funding-digest.md`, `references/funding-digest/*`, and `references/earnings-preview-beta.md` for capital markets and mature-company event framing.

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
