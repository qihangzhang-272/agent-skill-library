# Chain: WeChat Writing

## 适用

公众号选题研究、编辑写作、Markdown 排版、自动视觉路由、封面、HTML 预览与草稿箱发布。视觉路由可复用原始截图，也可按内容选择通用插图、信息图、SVG 图解或知识漫画。用户只要其中一个瓦技能时可单独调用；用户要求端到端交付时走本链。

## 链路

```text
domain-writing:topic-research-deposition
  -> 研究 Handoff
  -> domain-writing:public-account-writing-style
  -> domain-writing:baoyu-format-markdown
  -> 视觉路由器（写入 05.5-visual-plan.md）
  -> 统一视觉 Handoff
  -> [按计划选择性并行]
       ├─ 研究截图复用
       ├─ domain-writing:baoyu-article-illustrator
       ├─ domain-writing:baoyu-infographic
       ├─ domain-writing:baoyu-diagram
       ├─ domain-writing:baoyu-comic
       └─ domain-writing:baoyu-cover-image
  -> [条件节点] domain-writing:baoyu-compress-image
  -> 发布资产归一 + 最终 Markdown 组装
  -> domain-writing:baoyu-markdown-to-html（仅预览）
  -> 发布 Handoff
  -> domain-writing:baoyu-post-to-wechat（输入仍为最终 Markdown）
```

视觉路由器是本 chain 内的一段编排逻辑，不是新的包装技能或第二个调度器。未被选中的视觉技能不调用、不要求产物。图像后端按各视觉技能规则解析：Codex 优先使用原生 imagegen；Claude Code 等没有原生后端的运行时可调用 `domain-writing:baoyu-image-gen`，首次使用时完成 provider/model 偏好设置。`domain-writing:baoyu-compress-image` 只在图片体积、格式或上传失败需要处理时调用，不是主链硬门槛。

## 自动视觉路由

完成 `05-formatted.md` 后，先识别视觉位置、内容信号和阅读节奏，生成 `05.5-visual-plan.md`，再调用视觉技能。每个视觉位置只有一个 Owner，避免多个技能重复表达同一段内容。

### 路由优先级

1. 用户明确指定的视觉形式。
2. 已有且能支撑论点的原始截图或转载原图；证据图不再生成模拟版本。
3. 专门视觉技能处理其擅长的信息结构。
4. `baoyu-article-illustrator` 承接剩余的一般性配图。
5. 没有实际视觉价值时标记 `none`，不为凑数量生成图片。

| 内容信号 | Owner | 公众号资产 | 规则 |
| --- | --- | --- | --- |
| 产品界面、原文、推文、论文或数据证据 | 研究截图 / 转载原图 | `imgs/NN-source-<slug>.png` | 保留来源、顺序和转载标注，不生成替代图。 |
| 概念隐喻、氛围、章节转场、人物场景、一般性解释 | `baoyu-article-illustrator` | `imgs/NN-illustration-<slug>.png` | 通用回退，只处理未被专门技能占用的位置。 |
| 多指标、数据总览、矩阵、层级、周期、高密度总结 | `baoyu-infographic` | `imgs/NN-infographic-<slug>.png` | 一张图能形成独立信息单元时调用。 |
| 架构、组件关系、流程、状态、决策树、数据流、时间顺序 | `baoyu-diagram` | `imgs/NN-diagram-<slug>.png` | 保留原生 SVG；正文只插入它生成的 `@2x.png`。 |
| 教程、传记、寓言、连续情节、人物对话、起承转合 | `baoyu-comic` | `imgs/NN-comic-<slug>-pXX.png` | 叙事顺序本身有价值时调用；普通文章不自动生成整套漫画。 |
| 封面缺失 | `baoyu-cover-image` | `imgs/cover.png` | 独立分支，不与正文视觉 Owner 竞争。 |
| 没有清晰视觉任务或证据图已足够 | `none` | — | 不生成正文图不算失败。 |

冲突时按信息目标选择：关系必须精确时 diagram 优先；重点是“一图读懂”时 infographic 优先；需要持续角色与情节时 comic 优先；单页顺序解释优先 infographic 的 `linear-progression` / `comic-strip`，不启动完整 comic。diagram 使用固定暗色技术风格；如果全文视觉统一性比关系精度更重要，可回退到 illustrator 的 flowchart/framework。视觉预算按文章长度、章节数量、信息密度与已有证据图自动计算，并写进计划，封面不计入正文视觉预算。

