# Unit-Economics Analysis Method

This is an internal method of investment-unit-economics, not a standalone Skill. Use it for ARR, cohorts, LTV/CAC, retention, revenue quality, and margin analysis inside 05-unit-economics.md.

Do not create an Excel workbook, dashboard, slide, or separate Artifact. Calculate from supplied inputs when the data supports it; otherwise preserve the missing input as an explicit unknown.

## 1. Identify the Revenue Model

Tailor definitions to the business:

- SaaS/subscription: ARR, net retention, cohorts;
- recurring services: contract value, renewal, upsell, delivery capacity;
- transaction/usage: volume, revenue per transaction, take rate, consumption expansion;
- hybrid: separate each revenue stream before calculating blended metrics.

State the period, currency, segment, and whether values are contracted, billed, recognized, or collected. Do not mix them.

## 2. Revenue Quality

### ARR or recurring-revenue bridge

Reconcile:

Beginning recurring revenue + New + Expansion - Contraction - Churn = Ending recurring revenue

For every component state the company definition and period. If the bridge does not reconcile, show the variance and mark REWORK or an explicit gap.

Cover:

- recurring versus non-recurring and services revenue;
- ACV distribution and contract duration;
- auto-renewal and cancellation terms;
- top 10/20/50 customer concentration when available;
- contracted ARR versus recognized revenue;
- billing and collection quality.

### Cohorts

Build an absolute and indexed cohort view when customer-level or cohort data exists:

| Cohort | Year 0 | Year 1 | Year 2 | Year 3 | Year 4 |
|---|---:|---:|---:|---:|---:|
| 2020 | | | | | |
| 2021 | | | | | |
| 2022 | | | | | |

Index Year 0 to 100 percent for comparability, but retain absolute values. Explain cohort definition, survivorship treatment, FX effects, and acquisitions. If raw cohort data is unavailable, do not fabricate a matrix; state what data is needed and why aggregate metrics may hide deterioration.

## 3. Customer Economics

Use company definitions when supplied and also state a normalized definition where possible:

- CAC = attributable sales and marketing spend / new customers acquired;
- LTV = ARPU x gross margin / churn rate, only when the steady-state assumptions are defensible;
- LTV:CAC = LTV / CAC;
- CAC payback = CAC / monthly gross profit from a new customer;
- gross retention = beginning recurring revenue retained before expansion;
- NDR = beginning recurring revenue retained after churn, contraction, and expansion;
- logo churn and dollar churn;
- expansion rate.

Segment enterprise, mid-market, SMB, channel, geography, or product when blended economics hide meaningful differences. State whether CAC is fully loaded and whether implementation or customer-success costs are included.

NDR above 100 percent can coexist with poor gross retention. Always show both when available.

## 4. Margin Waterfall

Reconcile:

Revenue → Gross profit → Contribution margin → EBITDA

Separate gross margin by revenue stream. For AI products, expose inference, model/API, hosting, data, human-review, support, and implementation costs rather than burying them in blended COGS.

Test whether pricing scales with variable cost and whether increased usage improves or erodes contribution margin.

## 5. Benchmarks

Use benchmarks as context, not universal truth. Record benchmark source, date, segment, growth profile, and definition.

Common SaaS reference points:

- Rule of 40: growth rate + EBITDA or FCF margin above 40 percent;
- Magic Number: net new ARR / prior-period sales and marketing spend above roughly 0.75x;
- NDR: above 120 percent often strong, above 110 percent good, below 100 percent concerning;
- LTV:CAC: above 5x often strong, above 3x good, below 2x concerning;
- gross retention: above 95 percent often strong, above 90 percent good, below 85 percent concerning;
- CAC payback: below 12 months often strong, below 18 months good, above 24 months concerning.

Do not apply SaaS thresholds to a different model without adapting them.

## 6. Revenue-Quality Synthesis

Score only when evidence supports the factors:

| Factor | Score 1-5 or Unknown | Evidence and caveat |
|---|---:|---|
| Recurring share | | |
| Net and gross retention | | |
| Customer concentration | | |
| Cohort stability | | |
| Growth durability | | |
| Margin profile | | |
| Overall | | |

Explain weighting; do not average unknown values as zero. Include the strongest contrary interpretation.

## Contribution to 05-unit-economics.md

Return:

- revenue model and definition register;
- ARR/revenue bridge;
- cohort evidence;
- CAC, LTV, payback, retention, and expansion;
- concentration and contract quality;
- margin and AI-cost waterfall;
- benchmark comparison with limitations;
- revenue-quality synthesis;
- formulas, assumptions, evidence, unknowns, and sensitivities.

Return findings to the parent Skill. Do not invoke a spreadsheet, modeling, presentation, or later workflow node.
