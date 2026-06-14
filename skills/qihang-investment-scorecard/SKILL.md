---
name: qihang-investment-scorecard
description: Convert AI product judgment and fact packs into Qihang's investment scorecard layer. Use for AI / OSS / infrastructure investability scoring, macro gate, deal screening, one-vote veto checks, pass / watch / recommend decisions, and scorecard handoff into IC memo.
---

# Qihang Investment Scorecard

This node replaces direct use of `oss-investment-scorecard` in Qihang's default workflow.

Use it after `qihang-ai-product-judgment` and before DD / IC memo writing.

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