### `05.5-visual-plan.md` 契约

每行至少记录：`ID`、插入位置、内容信号、Owner、计划形式、视觉参数、原始来源、原生过程产物、目标发布文件、`Required` 与 `Status`。状态只允许：

    planned -> confirmed -> generating -> complete
                         -> fallback
                         -> dropped-with-reason

只有 `Required=yes` 的位置必须完成；可选视觉失败时可回退或带原因删除，不能留下占位符。视觉方案与实际选中分支的参数在同一个 Handoff 确认；用户已明确说“直接生成 / 不用确认”时，只跳过各技能自身允许跳过的确认。Comic 的 Step 2 仍是硬门，infographic / comic 首次缺少 `EXTEND.md` 时仍须先完成各自 setup。已经在统一 Handoff 确认过的参数，子技能不得重复询问。

### 并行边界

- `05-formatted.md` 冻结且统一视觉 Handoff 通过后，封面与相互独立的正文视觉分支可以并行。
- Comic 必须先完成 storyboard、所选 review、prompts 与角色表；有角色表时先生成角色表，再按其 batch policy 生成页面。
- 每个图片技能先落盘完整 prompt，再开始其图片批次；diagram 的可复现源是 SVG，不强制虚构 prompt。
- 所有 `Required=yes` 资产完成后才能组装 `06-final.md`；图片并发遵循各技能自己的 batch policy，不为渲染图片单独派生子代理。

## 单一来源与角色边界

- `04-revised.md` 是正文语义源；后续排版和配图不得改写观点或增删正文。
- `06-final.md` 是唯一发布源；封面、正文图和发布元数据都在这里完成归一。
- `06-final.html` 是从 `06-final.md` 派生的预览产物，不是默认发布输入。
- `baoyu-post-to-wechat` 必须读取 `06-final.md`，由发布器自行完成最终 HTML 转换和图片上传。不要把预览 HTML 接到默认 Markdown 发布路径。

## 阶段与 Handoff

| 阶段 | Owner | 输入 | 必留产物 | 完成与交接条件 |
| --- | --- | --- | --- | --- |
| 0. 范围与能力预检 | orchestrator | 用户目标、项目根、发布意图 | `_确认.md` | 确认研究范围、文章类型和是否需要推草稿箱；确认本链技能可发现、图片后端与发布方式可用。若视觉路由可能选 diagram / comic，同时检查 bun 或 npx，以及插件声明的 `sharp` / `pdf-lib` 运行依赖。缺失能力时在进入对应阶段前处理。 |
| 1. 研究沉淀 | `topic-research-deposition` | `_确认.md` | `01-topic-research/sources/`、`01-topic-research/screenshots/`、coverage/gaps 报告 | 原始材料与分析分离；关键 URL 有截图或 `no-screenshot` 原因；报告 coverage/gaps。用户只要求研究时在此停止；已明确授权端到端写作时可继续。 |
| 2. 编辑与写作 | `public-account-writing-style` | 研究过程包 | `01.5-editorial-judgment.md`、`02-outline.md`、`03-draft.md`、`04-revised.md` | 完成编辑判断、事实审校和 AI-Flavor Filter；配图位只引用真实截图或可生成概念。Handoff 明确保留/删除的材料、未知项和正文语义源。 |
| 3. Markdown 排版 | `baoyu-format-markdown` | `04-revised.md` | `04-revised-analysis.md`、`05-formatted.md` | 只调整标题层级、强调、列表、引用、分隔和中英文排印；保留已确认标题、观点和全部正文。将格式化输出归一为 `05-formatted.md`。 |
| 4A. 自动视觉路由 | orchestrator | `05-formatted.md`、研究截图 / 转载原图、视觉偏好 | `05.5-visual-plan.md` | 每个位置只有一个 Owner；计算视觉预算，记录原生过程产物与发布路径，只展示实际选中分支的参数并完成统一视觉 Handoff。 |
| 4B. 视觉生产 | 计划中选中的视觉技能 | `05-formatted.md`、`05.5-visual-plan.md`、原始视觉素材 | 各技能原生过程包、`imgs/` 发布资产、封面候选 | 各 Owner 按自己的产物契约验收；所有 Required 资产为 `complete`。diagram 同时保留 SVG 与 `@2x.png`；封面最终归一到 `imgs/cover.png`。 |
| 5. 最终组装 | orchestrator | `05-formatted.md`、`05.5-visual-plan.md`、`imgs/` | `06-final.md` | 正文不剩 `[📷 配图建议：...]`；所有相对图片路径存在；frontmatter 至少含 title、summary/description 和 `coverImage: imgs/cover.png`。转载场景同时保留转载说明、原图来源与原文 URL。 |
| 6. HTML 预览 | `baoyu-markdown-to-html`；可选截图由 orchestrator 调用当前运行时已有浏览器能力 | `06-final.md` | `06-final.html`；可选 `06-preview-mobile.png` | 必须检查 HTML 的断图、标题层级、引用、段间距和主题；有浏览器能力时再以移动端视口生成截图并检查溢出。预览与发布使用相同 theme、color 和引用模式；默认发布会生成文末引用，因此默认预览显式启用 `--cite`。 |
| 7. 发布 | `baoyu-post-to-wechat` | `06-final.md`、账号/方式/来源 URL | `07-publish-receipt.md` | 发布前展示预览和清单。用户已明确要求推草稿箱且账号/方式明确时可继续；否则暂停确认。只保存草稿，不扩大为群发。记录 method、theme、图片数、草稿 media_id 或浏览器结果。 |

