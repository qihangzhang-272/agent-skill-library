# LBO Workbook

Use this reference when the requested workbook must connect transaction assumptions, operating performance, debt paydown, exit value, MOIC, and IRR.

## Inputs

- entry date, entry enterprise value or purchase-price assumptions;
- cash, debt, fees, financing structure, minimum cash, and management rollover;
- operating forecast or approved drivers;
- debt tranches, interest rates, amortization, cash sweep, maturities, and optional repayment rules;
- exit year, exit multiple or valuation method, and scenario ranges;
- sponsor equity and other sources.

If transaction terms are unknown, build labeled scenarios instead of presenting a false base case.

## Workbook Structure

1. Transaction assumptions.
2. Sources and uses.
3. Operating model.
4. Cash flow available for debt paydown.
5. Debt and interest schedule.
6. Exit bridge.
7. Sponsor returns.
8. Sensitivities.
9. Checks.

## Sources And Uses

Sources must equal uses. Show purchase of equity, refinancing of debt, fees, minimum cash, financing sources, sponsor equity, and rollover separately. Sponsor equity is calculated after all other approved sources; do not hide an unexplained balancing item.

## Operating And Cash Flow

Link revenue, EBITDA, taxes, capex, working capital, and other approved items to cash flow available for debt repayment. Keep management plan, base, upside, and downside assumptions visible when scenarios are requested.

## Debt Schedule

For each tranche show:

- opening balance;
- mandatory amortization;
- optional repayment or cash sweep;
- new borrowing;
- closing balance;
- cash and payment-in-kind interest;
- rate, spread, floor, and maturity where relevant.

Interest must use the intended average or period balance convention. Closing debt must feed the exit bridge.

## Exit And Returns

Calculate exit enterprise value from the approved terminal metric and exit multiple or other method. Reconcile to sponsor equity value using closing debt, cash, and approved adjustments.

~~~text
MOIC = sponsor exit proceeds ÷ invested sponsor equity
IRR = annualized return across actual investment and exit dates
~~~

If interim dividends, recapitalizations, add-on investments, or partial exits exist, model their timing explicitly.

## Sensitivity

Common pairs:

- entry multiple versus exit multiple;
- exit multiple versus EBITDA growth;
- leverage versus exit multiple;
- margin versus exit multiple.

Use an odd grid with the base case in the center. The center must equal the main returns output.

## Required Checks

- sources equal uses;
- minimum cash is maintained;
- debt balances never fall below allowed limits;
- interest and repayment link to the correct tranche;
- cash flow available for debt paydown reconciles;
- exit net debt matches the debt schedule;
- MOIC and IRR use the same sponsor cash flows;
- sensitivity center equals base-case returns;
- no circularity, broken reference, or unexplained hardcode remains.

## Handoff

Provide entry valuation, leverage, sponsor equity, operating drivers, debt paydown, exit valuation, MOIC, IRR, sensitivity ranges, covenant or liquidity risks, and failed checks. The valuation node owns investment-level interpretation.
