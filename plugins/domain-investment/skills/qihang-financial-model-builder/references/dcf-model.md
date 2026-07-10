# DCF Workbook

Use this reference to build an auditable discounted cash flow schedule from approved operating forecasts.

## Inputs

- valuation date and forecast periods;
- revenue, operating profit, tax, depreciation, capex, and working-capital forecasts;
- capital structure and approved WACC assumptions;
- terminal-value method and range;
- cash, debt, non-operating assets or liabilities, diluted shares, and currency units.

Do not fetch missing inputs inside the model skill. Return a missing-input list to the research or valuation owner.

## Unlevered Free Cash Flow

Use:

~~~text
NOPAT = EBIT × (1 − cash tax rate)
UFCF = NOPAT + D&A − capex − change in net working capital
~~~

Keep the tax rate, D&A, capex, and working-capital drivers visible. Explain unusual sign conventions or transition years.

## Discount Rate

Build WACC from approved inputs:

~~~text
Cost of equity = risk-free rate + beta × equity risk premium + approved premiums
After-tax cost of debt = pre-tax cost of debt × (1 − tax rate)
WACC = equity weight × cost of equity + debt weight × after-tax cost of debt
~~~

Label the source and date for each market input. Do not mix market-value and book-value weights without disclosure.

## Terminal Value

Support:

- perpetual growth;
- exit multiple;
- both methods for reconciliation when requested.

Checks:

- perpetual growth stays below the long-run discount-rate assumption;
- exit multiple uses the correct terminal metric and period;
- terminal value is discounted from the correct date;
- terminal value contribution to enterprise value is disclosed.

## Enterprise To Equity Bridge

Start with present value of forecast cash flows plus present value of terminal value. Reconcile enterprise value to equity value using approved cash, debt, non-operating assets, minority interests, leases, pensions, or other adjustments. Divide by consistent diluted shares only after the bridge is complete.

## Sensitivity

Use odd-dimension tables so the center cell is the base case. Common pairs:

- WACC versus perpetual growth;
- WACC versus exit multiple;
- revenue growth versus operating margin;
- terminal multiple versus margin.

The center cell must equal the model's base-case output. Every sensitivity cell must reference its row and column assumptions rather than repeat the same formula.

## Required Checks

- forecast UFCF ties to the operating model;
- discount periods and valuation date are consistent;
- WACC weights sum to 100%;
- terminal value uses the intended method and metric;
- enterprise-to-equity bridge reconciles;
- diluted shares and per-share units are consistent;
- base sensitivity cell equals base DCF output;
- no spreadsheet errors, broken references, or unexplained forecast hardcodes remain.

## Handoff

Provide enterprise value, equity value, per-share value, WACC, terminal assumptions, forecast-period UFCF, terminal-value share of enterprise value, sensitivity range, bridge adjustments, and failed checks. qihang-valuation-returns owns method weighting and price-target interpretation.
