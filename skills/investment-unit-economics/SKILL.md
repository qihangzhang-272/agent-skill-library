---
name: investment-unit-economics
description: Analyze business model quality, revenue quality, customer economics, AI readiness, and value creation for AI investment cases. Use when an IC memo needs ARR, NDR, LTV/CAC, CAC payback, gross margin, inference cost, pricing, revenue concentration, pilot readiness, or value creation logic.
---

# Investment Unit Economics

This node answers: can the business turn product value into durable economics?

## References

Read when relevant:

- `references/unit-economics.md` for ARR, cohorts, LTV/CAC, retention, revenue quality, and margin waterfall.
- `references/ai-readiness.md` for data readiness, owner, 30-day pilot, and deployment realism.
- `references/value-creation-plan.md` for revenue, margin, operations, and EBITDA value-creation levers.

## Output

```text
Business model:
Pricing model:
Revenue quality:
Customer economics:
Retention / expansion:
CAC and payback:
Gross margin / inference cost:
Customer concentration:
AI readiness / deployment gate:
Value creation levers:
Risks:
Handoff to valuation / IC memo:
```

## 完成标准

- 声明业务模式、计价单位、收入确认、成本边界、币种、期间和适用 segment，使经济性计算可复现
- 每个关键指标提供数值、公式、期间和来源；无法取得时保留未知而非虚构或记零
- 检查留存、扩张、集中度、回款、毛利和收入可重复性，区分一次性与持续性收入
- 纳入推理、训练、人工审核、实施、支持和基础设施成本，并逐项检查 Data gate、Owner gate 和 30-day pilot gate
- 每个 benchmark 说明同业、阶段、期间、定义和可比性限制；无法取得可靠 benchmark 时明确其影响
- 以 baseline、EBITDA bridge、100-day plan 和 KPI dashboard 把改善杠杆、执行条件、敏感性和下行风险连接到可验证的价值创造路径
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；公式、gate 检查和价值创造设计仍必须完成
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
