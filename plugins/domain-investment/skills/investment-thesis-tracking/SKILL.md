---
name: investment-thesis-tracking
description: Use when an investment case, portfolio company, public company, AI product, or open-source project needs a falsifiable thesis, disconfirming evidence, KPI watch plan, catalyst register, conviction updates, or exit and stop-tracking triggers.
---

# Investment Thesis Tracking

Define how the case can be proved stronger, weaker, or wrong. Standalone and managed-workflow invocations use the same falsifiability, evidence, and monitoring quality bar; workflow use cannot collapse this into a few generic watch bullets.

## Scope and ownership

This Skill converts accepted analysis and DD gaps into a monitoring thesis. It does not create the IC Memo first, fetch new earnings, operate an external calendar, persist cross-session state, repair upstream work, or invoke another Skill.

- **Standalone:** consume the user-supplied thesis, case materials, and dated updates.
- **Managed workflow:** consume the accepted revisions of `02-fact-pack.md` through `08-dd-questions.md` named by the Host.
- **Artifact:** write one independently readable `artifacts/09-thesis-tracking.md`.
- References are internal methods for thesis formation, catalysts, portfolio variance, earnings preview, and earnings updates. They are not hidden Skills, Agents, search workflows, document generators, or external services.

For time-sensitive updates, use only dated evidence supplied in the accepted inputs. If the latest required period is absent, identify the upstream evidence gap and return `REWORK` or a properly bounded `READY-WITH-GAPS`; do not launch research from this node.

## Internal methods

- `references/thesis-tracker.md`: thesis pillars, risks, conviction, and update logic.
- `references/catalyst-calendar.md`: an internal dated event register with expected thesis impact; no external-calendar dependency.
- `references/portfolio-monitoring.md`: plan-versus-actual KPI and variance analysis.
- `references/earnings-preview.md` and `references/earnings-analysis*`: use only when accepted inputs contain a relevant public-company period; extract the period-verification, beat/miss, guidance, estimate, and thesis-impact methods into this Artifact rather than producing a separate report.

## Analytical obligations

1. **Freeze the starting state.** State as-of date, current recommendation/conviction, investment horizon, input Artifact revisions, and any accepted gaps being propagated.
2. **Write a falsifiable thesis.** Express the core claim and 3–5 pillars. Each pillar needs supporting evidence, counterevidence, an observable KPI or event, an expected direction/time window, and a condition that weakens or falsifies it.
3. **Map DD into monitoring.** Convert unresolved P0/P1 questions into explicit verification triggers; never relabel an unanswered DD item as a thesis fact.
4. **Define KPI monitoring.** Record metric definition, baseline, source Artifact, cadence, threshold, direction, and action. Avoid proxy drift.
5. **Build the catalyst register.** Record event/date or window, expected thesis impact, confirmation/disconfirmation signal, dependency, and post-event action. Dates may be unknown; uncertainty must be explicit.
6. **Set conviction rules.** Define what upgrades, maintains, reduces, or invalidates conviction. Separate business evidence from price movement or narrative noise.
7. **Define exit/stop conditions.** Include thesis-break, governance, financing, technical, competitive, valuation, and opportunity-cost triggers as applicable.
8. **Handle dated updates.** For earnings or portfolio updates, verify period labels, compare actual versus expectation/plan, explain variance, update affected pillars, and retain source/date lineage.

## Artifact contract

`09-thesis-tracking.md` must contain:

```text
Starting state and input revisions
Falsifiable thesis statement
Pillar evidence / counterevidence matrix
DD-to-monitoring map
KPI monitoring plan
Catalyst register
Conviction update rules
Exit / stop-tracking triggers
Dated update method, when applicable
Accepted gaps and revisit conditions
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

Use `READY-WITH-GAPS` only to propagate unavailable external metrics or events after the Plan-frozen limit; record used attempts, `exhausted=true`, fallback, and revisit trigger. Use `REWORK` when pillars are not falsifiable, triggers lack thresholds/actions, dated claims lack dates, or upstream gaps are silently converted into facts.

## Direct consumer acceptance

The direct workflow consumer is `investment-ic-memo-writer`. It must be able to assemble the thesis, disconfirming evidence, DD dependencies, watch triggers, and stop conditions without inventing monitoring logic.

Return the Artifact, status, and consumer notes to the current Host owner. **Never call `investment-ic-memo-writer`, `investment-visual-report`, or another next Skill yourself.**
