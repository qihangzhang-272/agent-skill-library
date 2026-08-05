# Chain: WeChat Writing

## 适用

把可选的公众号账号语料采集、主题研究、编辑写作、排版、视觉计划、选择性视觉生产、HTML 预览和草稿箱发布串成一次端到端交付。

本 chain 只规定调用顺序、交接和落盘，不承担选题判断、文章判断、视觉内容判断、文案判断或视觉形式判断。所有领域判断由对应瓦技能完成。

## 链路

```text
[按需前置：用户要求账号历史 / 对标账号语料]
  domain-writing:wechat-account-corpus-research
  ↓
domain-writing:topic-research-deposition
  -> domain-writing:public-account-writing-style
  -> domain-writing:baoyu-format-markdown
  -> domain-writing:editorial-visual-storytelling
  -> [只调用 05.5-visual-plan.md 中列出的 Render owner]
       ├─ 研究截图 / 转载原图复用
       ├─ domain-writing:baoyu-article-illustrator
       ├─ domain-writing:baoyu-infographic
       ├─ domain-writing:baoyu-diagram
       ├─ domain-writing:baoyu-comic
       └─ domain-writing:baoyu-cover-image
  -> [需要时] domain-writing:baoyu-compress-image
  -> 最终 Markdown 组装
  -> domain-writing:baoyu-markdown-to-html
  -> domain-writing:baoyu-post-to-wechat
```

## 职责边界

| Owner | 负责 | 不负责 |
| --- | --- | --- |
| `workflow-orchestrator` | 选择本 chain、按顺序调用技能、检查交接文件、按 plan 分发渲染任务、组装和发布 | 不判断文章内容；不选择图片形式；不写画内文案；不修改 plan |
| `wechat-account-corpus-research` | 按需批量采集账号公开历史或已知 URL，规范化语料、口径与失败记录 | 不做全网研究、竞品结论、私有指标抓取或写作 |
| `topic-research-deposition` | 研究范围、来源、截图、coverage 与 gaps | 不起草正文 |
| `public-account-writing-style` | 唯一正文 owner；编辑判断、框架取舍、文章结构、初稿、事实审校、AI-Flavor Filter 与最终修订 | 不决定最终配图 |
| `baoyu-format-markdown` | Markdown 层级与排印 | 不改观点、不做视觉计划 |
| `editorial-visual-storytelling` | 全部视觉内容判断、Visual Copy Desk、资产取舍、形式选择、Render owner 与 `05.5-visual-plan.md` | 不渲染图片、不发布 |
| 各 Baoyu 视觉技能 | 严格按 plan 渲染并保留原生过程包 | 不重新选择形式，不临场新增文案或论点 |
| `baoyu-markdown-to-html` | 从最终 Markdown 生成预览 | 不成为默认发布语义源 |
| `baoyu-post-to-wechat` | 把最终 Markdown 保存到公众号草稿箱 | 不自动群发 |

`workflow-orchestrator` 读取 `05.5-visual-plan.md` 的 `Render owner` 字段进行调用，这只是任务分发，不是内容路由。若 plan 缺少 Owner、文案或目标路径，退回 `editorial-visual-storytelling` 补全，orchestrator 不代填。

## 阶段与 Handoff

