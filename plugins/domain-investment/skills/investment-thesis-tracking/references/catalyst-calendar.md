# Internal Method: Catalyst Register

Use this method inside `investment-thesis-tracking` to build a dated monitoring table. It does not operate or synchronize an external calendar.

## Catalyst categories

- company events: earnings, financing, launches, roadmap milestones, pricing, customer or partnership announcements;
- industry events: peer results, platform changes, standards, major conferences, competitive launches;
- regulatory and legal events: decisions, filings, hearings, compliance deadlines;
- macro and market events: rates, policy, commodity/currency, budget cycles, procurement windows;
- DD events: expected evidence delivery, management meetings, customer references, or verification deadlines.

## Required fields

| Field | Meaning |
| --- | --- |
| Date or window | Exact date when supported; otherwise a labeled range |
| Event | Observable occurrence, not a vague theme |
| Source / basis | Accepted Artifact evidence or stated assumption |
| Affected pillar | Thesis pillar or risk tested |
| Expected signal | What would support, weaken, or falsify the pillar |
| Probability | Optional; include only with a defensible basis |
| Materiality | High / medium / low with decision rationale |
| Dependency | Precondition or related event |
| Action | Review, verify, upgrade, downgrade, exit, or no change |
| Revisit trigger | What requires the entry to be refreshed |

## Event-window discipline

- Distinguish confirmed dates, management targets, market expectations, and analyst estimates.
- Do not infer a fiscal period from a calendar date.
- Do not fabricate dates to make the table complete.
- Avoid double-counting one underlying event under several names.
- Separate the expected event from the evidence that would matter after it occurs.

## Prioritization

Focus attention on catalysts that can change recommendation, valuation, financing risk, a veto, or a thesis pillar. High-likelihood but immaterial events should not crowd out low-frequency, thesis-breaking events.

## Post-event update

After a dated input is supplied, record actual outcome, difference from expectation, affected pillar, conviction impact, action, and next trigger. Retain the original expected signal for auditability.

## Completion test

The register is ready when every high-materiality event links to a pillar, observable signal, action, source/basis, and honest date status. The table lives inside `09-thesis-tracking.md`; no external calendar or separate workbook is required.
