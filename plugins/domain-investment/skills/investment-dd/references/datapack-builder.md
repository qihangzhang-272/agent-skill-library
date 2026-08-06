# Internal Method: Diligence Evidence Normalization

Use this method inside `investment-dd` to assess whether supplied financial and operating evidence is complete, comparable, and decision-ready. It is not an independent data-pack builder, source-search flow, server integration, or spreadsheet deliverable.

## Critical principles

- Preserve every source label, period, currency, unit, sign convention, and definition.
- Separate reported values, management adjustments, analyst assumptions, and calculated values.
- Never hardcode a derived number without showing its formula or bridge.
- Never treat missing data as zero or an estimate as reported fact.
- Reconcile repeated metrics across documents; do not choose a preferred value silently.
- Keep a discrepancy register and route material source conflicts to the responsible node.

## Evidence inventory

For each supplied item record:

```text
Artifact / document:
Date and covered period:
Source / owner:
Status: complete | partial | superseded | conflicting
Currency / units:
Definitions used:
Material claims supported:
Known limitations:
```

## Normalized evidence blocks

### Historical performance

- revenue by period, product, segment, geography, recurring/non-recurring, and customer where available;
- gross profit, operating expenses, EBITDA/operating income, cash flow, and margins;
- balance-sheet cash, debt, working capital, deferred revenue, leases, and other claims;
- reported-to-adjusted bridge with every adjustment separately supported.

### Operating metrics

- customer count, ACV, bookings, backlog, ARR, retention, churn, cohort expansion;
- volume, price, take rate, usage, utilization, capacity, and unit costs;
- product/technology reliability, hosting or inference cost, release and adoption signals;
- headcount, productivity, pipeline, conversion, and sales efficiency.

### Market and transaction context

- category definition, market size basis, growth, competitive position, and share;
- entry terms, capital structure, financing, ownership, and valuation assumptions;
- comparable-company or transaction observations with dates and definitions.

## Reconciliation checks

Test at least:

```text
Revenue subtotals = reported total revenue
Gross profit = Revenue - Cost of revenue
Ending ARR = Beginning ARR + New + Expansion - Contraction - Churn
Cash movement reconciles to cash-flow and balance-sheet changes
Net debt = Debt and debt-like items - Cash
Adjusted EBITDA = Reported EBITDA + individually supported adjustments
Assets = Liabilities + Equity
```

For every failed check, including an unbalanced balance sheet, record the discrepancy, size, likely cause, decision impact, and evidence request. Do not force a plug to make the totals agree.

## Normalization tests

- align monthly, quarterly, annual, fiscal-year, LTM, and NTM periods;
- distinguish actual, budget, forecast, and management target;
- convert currencies only with a dated rate and retain the original value;
- use one unit convention and show conversions;
- identify changes in accounting policy or metric definition;
- separate organic growth from acquisition, price, FX, and volume effects;
- assess whether EBITDA adjustments are recurring, cash, operational, or double counted.

### Common adjustment challenges

- owner/founder compensation normalization;
- one-time legal, restructuring, or transaction costs;
- run-rate synergies and cost savings not yet realized;
- stock compensation, capitalized development, and related-party charges;
- pro forma acquisitions, divestitures, or discontinued operations;
- revenue recognized before deployment, acceptance, or collectability.

Management labels do not determine acceptability. State whether each adjustment is supported and how excluding it changes valuation or returns.

## Sector adaptations

- **SaaS/AI:** ARR bridge, cohorts, NDR/GRR, hosting and inference margin, implementation/services mix.
- **Marketplace:** GMV, take rate, repeat behavior, contribution margin, subsidies, liquidity.
- **Industrial:** price/volume, backlog, utilization, scrap, maintenance versus growth capex.
- **Healthcare/services:** utilization, reimbursement, provider productivity, regulatory constraints.
- **Real estate/hospitality:** occupancy, rate, RevPAR, property-level EBITDA, recurring capex.

## DD output from this method

This method contributes a Markdown evidence-request and discrepancy matrix to `08-dd-questions.md`:

```text
Claim / metric:
Current evidence and source:
Normalized definition / period / unit:
Reconciliation result:
Missing or conflicting support:
Requested evidence:
Priority and decision impact:
Closure criterion:
```

It does not create a separate workbook, dashboard, or delivery package.
