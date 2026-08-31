---
name: sell-side-ma-materials
description: Use when the user needs a sell-side M&A confidential information memorandum, anonymous teaser, or buyer-facing transaction material based on approved company, financial, and transaction inputs.
---

# Sell-side M&A Materials

Produce either a full CIM or an anonymous teaser from approved transaction materials.

## Core Rule

Choose CIM or Teaser before drafting. Respect the approved disclosure perimeter and anonymization requirements; do not research, value, or invent transaction facts inside this skill.

## How To Apply

1. Confirm output mode, company or code name, audience, transaction context, approved source materials, disclosure limits, and output path.
2. Read `references/cim-builder.md` for CIM mode or `references/teaser.md` for Teaser mode.
3. Build only from approved materials. Mark missing or withheld facts rather than substituting training knowledge.
4. Run the complete structure, numerical, disclosure, and anonymization checks from the selected full reference.
5. Write the final document to the user project run folder.

## Required Output

```text
Mode:
Approved materials:
Disclosure / anonymization constraints:
Sections completed:
Open data gaps:
Quality checks:
Output path:
```

## Do Not Use

- The user wants an IC memo, public-equity coverage report, pitch deck, Tear Sheet, or Strip Profile.
- Transaction materials or disclosure authority are missing.

## References

- `references/cim-builder.md` — complete migrated CIM workflow.
- `references/teaser.md` — complete migrated anonymous Teaser workflow.

## 完成标准

- 完成 Required Output 中全部适用交付物与 Quality checks，数字、口径、单位、来源、时期和叙事相互一致。
- 产物必须可由目标读者直接使用；缺失输入保持可见，不得补造财务数字、交易事实或客户结论。
- 在 Mode 内调用与独立调用执行同一质量门槛，失败项由本 Skill 原地返工。