| 阶段 | Owner | 输入 | 必留产物 | 交接条件 |
| --- | --- | --- | --- | --- |
| 0. 范围与能力预检 | orchestrator | 用户目标、项目根、发布意图 | `_确认.md` | 确认 run folder、研究范围、是否需要账号语料、是否需要草稿箱和必需能力是否可用。 |
| 1A. 账号语料（按需） | `wechat-account-corpus-research` | `_确认.md`、账号或 URL、日期/数量范围 | `01-topic-research/sources/wechat-accounts/` | 原始导出与规范化语料分离；manifest、计数口径、失败和授权层级完整。 |
| 1B. 研究沉淀 | `topic-research-deposition` | `_确认.md`、可选账号语料 manifest | `01-topic-research/` | 原始材料与分析分离；关键来源和截图存在，缺口已记录。 |
| 2. 编辑与写作 | `public-account-writing-style` | `_确认.md`、`01-topic-research/` | `01.5-editorial-judgment.md`、`02-outline.md`、`03-draft.md`、`04-revised.md` | 完成竞争解释、反证、未知项、暂时结论、材料删除判断、事实审校与强制 AI-Flavor Filter；框架只按题材选用。 |
| 3. Markdown 排版 | `baoyu-format-markdown` | `04-revised.md` | `04-revised-analysis.md`、`05-formatted.md` | 只处理 Markdown 结构与排印，正文语义不变。 |
| 4. 视觉计划 | `editorial-visual-storytelling` | `01.5-editorial-judgment.md`、`04-revised.md`、`05-formatted.md`、研究视觉素材、项目视觉偏好 | `05.5-visual-plan.md` | 视觉判断、文案、最终形式、Render owner、复杂度、来源和目标路径完整。 |
| 5. 视觉生产 | plan 中列出的 Owner | `05.5-visual-plan.md`、对应原始素材 | 各技能原生过程包、`imgs/` 发布资产 | 所有 `Required=yes` 资产完成；任何内容变化先退回 plan Owner。 |
| 6. 最终组装 | orchestrator | `05-formatted.md`、`05.5-visual-plan.md`、`imgs/` | `06-final.md` | 图片路径存在；正文无占位符；frontmatter、封面和转载信息完整。 |
| 7. HTML 预览 | `baoyu-markdown-to-html` | `06-final.md` | `06-final.html`；可选 `06-preview-mobile.png` | 检查断图、层级、引用、间距和移动端溢出。 |
| 8. 草稿箱发布 | `baoyu-post-to-wechat` | `06-final.md` | `07-publish-receipt.md` | 只保存草稿；记录方式、主题、图片数和草稿结果。 |

## 单一来源

- `04-revised.md`：正文语义源。
- `05-formatted.md`：排版后的正文源。
- `05.5-visual-plan.md`：视觉判断、视觉文案、形式和 Render owner 的唯一来源。
- `06-final.md`：唯一发布源。
- `06-final.html`：预览派生产物，不是默认发布输入。

## 落盘协议

项目夹：`writing/drafts/{YYYY-MM-DD}-{topic-slug}/`

路径相对用户当前项目目录，不得写入插件目录。

```text
_确认.md
01-topic-research/
  sources/
    wechat-accounts/             # 仅在需要账号历史或批量 URL 时创建
      _run-manifest.json
      <account-slug>/
        account.json
        manifest.json
        raw/
        articles/
        export-report.md
  screenshots/
01.5-editorial-judgment.md
02-outline.md
03-draft.md
04-revised.md
04-revised-analysis.md
05-formatted.md
05.5-visual-plan.md
imgs/
  outline.md
  prompts/
  cover.png
  NN-<type>-<slug>.png
infographic/
diagram/
comic/
06-final.md
06-final.html
06-preview-mobile.png
07-publish-receipt.md
```

## 执行规则

- 用户要求账号历史或对标账号语料时，先完成账号语料采集，再做主题研究；没有该需求时跳过 1A，不把它变成每篇文章的固定成本。
- 研究完成后才能写作；写作完成后才能排版；排版冻结后由视觉领域技能制定 plan。
- `public-account-writing-style` 是本 chain 唯一正文写作 owner，也是 `04-revised.md` 的唯一决策者；编辑判断、框架、事实、观点和最终结构均以它为准。
- 已明确授权完整 chain 时，只读账号语料完成后直接交接研究；若外部运行时要求登录、扫码或改变授权层级，必须在动作前暂停并取得当轮明确同意。
- 账号语料授权不包含阅读量/评论凭据抓取、代理证书、微信 UI 操作或发布权限。
- Orchestrator 只调用 plan 中出现的 Render owner；未被选中的视觉技能不调用。
- 下游渲染技能不得改写 `Selected form`、`Exact text`、`Caption outside image`、`Complexity cap` 或 `Target path`。
- 视觉资产失败且需要改变内容方案时，退回 `editorial-visual-storytelling` 更新 plan；orchestrator 只记录状态并重新分发。
- `06-final.md` 只引用 `imgs/` 下的规范化发布资产。
- HTML 预览与发布使用相同主题、颜色和引用模式。
- 用户未明确授权草稿箱发布时，在阶段 8 前暂停；发布授权不扩大为群发授权。
