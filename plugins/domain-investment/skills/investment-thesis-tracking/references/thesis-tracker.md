# Internal Method: Thesis Formation and Update

Use this method inside `investment-thesis-tracking`. It is not an independent Skill, portfolio service, or cross-session state store.

## Define the thesis

Record:

- object, instrument or case type, and as-of date;
- current recommendation or conviction and investment horizon;
- one falsifiable thesis statement;
- 3–5 supporting pillars;
- 3–5 material risks or disconfirming conditions;
- valuation or return condition when applicable;
- exit, pass, or stop-tracking condition.

Each pillar must have:

```text
Claim:
Supporting Artifact evidence:
Counterevidence:
Metric or event:
Baseline and expected direction:
Time window:
Strengthening threshold:
Weakening threshold:
Falsification condition:
Action if triggered:
```

A statement that cannot be disproved is not a thesis pillar.

## Convert DD gaps into monitoring

Map each unresolved P0/P1 DD item to a pillar, trigger, evidence request, owner/source, and decision consequence. An unanswered question remains an unknown; it is never promoted to an assumption or fact simply because monitoring begins.

## Update logic

For each dated development:

```text
Date / period:
New evidence:
Source Artifact:
Affected pillar:
Impact: strengthens | weakens | neutral | falsifies
Reason:
Updated conviction:
Required action:
Next verification:
```

Compare the new data to the original expectation and baseline. Do not rewrite the original thesis to make every outcome look consistent.

## Pillar scorecard

Use a compact matrix:

| Pillar | Original expectation | Current evidence | Counterevidence | Status | Trend | Next trigger |
| --- | --- | --- | --- | --- | --- | --- |

Status may be `on track`, `at risk`, `failed`, or `unknown`. Conviction changes must follow the stated rules rather than sentiment.

## Monitoring discipline

- Track disconfirming evidence as rigorously as confirming evidence.
- Separate operating performance, valuation, technical progress, governance, and market narrative.
- Keep metric definitions stable; if a definition changes, show both old and new bases.
- Date every update and retain its input revision.
- Use the dated Artifact as the durable record; do not assume hidden memory across sessions.
- A review cadence is a commitment to inspect evidence, not proof that evidence exists.

## Completion test

The method is complete when each material pillar is falsifiable, each trigger has a threshold and action, DD gaps remain explicit, and exit/stop conditions are concrete enough for another reader to apply.
