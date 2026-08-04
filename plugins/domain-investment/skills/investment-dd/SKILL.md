---
name: investment-dd
description: Use when an investment case needs prioritized diligence questions, red flags, management or expert-call preparation, customer-reference questions, evidence requests, data-room coverage, or one-vote-veto verification.
---

# Investment DD

Turn unresolved investment claims into a prioritized, decision-linked diligence program. Standalone and workflow invocations have the same depth, traceability, and prioritization bar; a workflow DD Artifact is not a generic question list.

## Scope and ownership

This Skill designs diligence. It does not perform the requested diligence, obtain documents, rebuild a data pack, repair upstream analysis, write the thesis or Memo, or invoke another Skill.

- **Standalone:** consume the user's case materials and existing analysis.
- **Managed workflow:** consume the accepted revisions of `02-fact-pack.md` through `07-valuation-returns.md` named by the Host.
- **Artifact:** write one independently readable `artifacts/08-dd-questions.md`.
- References are internal questioning, workstream, and normalization methods. They are not independent Skills, Agents, workbook builders, search flows, or meeting schedulers.

Before drafting, test whether the inputs expose their facts, assumptions, unknowns, counterevidence, scores, and valuation drivers. If a required upstream obligation is absent or contradictory, return `REWORK` to the current Host owner and identify the responsible node. Do not hide the gap inside a broad diligence question.

## Internal methods

- `references/dd-checklist.md`: scope workstreams, status, severity, and sector-specific coverage.
- `references/dd-meeting-prep.md`: construct management, expert, and customer questions with evidence follow-ups.
- `references/datapack-builder.md`: normalize supplied financial and operating evidence, reconcile conflicts, and identify missing support. It does not require or produce a separate spreadsheet in this Skill.

## Analytical obligations

1. **Create an unresolved-claim register.** Trace each material gap to an exact upstream Artifact, claim, assumption, score, veto, or valuation driver.
2. **Prioritize by decision impact.** Use P0 for potential deal-breakers or recommendation-changing evidence, P1 for valuation/term/mitigation changes, and P2 for confirmatory or post-decision work.
3. **Make every question testable.** State the question, why it matters, evidence requested, expected owner/source, acceptable proof, and how each answer changes verdict, score, valuation, risk, or thesis.
4. **Cover applicable workstreams.** Address financial, commercial, product/technology, OSS/IP, security/privacy, legal/regulatory, team/HR, operations, customer, and financing/capital structure; mark non-applicable areas with reasons.
5. **Separate audiences.** Tailor management, expert, and customer-reference questions; do not ask every audience the same generic list.
6. **Build the evidence-request matrix.** Include period, unit, granularity, requested document/data, current status, discrepancy, and follow-up owner. Never treat a request as received evidence.
7. **Escalate risks.** State severity, trigger, consequence, mitigant, residual risk, and whether an existing or potential one-vote veto is implicated.
8. **Define closure.** Specify what would close each P0 item and what would change the current recommendation.

## Artifact contract

`08-dd-questions.md` must contain:

```text
Scope and input revisions
Unresolved-claim register
Prioritized DD question matrix
Workstream coverage
Management questions
Expert questions
Customer-reference questions
Evidence and data-room request matrix
Red flags and one-vote-veto checks
Verdict-changing answers and closure criteria
Counterevidence and remaining unknowns
Completion record
```

Completion record:

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

`READY-WITH-GAPS` means the DD design is complete but propagated external evidence remains unavailable after the Plan-frozen limit; record used attempts and `exhausted=true`. It does not mean generic questions are acceptable. Use `REWORK` when P0 items lack upstream traceability, requested proof, or decision impact.

## Direct consumer acceptance

The direct workflow consumer is `investment-thesis-tracking`. It must be able to convert the accepted DD gaps into falsifiable pillars, watch triggers, and stop conditions without inventing evidence.

Return the Artifact, status, and consumer notes to the current Host owner. **Never call `investment-thesis-tracking`, `investment-ic-memo-writer`, or another next Skill yourself.**
