window.SKILL_ORCHESTRATOR_DATA = {
  "generatedAt": "2026-06-22 06:25:38",
  "repository": {
    "name": "agent-skill-library",
    "root": "."
  },
  "skills": [
    {
      "id": "ai-product-analyzer",
      "title": "ai product analyzer",
      "path": "skills/ai-product-analyzer/SKILL.md",
      "directory": "skills/ai-product-analyzer",
      "description": "从 BP / Pitch Deck 商业判断逻辑出发，对 AI 产品进行完整评估。 触发方式：- \"分析一下 [产品名]\" - \"评估 [产品]\" - \"[产品名] 怎么样\" - \"帮我看看这个 AI 产品\" - \"这个产品值得关注吗\" 输出：11 段 BP 逻辑链评估 → 综合判定（好案例/反面教材/待观察）+ 最强论点 + 最弱缺口 + 建议叙事线。 分析前必须判断是否需要读取 references/；命中商业模式、Data Agent、叙事审计等场景时先读取对应 reference，再输出判断。",
      "status": "available"
    },
    {
      "id": "qihang-ai-product-judgment",
      "title": "qihang ai product judgment",
      "path": "skills/qihang-ai-product-judgment/SKILL.md",
      "directory": "skills/qihang-ai-product-judgment",
      "description": "Run Qihang's AI-native product judgment inside the investment workflow. Use after facts are collected and before market, unit economics, scorecard, DD, or IC memo writing. This skill evaluates whether the AI product is genuinely AI-native, commercially coherent, narratively clear, and product/BP-valid.",
      "status": "available"
    },
    {
      "id": "qihang-competitive-landscape",
      "title": "qihang competitive landscape",
      "path": "skills/qihang-competitive-landscape/SKILL.md",
      "directory": "skills/qihang-competitive-landscape",
      "description": "Build the market and competitive landscape layer for Qihang's AI investment memo. Use when an IC memo, investment memo, product investment report, or AI case review needs market sizing, competitor mapping, positioning, moat assessment, bull/base/bear scenarios, or why-now context.",
      "status": "available"
    },
    {
      "id": "qihang-ic-memo-writer",
      "title": "qihang ic memo writer",
      "path": "skills/qihang-ic-memo-writer/SKILL.md",
      "directory": "skills/qihang-ic-memo-writer",
      "description": "Write the final Qihang-style investment committee memo from completed investment workflow node outputs. Use only after fact collection, AI product judgment, competitive landscape, unit economics, scorecard, valuation, DD, and thesis tracking have produced handoffs. This skill does not search or create new analysis.",
      "status": "available"
    },
    {
      "id": "qihang-investment-dd",
      "title": "qihang investment dd",
      "path": "skills/qihang-investment-dd/SKILL.md",
      "directory": "skills/qihang-investment-dd",
      "description": "Generate diligence priorities, red flags, data-room requests, management questions, expert-call questions, and one-vote-veto checks for Qihang's AI investment memo. Use after product, market, unit economics, scorecard, and valuation nodes have produced preliminary judgments.",
      "status": "available"
    },
    {
      "id": "qihang-investment-research",
      "title": "qihang investment research",
      "path": "skills/qihang-investment-research/SKILL.md",
      "directory": "skills/qihang-investment-research",
      "description": "Collect and organize source-backed facts before Qihang's AI investment analysis. Use before IC memo, investment memo, AI case investment review, DD prep, or visual investment report when product, company, financing, customer, pricing, competitor, GitHub, or market facts are missing. This skill deposits facts only and does not write investment conclusions.",
      "status": "available"
    },
    {
      "id": "qihang-investment-scorecard",
      "title": "qihang investment scorecard",
      "path": "skills/qihang-investment-scorecard/SKILL.md",
      "directory": "skills/qihang-investment-scorecard",
      "description": "Convert AI product judgment and fact packs into Qihang's investment scorecard layer. Use for AI / OSS / infrastructure investability scoring, macro gate, deal screening, one-vote veto checks, pass / watch / recommend decisions, and scorecard handoff into IC memo.",
      "status": "available"
    },
    {
      "id": "qihang-skill-index",
      "title": "qihang skill index",
      "path": "skills/qihang-skill-index/SKILL.md",
      "directory": "skills/qihang-skill-index",
      "description": ">-",
      "status": "available"
    },
    {
      "id": "qihang-thesis-tracking",
      "title": "qihang thesis tracking",
      "path": "skills/qihang-thesis-tracking/SKILL.md",
      "directory": "skills/qihang-thesis-tracking",
      "description": "Turn an AI investment memo into a falsifiable thesis, catalyst calendar, watch triggers, KPI monitoring plan, and update process. Use when Qihang wants to track an AI company, open-source project, investment case, portfolio company, or watchlist item after the initial memo.",
      "status": "available"
    },
    {
      "id": "qihang-unit-economics",
      "title": "qihang unit economics",
      "path": "skills/qihang-unit-economics/SKILL.md",
      "directory": "skills/qihang-unit-economics",
      "description": "Analyze business model quality, revenue quality, customer economics, AI readiness, and value creation for AI investment cases. Use when an IC memo needs ARR, NDR, LTV/CAC, CAC payback, gross margin, inference cost, pricing, revenue concentration, pilot readiness, or value creation logic.",
      "status": "available"
    },
    {
      "id": "qihang-valuation-returns",
      "title": "qihang valuation returns",
      "path": "skills/qihang-valuation-returns/SKILL.md",
      "directory": "skills/qihang-valuation-returns",
      "description": "Build valuation, comps, return logic, and financial-model sanity checks for Qihang's AI investment memo. Use when an IC memo needs valuation framing, comps, return scenarios, IRR/MOIC sensitivity, DCF/LBO logic, three-statement context, or model/audit standards. Do not build Excel unless explicitly requested.",
      "status": "available"
    },
    {
      "id": "qihang-workflow-orchestrator",
      "title": "qihang workflow orchestrator",
      "path": "skills/qihang-workflow-orchestrator/SKILL.md",
      "directory": "skills/qihang-workflow-orchestrator",
      "description": "Route Qihang's proven workflows. Use when Qihang asks to run, package, choose, or maintain workflows for agent-reach research to Qihang writing to Codex/md2wechat layout, product-to-frontend, product-to-investment IC memo / visual report, or skill-library maintenance. This skill only routes; workflow details live in references.",
      "status": "available"
    },
    {
      "id": "qihang-writing-style",
      "title": "qihang writing style",
      "path": "skills/qihang-writing-style/SKILL.md",
      "directory": "skills/qihang-writing-style",
      "description": ">-",
      "status": "available"
    },
    {
      "id": "topic-research-deposition",
      "title": "topic research deposition",
      "path": "skills/topic-research-deposition/SKILL.md",
      "directory": "skills/topic-research-deposition",
      "description": "Use when Qihang asks to 搜一下、调研、找资料、沉淀素材、补截图、做产品事实收集、投资/OSS research、公众号选题搜索、写作前第 0 步，或需要在写作/产品分析前建立可复查的 evidence folder。",
      "status": "available"
    }
  ]
};
