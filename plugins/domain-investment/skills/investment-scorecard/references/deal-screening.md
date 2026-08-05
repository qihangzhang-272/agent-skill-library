# Internal Method: Deal Screening

Apply this method inside `investment-scorecard`; it is not an independent Skill or workflow.

## Workflow

### Step 1: Extract Deal Facts

From the provided CIM, teaser, or description, extract:

- **Company**: Name, location, sector/subsector
- **Description**: What they do (1-2 sentences)
- **Financials**: Revenue, EBITDA, margins, growth rate
- **Deal type**: Platform, add-on, recap, minority, carve-out
- **Asking price / valuation**: Multiple, enterprise value if stated
- **Seller motivation**: Why selling now
- **Management**: Rolling or exiting
- **Key customers**: Concentration risk
- **Key risks**: Obvious red flags

### Step 2: Screen Against Criteria

Apply the fund criteria bound in the inputs. If the mandate is absent, record the limitation or return `REWORK`; do not invent criteria.

| Criterion | Target | Actual | Pass/Fail |
|-----------|--------|--------|-----------|
| Revenue range | | | |
| EBITDA range | | | |
| EBITDA margin | | | |
| Growth profile | | | |
| Sector fit | | | |
| Geography | | | |
| Deal size / EV | | | |
| Valuation (x EBITDA) | | | |
| Customer concentration | | | |
| Management continuity | | | |

### Step 3: Quick Assessment

Provide a 3-part assessment:

1. **Verdict**: Pass / Further Diligence / Hard Pass
2. **Bull case** (2-3 bullets): Why this could be a good deal
3. **Bear case** (2-3 bullets): Key risks and concerns
4. **Key questions**: What you'd need to answer on a first call

### Step 4: Contribution to `06-investment-scorecard.md`

Integrate the mandate-fit table, verdict, bull case, bear case, and key questions into the single scorecard Artifact. Do not create a separate one-page memo or another deliverable.

## Important Notes

- Be direct about red flags. Don't bury concerns
- If financials seem inconsistent or incomplete, flag it explicitly
- Use only criteria supplied in the current inputs, including a personal mandate only when it is explicit; if criteria are absent, record the limitation or return `REWORK`
- Do not invent or silently persist screening criteria
