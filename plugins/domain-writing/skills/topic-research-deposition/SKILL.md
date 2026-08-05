---
name: topic-research-deposition
description: >
  Use when the user asks to 搜一下、调研、找资料、沉淀素材、补截图、做产品事实收集、投资/OSS research、公众号选题搜索、写作前第 0 步，或需要在写作/产品分析前建立可复查的 evidence folder.
---

# Topic Research Deposition

This skill collects source material before writing, product analysis, investment review, or general research. It deposits evidence; it does not write the final article, product verdict, or investment memo.

## Core Rule

Default search and access tool: `agent-reach`.

Twitter/X, Reddit, Exa/web, 微信公众号, GitHub, Hacker News, YouTube, podcasts, papers, and other platform searches are treated as agent-reach reach surfaces. Do not turn them into a required sequence. Use direct platform commands only as fallback when agent-reach is unavailable, incomplete, or the user explicitly asks for a direct platform command.

公众号账号级历史、批量 URL 和对标账号语料由 `wechat-account-corpus-research` 负责。用户明确要求这些能力时，先调用该瓦技能，再消费其 manifest；本技能不要平行实现第二套账号抓取。

`SKILL.md` is the router. Load only the references required by the selected mode. Do not load all WeChat, product, and fallback command references together.

## Mode Selection

Choose one mode before creating folders or searching.

| Mode | Use When | Required References |
| --- | --- | --- |
| `general-research` | General research, background checks, source collection, concept definition, broad web/social search | `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `writing-research` | Research for an article that is not necessarily WeChat-specific | `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `wechat-writing-research` | 公众号选题、第 0 步、需要微信素材、公众号爆款逻辑、图文截图和后续交给 `human-writing` | `references/wechat-writing-research.md`, `references/wechat-viral-logic.md`, `references/wechat-extraction.md`, `references/quality-checklist.md` |
| `product-research` | Facts needed before `ai-product-analyzer`: product, company, pricing, customers, competitors, demo, docs, GitHub, traction | `references/product-investment-research.md`, `references/agent-reach-search.md`, `references/quality-checklist.md` |
| `investment-research` | Facts needed before product-analysis structured output: financing, team, market, OSS metrics, commercial traction, DD evidence | `references/product-investment-research.md`, `references/agent-reach-search.md`, `references/quality-checklist.md` |

If the user says "公众号", "第 0 步", "爆款", "推草稿箱前", or asks for WeChat screenshots, choose `wechat-writing-research`.

If the user asks for product analysis, product visual report, investment report, or OSS investment and facts are missing, choose `product-research` or `investment-research` before analysis.

## Standard Flow

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

- `writing-research` and `wechat-writing-research` can hand off to `human-writing`.
- 进入完整 `wechat-writing` chain 时，写作阶段的文件名与交接条件由 chain 负责；本技能只提供研究过程包，不为 `human-writing` 增加第二套框架或写作规则。
- `product-research` can hand off to `ai-product-analyzer`.
- `investment-research` can hand off to `workflow-orchestrator` product-analysis chain for OSS investment structured and visual output.
- 独立调用本技能时，完成 coverage report 后停止，等待用户决定是否继续。
- 用户已明确要求运行完整 `wechat-writing` chain 时，由 chain 管理交接；只读研究门禁通过后不额外暂停，但新增登录、扩范围或发布授权仍必须单独确认。

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
| Rebuilding account-history crawling inside this skill | Call `wechat-account-corpus-research`, then consume its manifest and corpus. |
| Continuing after a standalone research call | Stop after coverage report; only an explicitly requested end-to-end chain may continue through its declared handoff. |
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
