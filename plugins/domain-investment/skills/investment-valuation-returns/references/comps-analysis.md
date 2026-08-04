# Internal Method: Comparable Company Analysis

Use this method inside `investment-valuation-returns` to build an auditable peer comparison from accepted inputs. It is not an independent Skill, Agent, data-provider router, search procedure, or spreadsheet deliverable.

## Core principles

- Comparability is an analytical claim, not a name list. Explain every inclusion and material exclusion.
- Keep reported inputs, derived values, assumptions, and estimates distinct.
- Normalize currency, units, fiscal periods, LTM/NTM convention, accounting basis, and valuation date before comparing.
- Cite every hard input to an accepted Artifact, supplied document, or approved model handoff.
- Show formulas for every derived metric. Never paste an unexplained precomputed value.
- Missing data is `N/A` or an explicit estimate with rationale; it is never zero or blank.
- Statistics support judgment but do not decide the valuation mechanically.

## 1. Define the valuation question

Choose metrics based on the question:

| Question | Useful evidence |
| --- | --- |
| Growth premium | Revenue/ARR growth, NDR, gross margin, Rule of 40, EV/Revenue |
| Earnings quality | EBITDA/FCF margin, cash conversion, recurring revenue, EV/EBITDA, P/FCF |
| Capital intensity | Capex/revenue, working-capital needs, ROIC, EV/EBITDA |
| Platform or marketplace | GMV, take rate, active users, liquidity, contribution margin |
| Infrastructure/OSS | Adoption, dependent projects, usage, gross margin, monetization, EV/Revenue |
| Financial services | ROE, efficiency, credit quality, capital ratios, P/E, P/B |

Do not include a metric merely because peers commonly report it. State how each selected metric affects comparability or value.

## 2. Build the peer universe

Assess candidates on:

- product and revenue model;
- buyer, use case, and end market;
- growth and maturity;
- margin and cash-flow profile;
- scale and geography;
- capital intensity and risk;
- public/private status and liquidity;
- accounting and fiscal-period compatibility.

Classify peers as `core`, `adjacent`, or `context only`. Record inclusion rationale, exclusion rationale, and each material mismatch. A weak peer set must lower confidence rather than create false precision.

## 3. Normalize operating inputs

For each company, align the valuation date and period. Useful calculations include:

```text
Revenue growth = Current revenue / Prior revenue - 1
Gross margin = Gross profit / Revenue
EBITDA margin = EBITDA / Revenue
FCF margin = Free cash flow / Revenue
Rule of 40 = Revenue growth % + selected profit or FCF margin %
Net debt = Debt - Cash
Enterprise value = Equity value + Debt + Preferred claims + NCI - Cash
```

Document adjustments for acquisitions, discontinued operations, stock compensation, leases, one-time items, different year ends, and non-comparable definitions. Do not normalize away a real business-model difference.

## 4. Select valuation multiples

Common multiples:

```text
EV / Revenue = Enterprise value / Revenue
EV / EBITDA = Enterprise value / EBITDA
EV / EBIT = Enterprise value / EBIT
P / E = Equity value / Net income
P / FCF = Equity value / Free cash flow
```

Use forward or trailing denominators consistently. State why the chosen multiple fits the company's stage and economics. Negative or immaterial denominators are `N/M`, not extreme numeric multiples.

## 5. Analyze the distribution

For each relevant metric, show the peer observations and, when the set is large enough, maximum, upper quartile, median, lower quartile, and minimum. Identify outliers before excluding them. Explain whether an outlier reflects bad data, a different business model, exceptional quality, distress, or a temporary period.

Do not value the target by blindly applying the median. Explain premium or discount using evidenced differences in growth, margins, retention, scale, moat, governance, liquidity, and risk.

## 6. Derive the target range

For each scenario:

1. select the target operating metric and period;
2. choose a multiple or range with peer evidence;
3. calculate enterprise value;
4. bridge to equity value using dated capital structure;
5. calculate per-share value only when diluted shares are reliable;
6. state the dominant assumption and its sensitivity.

Keep bull/base/bear cases tied to different supported assumptions, not arbitrary labels.

## 7. Industry adaptations

- **SaaS:** ARR/revenue growth, NDR, gross margin, Rule of 40, EV/Revenue.
- **Marketplace:** GMV, take rate, contribution margin, liquidity, EV/Revenue or EV/gross profit.
- **Industrial:** EBITDA margin, asset turnover, capex intensity, EV/EBITDA.
- **Consumer:** comparable-store growth, gross margin, inventory turns, EV/EBITDA or P/E.
- **Financials:** ROE, capital and credit quality, efficiency, P/E and P/B.
- **Biotech/pre-revenue:** stage, probability, cash runway, platform value; conventional earnings multiples may be inapplicable.

## 8. Quality checks and red flags

Check:

- the same metric has one value and definition everywhere;
- numerator and denominator dates align;
- enterprise and equity values are not mixed;
- currency and units are consistent;
- every hard input has provenance;
- calculations recompute from visible inputs;
- scenario outputs reconcile to the equity bridge.

Flag:

- fewer genuinely comparable peers than the analysis implies;
- stale or mixed-period data;
- conflicting source values;
- unexplained estimates or adjustments;
- wide dispersion hidden by a median;
- selected peers chosen to force a preferred outcome;
- premium/discount unsupported by operating evidence;
- double-counting growth or risk in both forecast and multiple.

## Required method handoff

```text
Valuation question:
As-of date / currency / units / periods:
Core, adjacent, and excluded peers with rationale:
Normalized operating metrics:
Valuation multiples and formulas:
Distribution and outliers:
Target premium / discount rationale:
Bull / base / bear target ranges:
Enterprise-to-equity bridge:
Comparability limitations and counterevidence:
```
