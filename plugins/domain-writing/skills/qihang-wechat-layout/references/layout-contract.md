# 启航排版契约

## 单一真源

`assets/qihang-editorial.json` 是主题 token 真源；`scripts/qihang-layout.ts` 把它编译成微信兼容的内联样式。预览和 Markdown 发布入口都必须调用该脚本，不允许各自维护一份 CSS。

`assets/qihang-style-catalog.json` 是个人组件样式与默认值真源；`scripts/qihang-layout.ts` 将默认值用于正式 HTML。目录不再生成独立效果工作台。

## 职责

- `qihang-wechat-layout`：正文排印、标题层级、引用、列表、表格、代码、图注和图片外框。
- `editorial-visual-storytelling`：配图内容、形式、文案、位置和 Render owner。
- `baoyu-markdown-to-html`：保留成熟 Markdown、脚注、引用、Mermaid 与图片解析，并调用本主题生成预览。
- `baoyu-post-to-wechat`：调用同一主题生成微信 HTML，上传图片并保存草稿。

主题不能替正文做判断，也不能根据内容擅自增加卡片、金句、编号或图片。

## 视觉方向

- 暖纸米白只用于引用和解释区，不铺满整篇正文。
- 墨色深蓝承担正文与标题；钴蓝只承担主要信号；暖橙只标记人的动作或次级转折。
- H1 默认刊头双线，H2 默认编号底线，H3 使用荧光底线；备选只保留居中细线、居中栏目和衬线大引语。
- 引用默认居中金句；重点标签使用主色；有序列表使用双位编号；无序列表使用圆角对勾；表格使用极简横线。
- 正文优先手机阅读，保持稳定留白，不使用负边距、外部字体、脚本和交互样式。
- 图片保持清楚、宽度稳定、圆角克制；图片里的内容由视觉计划决定，排版层不重写画内文字。

## 验收

1. `06-final.html` 含 `data-layout-theme="qihang-editorial"`。
2. HTML 中的 H2、strong、blockquote 已写入主题内联样式。
3. API dry-run 生成的发布 HTML 具有同一主题标记和关键样式。
4. 本地图片保留可上传路径，不转成 Base64 发布源。
5. 375px 移动端无横向溢出，标题、表格、代码和长链接可换行。
6. 个人样式目录只包含正式可用组件，不包含实验主题、交互控制或预览卡片。
