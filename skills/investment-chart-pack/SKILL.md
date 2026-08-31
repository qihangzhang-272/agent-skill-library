---
name: investment-chart-pack
description: Use when the user needs a sourced financial chart pack for public-equity initiating coverage, valuation, company performance, market structure, scenarios, or an institutional research report, and approved research, model, and valuation handoffs already exist.
---

# Investment Chart Pack

Generate the chart artifact and manifest; do not redo research, modeling, or valuation.

## Core Rule

Every chart must trace to an approved data artifact, period, unit, transformation, and source. Never replace missing data with placeholders or the preserved example values in the migrated reference.

## How To Apply

1. Verify the research fact pack, audited financial model, valuation handoff, requested chart scope, and project run folder.
2. Read the complete migrated workflow in `references/task4-chart-generation.md`.
3. Confirm the current environment has the declared plotting capability before running any code. Installation is not implicit.
4. Generate charts and a manifest recording chart id, analytical question, input artifact, fields, periods, units, calculation, source, and output file.
5. Run visual and numerical QA, then hand the manifest to the coverage writer.

## Required Output

```text
Chart pack path:
Chart manifest:
Charts generated:
Charts skipped:
Source gaps:
Visual QA:
Handoff to coverage writer:
```

## Do Not Use

- Approved upstream data is missing.
- The user only wants an HTML visualization of a completed IC memo; use `investment-visual-report`.
- The user wants a pitch deck or strip profile rather than a research chart pack.

## References

- `references/task4-chart-generation.md` — complete migrated chart-generation workflow, chart catalog, code examples, and QA rules.

## 完成标准

- 完成 Required Output 中全部适用交付物与 Quality checks，数字、口径、单位、来源、时期和叙事相互一致。
- 产物必须可由目标读者直接使用；缺失输入保持可见，不得补造财务数字、交易事实或客户结论。
- 在 Mode 内调用与独立调用执行同一质量门槛，失败项由本 Skill 原地返工。
