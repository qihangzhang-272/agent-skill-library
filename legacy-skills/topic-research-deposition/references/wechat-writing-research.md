# WeChat Writing Research Mode

Use this reference only for `wechat-writing-research`.

This mode preserves the original public-account research experience: search is for article writing, not generic fact lookup. It collects raw material, screenshots, and writing ammunition before handing off to `qihang-writing-style`.

## Pre-Search Confirmation

Before creating folders or searching, confirm:

1. What does Qihang want to understand?
   - development history, controversy, key people, technical principle, business model, philosophy, product, or current debate
   - existing knowledge level
   - the core question the article should answer
2. What platforms and content types matter?
   - Twitter/X heat
   - Reddit depth
   - English long-form
   - WeChat Chinese discussion
   - papers, GitHub, podcasts, videos
   - any surfaces to avoid
3. What is the rough writing direction?
   - deep commentary, product analysis, technical explainer, industry overview, philosophy essay, argument essay
   - preliminary stance
   - angles to avoid
   - known sources, people, projects, or articles to include

Write a 3-5 sentence confirmation summary to `{draft_dir}/_确认.md`.

## Folder

Use this folder only in WeChat writing mode:

```powershell
$base = "C:\Users\Administrator\Desktop\AI\codex\Writing platforms\agent-skill-library-management\writing\wechat\drafts\{YYYY-MM-DD}-{topic-slug}"
New-Item -ItemType Directory -Force -Path "$base\sources" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\screenshots" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\wechat" | Out-Null
```

If a run needs legacy platform folders, create them under this draft folder:

```text
twitter/
reddit/
web/
wechat/
```

Do not use this folder for generic product or investment research.

## Search Strategy

Default tool is `agent-reach`.

Use 3-4 progressive rounds, but treat social heat, forum depth, web/primary sources, and WeChat articles as coverage angles, not ordered commands.

| Round | Goal | Search Intent |
| --- | --- | --- |
| 1 | Phenomenon overview | Core keywords, Chinese and English, who is discussing it, what is hot |
| 2 | Source tracing | Key people, original posts, canonical articles, project docs |
| 3 | Definition and critique | What the concept means, objections, limitations, skeptical views |
| 4 | Deep arguments and examples | Long-form essays, papers, GitHub, production cases, historical analogies |

Coverage target:

- phenomenon itself
- concept definition
- at least one objection or critique
- at least one systematic argument
- at least one production case, project, or concrete example

## Source Files

One source per file when practical:

```markdown
# [title]
- **作者/来源**:
- **发布时间**:
- **原始链接**:
- **关键数据**:
- **抓取方式**: agent-reach / fallback tool
- **搜索轮次**:
- **状态**: full / partial / metadata-only / failed
---
[full text or full relevant excerpt]
```

Do not write "这篇值得关注因为..." in source files. That is analysis, not deposition.

## Screenshots

Screenshots are evidence and candidate article images.

- Screenshot important URLs after source text is saved.
- Use descriptive filenames: `{surface}-{序号}-{slug}.png`.
- If agent-reach provides screenshot/archive capability, prefer it.
- If fallback is needed, use `shot-scraper`.
- Do not fabricate screenshots for sources without URL access.

## Completion Report

After research, stop and report:

```text
## [topic] 素材沉淀完成

Mode: wechat-writing-research
Search tool: agent-reach
素材目录:
素材总量:
截图:
五维度覆盖:
覆盖盲区:
下一步建议: 是否进入 qihang-writing-style 的 SCQA framing？
```

Do not continue into SCQA or drafting until Qihang says to continue.
