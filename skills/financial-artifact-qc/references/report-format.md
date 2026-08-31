# Financial Artifact QC Report Format

Report findings in this order:

1. **Blocker** — incorrect number, broken formula, missing required disclosure, or rendering failure that prevents delivery.
2. **High** — material period, unit, valuation, or narrative inconsistency.
3. **Medium** — incomplete source label, weak terminology, inconsistent object type, or noticeable layout issue.
4. **Low** — non-material wording, spacing, alignment, or formatting issue.

Each finding must contain:

~~~text
Severity:
Artifact location:
Observed value or issue:
Expected source or rule:
Why it matters:
Recommended remediation:
Owner:
~~~

End with the unresolved-items list and an explicit Ready for delivery: yes/no decision.
