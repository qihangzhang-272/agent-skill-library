---
name: qihang-valuation-returns
description: Use when Qihang needs valuation framing, comps, DCF or LBO result interpretation, price-target logic, return scenarios, IRR/MOIC sensitivity, entry or exit assumptions, or valuation red flags. Use qihang-financial-model-builder instead when the requested deliverable is an XLSX workbook.
---

# Qihang Valuation Returns

This node answers: what has to be true for this investment to work financially?

It interprets valuation and return logic for the IC memo. It does not build spreadsheets.

## References

Read when relevant:

- `references/returns-analysis.md` for IRR/MOIC and scenario tables.
- `references/comps-analysis.md` for peer set, valuation multiples, comparability, and red flags.
- `references/initiating-coverage/valuation-methodologies.md` for valuation method selection.
- `references/price-target-handoff.md` for reconciling methods into a price target or decision-range handoff.

When an XLSX model exists, consume the audited handoff from `qihang-financial-model-builder`. Do not reproduce its workbook instructions here.

## Output

```text
Valuation method:
Comps universe:
Comparable metrics:
Model handoff used:
Entry valuation:
Return drivers:
Bull / base / bear assumptions:
IRR / MOIC logic:
Exit path:
Valuation red flags:
Data limitations:
Handoff to IC memo:
```
