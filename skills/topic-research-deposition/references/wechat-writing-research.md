# WeChat Writing Research Mode

Use this reference only for `wechat-writing-research`.

This mode preserves the original public-account research experience: search is for article writing, not generic fact lookup. It collects raw material, screenshots, and writing ammunition before handing off to `public-account-writing-style`.

## Pre-Search Confirmation

Before creating folders or searching, confirm:

1. What does the user want to understand?
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

Write a 3-5 sentence confirmation summary to `{run_dir}/_确认.md`.

## Folder

Use the chain-owned run folder in WeChat writing mode. Do not invent another base path:

```text
writing/drafts/{YYYY-MM-DD}-{topic-slug}/
  _确认.md
  01-topic-research/
    sources/
    screenshots/
```

If a run needs platform folders, create them under `01-topic-research/sources/`.

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

## Standard Flow

```text
clarify research objective
-> choose mode
-> create mode-appropriate research folder
-> search with agent-reach
-> save raw source material by source/platform
-> screenshot important URLs（强制，见 Screenshots 节）
-> quality check
-> report coverage
-> [standalone call] stop for next instruction
-> [explicit end-to-end chain, no new authorization or blocking gap] hand off to public-account-writing-style
```

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

## Screenshots（强制）

截图是证据，也是候选文章配图。**这一步是强制的。** `01-topic-research/screenshots/` 空目录 = 研究流程没走完。

- 每个被引用的关键源 URL（推文、论文、博客、prompt PDF、官方公告页）都要截图存档。
- 命名：`{surface}-{序号}-{slug}.png`，如 `twitter-01-bloom-cdc.png`、`web-01-openai-cdc-proof.png`。
- 优先用 playwright browser 截图；fallback 用 `shot-scraper`。
- 无 URL 访问的源，标注 `no-screenshot` 并说明原因，不要伪造截图。
- 截图同时是文章配图候选--起草时可直接引用。

## Completion Report

After research, always report:

```text
## [topic] 素材沉淀完成

Mode: wechat-writing-research
Search tool: agent-reach
素材目录:
素材总量:
截图:（必须列出 screenshots/ 里的文件；空目录要说明原因）
五维度覆盖:
覆盖盲区:
下一步交接: standalone=等待用户决定 / end-to-end chain=进入 public-account-writing-style
```

Standalone calls must stop after the report. In an explicitly requested end-to-end `wechat-writing` chain, continue through the declared handoff when coverage passes and no new login, scope expansion, material gap, or publishing authorization is required.
