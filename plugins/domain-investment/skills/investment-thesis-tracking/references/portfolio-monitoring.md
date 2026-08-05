# Internal Method: Portfolio and KPI Monitoring

Use this method inside `investment-thesis-tracking` when supplied inputs contain portfolio-company or recurring operating updates. It is not an independent ingestion service, dashboard, or persistent monitoring system.

## Establish the comparison basis

Record company, reporting period, as-of date, currency/units, budget or prior-plan version, actual-data source, prior Artifact, and current thesis pillars.

## KPI families

Tailor to the business:

- financial: revenue, gross profit, EBITDA, cash, burn, runway, working capital, capex;
- recurring software: ARR, new/expansion/contraction/churn, NDR/GRR, CAC, payback, margin;
- usage or marketplace: active users, volume, GMV, take rate, repeat rate, contribution margin;
- AI infrastructure: usage, latency, reliability, utilization, hosting/inference cost, external adoption;
- commercial: pipeline, bookings, win rate, sales cycle, concentration, renewals;
- operating and governance: headcount, milestones, security/compliance, incidents, covenants.

## Variance method

For each KPI:

```text
Definition:
Actual:
Budget / plan / prior expectation:
Absolute and percentage variance:
Prior-period comparison:
Driver:
Recurring or one-time:
Affected thesis pillar:
Management action / owner:
Threshold and next review:
```

Do not compare differently defined metrics. Reconcile actuals to the accepted source and distinguish price, volume, mix, FX, acquisition, and timing where relevant.

## Escalation

Flag:

- runway or covenant pressure;
- repeated forecast misses or metric-definition changes;
- deteriorating retention, concentration, margin, or unit cost;
- delayed product, security, regulatory, or hiring milestones;
- unexplained plan changes or missing support;
- evidence that weakens or falsifies a thesis pillar.

Every escalation must state consequence, mitigant, residual uncertainty, action, and revisit trigger.

## Completion test

Monitoring is ready when material KPIs have stable definitions, dated baselines, variance drivers, thesis linkage, thresholds, and actions. Supplied spreadsheets or PDFs may be evidence, but no output file type is required beyond `09-thesis-tracking.md`.
