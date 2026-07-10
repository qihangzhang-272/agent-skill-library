# Financial Model Build Contract

## Required Inputs

- Model purpose: three-statement, DCF, LBO, or combined.
- Valuation date, currency, reporting units, fiscal-year convention, and forecast horizon.
- Approved historical income statement, balance sheet, cash flow, share count, debt, and cash data.
- Forecast assumptions with source or named assumption owner.
- Required cases and sensitivities.
- User project run folder and expected workbook filename.

If a required input is missing, list it and stop or build an explicitly incomplete scenario. Never silently substitute training knowledge or zero.

## Workbook Layers

1. **Source / historicals** — values copied from approved inputs with source and period labels.
2. **Assumptions** — editable drivers, cases, dates, units, and scenario selectors.
3. **Schedules** — revenue, margins, working capital, capex, debt, taxes, shares, and other requested drivers.
4. **Statements** — linked income statement, balance sheet, and cash flow when required.
5. **Valuation / returns** — DCF, LBO, or sensitivity outputs requested by the user.
6. **Checks** — balance sheet, cash roll-forward, debt roll-forward, formula consistency, and error flags.
7. **Summary** — decision-useful model outputs without an investment recommendation.

## Formula Rules

- Derived values must be formulas, not repeated hardcodes.
- Forecast formulas must be consistent across periods unless a documented transition is intentional.
- Keep signs, currency, scale, fiscal periods, and per-share units explicit.
- Use a consistent visual convention: hardcoded inputs, formulas, cross-sheet links, and unresolved error flags must be visually distinguishable. Document the convention in the workbook rather than assuming a color means the same thing in every template.
- Mark external links and unsupported functions.
- Do not hide errors with blanket IFERROR unless the fallback meaning is documented.

## Audit Gate

Before handoff, verify:

- balance sheet balances;
- cash flow reconciles to cash movement;
- debt and interest schedules reconcile;
- shares and per-share calculations use consistent dilution;
- historical values tie to approved sources;
- case selectors change the intended formulas;
- sensitivity tables reference the correct output;
- no unexplained hardcodes appear in forecast formula regions;
- no broken references, circularities, or spreadsheet errors remain.

Failed checks stay visible in both the workbook and handoff.

## Valuation Handoff

Provide:

```text
Workbook path:
Model version / valuation date:
Base case outputs:
Bull / bear outputs:
Key drivers:
Sensitivity ranges:
Checks passed:
Checks failed:
Unresolved data gaps:
Approved uses of the model:
```

`qihang-valuation-returns` owns interpretation, method reconciliation, price-target logic, and return framing.
