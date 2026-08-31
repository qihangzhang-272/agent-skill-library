---
name: investment-ai-product-judgment
description: Run the library's AI-native product judgment inside the investment workflow. Use after facts are collected and before market, unit economics, scorecard, DD, or IC memo writing. This skill evaluates whether the AI product is genuinely AI-native, commercially coherent, narratively clear, and product/BP-valid.
---

# Investment AI Product Judgment

This node answers: does the AI product itself make sense?

It is the product judgment layer inside `domain-investment`.

## References

Always read:

- `references/ai-product-analyzer.md`

Read selectively:

- `references/business-model.md` for pricing, inference cost, revenue quality, subscription vs usage, margin, bundling, or business-model risk.
- `references/data-agent.md` for data agent, BI, Text-to-SQL, enterprise data workflow, context layer, or analytics agent products.
- `references/narrative-audit.md` for positioning, pitch deck, NOT positioning, narrative line, or old-paradigm packaging risk.

## Output

```text
AI-native product judgment:
Reference usage:
One-sentence positioning:
Problem validity:
Solution validity:
Product form:
Why now:
Market fit:
Business model:
Competition:
Traction:
Team / GTM:
Financial / ask:
Verdict: good case / bad case / watch
Strongest product argument:
Weakest product gap:
Narrative line:
Handoff to investment package:
```

## 完成标准

- 先判断并读取所有适用内部 reference；投资工作流至少读取一个适用 reference 并记录选择理由，输入过薄时不得降级为轻量意见
- 完整输出 Purpose、Problem、Solution、Product、Why Now、Market、Business Model、Competition、Traction、Team/GTM、Financials/Ask 十一段判断
- 分别检验 AI 原生性、真实业务价值和叙事强度，避免把技术新颖度直接等同投资价值
- 每个核心产品结论都连接输入事实、证据或明确假设，禁止无来源补造产品能力
- 给出最强项、最弱项、反方解释、结论边界以及会改变判断的新证据
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；不得将未知写成零或事实
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
