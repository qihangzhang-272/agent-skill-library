# Agent Skill Library Environment

这是 Agent Skill Library 的人机共读入口。仓库本身是一份已经装入业务能力的 ASL Environment；当前 Host 根据目标激活一个 Mode，并只加载该 Mode 明确选择的完整 Skill。

## 稳定边界

- `skills/` 是正式业务能力的唯一活动真源；每项 Skill 自己保存来源、资源与完成标准。
- `modes/` 只定义工作场与可见能力面，不保存固定执行顺序，也不互相继承。
- `candidates/`、`trials/`、`feedback/` 与 `archive/` 不进入正式能力面。
- 能力发现、结构校验、Mode/Skill 维护和宿主投影属于 ASL Harness，不在本仓库复制第二套调度器或集中索引。
- Codex、Claude Code 与 DeepSeek Harness 使用投影，不成为新的业务真源。

<!-- ASL:CAPABILITY VIEW START -->
## 当前能力（ASL 自动维护）

### 状态摘要

- 正式业务 Skills：37
- 业务 Modes：4
- 确定性提醒：GENERATED_CONTENT_PRESENT：skills/known-content-archive/scripts/__pycache__, skills/known-content-archive/tests/__pycache__, skills/reference-video-analysis/scripts/__pycache__, skills/reference-video-analysis/tests/__pycache__, skills/x-post-card-studio/scripts/__pycache__, skills/x-post-card-studio/tests/__pycache__

### 正式 Skills

