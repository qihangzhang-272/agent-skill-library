# Thematic Candidate-Screening Method

This is an optional internal method of `investment-competitive-landscape`, not a standalone Skill. Use it only when the core question needs a thematic sweep, candidate universe, or public-market comparison. It surfaces candidates; it does not make an investment decision or start another workflow.

## Workflow

### Step 1: Define Search Criteria

Derive or record the following parameters from supplied inputs:
- **Direction**: Long ideas, short ideas, or both
- **Market cap**: Large, mid, small, micro
- **Sector**: Specific sector or cross-sector
- **Style**: Value, growth, quality, special situation, event-driven
- **Geography**: US, international, global
- **Theme**: Any specific thematic angle (AI, reshoring, aging demographics, etc.)

In a managed run, do not add another user-approval pause. If a parameter is absent, state the limitation and use a conservative assumption only when the screen remains decision-useful.

### Step 2: Quantitative Screens

Run screens based on the style:

**Value Screen**
- P/E below sector median
- EV/EBITDA below historical average
- Free cash flow yield >5%
- Price/book below 1.5x
- Insider buying in last 90 days
- Dividend yield above market average

**Growth Screen**
- Revenue growth >15% YoY
- Earnings growth >20% YoY
- Revenue acceleration (growth rate increasing)
- Expanding margins
- High return on invested capital (>15%)
- Strong net retention (>110% for SaaS)

**Quality Screen**
- Consistent revenue growth (5+ years)
- Stable or expanding margins
- ROE >15%
- Low debt/equity
- High free cash flow conversion
- Insider ownership >5%

**Short Screen**
- Declining revenue or decelerating growth
- Margin compression
- Rising receivables / inventory vs. sales
- Insider selling
- Valuation premium to peers without justification
- High short interest with deteriorating fundamentals
- Accounting red flags (auditor changes, restatements)

**Special Situation Screen**
- Recent IPOs / SPACs with lockup expirations
- Spin-offs in last 12 months
- Companies emerging from restructuring
- Activist involvement
- Management changes at underperforming companies

### Step 3: Thematic Sweep

For thematic ideas, use only the theme, candidate universe, and evidence already present in the supplied inputs:

1. Restate the accepted thesis (e.g., "AI infrastructure spending accelerates through 2026").
2. Map the accepted candidates across the value chain — direct versus indirect exposure.
3. Separate pure-play from diversified exposure using cited input facts.
4. Assess which accepted names appear priced in versus under-appreciated, with explicit evidence and assumptions.
5. Identify second-order beneficiaries only when they already appear in the accepted candidate universe.

This method does not research a new theme, search for new names, or expand the universe. If the supplied inputs lack evidence or candidates, identify what `fact-pack` must add.

### Step 4: Idea Presentation

For each idea that passes the screen, present:

**[Company Name] — [Long/Short] — [One-Line Thesis]**

| Metric | Value | vs. Peers |
|--------|-------|-----------|
| Market cap | | |
| EV/EBITDA (NTM) | | |
| P/E (NTM) | | |
| Revenue growth | | |
| EBITDA margin | | |
| FCF yield | | |

**Thesis (3-5 bullets):**
- Why this is mispriced
- What the market is missing
- Catalyst to realize value

**Key Risks:**
- What would make this wrong

**Questions for the user:**
- Which evidence or analysis would be needed before this candidate could enter a later approved workflow?

### Step 5: Contribution to `04-competitive-landscape.md`

- Shortlist of 5-10 candidates with compact evidence-backed summaries
- Screening criteria and methodology documented
- Comparison table across all ideas
- Prioritized list: which ideas to research first

## Important Notes

- Screens surface candidates, not conclusions — every screen output needs fundamental work
- The best ideas often come from intersections (e.g., quality company at value price due to temporary headwind)
- Avoid crowded trades — check ownership data, short interest, and how many analysts cover the name
- Contrarian ideas need a catalyst — being early without a catalyst is the same as being wrong
- Track idea hit rates over time — which screens and approaches produce the best ideas?
- Short ideas need higher conviction — timing is harder and risk is asymmetric
- Do not invoke modeling, diligence, expert outreach, or another Skill. Return the candidate evidence to the parent Skill.
