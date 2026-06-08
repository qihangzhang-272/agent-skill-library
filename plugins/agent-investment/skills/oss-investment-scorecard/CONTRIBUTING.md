# Contributing to OSS Investment Scorecard

This framework is maintained by [Lucy Chen](https://linkedin.com/in/lucycxy) and improved through community input. All contributions go through a review process before merging.

---

## Three Types of Contributions

### Type 1 — Submit a Project Evaluation
Use the **[Submit Evaluation issue template](../../issues/new?template=submit-evaluation.md)**.

Requirements:
- Project must have a public GitHub repository
- At least 3 of the 5 dimensions must be backed by **publicly verifiable data** (GitHub metrics, press releases, Crunchbase, court filings, etc.)
- State your role: investor, founder, or analyst

### Type 2 — Propose a Framework Change
Use the **[Framework Change issue template](../../issues/new?template=framework-change.md)**.

A framework change is any modification to:
- Dimension weights
- Scoring thresholds (the 8.5 / 7.0 / 5.5 cutoffs)
- Revenue quality hierarchy
- One-Vote Veto conditions
- Technology layer definitions (L1–L4)

Requirements — **all three must be met**:
- Cite at least **one publicly funded OSS company** as evidence
- Cite at least **one VC report or public LP letter** supporting the change
- Explain what the current framework gets wrong and why

Changes that will **not** be accepted:
- Opinion-only changes with no data backing
- Changes that move a specific project's score without generalising the rule
- Weight changes that aren't backed by cross-sector evidence

### Type 3 — Add or Correct a Case Study
Submit a Pull Request modifying a file in `/cases/`.

Requirements:
- Project must have **completed a publicly announced funding round**
- All financial figures must link to a public source (TechCrunch, Bloomberg, SEC filing, company blog)
- Score must be derived from the framework as written — no custom rules

---

## Pull Request Process

1. Fork the repo, make your changes on a branch named `type/description` (e.g., `case/sglang-radicark`, `framework/revenue-tier-update`)
2. Open a PR with the template filled in completely
3. Lucy reviews within **14 days** — you'll get one of three responses:
   - ✅ **Merged** — with a note on what was accepted
   - 🔄 **Changes requested** — specific edits needed before merge
   - ❌ **Closed** — with explanation; you may resubmit with stronger evidence
4. Merged contributions are credited in `CHANGELOG.md`

---

## What Lucy Is Actively Looking For

- **New case studies** from funded OSS companies in these niches: AI observability, vector databases, open-source model serving, data pipeline orchestration, AI-native security
- **Revenue model evidence** — if you have non-public knowledge about how a funded OSS company actually makes money, and can share it publicly, this is high value
- **Cross-regional signals** — how the framework performs on non-US-origin projects (EU, Israel, India, Korea)

---

## Code of Conduct

- Disagreements about scores are expected and welcome — that's the point
- No personal attacks on founders or investors mentioned in case studies
- If you have a conflict of interest (you work at / invested in the company being evaluated), disclose it in your submission
