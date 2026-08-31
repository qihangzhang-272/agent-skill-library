---
name: investment-valuation-returns
description: Use when the user needs valuation framing, comps, DCF or LBO result interpretation, price-target logic, return scenarios, IRR/MOIC sensitivity, entry or exit assumptions, or valuation red flags. Use investment-financial-model-builder instead when the requested deliverable is an XLSX workbook.
---

# Investment Valuation Returns

This node answers: what has to be true for this investment to work financially?

It interprets valuation and return logic for the IC memo. It does not build spreadsheets.

## References

Read when relevant:

- `references/returns-analysis.md` for IRR/MOIC and scenario tables.
- `references/comps-analysis.md` for peer set, valuation multiples, comparability, and red flags.
- `references/initiating-coverage/valuation-methodologies.md` for valuation method selection.
- `references/price-target-handoff.md` for reconciling methods into a price target or decision-range handoff.

When an XLSX model exists, consume the audited handoff from `investment-financial-model-builder`. Do not reproduce its workbook instructions here.

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

## 完成标准

- 明确估值日期、币种、期间、当前价格或进入基础、资本结构、净债务口径和目标期限
- 解释 DCF、public comps、precedents、LBO 或其他方法的采用、排除、权重和可比性限制
- 所有关键输入连接来源或前序 Artifact，计算从经营指标桥接到企业价值和股权价值
- 协调不同估值方法并形成一致的 bull/base/bear 假设、敏感性和主要价值驱动因素
- 企业价值、股权价值、稀释、进入退出路径、期限、IRR 与 MOIC 相互可复核且单位一致
- 估值盲区、外部输入缺口、不可执行分析和会推翻回报结论的红旗被明确记录
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；方法选择、计算、协调和限制分析仍必须完成
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
