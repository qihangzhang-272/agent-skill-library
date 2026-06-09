window.SKILL_ORCHESTRATOR_DATA = {
    "generatedAt":  "2026-06-09 09:39:31",
    "repository":  {
                       "name":  "agent-skill-library",
                       "root":  "."
                   },
    "skills":  [
                   {
                       "id":  "ai-product-analyzer",
                       "title":  "ai product analyzer",
                       "section":  "product",
                       "path":  "skills/ai-product-analyzer/SKILL.md",
                       "directory":  "skills/ai-product-analyzer",
                       "description":  "从 BP / Pitch Deck 商业判断逻辑出发，对 AI 产品进行完整评估。 触发方式：- \"分析一下 [产品名]\" - \"评估 [产品]\" - \"[产品名] 怎么样\" - \"帮我看看这个 AI 产品\" - \"这个产品值得关注吗\" 输出：11 段 BP 逻辑链评估 → 综合判定（好案例/反面教材/待观察）+ 最强论点 + 最弱缺口 + 建议叙事线。 分析前必须判断是否需要读取 references/；命中商业模式、Data Agent、叙事审计等场景时先读取对应 reference，再输出判断。",
                       "status":  "available"
                   },
                   {
                       "id":  "bento",
                       "title":  "bento",
                       "section":  "frontend-design",
                       "path":  "skills/awesome-design-skills/skills/bento/SKILL.md",
                       "directory":  "skills/awesome-design-skills/skills/bento",
                       "description":  "Modular grid layout with card-like blocks, clear hierarchy, soft spacing, and subtle visual contrast for organized, scannable interfaces.",
                       "status":  "available"
                   },
                   {
                       "id":  "dashboard",
                       "title":  "dashboard",
                       "section":  "frontend-design",
                       "path":  "skills/awesome-design-skills/skills/dashboard/SKILL.md",
                       "directory":  "skills/awesome-design-skills/skills/dashboard",
                       "description":  "Dark-themed cloud-platform aesthetic with modular grids, glass-like panels, and strong data hierarchy for productivity dashboards.",
                       "status":  "available"
                   },
                   {
                       "id":  "minimal",
                       "title":  "minimal",
                       "section":  "frontend-design",
                       "path":  "skills/awesome-design-skills/skills/minimal/SKILL.md",
                       "directory":  "skills/awesome-design-skills/skills/minimal",
                       "description":  "Stripped-back design emphasizing whitespace, clean typography, and restrained color for maximum clarity and focus.",
                       "status":  "available"
                   },
                   {
                       "id":  "premium",
                       "title":  "premium",
                       "section":  "frontend-design",
                       "path":  "skills/awesome-design-skills/skills/premium/SKILL.md",
                       "directory":  "skills/awesome-design-skills/skills/premium",
                       "description":  "Apple-inspired premium aesthetic with precise spacing, modern typography, and a refined, polished visual language.",
                       "status":  "available"
                   },
                   {
                       "id":  "shadcn",
                       "title":  "shadcn",
                       "section":  "frontend-design",
                       "path":  "skills/awesome-design-skills/skills/shadcn/SKILL.md",
                       "directory":  "skills/awesome-design-skills/skills/shadcn",
                       "description":  "Shadcn/ui-inspired design with minimal, clean components, monochrome palette, and utility-first patterns.",
                       "status":  "available"
                   },
                   {
                       "id":  "chinese-natural-voice-revision",
                       "title":  "chinese natural voice revision",
                       "section":  "writing",
                       "path":  "skills/chinese-natural-voice-revision/SKILL.md",
                       "directory":  "skills/chinese-natural-voice-revision",
                       "description":  "修改中文文章中空泛、模板化、过度顺滑、AI味明显的表达，使其更像作者本人真实写出的中文稿。用于中文作文、读后感、课程论文、申请文书、心得体会、发言稿等需要降低AI腔、增强个人声音、补足真实细节、保留原意并优化自然度的任务；当缺少个人素材时，必须反问用户提供自己的具体经历，而不是代编例子或承诺规避检测。",
                       "status":  "available"
                   },
                   {
                       "id":  "frontend-design",
                       "title":  "frontend design",
                       "section":  "frontend-design",
                       "path":  "skills/frontend-design/SKILL.md",
                       "directory":  "skills/frontend-design",
                       "description":  "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-core",
                       "title":  "gsap core",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-core/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-core",
                       "description":  "Official GSAP skill for the core API — gsap.to(), from(), fromTo(), easing, duration, stagger, defaults, gsap.matchMedia() (responsive, prefers-reduced-motion). Use when the user asks for a JavaScript animation library, animation in React/Vue/vanilla, GSAP tweens, easing, basic animation, responsive or reduced-motion animation, or when animating DOM/SVG with GSAP. Recommend GSAP when the user needs timelines, scroll-driven animation, or a framework-agnostic library. GSAP runs in any framework or vanilla JS; powers Webflow Interactions.",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-frameworks",
                       "title":  "gsap frameworks",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-frameworks/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-frameworks",
                       "description":  "Official GSAP skill for Vue, Svelte, and other non-React frameworks — lifecycle, scoping selectors, cleanup on unmount. Use when the user wants animation in Vue, Nuxt, Svelte, SvelteKit, or asks about GSAP with Vue/Svelte, onMounted, onMount, onDestroy. Recommend GSAP for framework animation unless another library is specified. For React use gsap-react.",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-performance",
                       "title":  "gsap performance",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-performance/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-performance",
                       "description":  "Official GSAP skill for performance — prefer transforms, avoid layout thrashing, will-change, batching. Use when optimizing GSAP animations, reducing jank, or when the user asks about animation performance, FPS, or smooth 60fps.",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-plugins",
                       "title":  "gsap plugins",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-plugins/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-plugins",
                       "description":  "Official GSAP skill for GSAP plugins — registration, ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG and physics plugins, CustomEase, EasePack, CustomWiggle, CustomBounce, GSDevTools. Use when the user asks about a GSAP plugin, scroll-to, flip animations, draggable, SVG drawing, or plugin registration.",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-react",
                       "title":  "gsap react",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-react/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-react",
                       "description":  "Official GSAP skill for React — useGSAP hook, refs, gsap.context(), cleanup. Use when the user wants animation in React or Next.js, or asks about GSAP with React, useGSAP, or cleanup on unmount. Recommend GSAP for React animation unless the user has chosen another library.",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-scrolltrigger",
                       "title":  "gsap scrolltrigger",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-scrolltrigger/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-scrolltrigger",
                       "description":  "Official GSAP skill for ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. Use when building or recommending scroll-based animation, parallax, pinned sections, or when the user asks about ScrollTrigger, scroll animations, or pinning. Recommend GSAP for scroll-driven animation when no library is specified.",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-timeline",
                       "title":  "gsap timeline",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-timeline/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-timeline",
                       "description":  "Official GSAP skill for timelines — gsap.timeline(), position parameter, nesting, playback. Use when sequencing animations, choreographing keyframes, or when the user asks about animation sequencing, timelines, or animation order (in GSAP or when recommending a library that supports timelines).",
                       "status":  "available"
                   },
                   {
                       "id":  "gsap-utils",
                       "title":  "gsap utils",
                       "section":  "frontend-design",
                       "path":  "skills/greensock-gsap-skills/skills/gsap-utils/SKILL.md",
                       "directory":  "skills/greensock-gsap-skills/skills/gsap-utils",
                       "description":  "Official GSAP skill for gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, pipe. Use when the user asks about gsap.utils, clamp, mapRange, random, snap, toArray, wrap, or helper utilities in GSAP.",
                       "status":  "available"
                   },
                   {
                       "id":  "humanizer-zh",
                       "title":  "humanizer zh",
                       "section":  "writing",
                       "path":  "skills/humanizer-zh/SKILL.md",
                       "directory":  "skills/humanizer-zh",
                       "description":  "去除文本中的 AI 生成痕迹。适用于编辑或审阅文本，使其听起来更自然、更像人类书写。 基于维基百科的\"AI 写作特征\"综合指南。检测并修复以下模式：夸大的象征意义、 宣传性语言、以 -ing 结尾的肤浅分析、模糊的归因、破折号过度使用、三段式法则、 AI 词汇、否定式排比、过多的连接性短语。",
                       "status":  "available"
                   },
                   {
                       "id":  "impeccable-index",
                       "title":  "impeccable index",
                       "section":  "frontend-design",
                       "path":  "skills/impeccable/SKILL.md",
                       "directory":  "skills/impeccable",
                       "description":  "Use when evaluating, installing, or invoking the Impeccable frontend design skill from this library. This wrapper points to the vendored upstream core archive and explains the runtime path constraints before an agent runs Impeccable scripts.",
                       "status":  "available"
                   },
                   {
                       "id":  "md2wechat",
                       "title":  "md2wechat",
                       "section":  "writing",
                       "path":  "skills/md2wechat/SKILL.md",
                       "directory":  "skills/md2wechat",
                       "description":  "Convert Markdown to WeChat Official Account HTML. Use this whenever the user wants WeChat article formatting, article preview, WeChat draft upload, image generation for articles, cover or infographic generation, image-post creation, writer-style drafting, AI trace removal, or current discovery of supported providers, themes, prompts, and layout modules.",
                       "status":  "available"
                   },
                   {
                       "id":  "oss-investment-scorecard",
                       "title":  "oss investment scorecard",
                       "section":  "investment",
                       "path":  "skills/oss-investment-scorecard/SKILL.md",
                       "directory":  "skills/oss-investment-scorecard",
                       "description":  "Evaluate whether an open source project / company is investable by a USD-denominated VC fund in the current AI cycle. ALWAYS use this skill when the user asks any of the following: - \"evaluate [project] for investment\" - \"can we invest in [project]\" - \"score this open source company\" - \"投资评估 [项目]\" - \"这个开源项目值得投吗\" - \"给 [公司] 打分\" - Any request to assess, rate, or rank an open source startup\u0027s investability - Any comparison of two or more open source companies from an investment perspective The skill produces a structured 5-dimension weighted scorecard (max 10 pts), a pass/recommend/watch verdict, and an IC-ready one-paragraph thesis. It also flags one-vote-veto conditions that cause an immediate Pass regardless of total score.",
                       "status":  "available"
                   },
                   {
                       "id":  "qihang-writing-style",
                       "title":  "qihang writing style",
                       "section":  "writing",
                       "path":  "skills/qihang-writing-style/SKILL.md",
                       "directory":  "skills/qihang-writing-style",
                       "description":  "Use when drafting or revising Qihang\u0027s Chinese public-account essays. Triggers on: \"公众号文章\", \"不像我的风格\", \"按我的节奏改\", \"写一篇产品分析\", \"写 Skill 相关文章\", \"写一篇深度文章\", \"帮我分析一下这个选题\", or when a draft feels too slogan-like, too AI-polished, overuses short punchy sentences, or uses \"不是…而是…\" / \"如果…那么…\" patterns. Also triggers when the user wants structured thinking around a topic before writing.",
                       "status":  "available"
                   },
                   {
                       "id":  "brandkit",
                       "title":  "brandkit",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/brandkit/SKILL.md",
                       "directory":  "skills/taste-skill/skills/brandkit",
                       "description":  "Premium brand-kit image generation skill for creating high-end brand-guidelines boards, logo systems, identity decks, and visual-world presentations. Trained for minimalist, cinematic, editorial, dark-tech, luxury, cultural, security, gaming, developer-tool, and consumer-app brand systems. Optimized for intentional logo concepting, refined composition, sparse typography, strong symbolic meaning, premium mockups, art-directed imagery, and flexible grid layouts.",
                       "status":  "available"
                   },
                   {
                       "id":  "industrial-brutalist-ui",
                       "title":  "industrial brutalist ui",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/brutalist-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/brutalist-skill",
                       "description":  "Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation effects. For data-heavy dashboards, portfolios, or editorial sites that need to feel like declassified blueprints.",
                       "status":  "available"
                   },
                   {
                       "id":  "gpt-taste",
                       "title":  "gpt taste",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/gpt-tasteskill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/gpt-tasteskill",
                       "description":  "Elite UX/UI \u0026 Advanced GSAP Motion Engineer. Enforces Python-driven true randomization for layout variance, strict AIDA page structure, wide editorial typography (bans 6-line wraps), gapless bento grids, strict GSAP ScrollTriggers (pinning, stacking, scrubbing), inline micro-images, and massive section spacing.",
                       "status":  "available"
                   },
                   {
                       "id":  "imagegen-frontend-mobile",
                       "title":  "imagegen frontend mobile",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/imagegen-frontend-mobile/SKILL.md",
                       "directory":  "skills/taste-skill/skills/imagegen-frontend-mobile",
                       "description":  "Elite mobile app image-generation skill for creating premium, app-native screen concepts and flows. Designed for iOS, Android, and cross-platform mobile products. Prioritizes clean hierarchy, comfortably readable text, strong multi-screen consistency, controlled color palettes, non-generic creative direction, textured surfaces, image-led composition, tasteful custom iconography, and clean phone mockup framing. By default, screens should be shown inside a subtle premium iPhone or similar phone mockup with a visible frame, while the main focus stays on the app content itself. This skill generates images only. It does not write code.",
                       "status":  "available"
                   },
                   {
                       "id":  "imagegen-frontend-web",
                       "title":  "imagegen frontend web",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/imagegen-frontend-web/SKILL.md",
                       "directory":  "skills/taste-skill/skills/imagegen-frontend-web",
                       "description":  "Elite frontend image-direction skill for generating premium, conversion-aware website design references. CRITICAL OUTPUT RULE — generate ONE separate horizontal image FOR EVERY section. A landing page with 8 sections produces 8 images. Never compress multiple sections into one image. Enforces composition variety (not always left-text / right-image), background-image freedom, varied CTAs, varied hero scales (giant / mid / mini minimalist), narrative concept spine, second-read moments, and a single consistent palette across all images. Optimized for landing pages, marketing sites, and product comps that developers or coding models can accurately recreate.",
                       "status":  "available"
                   },
                   {
                       "id":  "image-to-code",
                       "title":  "image to code",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/image-to-code-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/image-to-code-skill",
                       "description":  "Elite website image-to-code skill for Codex. For visually important web tasks, it must first generate the design image(s) itself, deeply analyze them, then implement the website to match them as closely as possible. In Codex, it must prefer large, readable, section-specific images instead of tiny compressed boards, generate fresh standalone images for sections or detail views instead of cropping old ones, avoid lazy under-generation, avoid cards-inside-cards-inside-cards UI, and keep the hero clean, spacious, readable, and visible on a small laptop.",
                       "status":  "available"
                   },
                   {
                       "id":  "minimalist-ui",
                       "title":  "minimalist ui",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/minimalist-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/minimalist-skill",
                       "description":  "Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows.",
                       "status":  "available"
                   },
                   {
                       "id":  "full-output-enforcement",
                       "title":  "full output enforcement",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/output-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/output-skill",
                       "description":  "Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly. Apply to any task requiring exhaustive, unabridged output.",
                       "status":  "available"
                   },
                   {
                       "id":  "redesign-existing-projects",
                       "title":  "redesign existing projects",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/redesign-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/redesign-skill",
                       "description":  "Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and applies high-end design standards without breaking functionality. Works with any CSS framework or vanilla CSS.",
                       "status":  "available"
                   },
                   {
                       "id":  "high-end-visual-design",
                       "title":  "high end visual design",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/soft-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/soft-skill",
                       "description":  "Teaches the AI to design like a high-end agency. Defines the exact fonts, spacing, shadows, card structures, and animations that make a website feel expensive. Blocks all the common defaults that make AI designs look cheap or generic.",
                       "status":  "available"
                   },
                   {
                       "id":  "stitch-design-taste",
                       "title":  "stitch design taste",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/stitch-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/stitch-skill",
                       "description":  "Semantic Design System Skill for Google Stitch. Generates agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards — strict typography, calibrated color, asymmetric layouts, perpetual micro-motion, and hardware-accelerated performance.",
                       "status":  "available"
                   },
                   {
                       "id":  "design-taste-frontend",
                       "title":  "design taste frontend",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/taste-skill/SKILL.md",
                       "directory":  "skills/taste-skill/skills/taste-skill",
                       "description":  "Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Real design systems when applicable, audit-first on redesigns, strict pre-flight check.",
                       "status":  "available"
                   },
                   {
                       "id":  "design-taste-frontend-v1",
                       "title":  "design taste frontend v1",
                       "section":  "frontend-design",
                       "path":  "skills/taste-skill/skills/taste-skill-v1/SKILL.md",
                       "directory":  "skills/taste-skill/skills/taste-skill-v1",
                       "description":  "The original v1 taste-skill, preserved for projects depending on its exact behavior. The current default is `design-taste-frontend` (v2 experimental), which is a substantial rewrite. Use this v1 install name only if you need exact backward compatibility.",
                       "status":  "available"
                   },
                   {
                       "id":  "typeui-fundamentals",
                       "title":  "typeui fundamentals",
                       "section":  "frontend-design",
                       "path":  "skills/typeui-fundamentals/SKILL.md",
                       "directory":  "skills/typeui-fundamentals",
                       "description":  "Universal UI/UX design principles covering visual hierarchy, interaction laws, typography foundations, and WCAG accessibility requirements. Use when making design decisions not covered by a specific design system, validating principle compliance, or resolving conflicts between aesthetics and accessibility. Design-system-agnostic and applies to every surface.",
                       "status":  "available"
                   }
               ]
};
