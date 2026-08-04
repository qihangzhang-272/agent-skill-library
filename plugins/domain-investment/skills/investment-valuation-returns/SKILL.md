---
name: investment-valuation-returns
description: Use when an investment case needs valuation framing, peer multiples, DCF or transaction-method interpretation, price-target or decision ranges, IRR/MOIC scenarios, sensitivities, exit assumptions, or valuation red flags.
---

# Investment Valuation Returns

Answer what must be true for the investment to work financially. Standalone and managed-workflow use share the same method, traceability, scenario, and limitation requirements; workflow position never justifies a compressed valuation note.

## Scope and ownership

This Skill interprets valuation and returns. It does not create a hidden financial model, fetch missing market data, repair upstream facts, decide DD questions, write the IC Memo, or invoke another Skill.

- **Standalone:** consume user-supplied facts, approved assumptions, and any audited model handoff.
- **Managed workflow:** consume the accepted revisions of `02-fact-pack.md` through `06-investment-scorecard.md` named by the Host, plus only model outputs explicitly bound in the Run.
- **Artifact:** write one independently readable `artifacts/07-valuation-returns.md`.
- Package references are internal valuation methods, not separately callable Skills, Agents, data providers, or spreadsheet workflows. Do not dynamically discover tools or sources from them.

If the as-of date, units, capital structure, key operating basis, or valuation evidence is too weak to support a numeric result, do not turn missing values into zero. Produce bounded scenario logic only when it remains decision-useful; otherwise return `REWORK` to the current Host owner and name the responsible input node.

## Internal methods

Load the method needed for the case:

- `references/returns-analysis.md` for MOIC/IRR, return attribution, and sensitivity;
- `references/comps-analysis.md` for peer selection, normalized metrics, multiples, and comparability limits;
- `references/initiating-coverage/valuation-methodologies.md` for DCF, public comps, precedent transactions, and method reconciliation;
- `references/price-target-handoff.md` for enterprise-to-equity bridge, price target, or private decision range.

An existing audited model may be consumed as evidence. Its formulas are not rebuilt here, and its existence does not remove the obligation to test assumptions and explain limitations.

## Analytical obligations

1. **Normalize the basis.** State valuation date, currency, units, fiscal periods, LTM/NTM convention, capital structure date, and input Artifact revisions.
2. **Select methods deliberately.** Explain why DCF, public comps, precedent transactions, LBO/returns, or another method is applicable or excluded. Do not average methods mechanically.
3. **Build a defensible peer set.** Explain inclusion and exclusion by business model, customer, growth, margin, scale, geography, and capital intensity. Flag imperfect comparability.
4. **Trace every input.** Tie operating metrics, multiples, forecasts, leverage, exit assumptions, and diluted claims to an upstream fact, an approved model output, or a clearly labeled assumption.
5. **Calculate transparently.** Show formulas or calculation bridges for enterprise value, equity value, per-share value or entry value, MOIC, IRR, and return attribution where applicable.
6. **Run bull/base/bear cases.** Vary the assumptions that matter rather than changing conclusions by label. State probabilities only when supportable.
7. **Test sensitivities.** Identify the one or two dominant variables and show how plausible changes affect value and returns.
8. **Reconcile methods.** Explain weights or decision ranges, current price/entry basis, upside/downside, time horizon, exit route, and where methods disagree.
9. **Challenge the result.** Record counterevidence, circular assumptions, stale data, comparability failures, and valuation red flags.

## Artifact contract

`07-valuation-returns.md` must contain:

```text
Valuation basis and input revisions
Method selection and exclusions
Peer set and comparability assessment
Normalized inputs and source/assumption map
Enterprise-to-equity bridge
Bull / base / bear valuation and return cases
MOIC / IRR logic and return attribution, when applicable
Sensitivity and dominant drivers
Method reconciliation and decision range
Counterevidence, red flags, and data limitations
Completion record
```

Completion record:

```text
Status: READY | READY-WITH-GAPS | REWORK
Inputs consumed:
Obligations checked:
Counterevidence:
Unknowns:
  attemptRefs:
  boundedAttempts:
    limit:
    used:
    exhausted:
  reason:
  decisionImpact:
  fallback:
  revisitTrigger:
Next consumer notes:
```

`READY-WITH-GAPS` is allowed only for an unavailable external valuation input after the Plan-frozen limit is reached; record used attempts, `exhausted=true`, and the conservative fallback. Use `REWORK` when a material calculation cannot be traced, units or periods conflict, missing data has been treated as zero, or the result cannot support downstream diligence.

## Direct consumer acceptance

The direct workflow consumer is `investment-dd`. It must be able to identify the valuation method, source and assumption chain, scenario mechanics, sensitivities, contradictions, and evidence that could change value or returns.

Return the Artifact, status, and consumer notes to the current Host owner. **Never call `investment-dd`, `investment-thesis-tracking`, or another next Skill yourself.**
