---
name: investment-scorecard
description: Convert AI product judgment and fact packs into the library's investment scorecard layer. Use for AI / OSS / infrastructure investability scoring, macro gate, deal screening, one-vote veto checks, pass / watch / recommend decisions, and scorecard handoff into IC memo.
---

# Investment Scorecard

This node replaces direct use of `oss-investment-scorecard` in the library's default workflow.

Use it after `investment-ai-product-judgment` and before DD / IC memo writing.

## References

Always read:

- `references/oss-investment-scorecard.md`

Read when needed:

- `references/scored-examples.md` for calibration.
- `references/deal-screening.md` for pass / further diligence / hard pass framing.
- `references/cases/hugging-face.md` and `references/cases/inferact-vllm.md` for example structure.
- `references/template/evaluation-template.md` for structured scorecard output.

## Output

```text
Scorecard reference usage:
Macro gate:
Deal-screening verdict:
Dimension scores:
Weighted total:
One-vote veto check:
Investment recommendation:
IC thesis seed:
DD priorities:
Watch triggers:
Handoff to IC memo:
```

## 完成标准

- 声明 as-of 日期、币种和单位、投资问题、阶段、已提供的基金标准，以及 OSS 或非 OSS 的五维框架适配
- 逐项完成 macro gate；Q1/Q2 的 NO 与 Q3 的风险语义不得混淆，并说明是否只保留诊断性评分
- 对生态或采用、团队与全球化、技术护城河与定位、商业化与 PMF、资本退出路径五维逐项连接证据和反证
- 权重、原始分、加权分和总分计算可复核，缺失数据的处理不制造虚假精度
- 只使用明示的一票否决项，并把否决、重大风险、总分和基金标准显式协调
- 形成一致的建议、DD 优先级和可测量跟踪触发器，并列出会改变结论的证据
- 经合理查找仍不可得的信息必须用业务语言写清缺失事项、不可得原因、对结论的影响、当前保守处理和重新核验条件后继续；缺失数据不得被写成零或虚假精确分数
- 形成可独立检查的产物：$artifact。
- 在 Mode 内调用与独立调用执行相同标准；无法满足的项目必须说明缺口与影响，不得伪造完成。
