# Internal Method: Due Diligence Workstream Checklist

Use this method inside `investment-dd` to test coverage and prioritize unresolved claims. It is not an independent tracker or document workflow.

## Scope the diligence

Record:

- target, sector, business model, stage, and transaction type;
- current recommendation and the decisions DD must enable;
- known risks, valuation sensitivities, veto candidates, and timing constraints;
- accepted upstream Artifact revisions and open evidence gaps.

## Workstream coverage

Tailor the following rather than copying every item mechanically.

### Financial

- revenue recognition, quality, recurrence, backlog, and adjustments;
- ARR bridge, retention/cohorts, customer concentration, and pricing;
- gross margin, hosting/inference cost, contribution margin, and cash conversion;
- working capital, capex, debt/debt-like items, tax, audit history, and runway;
- management adjustments, scenario assumptions, and reconciliation to valuation.

### Commercial and market

- TAM/SAM/SOM definitions and buyer budget;
- market growth, adoption constraints, replacement risk, and platform dependency;
- competition, win/loss evidence, differentiation, pricing power, pipeline, and GTM efficiency;
- customer references, churn reasons, deployment time, expansion, and satisfaction.

### Product, technology, OSS, and data

- architecture, benchmarks, reliability, scalability, security, and technical debt;
- model/provider dependency, inference economics, data rights, privacy, and governance;
- roadmap feasibility, release quality, incident history, and R&D capacity;
- license, contributor quality, external adoption, governance, fork/platform risk, and monetization.

### Legal, regulatory, and IP

- corporate structure, ownership, cap table, options, and related parties;
- material contracts, change-of-control terms, litigation, compliance, and regulatory approvals;
- IP ownership, contributor agreements, open-source obligations, trademarks, and data licenses;
- employment, non-compete/non-solicit, privacy, security certification, and sanctions/export issues.

### Team, operations, and financing

- founder-market fit, key-person risk, hiring/retention, incentives, and governance;
- organizational bottlenecks, systems, vendors, facilities, insurance, and business continuity;
- fundraising history, current runway, financing needs, use of proceeds, and exit constraints.

## Prioritization and status

For each item record:

```text
Originating claim / Artifact:
Workstream:
Priority: P0 | P1 | P2
Evidence requested:
Expected source / owner:
Status: not requested | requested | received | reviewed | closed | red flag
Finding:
Decision impact:
Closure criterion:
```

- **P0:** potential deal-breaker, veto, fraud/integrity issue, or recommendation-changing evidence.
- **P1:** changes valuation, terms, mitigation, sizing, or conviction.
- **P2:** confirmatory, lower-impact, or post-decision work.

Never mark an item closed merely because a file was received; the evidence must answer the claim and reconcile with other inputs.

## Red-flag escalation

For every red flag, state finding, evidence, severity, consequence, mitigant, residual uncertainty, impact on valuation/terms/verdict, and who must resolve it. Slow or evasive responses are signals, not proof of misconduct.

## Sector adaptations

- **Software/SaaS:** ARR quality, cohorts, hosting/inference cost, security, uptime, implementation, NDR.
- **Financial services:** regulatory capital, compliance, credit quality, liquidity, model risk.
- **Healthcare:** approvals, reimbursement, clinical evidence, privacy, concentration.
- **Industrial:** equipment, safety, environmental liabilities, supply chain, maintenance capex.
- **Consumer:** brand, channel mix, inventory, cohort/repeat behavior, seasonality.

## Completion test

The DD checklist is complete only when every material upstream unknown or contested claim is either mapped to a testable request with decision impact, explicitly out of scope with a reason, or returned upstream as `REWORK`.
