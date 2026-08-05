---
name: investment-thesis-tracking
description: Use when an investment case, portfolio company, public company, AI product, or open-source project needs a falsifiable thesis, disconfirming evidence, KPI watch plan, catalyst register, conviction updates, or exit and stop-tracking triggers.
---

# Investment Thesis Tracking

Define how the case can be proved stronger, weaker, or wrong. Standalone and workflow use share the same falsifiability, evidence, and monitoring quality bar.

## Scope

Convert analysis and DD gaps into a monitoring thesis. Do not create the IC Memo first, fetch new earnings, operate an external calendar, persist cross-session state, repair upstream work, or invoke another Skill.

- Standalone: use the supplied thesis, case materials, and dated updates.
- Workflow: read `02-fact-pack.md` through `08-dd-questions.md`.
- Write one independently readable `09-thesis-tracking.md`.
- Treat references as internal methods, not hidden Skills, Agents, search workflows, document generators, or external services.

For time-sensitive updates use only dated supplied evidence. If a required period or upstream basis is materially absent, tell the Host which responsible Skill must add what and why; do not launch source research from this Skill. For unavailable metrics or events, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it, then continue.

## Internal methods

- `references/thesis-tracker.md`: thesis pillars, risks, conviction, and update logic.
- `references/catalyst-calendar.md`: an internal dated event register; no external-calendar dependency.
- `references/portfolio-monitoring.md`: plan-versus-actual KPI and variance analysis.
- `references/earnings-preview.md` and `references/earnings-analysis*`: when dated public-company evidence is supplied, apply their period verification, beat/miss, guidance, estimate, and thesis-impact methods inside this Artifact.

## Analytical obligations

1. State the as-of date, current recommendation/conviction, horizon, evidence basis, and unresolved uncertainty.
2. Express the core claim and 3–5 falsifiable pillars; connect each to evidence, counterevidence, a KPI/event, time window, and falsification condition.
3. Convert unresolved P0/P1 DD questions into verification triggers; never relabel an unanswered item as fact.
4. Record metric definition, baseline, source, cadence, threshold, direction, and action; avoid proxy drift.
5. Record catalyst date/window, expected impact, confirmation/disconfirmation signal, dependency, and post-event action.
6. Define what upgrades, maintains, reduces, or invalidates conviction; separate business evidence from price or narrative noise.
7. Define applicable thesis-break, governance, financing, technical, competitive, valuation, and opportunity-cost exit triggers.
8. For dated updates verify periods, compare actual versus expectation/plan, explain variance, update affected pillars, and preserve source/date traceability.

## Artifact

```text
Starting state
Falsifiable thesis statement
Pillar evidence / counterevidence matrix
DD-to-monitoring map
KPI monitoring plan
Catalyst register
Conviction update rules
Exit / stop-tracking triggers
Dated update method, when applicable
Unknowns and revisit conditions
```

Do not invoke the next Skill; finish the Artifact and let the Workflow continue.
