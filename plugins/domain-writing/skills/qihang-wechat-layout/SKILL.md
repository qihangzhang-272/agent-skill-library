---
name: qihang-wechat-layout
description: Apply the stable “航的杂谈地图” WeChat typography system to finalized Markdown, generate the complete visual tuning studio and WeChat-compatible HTML preview, and keep preview and draft publishing on the same theme. Use when the user asks for 启航排版、个人公众号风格、全量排版预览、统一预览与草稿箱样式 or wants to replace generic Baoyu themes. Do not use it to rewrite article content or decide illustrations.
---

# 启航公众号排版

把已经定稿的 Markdown 转成“航的杂谈地图”统一排版，同时让本地预览和公众号发布复用同一个主题实现。

## When To Use

- 用户要求使用自己的公众号排版，而不是 `grace`、`simple` 等通用主题。
- `06-final.md` 已完成，需要生成 `06-final.html`、全量调优页并继续进入草稿箱。
- 需要核对预览和草稿箱是否使用同一套字号、间距、标题、引用和图片规则。
- 需要在一个页面里查看全部主题、组件、图片形态、字体、字号、字重和间距效果，而不是只看推荐样式。

## Core Rule

本技能只拥有视觉排版，不拥有正文和配图判断。不得改写句子、标题层级、引用内容、图片顺序或 `05.5-visual-plan.md`；发布仍由 `baoyu-post-to-wechat` 负责。

## How To Apply

1. 以 `06-final.md` 为唯一语义输入，检查图片路径和 frontmatter 已完整。
2. 使用主题 `qihang-editorial` 和默认主色 `#2447D8` 调用 `baoyu-markdown-to-html`，生成 `06-final.html`。
3. 运行 `bun scripts/build-preview.ts --html <run-folder>/06-final.html`，生成 `06-final.studio.html`。工作台必须展示目录里的全部视觉效果，不按推荐程度、复杂度或兼容等级隐藏。
4. 在工作台中检查 677px 与 375px 正文、全部组件、字体、字号、字重、间距和图片外框；需要对比时直接切换，不修改正文语义。
5. 确认采用某组设置后，才修改主题配置并重新生成 `06-final.html`；工作台中的临时切换本身不改变发布源。
6. 发布时继续把 `06-final.md` 交给 `baoyu-post-to-wechat`，并使用同一主题与颜色。预览和发布两个入口均调用 `scripts/qihang-layout.ts`。
7. 在 `07-publish-receipt.md` 记录最终主题、主色、图片数和草稿结果。

## Complete Studio Rule

- `assets/qihang-studio-catalog.json` 是工作台的全量效果目录；目录内的效果必须全部渲染。
- 当前目录包含 5 套主题、69 种正文组件样式、6 种非默认图片形态，共 75 张效果卡；另含 6 种字体、10–40px 字号、100–900 字重和 5 组间距控制。
- 工作台负责“全部可见、现场比较、复制当前排版”，不替文章选择风格，不把试验态自动写回生产主题。
- 不新增“安全版”“推荐版”或隐藏列表。若某个效果能由目录描述并在浏览器中呈现，就必须出现在 `06-final.studio.html`。

## 何时不该用

- 正文尚未定稿：交给 `public-account-writing-style`。
- 需要判断是否配图、画面形式或画内文案：交给 `editorial-visual-storytelling`。
- 只生成封面、漫画、信息图或图解：调用对应视觉技能。
- 只执行 API 或浏览器发布：交给 `baoyu-post-to-wechat`。

## References

- `references/layout-contract.md` - 主题真源、组件职责和验收标准。
- `references/preview-studio.md` - 全量预览目录、构建命令和调优方式。
- `references/provenance.md` - 外部项目启发、许可证边界和独立实现说明。
