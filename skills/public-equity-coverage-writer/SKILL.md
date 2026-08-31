---
name: public-equity-coverage-writer
description: Use when the user needs an institutional public-equity initiating-coverage report, stock rating and price target, or final equity-research report assembled from completed research, model, valuation, thesis, and chart handoffs. Do not use for private-company IC memos or to perform upstream research and modeling inside the writer.
---

# Public Equity Coverage Writer

Assemble the final initiating-coverage report without redoing upstream analysis.

## Core Rule

The workflow orchestrator owns end-to-end sequencing. The full migrated source references retain their original single-task workflow for fidelity, but those dispatch instructions are subordinate when this skill is called from a chain.

## How To Apply

1. Verify the fact pack, competitive analysis, audited model handoff, valuation and price target, thesis and catalysts, risks, and chart manifest.
2. Read `references/initiating-coverage.md` for the full coverage specification and `references/task5-report-assembly.md` for the complete assembly workflow.
3. Preserve facts, estimates, judgments, assumptions, and unknowns as separate categories.
4. Reconcile the rating, price target, forecast periods, valuation date, units, chart values, and cited source values before delivery.
5. Write the report into the user's current project run folder. Do not write runtime artifacts into this repository.

## Required Output

```text
Coverage object:
Rating:
Price target / valuation date:
Model handoff used:
Investment thesis:
Estimate summary:
Valuation:
Catalysts:
Risks:
Charts included:
Source and number gaps:
Report path:
```

## Do Not Use

- The user wants an investment-committee decision memo rather than public-equity coverage.
- The user only wants a model, chart pack, tear sheet, pitch deck, CIM, or teaser.
- Required upstream handoffs are missing; return the missing-input list instead of filling gaps.

## References

- `references/initiating-coverage.md` — complete migrated initiating-coverage specification and original workflow rules.
- `references/task5-report-assembly.md` — complete migrated final report assembly workflow.

## 完成标准

- 完成 Required Output 中全部适用交付物与 Quality checks，数字、口径、单位、来源、时期和叙事相互一致。
- 产物必须可由目标读者直接使用；缺失输入保持可见，不得补造财务数字、交易事实或客户结论。
- 在 Mode 内调用与独立调用执行同一质量门槛，失败项由本 Skill 原地返工。
