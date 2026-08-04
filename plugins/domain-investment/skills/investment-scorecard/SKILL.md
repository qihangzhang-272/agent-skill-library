---
name: investment-scorecard
description: Use when an AI, open-source, infrastructure, or software investment case needs evidence-backed scoring, macro gates, deal screening, veto checks, a pass/watch/recommend verdict, or a scorecard Artifact.
---

# Investment Scorecard

Convert the established fact base and analytical judgments into a reproducible investment decision. A workflow invocation has the same analytical and evidentiary quality bar as a standalone invocation; being one node in a long chain never permits a shorter or thinner scorecard.

## Scope and ownership

This Skill owns scoring and the resulting recommendation. It does not redo source research, repair upstream analysis, perform valuation, write the IC Memo, or dispatch another Skill.

- **Standalone:** consume the materials and decision criteria supplied by the user. Ask for a missing fund mandate or mark it as an explicit limitation; do not invent one.
- **Managed workflow:** consume the accepted revisions of `02-fact-pack.md`, `03-product-judgment.md`, `04-competitive-landscape.md`, and `05-unit-economics.md` named by the Host.
- **Artifact:** write one independently readable `artifacts/06-investment-scorecard.md`. A chat summary or handoff-only stub is not the Artifact.
- The references in this package are internal analytical methods and calibration examples, not separately callable Skills or Agents. Do not route to, install, or invoke them.

If an input is missing, stale, internally contradictory, or too thin to score a material dimension, identify the responsible upstream node and return `REWORK` to the current Host owner. Do not fix the producer's work here.

## Internal methods

Always apply `references/oss-investment-scorecard.md` when the case is OSS or ecosystem-led. Use its five dimensions, macro gate, evidence discipline, threshold calibration, and veto logic. For non-OSS cases, state the adaptation: replace repository/community signals with the closest observable adoption, distribution, integration, and switching-cost evidence; never pretend OSS-only metrics exist.

Load as needed:

- `references/deal-screening.md` for mandate fit and first-pass decision framing;
- `references/scored-examples.md` and `references/cases/*` only for calibration, never as evidence about the current target;
- `references/template/evaluation-template.md` as a completeness aid, not as a substitute for analysis.

## Analytical obligations

1. **Freeze the basis.** State as-of date, currency/units, investment question, stage, fund mandate or screening criteria, and exact input Artifact revisions.
2. **Build the evidence matrix.** For every scored signal, cite an upstream fact or label it `not found`. Distinguish direct evidence, indirect proxy, assumption, and counterevidence.
3. **Run the macro gate first.** Answer each gate separately. If a gate fails, explain why and whether scoring is stopped or retained only for diagnostic value.
4. **Score the five dimensions.** Show the signal-level reasoning, dimension score, weight, and weighted contribution for ecosystem/adoption, team, technical moat/positioning, commercialisation/PMF, and capital/exit path.
5. **Recalculate the total.** The displayed total must equal the visible weighted contributions. Do not change weights silently.
6. **Apply vetoes.** Evaluate every applicable one-vote veto independently of the total; state `not applicable` with a reason where necessary.
7. **Triangulate the verdict.** Reconcile the numeric result, macro gate, vetoes, counterevidence, and mandate fit into `Recommend`, `Recommend with conditions`, `Watch`, or `Pass`.
8. **Make the result actionable.** Name the IC thesis seed, the highest-value DD questions, measurable watch triggers, and the evidence that would change the verdict.

## Artifact contract

`06-investment-scorecard.md` must contain substantive analysis under these headings:

```text
Decision basis and input revisions
Reference use and framework adaptation
Evidence matrix
Macro gate
Dimension scoring and weighted calculation
One-vote veto assessment
Deal-screening verdict and recommendation
Strongest supporting evidence
Counterevidence and principal risks
DD priorities and watch triggers
Completion record
```

The completion record must include:

```text
Status: READY | READY-WITH-GAPS | REWORK
Inputs consumed:
Obligations checked:
Counterevidence:
Unknowns:
  attemptRefs:
  boundedAttempts:
    limit:
    used:
    exhausted:
  reason:
  decisionImpact:
  fallback:
  revisitTrigger:
Next consumer notes:
```

- `READY`: all material obligations are evidenced and internally consistent.
- `READY-WITH-GAPS`: only propagated external-evidence gaps may remain; each unknown has the Plan-frozen limit, used attempts, `exhausted=true`, and all semantic fields above, and a conservative score is still decision-useful.
- `REWORK`: a required input, scoring obligation, arithmetic reconciliation, or material evidence link is missing or contradictory.

## Direct consumer acceptance

The direct workflow consumer is `investment-valuation-returns`. It must be able to trace the recommendation, dimension scores, vetoes, scenario-relevant claims, and gaps to accepted upstream evidence. If it cannot, it rejects this Artifact to the responsible node through the Host.

Return the Artifact, status, and consumer notes to the current Host owner. **Never call `investment-valuation-returns`, `investment-dd`, or any other next Skill yourself.**
