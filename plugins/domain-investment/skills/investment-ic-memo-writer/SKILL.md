---
name: investment-ic-memo-writer
description: Use when accepted investment-workflow Artifacts must be assembled into a decision-ready IC Memo with recommendation, product and market analysis, economics, valuation, scorecard, risks, DD priorities, thesis tracking, and explicit evidence gaps.
---

# Investment IC Memo Writer

Assemble the accepted investment package into one decision-ready Memo. Standalone and workflow invocations have the same completeness, provenance, contradiction, and editorial quality bar. This is an assembly Skill, not a late research or analysis escape hatch.

## Scope and ownership

This Skill may reorganize and clarify accepted upstream work. It must not search, fetch new facts, calculate missing analysis, select new peers, rescore the case, repair valuation, resolve an unsupported contradiction by preference, or invoke another Skill.

- **Standalone:** require the equivalent complete source, fact, product, market, economics, scorecard, valuation, DD, and thesis materials from the user.
- **Managed workflow:** consume every accepted Artifact revision from `01-source-intake.md` through `09-thesis-tracking.md`; all nine inputs are mandatory.
- **Artifact:** write one independently readable `artifacts/10-ic-memo.md`.
- `references/memo-assembly.md`, `references/quality-checklist.md`, and the conditional PE addendum are internal writing and review methods, not independent Skills or reviewers.

## Input preflight and rejection

Before drafting, verify all nine input Artifacts and their completion records. Check that:

- each required Artifact exists at the revision bound by the Host;
- each is `READY` or accepted `READY-WITH-GAPS`, never `REWORK`;
- material facts, judgments, assumptions, unknowns, counterevidence, units, periods, and sources remain distinguishable;
- scorecard arithmetic, valuation ranges, DD priorities, and thesis triggers are present and mutually traceable;
- accepted gaps include `attemptRefs`, the Plan-frozen `boundedAttempts.limit`, used attempts, `exhausted=true`, reason, decision impact, fallback, and revisit trigger.

If an input is thin, missing, stale, unsupported, or materially contradictory, stop. Name the exact obligation, business impact, responsible nodeId, and required correction; return `REWORK` to the current Host owner. Do not silently patch the gap, and do not default responsibility to the immediately preceding node.

An upstream difference in judgment may be preserved and explained. A conflict in the same material fact, unit, period, score, or valuation basis that prevents a coherent recommendation must be rejected first.

## Assembly method

1. Lead with recommendation, rationale, return logic, strongest evidence, decisive risks, and explicit conditions.
2. Trace every material figure and conclusion to its originating Artifact revision. Preserve the valuation date, currency, units, and scenario labels.
3. Keep facts, judgments, assumptions, unknowns, and counterevidence visibly separate.
4. Preserve material disagreement between upstream nodes and identify the decision it creates; never harmonize it silently.
5. Propagate all accepted gaps into the relevant section and the final verification-gaps section.
6. Use tables only where they improve comparison of scenarios, scores, risks, DD priorities, or monitoring triggers.
7. End with `Proceed`, `Conditional proceed`, `Watch`, or `Pass`; every condition must name the evidence or action that resolves it.

## Required Memo structure

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
14. Artifact Provenance
15. Completion Record
```

Completion record:

```text
Status: READY | READY-WITH-GAPS | REWORK
Inputs consumed: accepted revisions of 01 through 09
Obligations checked:
Counterevidence preserved:
Unknowns propagated:
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

`READY-WITH-GAPS` is valid only when every gap was already accepted upstream, remains explicit, and does not make the recommendation internally incoherent. Memo incompleteness is never converted into `READY-WITH-GAPS`; it is `REWORK`.

## Direct consumer acceptance

If the frozen Plan includes visualization, the direct consumer is `investment-visual-report`; otherwise the Workflow final-delivery contract is the consumer. The consumer must be able to verify the recommendation, score, valuation, risks, DD, thesis, and limitations against 01–09 without discovering a third set of conclusions.

Return the Artifact, status, and consumer notes to the current Host owner. **Never call `investment-visual-report` or any other next Skill yourself.**
