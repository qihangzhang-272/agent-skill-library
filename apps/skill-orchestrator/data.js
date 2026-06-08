window.SKILL_ORCHESTRATOR_DATA = {
  "generatedAt": "2026-06-08 09:02:08",
  "repository": {
    "name": "agent-skill-library",
    "root": "."
  },
  "skills": [
    {
      "id": "ai-product-analyzer",
      "title": "ai product analyzer",
      "section": "product",
      "path": "skills/ai-product-analyzer/SKILL.md",
      "directory": "skills/ai-product-analyzer",
      "description": "从 BP / Pitch Deck 商业判断逻辑出发，对 AI 产品进行完整评估。 触发方式：- \"分析一下 [产品名]\" - \"评估 [产品]\" - \"[产品名] 怎么样\" - \"帮我看看这个 AI 产品\" - \"这个产品值得关注吗\" 输出：11 段 BP 逻辑链评估 → 综合判定（好案例/反面教材/待观察）+ 最强论点 + 最弱缺口 + 建议叙事线。 内置 AI 产品分析框架全部知识。深度内容按需从 references/ 加载。",
      "status": "available"
    },
    {
      "id": "bento",
      "title": "bento",
      "section": "frontend-design",
      "path": "skills/awesome-design-skills/skills/bento/SKILL.md",
      "directory": "skills/awesome-design-skills/skills/bento",
      "description": "Modular grid layout with card-like blocks, clear hierarchy, soft spacing, and subtle visual contrast for organized, scannable interfaces.",
      "status": "available"
    },
    {
      "id": "dashboard",
      "title": "dashboard",
      "section": "frontend-design",
      "path": "skills/awesome-design-skills/skills/dashboard/SKILL.md",
      "directory": "skills/awesome-design-skills/skills/dashboard",
      "description": "Dark-themed cloud-platform aesthetic with modular grids, glass-like panels, and strong data hierarchy for productivity dashboards.",
      "status": "available"
    },
    {
      "id": "minimal",
      "title": "minimal",
      "section": "frontend-design",
      "path": "skills/awesome-design-skills/skills/minimal/SKILL.md",
      "directory": "skills/awesome-design-skills/skills/minimal",
      "description": "Stripped-back design emphasizing whitespace, clean typography, and restrained color for maximum clarity and focus.",
      "status": "available"
    },
    {
      "id": "premium",
      "title": "premium",
      "section": "frontend-design",
      "path": "skills/awesome-design-skills/skills/premium/SKILL.md",
      "directory": "skills/awesome-design-skills/skills/premium",
      "description": "Apple-inspired premium aesthetic with precise spacing, modern typography, and a refined, polished visual language.",
      "status": "available"
    },
    {
      "id": "shadcn",
      "title": "shadcn",
      "section": "frontend-design",
      "path": "skills/awesome-design-skills/skills/shadcn/SKILL.md",
      "directory": "skills/awesome-design-skills/skills/shadcn",
      "description": "Shadcn/ui-inspired design with minimal, clean components, monochrome palette, and utility-first patterns.",
      "status": "available"
    },
    {
      "id": "chinese-natural-voice-revision",
      "title": "chinese natural voice revision",
      "section": "writing",
      "path": "skills/chinese-natural-voice-revision/SKILL.md",
      "directory": "skills/chinese-natural-voice-revision",
      "description": "修改中文文章中空泛、模板化、过度顺滑、AI味明显的表达，使其更像作者本人真实写出的中文稿。用于中文作文、读后感、课程论文、申请文书、心得体会、发言稿等需要降低AI腔、增强个人声音、补足真实细节、保留原意并优化自然度的任务；当缺少个人素材时，必须反问用户提供自己的具体经历，而不是代编例子或承诺规避检测。",
      "status": "available"
    },
    {
      "id": "frontend-design",
      "title": "frontend design",
      "section": "frontend-design",
      "path": "skills/frontend-design/SKILL.md",
      "directory": "skills/frontend-design",
      "description": "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.",
      "status": "available"
    },
    {
      "id": "gsap-core",
      "title": "gsap core",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-core/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-core",
      "description": "Official GSAP skill for the core API — gsap.to(), from(), fromTo(), easing, duration, stagger, defaults, gsap.matchMedia() (responsive, prefers-reduced-motion). Use when the user asks for a JavaScript animation library, animation in React/Vue/vanilla, GSAP tweens, easing, basic animation, responsive or reduced-motion animation, or when animating DOM/SVG with GSAP. Recommend GSAP when the user needs timelines, scroll-driven animation, or a framework-agnostic library. GSAP runs in any framework or vanilla JS; powers Webflow Interactions.",
      "status": "available"
    },
    {
      "id": "gsap-frameworks",
      "title": "gsap frameworks",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-frameworks/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-frameworks",
      "description": "Official GSAP skill for Vue, Svelte, and other non-React frameworks — lifecycle, scoping selectors, cleanup on unmount. Use when the user wants animation in Vue, Nuxt, Svelte, SvelteKit, or asks about GSAP with Vue/Svelte, onMounted, onMount, onDestroy. Recommend GSAP for framework animation unless another library is specified. For React use gsap-react.",
      "status": "available"
    },
    {
      "id": "gsap-performance",
      "title": "gsap performance",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-performance/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-performance",
      "description": "Official GSAP skill for performance — prefer transforms, avoid layout thrashing, will-change, batching. Use when optimizing GSAP animations, reducing jank, or when the user asks about animation performance, FPS, or smooth 60fps.",
      "status": "available"
    },
    {
      "id": "gsap-plugins",
      "title": "gsap plugins",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-plugins/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-plugins",
      "description": "Official GSAP skill for GSAP plugins — registration, ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG and physics plugins, CustomEase, EasePack, CustomWiggle, CustomBounce, GSDevTools. Use when the user asks about a GSAP plugin, scroll-to, flip animations, draggable, SVG drawing, or plugin registration.",
      "status": "available"
    },
    {
      "id": "gsap-react",
      "title": "gsap react",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-react/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-react",
      "description": "Official GSAP skill for React — useGSAP hook, refs, gsap.context(), cleanup. Use when the user wants animation in React or Next.js, or asks about GSAP with React, useGSAP, or cleanup on unmount. Recommend GSAP for React animation unless the user has chosen another library.",
      "status": "available"
    },
    {
      "id": "gsap-scrolltrigger",
      "title": "gsap scrolltrigger",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-scrolltrigger/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-scrolltrigger",
      "description": "Official GSAP skill for ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. Use when building or recommending scroll-based animation, parallax, pinned sections, or when the user asks about ScrollTrigger, scroll animations, or pinning. Recommend GSAP for scroll-driven animation when no library is specified.",
      "status": "available"
    },
    {
      "id": "gsap-timeline",
      "title": "gsap timeline",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-timeline/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-timeline",
      "description": "Official GSAP skill for timelines — gsap.timeline(), position parameter, nesting, playback. Use when sequencing animations, choreographing keyframes, or when the user asks about animation sequencing, timelines, or animation order (in GSAP or when recommending a library that supports timelines).",
      "status": "available"
    },
    {
      "id": "gsap-utils",
      "title": "gsap utils",
      "section": "frontend-design",
      "path": "skills/greensock-gsap-skills/skills/gsap-utils/SKILL.md",
      "directory": "skills/greensock-gsap-skills/skills/gsap-utils",
      "description": "Official GSAP skill for gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, pipe. Use when the user asks about gsap.utils, clamp, mapRange, random, snap, toArray, wrap, or helper utilities in GSAP.",
      "status": "available"
    },
    {
      "id": "oss-investment-scorecard",
      "title": "oss investment scorecard",
      "section": "investment",
      "path": "skills/oss-investment-scorecard/SKILL.md",
      "directory": "skills/oss-investment-scorecard",
      "description": "Evaluate whether an open source project / company is investable by a USD-denominated VC fund in the current AI cycle. ALWAYS use this skill when the user asks any of the following: - \"evaluate [project] for investment\" - \"can we invest in [project]\" - \"score this open source company\" - \"投资评估 [项目]\" - \"这个开源项目值得投吗\" - \"给 [公司] 打分\" - Any request to assess, rate, or rank an open source startup's investability - Any comparison of two or more open source companies from an investment perspective The skill produces a structured 5-dimension weighted scorecard (max 10 pts), a pass/recommend/watch verdict, and an IC-ready one-paragraph thesis. It also flags one-vote-veto conditions that cause an immediate Pass regardless of total score.",
      "status": "available"
    },
    {
      "id": "typeui-fundamentals",
      "title": "typeui fundamentals",
      "section": "frontend-design",
      "path": "skills/typeui-fundamentals/SKILL.md",
      "directory": "skills/typeui-fundamentals",
      "description": "Universal UI/UX design principles covering visual hierarchy, interaction laws, typography foundations, and WCAG accessibility requirements. Use when making design decisions not covered by a specific design system, validating principle compliance, or resolving conflicts between aesthetics and accessibility. Design-system-agnostic and applies to every surface.",
      "status": "available"
    }
  ]
};
