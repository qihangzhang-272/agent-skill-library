# Internal Method: Earnings Preview

Use this method inside `investment-thesis-tracking` only when accepted inputs contain the required dated company, consensus, and thesis evidence. It does not launch a search or produce a separate earnings document.

## Verify the setup

State company/ticker, fiscal quarter and year, expected report date, as-of date, consensus-source date, current recommendation/conviction, and input revisions. Fiscal period must come from supplied company evidence, not inference from the calendar date.

If the relevant period or consensus basis is missing or stale, record the responsible evidence gap and return `REWORK` or a bounded `READY-WITH-GAPS` through the Host.

## Establish expectations

Capture:

- revenue, EPS or profit, and guidance expectations;
- segment, geography, product, or KPI expectations that matter to the thesis;
- buy-side or management hurdle when explicitly evidenced;
- prior guidance and the assumptions embedded in consensus;
- recent operational signals already present in accepted inputs.

Date every expectation and keep company guidance, market consensus, and analyst assumption separate.

## Define thesis-linked watch items

For each key item state:

```text
Metric / topic:
Consensus or prior expectation:
Affected thesis pillar:
Bull signal:
Base signal:
Bear signal:
Management question:
Potential valuation / conviction impact:
```

## Scenario framing

Build bull/base/bear cases around actual drivers: demand, retention, price/mix, margin, unit cost, guidance, financing, or product execution. Do not define scenarios solely as arbitrary EPS beats or misses.

For each scenario, state expected evidence, thesis impact, valuation implication, and likely action. Price-reaction estimates are optional and must be clearly labeled as assumptions.

## Risk and asymmetry

Identify crowded expectations, easy-to-game KPIs, one-off comparability issues, seasonality, reporting-definition changes, and evidence that could invalidate the setup even if headline results beat.

## Completion test

The preview is ready when period/date/source lineage is explicit, expectations are separated by type, watch items map to thesis pillars, and each scenario has observable signals and actions. Its output is a subsection of `09-thesis-tracking.md`.
