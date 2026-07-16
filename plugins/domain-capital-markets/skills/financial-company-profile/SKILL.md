---
name: financial-company-profile
description: Use when the user needs a company tear sheet, company one-pager, fact sheet, company snapshot, corporate-development target profile, sales meeting brief, or investment-banking strip profile for a named public or private company.
---

# Financial Company Profile

Create a compact company profile in one of two output modes: Tear Sheet or Strip Profile.

## Core Rule

Choose the output mode and audience before collecting data. Preserve data provenance, reporting periods, units, and missing-data labels. Do not invent management, ownership, financial, or relationship facts.

## How To Apply

1. Ask for the company, audience, output mode, valuation date, available source materials, and output format when any are unclear.
2. Read `references/tear-sheet.md` and the matching audience reference for Tear Sheet mode; read `references/strip-profile.md` for Strip Profile mode.
3. Use S&P/Kensho only when available and authorized. Otherwise consume an approved fact pack and retain the same data-integrity rules.
4. Create intermediate files inside `{{RUN_FOLDER}}/tear-sheet-data/` and write artifacts to the user project folder, never to this plugin.
5. Apply the full migrated formatting and quality rules before delivering DOCX, PDF, or PPTX.

## Required Output

```text
Company:
Audience:
Mode:
Source artifacts / provider:
As-of date:
Output path:
Data gaps:
Quality checks:
```

## Do Not Use

- The user needs an initiating-coverage report, IC memo, full pitch deck, CIM, or teaser.
- The required data is missing and the user has not accepted an explicitly incomplete profile.

## References

- `references/tear-sheet.md` — complete migrated Tear Sheet workflow and document components.
- `references/equity-research.md` — equity-research audience variant.
- `references/ib-ma.md` — investment-banking / M&A audience variant.
- `references/corp-dev.md` — corporate-development audience variant.
- `references/sales-bd.md` — sales and business-development audience variant.
- `references/strip-profile.md` — complete migrated Strip Profile workflow and layout guidance.
