---
name: investment-banking-pitch-deck
description: Use when the user needs to populate, refresh, or quality-check an existing investment-banking PowerPoint pitch deck template using approved financial, transaction, market, or company handoffs.
---

# Investment Banking Pitch Deck

Populate an existing banking template without changing the approved analytical record.

## Core Rule

Require a user-supplied template and approved source handoffs. Preserve template intent, verify every displayed number, and create real PowerPoint tables, charts, and shapes rather than text imitations.

## How To Apply

1. Confirm the template, source files, requested slides, valuation date, units, branding requirements, and final output path.
2. Read `references/pitch-deck.md` and all four full migrated support references before editing.
3. Inventory the template before replacing content; map approved sources to output areas and disclose gaps.
4. Use the presentation capability available in the current environment. Use XML only when a standard API cannot make the required change.
5. Run the complete rendering, data, and object-type checks before delivery.

## Required Output

```text
Template used:
Source handoffs:
Slides populated:
Data gaps:
Calculations verified:
Rendering checks:
Output path:
```

## Do Not Use

- The user wants a presentation from scratch without a template.
- Inputs are unapproved or the requested analysis still needs research or valuation work.
- The requested output is a Tear Sheet, Strip Profile, CIM, Teaser, initiating-coverage report, or IC memo.

## References

- `references/pitch-deck.md` — complete migrated template-population workflow.
- `references/formatting-standards.md` — full layout and formatting guidance.
- `references/slide-templates.md` — full content mapping guidance.
- `references/xml-reference.md` — full OOXML patterns and risks.
- `references/calculation-standards.md` — full presentation calculation checks.

## 完成标准

- 完成 Required Output 中全部适用交付物与 Quality checks，数字、口径、单位、来源、时期和叙事相互一致。
- 产物必须可由目标读者直接使用；缺失输入保持可见，不得补造财务数字、交易事实或客户结论。
- 在 Mode 内调用与独立调用执行同一质量门槛，失败项由本 Skill 原地返工。
