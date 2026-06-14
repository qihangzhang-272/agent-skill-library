window.SKILL_ORCHESTRATOR_DATA = {
  "generatedAt": "2026-06-13 22:13:07",
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
      "description": "公众号写作第 0 步——跨平台选题搜索与原始素材沉淀。当用户提到\"搜一下选题\"、\"开始搜索\"、\"第 0 步\"、\"选题搜索\"、\"帮我搜一下 XX\"、\"看看 XX 话题\"、\"素材沉淀\"或\"补截图\"时触发。在四个平台（Twitter/X、Reddit、Exa 全网、微信公众号）串行执行 3-4 轮递进搜索，将原始素材按平台归档为 md 文档，并截图留证。不做信息消化或预判。搜索完成后做概览汇报，等待用户发令才进入下一步。",
      "status": "available"
    }
  ]
};
