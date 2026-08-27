---
name: qihang-wechat-layout
description: Apply the confirmed “航的杂谈地图” personal typography set to finalized Markdown, generate its visual tuning studio and WeChat-compatible HTML preview, and keep preview and draft publishing on the same styles. Use when the user asks for 启航排版、个人公众号风格、个人样式集、统一预览与草稿箱样式 or wants to replace generic Baoyu themes. Do not use it to rewrite article content or decide illustrations.
---

# 启航公众号排版

把已经定稿的 Markdown 转成“航的杂谈地图”统一排版，同时让本地预览和公众号发布复用同一个主题实现。

## When To Use

- 用户要求使用自己的公众号排版，而不是 `grace`、`simple` 等通用主题。
- `06-final.md` 已完成，需要生成 `06-final.html`、个人样式调优页并继续进入草稿箱。
- 需要核对预览和草稿箱是否使用同一套字号、间距、标题、引用和图片规则。
- 需要在一个页面里查看已经确认的个人样式、主题、字体、字号、字重和间距效果。

## Core Rule

本技能只拥有视觉排版，不拥有正文和配图判断。不得改写句子、标题层级、引用内容、图片顺序或 `05.5-visual-plan.md`；发布仍由 `baoyu-post-to-wechat` 负责。

## How To Apply

1. 以 `06-final.md` 为唯一语义输入，检查图片路径和 frontmatter 已完整。
2. 使用主题 `qihang-editorial` 和默认主色 `#2447D8` 调用 `baoyu-markdown-to-html`，生成 `06-final.html`。
3. 运行 `bun scripts/build-preview.ts --html <run-folder>/06-final.html`，生成 `06-final.studio.html`。工作台只展示已经确认的个人样式集。
4. 在工作台中检查 677px 与 375px 正文、个人样式、字体、字号、字重和间距；需要对比时直接切换，不修改正文语义。
5. 确认采用某组设置后，才修改主题配置并重新生成 `06-final.html`；工作台中的临时切换本身不改变发布源。
6. 发布时继续把 `06-final.md` 交给 `baoyu-post-to-wechat`，并使用同一主题与颜色。预览和发布两个入口均调用 `scripts/qihang-layout.ts`。
7. 在 `07-publish-receipt.md` 记录最终主题、主色、图片数和草稿结果。

## Personal Style Rule

- `assets/qihang-studio-catalog.json` 是个人样式与默认值的共同真源；正式 HTML 和调优工作台都读取它。
- 默认发布样式：H1 刊头双线、H2 编号底线、H3 荧光底线、引用居中金句、重点标签主色强调、有序列表双位编号、无序列表圆角对勾、表格极简横线。
- 可切换备选：H1 居中细线、H2 居中栏目、引用衬线大引语。
- 当前工作台共 11 张样式卡；未确认的组件效果不进入目录。主题、字体与间距控制仍保留。
- 工作台负责现场比较与复制当前排版，不改正文、视觉计划或图片内容。

## 何时不该用

- 正文尚未定稿：交给 `public-account-writing-style`。
- 需要判断是否配图、画面形式或画内文案：交给 `editorial-visual-storytelling`。
- 只生成封面、漫画、信息图或图解：调用对应视觉技能。
- 只执行 API 或浏览器发布：交给 `baoyu-post-to-wechat`。

## References

- `references/layout-contract.md` - 主题真源、组件职责和验收标准。
- `references/preview-studio.md` - 个人样式目录、默认值、构建命令和调优方式。
- `references/provenance.md` - 外部项目启发、许可证边界和独立实现说明。
