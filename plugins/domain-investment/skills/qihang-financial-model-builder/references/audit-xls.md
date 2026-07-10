# Workbook Audit

Audit the delivered workbook before valuation handoff. Preserve every unresolved failure.

## Scope

Check the whole workbook unless the user explicitly limits the review. Record:

- workbook and version;
- sheets reviewed;
- valuation date, currency, units, and fiscal periods;
- recalculation or formula-inspection tool used;
- excluded sheets or ranges.

## Structural Checks

- expected sheets exist and names are stable;
- formulas do not point to missing sheets, workbooks, or ranges;
- input, formula, check, and output regions are distinguishable;
- hidden rows, columns, and sheets contain no undisclosed material logic;
- external links and unsupported functions are disclosed.

## Formula Checks

- no spreadsheet errors remain;
- formulas are consistent across comparable forecast periods;
- derived values are not hardcoded in formula regions;
- copied formulas do not shift intended absolute references;
- case switches and sensitivity tables change the intended assumptions;
- circular references are absent or explicitly designed and controlled;
- blanket error suppression does not hide model failures.

## Financial Checks

- balance sheet balances;
- cash flow reconciles to ending cash;
- retained earnings, fixed assets, debt, and shares roll forward;
- interest uses the intended balance convention;
- enterprise-to-equity bridges reconcile;
- sources equal uses in transaction models;
- per-share values use consistent diluted shares;
- base sensitivity cells equal the main model output.

## Reasonableness Checks

Compare historical and forecast:

- revenue growth;
- gross, EBITDA, EBIT, and net margins;
- working-capital days;
- capex and depreciation;
- tax rate;
- leverage and interest coverage;
- free cash flow conversion;
- terminal assumptions.

Flag unexplained step changes. Reasonableness is a warning, not permission to overwrite approved assumptions.

## Severity

| Severity | Meaning | Delivery |
| --- | --- | --- |
| Blocker | broken formula, failed reconciliation, circularity, wrong units or period | do not hand off |
| High | material hardcode, unsupported assumption, wrong bridge or sensitivity | fix or obtain explicit acceptance |
| Medium | weak labeling, inconsistent formatting, non-material formula drift | disclose and fix when possible |
| Low | cosmetic issue with no analytical effect | record |

## Audit Output

~~~text
Workbook:\n+Scope:\n+Tool used:\n+Checks passed:\n+Blockers:\n+High / medium / low findings:\n+Unresolved assumptions:\n+Ready for valuation handoff: yes/no\n+~~~
