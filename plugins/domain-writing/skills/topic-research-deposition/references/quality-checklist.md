# Quality Checklist

Run this checklist after each research pass. Fix failures before handing off.

## General Checks

| Check | Standard | If It Fails |
| --- | --- | --- |
| Mode is explicit | Output names one mode from `SKILL.md` | Stop and choose the mode |
| Correct reference set | Only references required by the selected mode were loaded | Drop unrelated references from the run context |
| Search layer is honest | `agent-reach` is used by default, or fallback use is named explicitly | Record the actual fallback tool and reason |
| No summary-only sources | Source files do not contain only "核心要点", "主要观点", "搜索总结", "关键发现", "此处省略", or similar summary labels | Re-fetch or mark as metadata-only |
| Source metadata present | Each source has title, source/author, date if available, URL, capture method, and mode | Add metadata before analysis |
| Raw material separated | Raw source files are separate from notes, judgment, article draft, or memo draft | Split files |
| Folder matches mode | General/product/investment research uses a neutral research folder; only `wechat-writing-research` uses `writing/drafts/` | Move files to the correct folder |
| Queries are reproducible | Search intents, queries, or agent-reach task prompts are recorded | Add a search log |
| Gaps are explicit | Missing sources, failed fetches, and weak evidence are listed | Add gaps before handoff |
| No temp leakage | Scratch JSON, debug txt, and tool dumps are either archived intentionally or removed | Clean the folder |

## Surface Checks

Use these only for surfaces that were actually searched.

| Surface | Standard | If It Fails |
| --- | --- | --- |
| Web / long article | Full text or full relevant excerpt is captured; long articles should normally exceed 5000 bytes | Re-fetch with higher limit or mark partial |
| WeChat article | Full text is captured or CAPTCHA/access failure is recorded; important article has screenshot or archive when possible | Use `wechat-extraction.md` fallback or mark partial |
| Twitter / X | Each important post/thread has full text, author, URL, and visible metrics when available | Re-fetch the specific URL/thread |
| Reddit | Post body/comment text is captured; short posts are marked as short rather than failed | Re-fetch or mark metadata-only |
| GitHub / OSS | Repo root, license, stars/forks, recent commits/releases, issues, and contributor signal are captured when relevant | Re-check primary repo |
| Product/company site | Pricing, docs, demo, changelog, customers, and positioning are captured when relevant | Re-check primary sources |

## WeChat Mode Extra Checks

Only apply when mode is `wechat-writing-research`.

| Check | Standard | If It Fails |
| --- | --- | --- |
| Draft folder | Files live under `writing/drafts/{YYYY-MM-DD}-{topic-slug}/`; evidence lives under `01-topic-research/` | Move files |
| WeChat logic | `wechat-viral-logic.md` has been considered before writing handoff | Load it before reporting ready |
| Screenshot evidence | Every cited key URL has a screenshot under `01-topic-research/screenshots/`, or an explicit `no-screenshot` reason | Capture the screenshot or record why it cannot be captured |
