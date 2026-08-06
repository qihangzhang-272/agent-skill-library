---
name: investment-valuation-returns
description: Use when an investment case needs valuation framing, peer multiples, DCF or transaction-method interpretation, price-target or decision ranges, IRR/MOIC scenarios, sensitivities, exit assumptions, or valuation red flags.
---

# Investment Valuation Returns

Answer what must be true for the investment to work financially. Standalone and workflow use share the same method, traceability, scenario, and limitation requirements.

## Scope

Interpret valuation and returns. Do not create a hidden model, fetch missing market data, repair upstream facts, decide DD questions, write the IC Memo, or invoke another Skill.

- Standalone: use user-supplied facts, approved assumptions, and any supplied audited model.
- Workflow: read `02-fact-pack.md`, `03-product-judgment.md`, `04-competitive-landscape.md`, `05-unit-economics.md`, and `06-investment-scorecard.md`.
- Write one independently readable `07-valuation-returns.md`.
- Treat package references as internal valuation methods, not callable Skills, Agents, data providers, or spreadsheet workflows.

If the as-of date, units, capital structure, operating basis, or evidence is materially insufficient, tell the Host which responsible Skill must add what and why. Never turn missing values into zero. If a numeric result is not supportable, give bounded scenario logic only when decision-useful; otherwise state the limitation. For unavailable information, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it.

## Internal methods

- `references/returns-analysis.md` for MOIC/IRR, return attribution, and sensitivity.
- `references/comps-analysis.md` for peers, normalized metrics, multiples, and comparability.
- `references/initiating-coverage/valuation-methodologies.md` for DCF, public comps, precedents, and reconciliation.
- `references/price-target-range.md` for enterprise-to-equity bridge, price target, or private decision range.

An audited model may be evidence. Do not rebuild it here, but still test assumptions and limitations.

## Analytical obligations

1. State valuation date, currency, units, fiscal periods, LTM/NTM convention, capital structure date, and evidence basis.
2. Explain why each valuation method is used or excluded; do not average methods mechanically.
3. Explain peer inclusion/exclusion by business model, customer, growth, margin, scale, geography, and capital intensity.
4. Tie every operating metric, multiple, forecast, leverage, exit assumption, and diluted claim to evidence or a labeled assumption.
5. Show bridges for enterprise value, equity value, per-share or entry value, MOIC, IRR, and return attribution as applicable.
6. Build bull/base/bear cases by varying the assumptions that matter.
7. Identify dominant sensitivities and quantify plausible effects.
8. Reconcile methods, entry basis, upside/downside, horizon, exit route, and disagreements.
9. Record counterevidence, circular assumptions, stale data, comparability failures, and red flags.

## Artifact

```text
Valuation basis
Method selection and exclusions
Peer set and comparability assessment
Normalized inputs and source/assumption map
Enterprise-to-equity bridge
Bull / base / bear valuation and return cases
MOIC / IRR logic and return attribution, when applicable
Sensitivity and dominant drivers
Method reconciliation and decision range
Counterevidence, red flags, data limitations, and unknowns
```

Do not invoke the next Skill; finish the Artifact and let the Workflow continue.
