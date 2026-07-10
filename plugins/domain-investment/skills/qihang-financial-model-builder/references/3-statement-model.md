# Three-Statement Model

Use this reference when the requested workbook must link an income statement, balance sheet, and cash flow statement.

## Inputs

- approved historical statements with fiscal periods, currency, units, and sources;
- forecast horizon and scenario assumptions;
- revenue, margin, working-capital, capex, tax, debt, interest, and share-count drivers;
- opening balance sheet and cash balance;
- user template, if one must be preserved.

If the input package does not support an opening balance sheet or cash roll-forward, disclose the limitation before building.

## Workbook Structure

1. **Sources** — approved historical values and source labels.
2. **Assumptions** — forecast drivers and scenario selector.
3. **Income Statement** — revenue through net income.
4. **Balance Sheet** — operating assets, liabilities, debt, cash, and equity.
5. **Cash Flow** — net income to operating, investing, financing cash flow, and ending cash.
6. **Schedules** — working capital, fixed assets, debt, interest, taxes, and shares as needed.
7. **Checks** — balance sheet, cash, retained earnings, debt, and formula consistency.
8. **Summary** — model outputs for valuation handoff.

Preserve an attached template's tab names, period orientation, formulas, and formatting unless the user explicitly approves a structural change.

## Core Linkages

- Revenue and expense drivers flow to the income statement.
- Net income starts the indirect cash flow statement.
- Depreciation links the fixed-asset schedule, income statement, and cash flow.
- Working-capital movements reconcile balance sheet changes to operating cash flow.
- Capex increases fixed assets and appears in investing cash flow.
- Debt issuance, repayment, and interest reconcile the debt schedule, statements, and cash.
- Ending cash from the cash flow statement equals balance-sheet cash.
- Retained earnings rolls from prior retained earnings, net income, dividends, and other approved equity movements.

Do not use cash or debt as an unexplained plug merely to force the balance sheet to balance.

## Forecast Rules

- Separate historical hardcodes from forecast formulas.
- Centralize scenario assumptions; do not bury overrides in statement cells.
- Keep formulas consistent across periods unless a documented transition is intentional.
- Use explicit sign conventions and unit labels.
- Show base, upside, and downside drivers when scenarios are requested.
- Do not infer unavailable historical values from the desired output.

## Required Checks

| Check | Expected result |
| --- | --- |
| Assets minus liabilities and equity | zero |
| Cash-flow ending cash minus balance-sheet cash | zero |
| Debt opening plus issuance minus repayment minus ending debt | zero |
| Fixed assets opening plus capex minus depreciation minus ending fixed assets | zero |
| Retained earnings roll-forward | zero |
| Net income linkage between statements | zero |
| Scenario selector | changes all intended formulas |
| Forecast formula consistency | no unexplained period breaks |

Run checks for every scenario, not just the base case.

## Handoff

Provide revenue, EBITDA, EBIT, net income, free cash flow, cash, debt, net debt, diluted shares, scenario outputs, and all failed checks. The valuation node owns interpretation and recommendation.
