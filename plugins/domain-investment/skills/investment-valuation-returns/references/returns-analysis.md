# Internal Method: Returns Analysis

Use this method inside `investment-valuation-returns` for private-deal or other cash-on-cash return scenarios. It is not an independent Skill or a required workbook workflow.

## 1. Normalize deal inputs

State source, date, currency, units, and scenario for:

- entry EBITDA or other operating basis;
- entry multiple, enterprise value, net debt, equity invested, and transaction costs;
- debt by tranche, rate, amortization, and fees;
- revenue growth, margin, capex, working capital, taxes, and cash conversion;
- hold period, exit operating metric, exit multiple, and net debt at exit;
- management rollover, co-invest, interim distributions, and dilution where applicable.

Missing values remain unknown. Do not assume zero debt, fees, dilution, or working-capital needs.

## 2. Calculate the base case

```text
Entry enterprise value = Entry metric × Entry multiple
Entry equity value = Enterprise value - Net debt and debt-like items
Equity invested = Entry equity value + Fees - Rollover / co-invest adjustments
Exit enterprise value = Exit operating metric × Exit multiple
Exit equity value = Exit enterprise value - Exit net debt and other claims
MOIC = Total equity proceeds / Equity invested
IRR = Discount rate that sets dated equity cash flows to zero NPV
```

Show the bridge from entry to exit and state whether returns are gross or net of applicable fees/carry.

## 3. Attribute returns

Separate the contribution of:

- operating growth;
- margin expansion or contraction;
- multiple expansion or contraction;
- debt paydown;
- interim cash distributions;
- fees, dilution, and other drag.

Attribution must reconcile to total equity value change. Do not describe leverage-created IRR as operating improvement.

## 4. Run sensitivities

Use the variables that dominate the case, commonly:

- entry versus exit multiple;
- growth or exit EBITDA versus exit multiple;
- leverage versus exit multiple;
- hold period versus exit multiple;
- margin, cash conversion, or financing cost.

Show MOIC and IRR together where timing matters. Choose plausible ranges and state their evidence or assumption basis.

## 5. Build scenarios

For bull, base, and bear cases, show the operating path, exit basis, capital structure, MOIC, IRR, and key failure mode. Avoid scenarios that differ only in the final multiple.

## 6. Sanity checks

- Entry sources and uses reconcile.
- Debt never amortizes below zero and interest follows the stated balance/rate.
- Exit net debt matches cash generation and distributions.
- Hold periods match IRR timing.
- Transaction costs and taxes are not omitted.
- MOIC and IRR move in the expected direction under sensitivity changes.
- The downside case does not quietly preserve upside-only assumptions.

## Required method handoff

```text
Entry, financing, operating, and exit assumptions:
Base-case equity bridge:
MOIC / IRR:
Return attribution:
Sensitivity results:
Bull / base / bear cases:
Dominant variables:
Data limitations and red flags:
```
