---
name: qihang-wechat-layout
description: Apply the stable “航的杂谈地图” WeChat typography system to finalized Markdown, generate a WeChat-compatible HTML preview, and keep preview and draft publishing on the same theme. Use when the user asks for 启航排版、个人公众号风格、统一预览与草稿箱样式 or wants to replace generic Baoyu themes. Do not use it to rewrite article content or decide illustrations.
---

# 启航公众号排版

把已经定稿的 Markdown 转成“航的杂谈地图”统一排版，同时让本地预览和公众号发布复用同一个主题实现。

## When To Use

- 用户要求使用自己的公众号排版，而不是 `grace`、`simple` 等通用主题。
- `06-final.md` 已完成，需要生成 `06-final.html` 并继续进入草稿箱。
- 需要核对预览和草稿箱是否使用同一套字号、间距、标题、引用和图片规则。

## Core Rule

本技能只拥有视觉排版，不拥有正文和配图判断。不得改写句子、标题层级、引用内容、图片顺序或 `05.5-visual-plan.md`；发布仍由 `baoyu-post-to-wechat` 负责。

## How To Apply

1. 以 `06-final.md` 为唯一语义输入，检查图片路径和 frontmatter 已完整。
2. 使用主题 `qihang-editorial` 和默认主色 `#2447D8` 调用 `baoyu-markdown-to-html`，生成 `06-final.html`。
3. 检查正文宽度、H2/H3 层级、引用、强调、图注、列表、表格和移动端溢出；排版问题修改主题配置，不修改正文。
4. 发布时继续把 `06-final.md` 交给 `baoyu-post-to-wechat`，并使用同一主题与颜色。预览和发布两个入口均调用 `scripts/qihang-layout.ts`。
5. 在 `07-publish-receipt.md` 记录 `qihang-editorial`、主色、图片数和草稿结果。

## 何时不该用

- 正文尚未定稿：交给 `public-account-writing-style`。
- 需要判断是否配图、画面形式或画内文案：交给 `editorial-visual-storytelling`。
- 只生成封面、漫画、信息图或图解：调用对应视觉技能。
- 只执行 API 或浏览器发布：交给 `baoyu-post-to-wechat`。

## References

- `references/layout-contract.md` - 主题真源、组件职责和验收标准。
- `references/provenance.md` - 外部项目启发、许可证边界和独立实现说明。