## 落盘协议（领域细则）

项目夹：`writing/drafts/{YYYY-MM-DD}-{topic-slug}/`

路径相对「用户当前工作项目目录」，不是技能库/插件仓库。若项目根不明确，先确认；绝不把文章过程包、图片或发布产物写进 `plugins/`。

```text
_确认.md
01-topic-research/
  sources/
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
  <topic-slug>/
    analysis.md
    structured-content.md
    prompts/
    infographic.png
diagram/
  <topic-slug>.svg
  <topic-slug>@2x.png
comic/
  <topic-slug>/
    analysis.md
    storyboard.md
    characters/
    prompts/
    NN-<cover-or-page>-<slug>.png
    <topic-slug>.pdf
06-final.md
06-final.html
06-preview-mobile.png  # 可选：运行时有浏览器截图能力时生成
07-publish-receipt.md
```

## 执行规则

- 素材搜索和证据沉淀必须先于起草；搜索节点不得把摘要冒充原文沉淀。
- 截图是研究完成条件，也是候选正文图。每个被引用的关键 URL 都应截图；无法访问时记录原因，不伪造。
- 配图建议不是配图完成。完成条件按 Owner 验收：illustrator 的 outline / 逐图 prompt / 图片一致；infographic 的 analysis / structured-content / prompt / PNG 齐全；diagram 的 SVG / `@2x.png` 齐全且无重叠溢出；comic 的 storyboard / 角色定义 / 选定页面 prompt / 页面一致；截图的原证据和来源存在；封面有最终 `imgs/cover.png`。
- `06-final.md` 只引用 `imgs/` 下的规范化发布资产，不直接引用技能工作目录。diagram 的 SVG 留在过程包，公众号正文只引用 PNG；comic 只复制选定页面，PDF 不进入正文。
- 高密度 infographic 在移动端文字过小时必须拆图或回退为分节视觉，不能单纯缩小。除连续漫画页外，避免两张全宽生成图紧邻。
- 图片中文字有误时更新 prompt 后重新生成，不允许覆盖式修字。压缩只处理尺寸、质量或格式，不改变文字与主体构图；压缩后必须保持或同步更新 Markdown 路径。
- 封面技能可以在任意工作目录生成候选，但 Handoff 前必须把最终封面归一为 `imgs/cover.png` 并写入 frontmatter；发布时显式传入该封面或由 frontmatter 解析。
- HTML 预览与发布必须使用相同的 theme、color 和引用模式。用户要求保留行内链接时，预览不启用 `--cite`，发布显式使用 `--no-cite`。
- `baoyu-markdown-to-html` 的必留产物只有 HTML 和 JSON 元数据；移动端预览截图由 orchestrator 在浏览器能力可用时另行生成，不能把缺少可选截图误判为 HTML 转换失败。
- API 发布可先对 `06-final.md` 执行发布器 `--dry-run`，验证标题、摘要、HTML 路径和图片占位数量；正式发布仍使用同一 Markdown。
- 三类可能暂停点：研究范围、统一视觉 Handoff、草稿箱发布。用户当前请求已明确覆盖某个暂停点时不要重复确认；Comic 的 Step 2 与各技能首次偏好 setup 等硬门仍然有效。
