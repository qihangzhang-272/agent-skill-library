---
name: investment-visual-report
description: Use when a completed investment IC Memo must be presented as a polished, single-file HTML visual research report or webpage without changing its analysis, recommendation, score, valuation, risks, or evidence gaps.
---

# Investment Visual Report

Transform an accepted IC Memo into a single-file, zero-dependency, fully expanded HTML report. Standalone and workflow invocations have the same fidelity, completeness, accessibility, and responsive-layout quality bar; visualization never creates a third analytical product.

## Scope and source hierarchy

This Skill owns presentation only. It never researches, fills analytical gaps, repairs the Memo, changes a conclusion, or invokes another Skill.

- **Standalone:** consume one completed Memo plus its cited evidence package when available.
- **Managed workflow:** consume accepted revisions of `01-source-intake.md` through `10-ic-memo.md` named by the Host.
- **Sole conclusion source:** `10-ic-memo.md`. Artifacts 01–09 may be read only to verify provenance, completeness, and consistency; they may not supply a conclusion or section omitted from the Memo.
- **Artifact:** write one `artifacts/11-visual-report.html` in the user's Run folder, never in this plugin repository.
- Design references, components, template, and checklist are internal presentation methods, not independently callable Skills or frontend workflows.

## Memo acceptance gate

Before creating HTML, compare the Memo's recommendation, scores, valuation basis, scenarios, material risks, DD priorities, thesis triggers, sources, and accepted gaps against 01–09.

Reject the Memo when:

- a material value or conclusion conflicts with its upstream source;
- an upstream accepted gap disappears or becomes a fact;
- a required Memo section is absent or too thin to visualize faithfully;
- the Memo is `REWORK`, lacks a completion record, or cites an unbound revision.

Return `REWORK` to the current Host owner with the exact Memo obligation and conflict. Do not choose which version is true, pull a preferred conclusion from 01–09, or generate HTML pending correction.

## Presentation method

1. Read `references/design-system.md` and start from `assets/report-template.html`.
2. Map the Memo's natural order into fully expanded sections: summary, product, market, economics, valuation, scorecard, risks, DD, thesis/watch triggers, sources, and gaps.
3. Use `references/components.md` only for content actually present in the Memo. Delete unused placeholders.
4. Preserve exact verdict, score, units, periods, scenario labels, citations, uncertainty labels, and section meaning.
5. Keep all CSS inline; use no external scripts, stylesheets, fonts, CDNs, build tools, or runtime dependencies.
6. Keep decision-critical content visible without tabs, accordions, or nested disclosure. Use semantic HTML, readable contrast, responsive tables/grids, and print-safe layout.
7. Run every item in `references/quality-checklist.md` before returning the Artifact.

## Artifact and completion contract

The only business Artifact is `11-visual-report.html`. It must open offline and contain the complete accepted Memo without a second recommendation layer.

Return this completion record to the Host with the Artifact; do not create another business file:

```text
Status: READY | READY-WITH-GAPS | REWORK
Inputs consumed: accepted revisions of 01 through 10
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

- `READY`: the HTML faithfully and completely represents the accepted Memo and passes presentation checks.
- `READY-WITH-GAPS`: only gaps already accepted and displayed in the Memo remain; presentation itself has no unresolved defect.
- `REWORK`: Memo fidelity, completeness, provenance, offline operation, accessibility, responsiveness, or visual correctness fails.

## Direct consumer acceptance

The direct consumer is the Workflow final-delivery contract. It verifies offline opening, single-file packaging, complete Memo coverage, exact conclusion fidelity, readable desktop/mobile/print rendering, and visible evidence gaps.

Return the Artifact, status, and consumer notes to the current Host owner. **Never call another Skill, start a remediation workflow, or alter the upstream Memo yourself.**
