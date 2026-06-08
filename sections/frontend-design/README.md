# 前端设计

前端设计板块收集前端界面、UI/UX、视觉风格、设计提示词、设计系统和生成式界面质量控制相关技能。

当前原则：

- 先区分技能包、规则集、prompt 集合和风格素材，不把所有内容都当成 `SKILL.md`。
- 主清单默认只收 `>= 1000 stars` 的公开来源；低星 prompt repo 不进入主清单。
- 可直接迁移的优先条件：许可证清楚、目录自包含、含 `SKILL.md` 或可低风险转换为 skill、没有隐藏服务依赖。
- 许可证不清楚或强 copyleft 的内容只做链接和研究笔记，不直接 vendored。
- 风格提示词应优先沉淀为 `references/`，由一个轻量主 skill 路由调用，避免 prompt 大杂烩常驻上下文。

已开板块：

- 候选来源清单：`docs/sections/frontend-design/sources.md`
- 调用链说明：`docs/sections/frontend-design/ui-call-chain.md`
- 网页 prompt 索引：`docs/sections/frontend-design/prompt-index.md`
- PRD 到前端跨板块调用链：`docs/workflows/prd-to-frontend.md`

已收录：

- `skills/frontend-design/`：Anthropic 官方 skills repo 的 frontend-design skill，用于提升页面和组件的视觉质量。
- `skills/greensock-gsap-skills/`：保守迁移 `greensock/gsap-skills` 的官方 `skills/` 目录，用于动效层。
- `skills/awesome-design-skills/`：只迁移 `dashboard`、`shadcn`、`bento`、`premium`、`minimal` 五个风格 skill，用于设计策略层。
- `skills/typeui-fundamentals/`：只迁移 TypeUI `skills/fundamentals`，用于 UI/UX 基础原则层；它需要搭配项目设计系统或 `DESIGN.md` 使用。

继续作为引用，不直接复制正文：

- `https://21st.dev`
- `https://www.designprompts.dev/`
- `shadcn-ui/ui`
- `tailwindlabs/tailwindcss`
- `magicuidesign/magicui`
- `motiondivision/motion`

待评估方向：

- shadcn / Tailwind / lucide 生成质量约束是否需要单独沉淀为 reference。
- Motion 与 GSAP 的分工边界。
- Magic UI 是否只用于 landing polish，还是进入组件复用 registry。
