# Product And Investment Research Modes

Use this reference for `product-research` and `investment-research`.

The goal is to collect facts before `ai-product-analyzer` or `product-analysis` modes. Do not produce the final product judgment inside this skill.

## Product Research

Use when Qihang needs product facts before analysis, visual report, or frontend brief.

Minimum coverage:

- Product name, website, docs, demo, screenshots.
- One-sentence positioning from primary sources.
- Target user and main workflow.
- Pricing, packaging, or business model if public.
- Customers, usage claims, traction, testimonials, or public metrics.
- Competitors and alternatives.
- Founder/team signal when relevant.
- GitHub repo, license, contributors, releases, issues when relevant.
- Recent updates, changelog, launch posts, or funding news.

Output:

```text
Mode: product-research
Research object:
Primary facts:
Missing facts:
Source folder:
Suggested handoff: ai-product-analyzer
```

## Investment Research

Use when Qihang needs evidence for investment memo, IC memo, DD question tree, or OSS investment.

Minimum coverage:

- Financing history, valuation hints, investors, market timing.
- Team and founder-market fit.
- Market category and buyer.
- Commercial traction: customers, revenue hints, pilots, usage, retention proxies.
- Competition, platform risk, and replacement risk.
- For OSS: GitHub stars, contributors, commit activity, license, issue quality, external adoption, commercial entity, cloud offering, monetization path.
- Acquisition / exit comparables when useful.

Output:

```text
Mode: investment-research
Research object:
Investment question:
Verified facts:
Unverified claims:
Missing facts:
DD priority candidates:
Suggested handoff: product-analysis chain for OSS investment structured and visual output
```

## Evidence Discipline

- Separate source facts from inference.
- Mark unknowns as `未找到 / 待验证`.
- Do not treat website copy, launch hype, or media phrasing as traction.
- Prefer primary sources: docs, GitHub, pricing pages, changelogs, customer pages, founder posts, filings, funding announcements.
- Use current search for unstable facts such as funding, pricing, team, customers, GitHub metrics, and market claims.
