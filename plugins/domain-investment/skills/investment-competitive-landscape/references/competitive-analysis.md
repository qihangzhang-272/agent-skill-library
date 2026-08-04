# Competitive Landscape Mapping Method

This is an internal method of investment-competitive-landscape, not a standalone Skill and not a presentation workflow. Use it to define a market, build a comparable competitor universe, test positioning and moat, and synthesize bull/base/bear implications inside 04-competitive-landscape.md.

It must not request outline approval, create slides, invoke another Skill or Agent, or produce a second Artifact.

## 1. Scope the Analysis

Derive the scope from the accepted fact pack, product judgment, core investment question, and frozen Workflow:

- target company or multi-company universe;
- market/category boundary and explicit exclusions;
- direct, indirect, status-quo, adjacent, and emerging alternatives;
- audience-relevant depth;
- whether valuation context is factual background or belongs to a later valuation node;
- whether scenario analysis is decision-relevant.

In managed workflow use, do not insert another approval pause. If a scope choice is missing, state the conservative choice and its consequences, or mark REWORK when the ambiguity would make the comparison misleading.

## 2. Evidence Standards

Prefer sources in this order when the facts conflict:

1. audited filings and regulatory records;
2. earnings materials, investor presentations, and product documentation;
3. credible analyst or licensed-market data;
4. dated industry reports;
5. news for recent events, verified against primary sources when possible.

For every decision-relevant number record source, document date, reporting period, units, currency, and definition.

Comparability rules:

- use the same fiscal period or flag exceptions;
- use the same metric definition across companies;
- preserve source-file values and precision;
- convert currency only with a recorded rate and date;
- show missing values as unknown;
- label estimates and their method;
- never compare a company-wide metric with a segment metric without saying so.

## 3. Select Industry-Defining Metrics

Choose three to five metrics the industry actually operates on and use them consistently.

| Industry | Candidate metrics |
|---|---|
| SaaS | ARR, NRR, CAC payback, LTV/CAC, Rule of 40 |
| Payments | GPV, take rate, attach rate, transaction margin |
| Marketplace | GMV, take rate, buyer/seller ratio, repeat rate |
| Retail | Same-store sales, inventory turns, sales per square foot |
| Logistics | Volume, unit cost, on-time delivery, capacity utilization |

For an unlisted industry, choose metrics used by credible operators and investors and explain why each metric defines competitive performance.

## 4. Establish Market Context

Define:

- market boundary and customer job;
- market size and dated growth evidence;
- segmentation by product, customer, geography, or business model;
- growth drivers and headwinds;
- regulation and technology shifts;
- realistic addressable market versus promotional TAM;
- why-now window and what could close it.

Avoid generic statements such as “large and fast-growing.” Quantify only when a source and method exist.

## 5. Map Industry Economics

Choose the structure that fits:

- vertical value chain and margin pools;
- platform/network participants and value flows;
- fragmented market and consolidation economics;
- ecosystem dependencies and control points.

Show where value accrues, who controls distribution or data, and which cost or regulatory constraints shape entry.

## 6. Build the Competitor Universe

Group competitors by the lens most useful for the decision:

- business model: platform, vertical, horizontal;
- segment: enterprise, SMB, consumer;
- posture: direct, adjacent, emerging, status quo;
- origin: incumbent, disruptor, new entrant.

Include substitutes and the status quo. Explain every material inclusion and exclusion. Do not restrict the universe to companies named by the target.

For the target and each material competitor capture:

| Category | Coverage |
|---|---|
| Business | What it sells, to whom, and how it monetizes |
| Scale | Comparable revenue, customers, usage, or market share |
| Growth and economics | Industry-defining metrics on a common basis |
| Product | Workflow, breadth, depth, integration, and constraints |
| Distribution | Sales motion, channel, ecosystem, and switching path |
| Strengths | Evidence-backed advantages |
| Weaknesses | Evidence-backed structural or execution limits |
| Strategy | Recent moves and trajectory |

## 7. Express Positioning

Choose one representation and explain the axis logic:

| Representation | Use when |
|---|---|
| 2x2 matrix | Two factors dominate competition |
| Radar comparison | Several comparable dimensions matter |
| Tier diagram | Strategic groups form natural clusters |
| Value-chain map | Competition is vertically structured |
| Ecosystem map | Control depends on platform relationships |

Use frameworks.md for candidate 2x2 axes. The representation may be a Markdown table or described coordinate map inside the Artifact; it is not permission to create a slide or visual-report Artifact.

Every rating must show the underlying actual value or evidence. Do not use unexplained dots, scores, or labels.

## 8. Add Strategic Context

When relevant, include:

- M&A transactions, multiples, and rationale;
- partnerships and distribution shifts;
- capital-raising patterns;
- regulatory developments;
- entry by adjacent platforms;
- open-source or model-layer pressure;
- customer build-versus-buy behavior.

Use schemas.md for the transaction and scenario table shapes. Preserve the boundary between observed events and interpretation.

## 9. Test Moat and Vulnerability

Rate each material moat as Strong, Moderate, Weak, or Unknown, with evidence:

| Moat | Test |
|---|---|
| Network effects | Cross-side or same-side flywheel and evidence of reinforcement |
| Switching costs | Integration depth, contractual lock-in, data/state migration, habits |
| Scale economies | Unit-cost advantage and minimum efficient scale |
| Intangible assets | Brand, proprietary data, licenses, patents, institutional trust |
| Distribution | Privileged channel, installed base, workflow ownership |
| Product/data learning | Whether use creates a durable, private improvement loop |

For every claimed advantage ask:

- Can a platform ship it as a feature?
- Can a customer reproduce it internally?
- Does a model improvement commoditize it?
- Is the advantage current state or improving trajectory?
- What evidence would falsify the moat claim?

Separate durable advantages from temporary execution leads.

## 10. Synthesize Scenarios

For investment contexts, produce bull/base/bear cases with:

- probability or explicitly unweighted status;
- quantified or observable driver;
- competitive mechanism;
- signpost and time horizon;
- what changes the target’s position;
- implications passed to later economic and valuation work.

Probabilities must sum to 100 percent when probabilities are used. Do not invent a valuation inside this node; use an operating or competitive outcome unless valuation evidence is merely being cited as context.

## Contribution to 04-competitive-landscape.md

The method must support these sections:

- market definition and industry metrics;
- market size, growth, value chain, and why now;
- competitor universe and grouping;
- target and competitor comparison;
- positioning representation;
- moat and vulnerability tests;
- strategic context;
- bull/base/bear scenarios and signposts;
- counterevidence and alternative explanations;
- evidence references, assumptions, and unknowns.

## Quality Checklist

- The universe contains direct, indirect, emerging, and status-quo alternatives where relevant.
- The same metric has the same definition, period, units, and value everywhere.
- Every number has a citation and every estimate is labeled.
- Missing data remains unknown and its impact is stated.
- Positioning axes explain real competitive trade-offs.
- Moat claims include disconfirming tests.
- Scenarios contain observable signposts rather than adjectives.
- The output remains one Markdown Artifact and no nested Skill, Agent, external write, or approval pause was introduced.
