---
name: investment-financial-model-builder
description: Use when the user explicitly needs an auditable XLSX financial model, three-statement forecast, DCF or LBO workbook, model sensitivity, or spreadsheet audit before valuation. Do not use for narrative-only valuation or when verified historical inputs and assumptions are missing.
---

# Investment Financial Model Builder

Build the financial workbook; do not decide the investment recommendation.

## Core Rule

Only model approved inputs. Keep historicals, assumptions, formulas, checks, and outputs visibly separate. Never convert missing data to zero or hide a failed check.

## How To Apply

1. Confirm the model type, valuation date, currency, units, historical periods, forecast periods, approved inputs, and required sensitivities.
2. Read `references/model-build-contract.md`, then load only the implementation reference needed for the requested model.
3. Build formulas rather than hardcoded derived values. Preserve source labels for every historical input and assumption owner for every forecast driver.
4. Run the checks in `references/audit-xls.md`. A workbook with a failed balance, circularity, broken formula, or unexplained hardcode is not ready for handoff.
5. Save the workbook and audit note in the user's current project run folder, never inside this plugin repository.
6. Hand off model outputs and limitations to `investment-valuation-returns`; do not turn the workbook into a price target or investment verdict here.

## Required Output

```text
Model type:
Input artifacts:
Historical periods:
Forecast periods:
Currency / units:
Key assumptions:
Statements and schedules:
Sensitivity tables:
Checks passed / failed:
Workbook path:
Data limitations:
Handoff to valuation:
```

## Do Not Use

- The user only needs comps, scenario logic, IRR/MOIC framing, or a narrative valuation.
- Verified historical data or forecast assumptions are unavailable.
- The requested output is a tear sheet, pitch deck, IC memo, or coverage report rather than a workbook.

## References

- `references/model-build-contract.md` — inputs, workbook layers, handoff, and stop conditions.
- `references/3-statement-model.md` — three-statement workbook construction.
- `references/dcf-model.md` — DCF workbook construction and sensitivity.
- `references/lbo-model.md` — LBO workbook construction and returns schedules.
- `references/audit-xls.md` — spreadsheet audit and consistency checks.

## Common Mistakes

- Starting projections before periods, units, and source values are normalized.
- Mixing historical hardcodes with forecast assumptions.
- Treating a balanced model as proof that assumptions are reasonable.
- Writing a recommendation instead of a model handoff.
