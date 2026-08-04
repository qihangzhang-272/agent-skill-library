---
name: topic-research-deposition
description: >
  Use when the user asks to 搜一下、调研、找资料、沉淀素材、补截图、做产品事实收集、投资/OSS research、公众号选题搜索、写作前第 0 步，或需要在写作/产品分析前建立可复查的 evidence folder.
---

# Topic Research Deposition

This skill collects source material before writing, product analysis, investment review, or general research. It deposits evidence; it does not write the final article, product verdict, or investment memo.

Standalone use and managed-workflow use MUST apply the same research and evidence-quality standard. A workflow may bind inputs and an Artifact path, but it never permits an abbreviated research pass.

## Core Rule

Default search and access tool: `agent-reach`.

Twitter/X, Reddit, Exa/web, 微信公众号, GitHub, Hacker News, YouTube, podcasts, papers, and other platform searches are treated as agent-reach reach surfaces. Do not turn them into a required sequence. Use direct platform commands only as fallback when agent-reach is unavailable, incomplete, or the user explicitly asks for a direct platform command.

`SKILL.md` is the router. Load only the references required by the selected mode. Do not load all WeChat, product, and fallback command references together.

## Mode Selection

Choose one mode before creating folders or searching.

| Mode | Use When | Required References |
| --- | --- | --- |
| `general-research` | General research, background checks, source collection, concept definition, broad web/social search | `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `writing-research` | Research for an article that is not necessarily WeChat-specific | `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `wechat-writing-research` | 公众号选题、第 0 步、需要微信素材、公众号爆款逻辑、图文截图和后续交给 `public-account-writing-style` | `references/wechat-writing-research.md`, `references/wechat-viral-logic.md`, `references/wechat-extraction.md`, `references/quality-checklist.md` |
| `product-research` | Facts needed before `ai-product-analyzer`: product, company, pricing, customers, competitors, demo, docs, GitHub, traction | `references/product-investment-research.md`, `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `investment-research` | Facts needed before product-analysis structured output: financing, team, market, OSS metrics, commercial traction, DD evidence; also the first managed investment node | `references/product-investment-research.md`, `references/agent-reach-search.md`, `references/quality-checklist.md` |

If the user says "公众号", "第 0 步", "爆款", "推草稿箱前", or asks for WeChat screenshots, choose `wechat-writing-research`.

If the user asks for product analysis, product visual report, investment report, or OSS investment and facts are missing, choose `product-research` or `investment-research` before analysis.

## Standard Flow

```text
clarify research objective
-> choose mode
-> create mode-appropriate research folder
-> search with agent-reach
-> save raw source material by source/platform
-> screenshot or archive evidence according to the selected mode
-> quality check
-> report coverage and stop for next instruction
```

The final “stop for next instruction” rule applies to standalone and writing modes. In the managed investment workflow, follow the contract below instead: finish the Artifact, return control to the current Host owner, and let the Workflow own its human checkpoint.

## Managed Investment Workflow Contract

Use this contract only when the frozen Workflow binds this Skill as `topic-research-deposition`.

Required inputs:

- `run-input:research-object` — the company, product, project, or security under review;
- `run-input:supplied-materials` — may be an empty declared collection, but must not be silently assumed;
- `run-input:core-question` — the investment question that determines relevance and stopping depth.

Produce exactly one node Artifact: `artifacts/01-source-intake.md`. Raw captures may be stored as cited evidence attachments, but they are not additional node Artifacts.

The Artifact must contain:

```text
Status: READY / READY-WITH-GAPS / REWORK
Research object:
Core question:
Materials consumed:
Research scope and stop condition:
Search and capture log:
Source register:
Verified source facts:
Claims present only in supplied materials:
Contradictions and counterevidence:
Assumptions:
Unknowns and failed retrievals:
  attemptRefs:
  boundedAttempts:
    limit:
    used:
    exhausted:
  reason:
  decisionImpact:
  fallback:
  revisitTrigger:
