window.SKILL_ORCHESTRATOR_DATA = {
  "generatedAt": "2026-06-13 23:52:20",
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
      "id": "qihang-skill-index",
      "title": "qihang skill index",
      "path": "skills/qihang-skill-index/SKILL.md",
      "directory": "skills/qihang-skill-index",
      "description": ">-",
      "status": "available"
    },
    {
      "id": "qihang-workflow-orchestrator",
      "title": "qihang workflow orchestrator",
      "path": "skills/qihang-workflow-orchestrator/SKILL.md",
      "directory": "skills/qihang-workflow-orchestrator",
      "description": "Use when Qihang asks to run, package, choose, or maintain a proven workflow such as topic-to-WeChat publishing or product analysis that may become a visual report, frontend brief, investment memo, or OSS investment review.",
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
