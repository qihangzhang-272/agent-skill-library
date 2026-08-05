---
name: investment-scorecard
description: Use when an AI, open-source, infrastructure, or software investment case needs evidence-backed scoring, macro gates, deal screening, veto checks, a pass/watch/recommend verdict, or a scorecard Artifact.
---

# Investment Scorecard

Convert the established fact base and analytical judgments into a reproducible investment decision. Workflow position never permits a shorter or thinner scorecard.

## Scope

Own scoring and the resulting recommendation. Do not redo source research, repair upstream analysis, perform valuation, write the IC Memo, or dispatch another Skill.

- Standalone: use the materials and decision criteria supplied by the user; ask for a missing fund mandate or mark it as a limitation.
- Workflow: read `02-fact-pack.md`, `03-product-judgment.md`, `04-competitive-landscape.md`, and `05-unit-economics.md`.
- Write one independently readable `06-investment-scorecard.md`.
- Treat package references as internal methods and calibration examples, not callable Skills or Agents.

If an input is materially missing or contradictory, tell the Host which responsible Skill must add what and why; do not fix the producer’s work here. For genuinely unavailable information, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it, then continue conservatively.

## Internal methods

Always apply `references/oss-investment-scorecard.md` for OSS or ecosystem-led cases. For non-OSS cases, replace repository/community signals with observable adoption, distribution, integration, and switching-cost evidence; never pretend OSS-only metrics exist.

Read as needed:

- `references/deal-screening.md` for mandate fit and first-pass framing.
- `references/scored-examples.md` and `references/cases/*` for calibration only, never evidence about the target.
- `references/template/evaluation-template.md` as a completeness aid, not a substitute for analysis.

## Analytical obligations

1. State the as-of date, currency/units, investment question, stage, and supplied fund criteria.
2. Cite each scored signal or label it `not found`; distinguish evidence, proxy, assumption, and counterevidence.
3. Run every macro gate separately before scoring.
4. Show reasoning, dimension score, weight, and contribution for adoption, team, moat/positioning, commercialisation/PMF, and capital/exit path.
5. Recalculate the visible total and never change weights silently.
6. Evaluate every applicable veto independently; explain `not applicable` results.
7. Reconcile score, gates, vetoes, counterevidence, and mandate fit into `Recommend`, `Recommend with conditions`, `Watch`, or `Pass`.
8. Name the IC thesis seed, highest-value DD questions, measurable watch triggers, and evidence that would change the verdict.

## Artifact

```text
Decision basis
Reference use and framework adaptation
Evidence matrix
Macro gate
Dimension scoring and weighted calculation
One-vote veto assessment
Deal-screening verdict and recommendation
Strongest supporting evidence
Counterevidence and principal risks
DD priorities and watch triggers
Unknowns and decision impact
```

Do not invoke the next Skill; finish the Artifact and let the Workflow continue.
