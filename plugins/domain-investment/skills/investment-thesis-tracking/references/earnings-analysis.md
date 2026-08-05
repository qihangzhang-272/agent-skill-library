# Internal Method: Earnings and Dated Results Analysis

Use this method inside `investment-thesis-tracking` for a mature or public-company update when supplied inputs contain the relevant dated materials. It is not an independent Skill, search routine, chart package, model updater, or document generator.

## Required evidence basis

Before analysis, identify:

- company/ticker and exact fiscal quarter/year;
- results release date and analysis as-of date;
- accepted company release or filing;
- prepared remarks or transcript when supplied;
- dated consensus or prior expectation when beat/miss is claimed;
- prior guidance and current guidance;
- current thesis, valuation basis, and supplied input Artifacts.

The fiscal period and source dates must agree. Missing or mismatched primary evidence is an explicit gap, not permission to use memory or launch a hidden search.

## Analytical sequence

1. Verify period, dates, units, and source hierarchy.
2. Extract reported headline, segment, geographic, product, KPI, cash-flow, and guidance data.
3. Compare actuals with dated expectations and prior periods on the same basis.
4. Explain revenue, margin, cash-flow, and KPI drivers; distinguish recurring changes from timing or one-offs.
5. Analyze guidance changes and the assumptions required to achieve them.
6. Map evidence to each affected thesis pillar and DD/watch trigger.
7. Reassess valuation inputs or price-target logic only by tracing to the accepted valuation method; do not rebuild a model here.
8. State whether conviction strengthens, weakens, is unchanged, or is falsified, and why.

## Beat/miss discipline

For each metric:

```text
Actual:
Dated consensus / prior guidance:
Absolute and percentage variance:
Prior-period comparison:
Driver:
Quality / recurrence:
Thesis impact:
Source and date:
```

Never call a result a beat or miss without a dated comparable expectation. Separate headline EPS effects from operational performance and explain adjustments.

## Guidance discipline

Compare new guidance with prior guidance and consensus. State whether the range changed because of demand, price, volume, mix, margin, FX, acquisition, timing, or accounting. Assess implied next-period performance and execution risk.

## Output inside the thesis Artifact

The earnings update subsection should contain:

- decision-first headline and conviction change;
- reported versus expected summary;
- operating and segment drivers;
- margin/cash-flow analysis;
- guidance and estimate implications;
- thesis pillar and risk updates;
- valuation implication without unsupported recalculation;
- new watch triggers, catalysts, and required actions;
- source/date register and remaining gaps.

Use `earnings-analysis/workflow.md` for the detailed analytical checks, `report-structure.md` for section organization, and `best-practices.md` for final quality review.

## Completion test

The method is complete when period and source lineage are proven, beat/miss claims use dated expectations, drivers and guidance are reconciled, thesis changes follow evidence, and every limitation is propagated into `09-thesis-tracking.md`.
