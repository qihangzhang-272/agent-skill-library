# Funding and Deal-Flow Research Method

This is an internal method of investment-research. Use it when the fact pack needs financing rounds, valuation signals, capital-markets activity, investor participation, or a dated sector deal-flow comparison.

The method produces evidence for 02-fact-pack.md. It does not produce a PowerPoint, spreadsheet, document, email, or separate briefing Artifact, and it never invokes another Skill or Agent.

## 1. Establish Coverage and Period

Derive these fields from the core investment question and supplied materials:

| Field | Rule |
|---|---|
| Companies or sectors | State the exact universe boundary |
| Perspective | Company raising funds or investor deploying funds |
| Start and end date | Use exact dates, not only “this week” |
| Transaction types | Equity rounds, debt, secondary, IPO/follow-on, M&A, or other declared types |
| Currency | Preserve reported currency and state any conversion source/date |
| Stop condition | Define the coverage and duplication threshold |

In a managed workflow, do not create a second approval pause. If the scope is incomplete, record the ambiguity and use a conservative stated boundary only when the research can remain decision-useful.

## 2. Build and Validate the Entity Universe

For sector work, begin with the hypotheses in sector-seeds.md, then expand through current primary or licensed sources available to this Skill. Keep the universe manageable and explain additions and exclusions.

Pre-validate every entity before searching transactions:

1. Resolve the brand to a legal entity and, when available, a stable source identifier.
2. Confirm whether it is operating, a subsidiary, acquired, inactive, or unresolved.
3. For subsidiaries, identify the parent and do not misreport the absence of independent rounds as “no activity.”
4. For inactive or acquired companies, separate historical transactions from current-period activity.
5. Record the source and date of entity status.

### Resolution fallbacks

Never accept an unexpected empty result without checking:

- exact spelling and punctuation;
- legal name and known aliases;
- parent/subsidiary status;
- stable source-specific identifier, but only when that source is already available to this Skill;
- whether the entity is too new or absent from the chosen source.

If resolution still fails, mark the entity unresolved and explain the expected coverage impact. Do not silently drop it.

## 3. Collect Transactions

Use current sources available within this Skill’s authorized research surface. Prefer detailed transaction records over aggregate summaries; aggregates may be used as a cross-check but not as the sole source.

Keep the query perspective explicit:

- company perspective: rounds raised by the company;
- investor perspective: rounds in which the investor participated.

Confusing these perspectives can create false empty results.

For a large universe, process coherent batches and audit empty results after each batch. Retrying entities must use the resolution fallbacks above and be recorded in the search log.

Capture for every transaction when available:

| Field | Requirement |
|---|---|
| Transaction identity | Stable ID and source link when available |
| Company and legal entity | Preserve the resolved entity |
| Announcement date | Required; use unknown when unavailable |
| Close date | Required; use unknown when unavailable |
| Amount raised | Currency, units, and whether disclosed/estimated |
| Pre-money valuation | Disclosed, estimated with method, or unknown |
| Post-money valuation | Disclosed, estimated with method, or unknown |
| Round or security type | Series/stage and instrument |
| Lead and other investors | Distinguish lead from participant when possible |
| Advisors | Only when decision-relevant and sourced |
| Pricing trend | Up, down, flat, or unknown, with comparison basis |
| Evidence | Source, publication date, reporting period, capture date |

Do not infer an undisclosed valuation from round size. Do not merge announcement and close dates. Preserve conflicting transaction values and state which source is preferred and why.

## 4. Add Company Context

For significant transactions, add only the context needed to interpret the financing:

- product and business description;
- company stage and prior financing history;
- use of proceeds when sourced;
- major commercial or product milestone near the round;
- prior valuation basis;
- whether the transaction changes ownership, control, or runway.

Keep financing facts separate from company narrative and management claims.

## 5. Identify Notable Events

Treat these as screening heuristics, not universal conclusions:

- unusually large round for the sector or stage; USD 100 million may be a default flag, not a fixed law;
- down round or material terms deterioration;
- post-money valuation crossing a meaningful threshold such as USD 1 billion;
- valuation step-up of roughly 2x or more from the most comparable prior round;
- repeat financing within six months;
- unusually broad or strategically important syndicate;
- financing structure that changes dilution, preference, or control risk.

Each “notable” label must show the comparison basis. A large absolute round can be ordinary in one sector and exceptional in another.

## 6. Analyze Period and Sector Signals

Where the data supports it, calculate or describe:

- total disclosed capital and transaction count;
- median and distribution of round size rather than only an average;
- stage distribution;
- sub-sector concentration;
- most active investors;
- geographic concentration;
- disclosed valuation direction;
- no-activity sectors or entities;
- comparison with a prior period using the same universe and definitions.

Do not claim acceleration or compression without a comparable baseline. Sparse valuation disclosure is itself a limitation, not evidence of stability.

Distill three to five data-backed takeaways only after completing the transaction register. Each takeaway must cite the records that support it and name the major caveat.

## Contribution to 02-fact-pack.md

Insert these sections:

- Coverage universe and period
- Entity-resolution log
- Transaction register
- Financing and valuation facts
- Notable events and comparison basis
- Period / sector signals
- Contradictions and source preference
- No-activity observations
- Unknowns, attempts, and decision impact
- Evidence references

## Quality and Failure Handling

- Unexpected empty result: retry legal name, alias, parent/subsidiary status, and authorized stable identifier before recording no data.
- Subsidiary: record parent context; do not call it an independent company with zero rounds.
- Inactive company: preserve history but exclude it from claims about current active deal flow.
- No activity in period: state it explicitly; absence can be informative only after universe and source coverage are credible.
- Sparse valuations: retain unknowns and use a better-supported metric instead of inventing averages.
- Conflicting dates or values: preserve both, choose a preferred source by provenance, and expose the conflict.
- Large universe: prioritize complete provenance and notable records over a shallow, unverified list.
- Stale seed: broaden or replace it with a sourced current entity and record the change.

Return this material to investment-research. Do not install packages, call a presentation or document workflow, create external links that were not present in the source, publish, distribute, or advance the Workflow.
