# Schemas Reference

Additional table formats not shown in main SKILL.md.

## M&A Transaction Table

| Acquirer | Target | Date | Deal Value | Multiple | Rationale |
|----------|--------|------|------------|----------|-----------|
| Company A | Company B | MMM YYYY | $X.XB | X.Xx EV/Rev | [Strategic logic] |

State multiple methodology: "X.Xx EV/Revenue" or "X.Xx EV/EBITDA"

## Scenario Analysis Table

| Scenario | Probability | Competitive / Operating Outcome | Key Assumptions |
|----------|-------------|---------------------------------|-----------------|
| Bull | XX% | [Observable competitive or operating outcome] | [Specific, quantified] |
| Base | XX% | [Observable competitive or operating outcome] | [Specific, quantified] |
| Bear | XX% | [Observable competitive or operating outcome] | [Specific, quantified] |

Do not create valuation outputs in this table. Valuation belongs to `investment-valuation-returns`; this node passes forward only competitive mechanisms, signposts, and operating implications.

These tables are Markdown sections inside `04-competitive-landscape.md`. They do not require a slide, spreadsheet, or separate visual Artifact.