Evidence references:
Coverage by required area:
Handoff for investment-research:
```

Each decision-relevant fact must point to a source or evidence reference. Each unknown must copy the limit frozen in the Plan, record used attempts and `exhausted=true`, and include attempt refs, reason, decision impact, fallback, and revisit trigger. Do not turn a company claim into a verified fact merely because it appears in supplied materials.

Completion states:

- `READY`: all required deposition obligations are satisfied.
- `READY-WITH-GAPS`: a required fact remains unavailable after bounded, recorded attempts, but the gap and its decision impact are explicit and the fact pack can still proceed.
- `REWORK`: required coverage, provenance, separation of fact from claim, or evidence references are missing because the work is incomplete. Do not label incomplete work as a gap.

The direct consumer is `investment-research`. It must accept the required obligations and handoff sections before this node is complete. On rejection, revise `01-source-intake.md` and return it for acceptance; do not weaken the contract.

After writing the Artifact, return control to the current Host owner. Do not pause inside this Skill for an extra approval, do not invoke `investment-research` or any later Skill, and do not advance the Workflow yourself.

## Output Contract

Every run must end with:

```text
Mode:
Research folder:
Search tool:
Sources collected:
Screenshots / archived evidence:
Coverage:
Gaps:
Next suggested handoff:
```

Handoff rules:

- In standalone runs, `writing-research` and `wechat-writing-research` can suggest `public-account-writing-style` as a handoff.
- 交接给 `public-account-writing-style` 后，该 skill 会先做**编辑判断**（竞争解释 / 反证 / 未知项 / 暂时结论 / 删除哪些材料，落盘 `01.5-editorial-judgment.md`），再选框架起草。编辑判断在写作之前完成，比选框架更重要。
- In standalone runs, `product-research` can suggest product analysis as a handoff.
- A handoff suggestion never invokes another Skill. The current Host owner decides what runs next.
- Outside the managed investment workflow, do not continue into the next Skill until the user says to continue.

## Storage Rules

- General/product/investment research should use a neutral research folder, not the WeChat run folder.
- Only `wechat-writing-research` uses `writing/drafts/{YYYY-MM-DD}-{topic-slug}/`; its source material and screenshots live under `01-topic-research/`.
- Keep raw source material separate from analysis. Do not turn the deposition folder into a finished article or memo.
- Save one source per file when practical. Include title, author/source, date, URL, capture method, search mode, and full text or full relevant excerpt.
- If a source cannot be fully fetched, mark it as `partial` and explain why. Do not hide the failure behind a summary.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Treating every research task as WeChat writing | Choose mode first; WeChat is only one mode. |
| Treating a platform list as a required search sequence | Use agent-reach as the default reach layer; platforms are surfaces, not workflow nodes. |
| Losing existing WeChat experience while generalizing | Load `wechat-writing-research.md` and `wechat-viral-logic.md` when mode is WeChat. |
| Summarizing sources instead of depositing them | Save raw source material first; analysis belongs to the next skill. |
| Continuing into writing or product analysis automatically | Return control to the current Host owner; standalone modes wait for the user and managed mode follows the frozen Workflow. |
| Claiming agent-reach was used when it was not available | State the actual fallback command or tool used. |

## Reference Files

| File | When to Read |
| --- | --- |
| `references/agent-reach-search.md` | Default search behavior, source surfaces, fallback policy |
| `references/wechat-writing-research.md` | WeChat-specific folder layout, confirmation questions, rounds, screenshot and report format |
| `references/wechat-viral-logic.md` | WeChat virality and search-to-writing logic; required for `wechat-writing-research` |
| `references/wechat-extraction.md` | WeChat fetch/CAPTCHA fallback details |
| `references/product-investment-research.md` | Product, company, OSS, investment fact collection |
| `references/platform-commands.md` | Direct command fallback only when agent-reach cannot cover a platform |
| `references/quality-checklist.md` | Final quality check for source completeness and deposition discipline |
