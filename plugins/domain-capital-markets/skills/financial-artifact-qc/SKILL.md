---
name: financial-artifact-qc
description: Use when Qihang needs a final quality-control pass on an investment-banking pitch deck, client presentation, company profile, financial document, or capital-markets artifact for number consistency, narrative alignment, language, and visual readiness.
---

# Financial Artifact QC

Review a finished artifact and report findings; do not silently rewrite its underlying research or valuation.

## Core Rule

Attribute every finding to an artifact location and source handoff. A conflict is a finding to resolve, not permission to choose a preferred value.

## How To Apply

1. Confirm artifact type, source handoffs, review scope, as-of date, and whether the task is read-only or includes an approved remediation pass.
2. Read references/ib-check-deck.md, references/ib-terminology.md, and references/report-format.md.
3. Extract slide or section text into {{RUN_FOLDER}}/financial-artifact-qc/; run scripts/extract_numbers.py for deck number conflicts when applicable.
4. Check numbers, data-narrative alignment, language, visual formatting, source labels, periods, units, and missing-data disclosures.
5. Produce the severity-structured QC report. Do not edit the artifact unless the user separately asks for fixes.

## Required Output

~~~text
Artifact:
Scope:
Source handoffs reviewed:
Blockers:
High findings:
Medium findings:
Low findings:
Unverified items:
Ready for delivery: yes/no
~~~

## Do Not Use

- The artifact still needs research, modeling, valuation, or primary drafting.
- The user asks to create a pitch deck, Tear Sheet, CIM, Teaser, or coverage report from scratch.

## References

- references/ib-check-deck.md — complete migrated deck-QC workflow.
- references/ib-terminology.md — concise banking-language replacement patterns.
- references/report-format.md — severity and finding report format.
- scripts/extract_numbers.py — optional deterministic deck-number conflict check.
