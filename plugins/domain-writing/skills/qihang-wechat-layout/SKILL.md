---
name: qihang-wechat-layout
description: Apply the confirmed “航的杂谈地图” personal typography catalog to finalized Markdown, generate WeChat-compatible HTML, and create the read-only pre-publication preview used before draft publishing. Use when the user asks for 启航排版、个人公众号风格、个人样式目录、HTML 预览 or wants to replace generic Baoyu themes. Do not use it to rewrite content or decide illustrations.
---

# 启航公众号排版

把已经定稿的 Markdown 转成“航的杂谈地图”统一排版。个人样式目录是配置；发布前预览是只读质检页，不是调样式工作台。

## When To Use

- 用户要求使用自己的公众号排版，而不是 `grace`、`simple` 等通用主题。
- Markdown 已完成，需要生成正式 HTML 或继续进入草稿箱。
- 需要核对预览和草稿箱是否使用同一套字号、间距、标题、引用和图片规则。

## Core Rule

本技能只拥有视觉排版，不拥有正文和配图判断。不得改写句子、标题层级、引用内容、图片顺序或 `05.5-visual-plan.md`；发布仍由 `baoyu-post-to-wechat` 负责。

## How To Apply

1. 接受任意已定稿 Markdown；在完整公众号项目中通常是 `06-final.md`。
2. 检查图片路径和 frontmatter，再用主题 `qihang-editorial`、默认主色 `#2447D8` 调用 `baoyu-markdown-to-html` 生成同名 HTML。
3. 用 `scripts/build-publish-preview.ts` 从正式 HTML 生成同目录的 `06-final.preview.html`，只读检查 677px 与 375px 阅读宽度、断图、层级和横向溢出。
4. 进入草稿箱前必须查看这份发布前预览；用户已经明确授权“直接进草稿箱”时，可以省略再次确认，但不能省略预览与技术检查。
5. 发布时把同一 Markdown 交给 `baoyu-post-to-wechat`。正式 HTML 和发布 HTML 均调用 `scripts/qihang-layout.ts`，不得各维护一份 CSS。
6. 若进入草稿箱，在发布回执中记录主题、主色、图片数、预览检查和草稿结果。

## Personal Style Rule

- `assets/qihang-style-catalog.json` 是个人组件样式与默认值真源；只服务正式渲染，不向预览页提供交互控制。
- 默认发布样式：H1 刊头双线、H2 编号底线、H3 荧光底线、引用居中金句、重点标签主色强调、有序列表双位编号、无序列表圆角对勾、表格极简横线。
- 可切换备选：H1 居中细线、H2 居中栏目、引用衬线大引语。
- 未确认的组件效果、主题实验、字体滑杆和间距滑杆不进入目录。

## Interface

- 接受：已定稿 Markdown、可选主色、文章内本地图片。
- 产生：微信兼容 HTML 与只读发布前预览；完整发布任务中可继续产生草稿箱回执。
- 可接上游：任何能交付定稿 Markdown 的写作或组装技能。
- 可接下游：人工浏览检查；发布任务中，预览检查通过后再接 `baoyu-post-to-wechat`。

## 何时不该用

- 正文尚未定稿：交给 `public-account-writing-style`。
- 需要判断是否配图、画面形式或画内文案：交给 `editorial-visual-storytelling`。
- 只生成封面、漫画、信息图或图解：调用对应视觉技能。
- 只执行 API 或浏览器发布：交给 `baoyu-post-to-wechat`。

## References

- `references/layout-contract.md` - 主题真源、组件职责和验收标准。
- `references/publish-preview.md` - 发布前只读预览页的边界、用法和停止条件。
- `references/provenance.md` - 外部项目启发、许可证边界和独立实现说明。
