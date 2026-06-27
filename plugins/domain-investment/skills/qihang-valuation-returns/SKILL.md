---
name: qihang-valuation-returns
description: Build valuation, comps, return logic, and financial-model sanity checks for Qihang's AI investment memo. Use when an IC memo needs valuation framing, comps, return scenarios, IRR/MOIC sensitivity, DCF/LBO logic, three-statement context, or model/audit standards. Do not build Excel unless explicitly requested.
---

# Qihang Valuation Returns

This node answers: what has to be true for this investment to work financially?

It provides valuation and return logic for the IC memo. It does not automatically build spreadsheets.

## References

Read when relevant:

- `references/returns-analysis.md` for IRR/MOIC and scenario tables.
- `references/comps-analysis.md` for peer set, valuation multiples, comparability, and red flags.
- `references/initiating-coverage/valuation-methodologies.md` for valuation method selection.
- `references/dcf-model.md`, `references/lbo-model.md`, and `references/3-statement-model.md` for financial-model logic when a deeper model is requested.
- `references/audit-xls.md` for model and number consistency checks.

## Output

```text
Valuation method:
Comps universe:
Comparable metrics:
Entry valuation:
Return drivers:
Bull / base / bear assumptions:
IRR / MOIC logic:
Exit path:
Valuation red flags:
Data limitations:
Handoff to IC memo:
```