- `agent-reach`：MUST USE when user wants to 调研/research/搜索/search/查/找/look up anything on the internet — e.g. 全网调研 X / 帮我调研一下 X / 查一下 X / 搜搜 X / 看看大家怎么评价 X / X 上有什么讨论 / research this topic。
Also MUST USE when user mentions any platform or shares any URL/链接: 小红书/xiaohongshu/xhs, Twitter/推特/X, B站/bilibili, Reddit, Facebook, Instagram, V2EX, LinkedIn/领英/招聘/求职/jobs, YouTube, GitHub code search, 小宇宙播客, 雪球/股票行情, RSS feeds, or any web URL.
15 platforms, multi-backend routing (OpenCLI / per-platform CLIs / APIs). Zero config for 6 channels. Run `agent-reach doctor --json` to see which backend serves each platform right now.
NOT for: 写报告/数据分析/翻译等内容加工（本 skill 只负责从互联网获取内容）； 发帖/评论/点赞等写操作；已有专门 skill 的平台（先用专门 skill）。
【路由方式】SKILL.md 包含路由表和常用命令，复杂场景需按需阅读对应分类的 references/*.md。 分类：search / social (小红书/推特/B站/V2EX/Reddit/Facebook/Instagram) / career(LinkedIn) / dev(github) / web(网页/文章/RSS) / video(YouTube/B站/播客) / finance(雪球)。
- `ai-product-analyzer`：从 BP / Pitch Deck 商业判断逻辑出发，对 AI 产品进行完整评估。 触发方式：- "分析一下 [产品名]" - "评估 [产品]" - "[产品名] 怎么样" - "帮我看看这个 AI 产品" - "这个产品值得关注吗" 输出：11 段 BP 逻辑链评估 → 综合判定（好案例/反面教材/待观察）+ 最强论点 + 最弱缺口 + 建议叙事线。 分析前必须判断是否需要读取 references/；命中商业模式、Data Agent、叙事审计等场景时先读取对应 reference，再输出判断。
- `baoyu-article-illustrator`：Analyzes article structure, identifies positions requiring visual aids, generates illustrations with Type × Style × Palette three-dimension approach. Use when user asks to "illustrate article", "add images", "generate images for article", or "为文章配图".
- `baoyu-comic`：Knowledge comic creator supporting multiple art styles and tones. Creates original educational comics with detailed panel layouts and batch-capable image generation. Use when user asks to create "知识漫画", "教育漫画", "biography comic", "tutorial comic", or "Logicomix-style comic".
- `baoyu-compress-image`：Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to "compress image", "optimize image", "convert to webp", or reduce image file size.
- `baoyu-cover-image`：Generates article cover images with 5 dimensions (type, palette, rendering, text, mood) combining 11 color palettes and 7 rendering styles. Supports cinematic (2.35:1), widescreen (16:9), and square (1:1) aspects. Use when user asks to "generate cover image", "create article cover", or "make cover".
- `baoyu-diagram`：Create clear, reproducible diagrams for architecture, flow, sequence, structure, state, and conceptual relationships. Use whenever the user asks for 架构图、流程图、关系图、状态图、decision tree、diagram or any visual representation of structure/logic/process. For public-account and non-technical audiences, default to a low-complexity editorial theme with Mermaid source plus SVG/PNG; use the legacy dark technical SVG style only when the user explicitly wants it.
- `baoyu-format-markdown`：Formats plain text or markdown files with frontmatter, titles, summaries, headings, bold, lists, and code blocks. Use when user asks to "format markdown", "beautify article", "add formatting", or improve article layout. Outputs to {filename}-formatted.md.
- `baoyu-image-gen`：AI image generation with OpenAI GPT Image 2, Azure OpenAI, Google, OpenRouter, DashScope, Z.AI GLM-Image, MiniMax, Jimeng, Seedream, Replicate and Agnes APIs. Supports text-to-image, reference images, aspect ratios, and batch generation from saved prompt files. Sequential by default; use batch parallel generation when the user already has multiple prompts or wants stable multi-image throughput. Use when user asks to generate, create, or draw images.
- `baoyu-infographic`：Generate professional infographics with 21 layout types and 22 visual styles. Analyzes content, recommends layout×style combinations, and generates publication-ready infographics. Use when user asks to create "infographic", "信息图", "visual summary", "可视化", or "高密度信息大图".
- `baoyu-markdown-to-html`：Converts Markdown to styled HTML with WeChat-compatible themes. Supports code highlighting, math, Mermaid (rendered to PNG via headless Chrome), PlantUML, footnotes, alerts, infographics, and optional bottom citations for external links. Use when user asks for "markdown to html", "convert md to html", "md 转 html", "微信外链转底部引用", or needs styled HTML output from markdown.
- `baoyu-post-to-wechat`：Posts content to WeChat Official Account (微信公众号) via API or Chrome CDP. Supports article posting (文章) with HTML, markdown, or plain text input, and image-text posting (贴图, formerly 图文) with multiple images. Markdown article workflows default to converting ordinary external links into bottom citations for WeChat-friendly output. Use when user mentions "发布公众号", "post to wechat", "微信公众号", or "贴图/图文/文章".
- `editorial-visual-storytelling`：Use before generating covers, article illustrations, infographics, architecture diagrams, or knowledge comics for Chinese public-account articles. Trigger whenever visual assets feel too diagrammatic, too AI-polished, emotionally empty, overloaded with labels/arrows, or when the user asks for 漫画文案、配图文案、视觉叙事、 封面概念、架构图内容设计、信息图脚本、知识漫画分镜、头像角色讲解图. Produces the visual editorial brief and exact on-image copy that downstream Baoyu rendering skills must follow.
- `financial-artifact-qc`：Use when the user needs a final quality-control pass on an investment-banking pitch deck, client presentation, company profile, financial document, or capital-markets artifact for number consistency, narrative alignment, language, and visual readiness.
- `financial-company-profile`：Use when the user needs a company tear sheet, company one-pager, fact sheet, company snapshot, corporate-development target profile, sales meeting brief, or investment-banking strip profile for a named public or private company.
- `investment-ai-product-judgment`：Run the library's AI-native product judgment inside the investment workflow. Use after facts are collected and before market, unit economics, scorecard, DD, or IC memo writing. This skill evaluates whether the AI product is genuinely AI-native, commercially coherent, narratively clear, and product/BP-valid.
- `investment-banking-pitch-deck`：Use when the user needs to populate, refresh, or quality-check an existing investment-banking PowerPoint pitch deck template using approved financial, transaction, market, or company handoffs.
- `investment-chart-pack`：Use when the user needs a sourced financial chart pack for public-equity initiating coverage, valuation, company performance, market structure, scenarios, or an institutional research report, and approved research, model, and valuation handoffs already exist.
- `investment-competitive-landscape`：Build the market and competitive landscape layer for an AI investment memo. Use when an IC memo, investment memo, product investment report, or AI case review needs market sizing, competitor mapping, positioning, moat assessment, bull/base/bear scenarios, or why-now context.
- `investment-dd`：Generate diligence priorities, red flags, data-room requests, management questions, expert-call questions, and one-vote-veto checks for an AI investment memo. Use after product, market, unit economics, scorecard, and valuation nodes have produced preliminary judgments.
- `investment-financial-model-builder`：Use when the user explicitly needs an auditable XLSX financial model, three-statement forecast, DCF or LBO workbook, model sensitivity, or spreadsheet audit before valuation. Do not use for narrative-only valuation or when verified historical inputs and assumptions are missing.
- `investment-ic-memo-writer`：Write the final library-standard investment committee memo from completed investment workflow node outputs. Use only after fact collection, AI product judgment, competitive landscape, unit economics, scorecard, valuation, DD, and thesis tracking have produced handoffs. This skill does not search or create new analysis.
- `investment-research`：Collect and organize source-backed facts before AI investment analysis. Use before IC memo, investment memo, AI case investment review, DD prep, or visual investment report when product, company, financing, customer, pricing, competitor, GitHub, or market facts are missing. This skill deposits facts only and does not write investment conclusions.
- `investment-scorecard`：Convert AI product judgment and fact packs into the library's investment scorecard layer. Use for AI / OSS / infrastructure investability scoring, macro gate, deal screening, one-vote veto checks, pass / watch / recommend decisions, and scorecard handoff into IC memo.
- `investment-thesis-tracking`：Turn an AI investment memo into a falsifiable thesis, catalyst calendar, watch triggers, KPI monitoring plan, and update process. Use when the user wants to track an AI company, open-source project, investment case, portfolio company, or watchlist item after the initial memo.
- `investment-unit-economics`：Analyze business model quality, revenue quality, customer economics, AI readiness, and value creation for AI investment cases. Use when an IC memo needs ARR, NDR, LTV/CAC, CAC payback, gross margin, inference cost, pricing, revenue concentration, pilot readiness, or value creation logic.
- `investment-valuation-returns`：Use when the user needs valuation framing, comps, DCF or LBO result interpretation, price-target logic, return scenarios, IRR/MOIC sensitivity, entry or exit assumptions, or valuation red flags. Use investment-financial-model-builder instead when the requested deliverable is an XLSX workbook.
- `investment-visual-report`：Use when turning a completed investment IC memo into a polished, single-file HTML visual research report (投资研报/可视化研报/IC memo 可视化/前端展示/网页版研报). Triggers whenever the user wants to visualize, present, or make a webpage/HTML out of investment analysis — scorecards, valuation, competitive landscape, DD, bull/base/bear scenarios. This is the visual-report node of the investment chain; it consumes the memo's text, never re-researches. Always use this skill for investment report visualization so the house style stays consistent.
- `known-content-archive`：Retrieve and archive explicit URLs, local files, URL lists, or precisely named collections as immutable local source packages. Use when the user already knows what should be preserved; do not use for open-ended discovery, recommendations, account crawling, or private collections without current-turn authorization.
- `public-account-writing-style`：Use when drafting or revising Chinese public-account essays in the library's editorial style. Triggers on: "公众号文章", "不像我的风格", "按我的节奏改", "写一篇产品分析", "写 Skill 相关文章", "写一篇深度文章", "帮我分析一下这个选题", or when a draft feels too slogan-like, too AI-polished, overuses short punchy sentences, or uses "不是…而是…" / "如果…那么…" patterns. Also triggers when the user wants structured thinking around a topic before writing.
- `public-equity-coverage-writer`：Use when the user needs an institutional public-equity initiating-coverage report, stock rating and price target, or final equity-research report assembled from completed research, model, valuation, thesis, and chart handoffs. Do not use for private-company IC memos or to perform upstream research and modeling inside the writer.
- `qihang-wechat-layout`：Apply the confirmed “航的杂谈地图” personal typography catalog to finalized Markdown, generate WeChat-compatible HTML, and create the read-only pre-publication preview used before draft publishing. Use when the user asks for 启航排版、个人公众号风格、个人样式目录、HTML 预览 or wants to replace generic Baoyu themes. Do not use it to rewrite content or decide illustrations.
- `reference-video-analysis`：Analyze a supplied benchmark video, transcript, subtitle file, or creator sample at title, opening, sentence-role, narrative, pacing, evidence, cognitive-load, material, and creation-workflow levels. Use to explain why a video works and how to build an original piece with equivalent communication strength without copying the creator's identity or wording.
- `sell-side-ma-materials`：Use when the user needs a sell-side M&A confidential information memorandum, anonymous teaser, or buyer-facing transaction material based on approved company, financial, and transaction inputs.
- `topic-research-deposition`：Use when the user asks to 搜一下、调研、找资料、沉淀素材、补截图、做产品事实收集、投资/OSS research、公众号选题搜索、写作前第 0 步，或需要在写作/产品分析前建立可复查的 evidence folder.
- `wechat-account-corpus-research`：Use when the user asks to 批量抓取或导出微信公众号历史文章、建立对标账号语料库、按日期或原创标记筛选公众号内容、批量处理 mp.weixin.qq.com URL，或把账号级素材交给公众号选题研究。该技能只采集并规范化获准访问的公开文章语料，不写文章、不推断私有指标、不发布内容。
- `x-post-card-studio`：Turn one explicitly supplied public X post, quote post, or same-author direct thread into source-faithful 1080×1440 cards, a ZIP, contact sheet, and optional MP4 with native video and source audio in place. Use for X card publications and visual archives; do not use for discovery, rewriting, narration, or publishing.

### Modes

- `capital-markets-desk`：agent-reach, financial-company-profile, investment-banking-pitch-deck, sell-side-ma-materials, public-equity-coverage-writer, investment-chart-pack, financial-artifact-qc, investment-financial-model-builder, investment-valuation-returns, investment-thesis-tracking
- `creator-studio`：agent-reach, known-content-archive, topic-research-deposition, reference-video-analysis, wechat-account-corpus-research, public-account-writing-style, editorial-visual-storytelling, baoyu-article-illustrator, baoyu-comic, baoyu-cover-image, baoyu-diagram, baoyu-infographic, baoyu-image-gen, baoyu-format-markdown, qihang-wechat-layout, baoyu-markdown-to-html, baoyu-compress-image, baoyu-post-to-wechat, x-post-card-studio
- `investment-desk`：agent-reach, investment-research, investment-ai-product-judgment, investment-competitive-landscape, investment-unit-economics, investment-scorecard, investment-financial-model-builder, investment-valuation-returns, investment-dd, investment-thesis-tracking, investment-ic-memo-writer, investment-chart-pack, investment-visual-report
- `product-lab`：agent-reach, known-content-archive, topic-research-deposition, ai-product-analyzer, baoyu-diagram, baoyu-infographic

### 培养区

- Candidates：无
- Trials：无
- Feedback：无
- Archive：`legacy-plugin-layout`
<!-- ASL:CAPABILITY VIEW END -->
