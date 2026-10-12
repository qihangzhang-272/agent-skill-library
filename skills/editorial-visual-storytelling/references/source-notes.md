# Open-Source Source Notes

本技能是本地维护的提炼结果，不复制外部 SKILL.md 或渲染器源码。

## Anthropic Skills

- Source: `https://github.com/anthropics/skills`
- Relevant: `canvas-design`, `brand-guidelines`
- Distilled idea: 先声明视觉哲学和品牌约束；成品优化优先删减与精修，不用继续堆图形。
- Boundary: 不复制 Anthropic 品牌色、字体或受限资产。

## AI Video Storyboard Skill

- Source: `https://github.com/aicontentskills/ai-video-storyboard-skill`
- License: MIT
- Distilled idea: 每个画面有明确 purpose、action 和共享视觉主题；连续资产必须保持视觉一致性。
- Boundary: 公众号漫画不照搬短视频的 hook/build/payoff/CTA 公式。

## D2

- Source: `https://github.com/terrastruct/d2`
- License: MPL-2.0
- Distilled idea: diagram-as-code、自动布局、主题和模型可复现。
- Boundary: 当前链不要求安装 D2；它是架构原则与备用渲染器参考。

## C4-PlantUML / Structurizr

- Source: `https://github.com/plantuml-stdlib/C4-PlantUML`
- License: MIT
- Distilled idea: abstraction-first；针对不同读者生成不同视图，不把所有层级塞进一张图。

## beautiful-mermaid

- Source: `https://github.com/lukilabs/beautiful-mermaid`
- License: MIT
- Distilled idea: 以 Mermaid 作为简短语义源，使用自动布局和少量主题色输出可复现 SVG。
- Runtime role: `baoyu-diagram` 的公众号清晰编辑模式渲染器。

## GOV.UK Content Principles

- Source: `https://www.gov.uk/government/publications/govuk-content-principles-conventions-and-research-background/govuk-content-principles-conventions-and-research-background`
- License: Open Government Licence v3.0
- Distilled idea: 使用具体、日常、主动的语言；文案首先适配读者和任务，语气不是靠口头禅制造。
- Boundary: 面向公众号视觉文案时只吸收清晰原则，不照搬政府服务语气。

## Microsoft Writing Style Guide

- Source: `https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice`
- Distilled idea: 像人说话，尽快进入重点，使用更大的想法和更少的词，删除弱动词与冗余表达。
- Boundary: 不复制 Microsoft 品牌口吻；营销文案的目标和公众号编辑文案不同。

## GitHub Docs Style Guide

- Source: `https://docs.github.com/en/contributing/style-guide-and-content-model/style-guide`
- Repository: `https://github.com/github/docs`
- Distilled idea: 清晰和意义优先于形式一致；每个内容单元根据读者、语境和信息流决定写法。
- Boundary: 文档标签规范不直接套用到漫画对白。

## 18F Content Guide

- Source: `https://guides.18f.org/content-guide/`
- Repository: `https://github.com/18F/content-guide`
- Status: Public domain / CC0
- Distilled idea: 内容帮助人完成任务，以清楚、友好和诚实建立信任。
- Boundary: 本技能不复制政府机构的固定称谓或界面模式。

## Reuters Standards And Values

- Source: `https://reutersagency.com/about/standards-values/`
- Distilled idea: 图片、图注、来源与实际发生的事情必须一致；AI 协助生成的图注仍需核查事实和归属。
- Boundary: 本技能只提炼准确、归属和不虚构语境的原则，不复制 Reuters 文案。

## Creator Buddy GZH Skills

- Source: `https://github.com/SpaceZephyr/creator-buddy/tree/main/gzh-Skills`
- Audited commit: `edf46c567ff54b72ee2157d06f3a02dbd67aaa9c`
- Distilled ideas: central square crop compatibility for WeChat covers, six relationship grammars, and structured inputs before chart rendering.
- Not adopted: Claude/OpenAI/Google generic themes, the fixed linear creation chain, external API fallback, concrete templates, or scripts.
- Boundary: the repository root exposed no license file during the audit, so this library independently implements only the methods and parameters above.

## 2026-09-06：固定头像的内容参与与 image2 提示研究

- GPT-Image2-Skill： https://github.com/wuyoscar/GPT-Image2-Skill 。审阅 gpt-image/SKILL.md 与 references/craft.md，相关 blob 为 0db0ea3e98961b5d53d2fd0a9912de0eee538bab、4d8c8f24df08cba5a0c08d1d2fd10f7af0f593d8；MIT。用途：比较布局约束、明确文字、参考输入角色和分镜连续性的方法。没有复制图库提示词、图片或 CLI 实现。
- Replicate prompt-images： https://github.com/replicate/skills/blob/main/skills/prompt-images/SKILL.md 。审阅 blob 4bc889379e19626f81ebb65b0f932cd49dff5219；Apache-2.0。用途：对照保留项、变化项及多图连续性的一般方法；未复制原文、未接入其模型选择或调用服务。
- character-consistency： https://github.com/GenielabsOpenSource/style-consistency-ai/blob/main/skills/character-consistency/SKILL.md 。审阅 blob 56447a1592f8c1675aea60e0318a668108ce86fb；LICENSE 为 PolyForm Noncommercial 1.0.0。未采用或改编其 Skill、模板、训练与数据流水线。
- 本地规则以用户“整个形象不能变、参与讲解、结构与阅读体验应丰富”的明确反馈和已有 brief 契约独立编写。未安装新 Skill、外部执行器或训练管线；现有视觉编辑 Owner 与 Baoyu 原生接口不变。研究快照与效果比较留在文章 Case。

## 2026-09-06：按段落情境修正 IP 展示倾向

- 用户明确否定四个以 IP 表现形式组织的候选，要求先服务文章意思和阅读节奏，并举出听讲、独读、讨论融于一图的并列情境。
- 实际查看 Wait But Why 的 Why Procrastinators Procrastinate（https://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html）正文及脑内场景、角色互动：采用段落问题决定图片位置、稳定环境中的关系变化帮助比较这一方法，不复制角色或画面。
- 实际查看 The Oatmeal 的 How to be perfectly unhappy（https://theoatmeal.com/comics/unhappy）部分画面，包含用双手排列物件推进比喻的场景：采用人物尺度与镜头服从内容的方法，不复制其物件、角色或分镜。
- 配图判断改为段落与位置优先；允许一个读者任务包含多个并列情境，区分不同人与同一人的前后过程。IP 身份保留，但不是每幅图的主体。外部作品仅供方法研究；一轮观察及未能加载的中文长图记录留在 Case，不伪称完整视觉阅读。
