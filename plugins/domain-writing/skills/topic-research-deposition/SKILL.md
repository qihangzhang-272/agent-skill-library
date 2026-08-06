---
name: topic-research-deposition
description: >
  Use when the user asks to 搜一下、调研、找资料、沉淀素材、补截图、做产品事实收集、投资/OSS research、公众号选题搜索、写作前第 0 步，或需要在写作/产品分析前建立可复查的 evidence folder.
---

# Topic Research Deposition

Collect source material before writing, product analysis, investment review, or general research. Deposit evidence; do not write the final article, product verdict, or investment memo.

Standalone and workflow use apply the same research and evidence-quality standard. Workflow position never permits an abbreviated research pass.

## Core rule

Use `agent-reach` as the default search and access tool. Treat Twitter/X, Reddit, Exa/web, 微信公众号, GitHub, Hacker News, YouTube, podcasts, papers, and other platforms as reach surfaces, not a mandatory sequence. Use direct platform commands only when `agent-reach` is unavailable or incomplete, or the user asks for one.

公众号账号级历史、批量 URL 和对标账号语料由 `wechat-account-corpus-research` 负责。用户明确要求这些能力时，先调用该瓦技能，再消费其 manifest；本技能不要平行实现第二套账号抓取。

`SKILL.md` is the router. Load only the references required by the selected mode. Do not load all WeChat, product, and fallback command references together.

## Mode selection

| Mode | Use when | Required references |
| --- | --- | --- |
| `general-research` | General research, background checks, source collection, concept definition, broad web/social search | `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `writing-research` | Research for a non-WeChat-specific article | `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `wechat-writing-research` | 公众号选题、第 0 步、爆款逻辑、图文截图 | `references/wechat-writing-research.md`, `references/wechat-viral-logic.md`, `references/wechat-extraction.md`, `references/quality-checklist.md` |
| `product-research` | Product, company, pricing, customers, competitors, demo, docs, GitHub, traction | `references/product-investment-research.md`, `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `investment-research` | Financing, team, market, OSS metrics, commercial traction, DD evidence | `references/product-investment-research.md`, `references/agent-reach-search.md`, `references/quality-checklist.md` |

Choose `wechat-writing-research` for “公众号”、“第 0 步”、“爆款”、“推草稿箱前” or WeChat screenshot requests. Choose `product-research` or `investment-research` before analysis when the relevant facts are missing.

## Standard flow

```text
clarify research objective
-> choose mode
-> create mode-appropriate research folder
-> [if account history or benchmark corpus is requested] consume wechat-account-corpus-research output
-> search with agent-reach
-> save raw source material by source/platform
-> screenshot or archive evidence according to the selected mode
-> quality check
-> report coverage and stop for next instruction
```

Standalone and writing modes stop after reporting coverage. In a Workflow, this Skill returns its completed Artifact to the current Host, which continues the declared chain.

## Investment Workflow output

Read the research object, supplied materials, and core investment question. Write one independent `01-source-intake.md`; raw captures may remain as cited evidence attachments.

Include:

```text
Research object and core question
Research scope and stop condition
Materials consumed
Search and capture log
Source register
Verified source facts
Claims present only in supplied materials
Contradictions and counterevidence
Assumptions
Unknowns and failed retrievals
Evidence references
Coverage by required area
```

Each decision-relevant fact must point to a source. Keep company claims separate from verified facts. For genuinely unavailable information, explain in business language what is missing, why it is unavailable, how it affects the decision, the conservative treatment, and when to revisit it, then continue.

- `writing-research` and `wechat-writing-research` can hand off to `public-account-writing-style`.
- 交接后由 `public-account-writing-style` 先完成编辑判断，再决定是否使用框架并完成起草与终审；本技能只提供研究过程包。
- `product-research` can hand off to `ai-product-analyzer`.
- `investment-research` can return to the current Host, which follows the product-analysis chain resolved by `workflow-orchestrator` for OSS investment structured and visual output.
- 独立调用本技能时，完成 coverage report 后停止，等待用户决定是否继续。
- 用户已明确要求运行完整 `wechat-writing` chain 时，由当前 Host 管理交接；只读研究门禁通过后不额外暂停，但新增登录、扩范围或发布授权仍必须单独确认。

If supplied scope or evidence is materially incomplete, tell the Host which responsible Skill must add what and why. Do not invoke the next Skill yourself; finish this Artifact and let the Workflow continue.

This Skill never invokes the next Skill itself. In a Workflow it completes its Artifact and returns control to the current Host; outside a Workflow it waits for the user.

## Standalone output

```text
Mode
Research folder
Search tool
Sources collected
Screenshots / archived evidence
Coverage
Gaps
Next suggested step
```

For writing work, the next writing Skill first performs editorial judgment (competition explanations, counterevidence, unknowns, temporary conclusion, and discarded material) before selecting a framework. A suggestion never invokes another Skill; wait for the user outside a Workflow.

## Storage rules

- Use a neutral research folder for general, product, and investment research.
- Only `wechat-writing-research` uses `writing/drafts/{YYYY-MM-DD}-{topic-slug}/`; place sources and screenshots under `01-topic-research/`.
- Keep raw source material separate from analysis. Save one source per file when practical, including title, source, date, URL, capture method, search mode, and full text or the full relevant excerpt.
- Mark partial fetches as `partial` and explain why.

## Common mistakes

| Mistake | Correction |
| --- | --- |
| Treating every research task as WeChat writing | Choose mode first; WeChat is only one mode. |
| Treating a platform list as a required search sequence | Use agent-reach as the default reach layer; platforms are surfaces, not workflow nodes. |
| Losing existing WeChat experience while generalizing | Load `wechat-writing-research.md` and `wechat-viral-logic.md` when mode is WeChat. |
| Summarizing sources instead of depositing them | Save raw source material first; analysis belongs to the next skill. |
| Rebuilding account-history crawling inside this skill | Call `wechat-account-corpus-research`, then consume its manifest and corpus. |
| Continuing after a standalone research call | Stop after coverage report; only an explicitly requested end-to-end chain may continue through its declared handoff. |
| Claiming agent-reach was used when it was not available | State the actual fallback command or tool used. |
| Reducing research quality because this Skill is one node in a long chain | Standalone and Workflow runs must satisfy the same evidence standard and quality contract. |

## Reference files

| File | Read when |
| --- | --- |
| `references/agent-reach-search.md` | Default search behavior, source surfaces, fallback policy |
| `references/wechat-writing-research.md` | WeChat folder layout, questions, rounds, screenshots, report format |
| `references/wechat-viral-logic.md` | WeChat virality and search-to-writing logic |
| `references/wechat-extraction.md` | WeChat fetch/CAPTCHA fallback details |
| `references/product-investment-research.md` | Product, company, OSS, investment fact collection |
| `references/platform-commands.md` | Direct command fallback only |
| `references/quality-checklist.md` | Source completeness and deposition discipline |
