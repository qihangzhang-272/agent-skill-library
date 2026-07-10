# GitHub Skill Index

This is Qihang's lightweight external skill/source index. It records where useful external capabilities live and how they fit into current workflows. It does not mirror their contents.

Source URLs intentionally point to GitHub repository roots. A source may be a pure skill repo, a repo containing one or more skill directories, or a broader reference repo used by a workflow.

**Domain 列**：表示该外部技能是否已融入某条 domain 的工作流（chain）。门槛见 `registration-guide.md` —— 只有真进了某条 chain 才标 domain，否则留空（`—`）表示未归类。可选值：`writing` / `investment` / `capital-markets` / `product` / `commons`（绝对通用）/ 逗号分隔（跨领域）/ `—`（未归类）。

Last repo-root verification: 2026-07-07 via `git ls-remote --symref <repo> HEAD`. All listed GitHub repositories resolved successfully at verification time.

## Writing And Style

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/op7418/Humanizer-zh` | Chinese text naturalization and AI-pattern cleanup | reference | — | 清理参考，未进 chain。Do not let it override `qihang-writing-style`. |
| `https://github.com/yzhao062/agent-style` | Human-like agent writing/style reference | reference | — | User-added source. 风格参考，规则尚未提炼进 `qihang-writing-style`，暂不归 domain。 |

Local archive without GitHub source:

- `chinese-natural-voice-revision-universal.zip` was previously imported as a complete package. Without a stable GitHub source, it should not remain as a primary indexed external skill.

## WeChat Publishing

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/geekjourneyx/md2wechat-skill` | Markdown to WeChat formatting, preview, image handling, and draft publishing protocol | reference adapter | writing | 已进 wechat-writing chain 的排版节点。Use upstream CLI/discovery output at runtime. License is source-available/BUSL-style; keep as link unless Qihang explicitly vendors a minimal adapter again. |

## Product And Investment

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/lucy-cxy/oss-investment-scorecard` | OSS/AI company investment scorecard and structured output source | absorbed reference | investment | Absorbed into `domain-investment/skills/qihang-investment-scorecard/references/` from upstream commit `28a210d0a194ba0f31fe59edaf413abfafa2008e`. Do not call the old skill directly; use `domain-investment`. |
| `https://github.com/anthropics/financial-services` | Financial services, investment banking, public equity, and diligence skill references | migrated reference source | investment, capital-markets | Apache-2.0. Selected files came from commit `4bbabc7cd1a474c1667fa05a2bfe58e411dcf9c1`. Qihang approved lossless migration of the standalone public-equity and banking skill content into `domain-capital-markets`; only paths, declared dependencies, packaging, and orchestration placement may change. Content that remains inside `domain-investment` may be distilled into its canonical owner. Do not expose the upstream end-to-end agents as parallel runtime orchestrators. |

## Research And Web Reach

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/Panniantong/agent-reach` | Multi-backend internet reach (OpenCLI / per-platform CLIs / APIs) across 15 platforms: search, social, dev, web, video, finance, career | installed external capability | commons | 跨领域默认搜索底座：服务 writing 的素材沉淀、investment 的事实收集。v1.5.0+，多后端路由，`agent-reach doctor --json` 查各平台 active_backend。雪球渠道已装（A/港/美股行情、搜索、热帖、热股）。Treat platforms as agent-reach surfaces, not separate workflow nodes. Keep implementation outside this repository. |

## Frontend Design And UI

> 说明：以下前端源目前均未正式进入任何 chain（`product-frontend` 链仍是骨架）。因此 Domain 一律留空（`—`），待将来某个源真融入前端交付工作流或 commons 前端范式时再标记。

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/anthropics/skills` | Official Anthropic skills source, including `frontend-design` | skill collection | — | Prefer upstream source for generic frontend design guidance. |
| `https://github.com/greensock/gsap-skills` | Official GSAP skills for animation work | skill collection | — | Use when a project explicitly needs GSAP. |
| `https://github.com/bergside/awesome-design-skills` | Design style skill collection | skill collection | — | Good for style discovery. Do not copy all style folders by default. |
| `https://github.com/bergside/typeui` | UI/UX fundamentals and design-system references | skill/source repo | — | Use for typography, accessibility, and UI principles. |
| `https://github.com/leonxlnx/taste-skill` | Anti-slop frontend design and redesign skill collection | skill collection | — | Strong source, but large; keep as GitHub reference unless a small rule subset becomes Qihang-specific. |
| `https://github.com/pbakaus/impeccable` | High-craft frontend design workflow and commands | skill/source repo | — | Runtime-heavy. Install upstream in target projects instead of archiving scripts locally. |
| `https://github.com/shadcn-ui/ui` | React component and design-system reference | docs/source | — | Reference for component choices, not a skill mirror. |
| `https://github.com/tailwindlabs/tailwindcss` | Tailwind layout and styling reference | docs/source | — | Reference only. |
| `https://github.com/mui/material-ui` | Enterprise React UI reference | docs/source | — | Reference only. |
| `https://github.com/ant-design/ant-design` | B2B SaaS and enterprise UI reference | docs/source | — | Reference only. |
| `https://github.com/motiondivision/motion` | React/JS animation reference | docs/source | — | Reference only. |
| `https://github.com/magicuidesign/magicui` | Animated landing-page component reference | docs/source | — | Use sparingly for landing-page polish. |

## Skill Discovery And Prompt Sources

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/BehiSecc/awesome-claude-skills` | Claude Skills discovery index | discovery | — | Use for finding candidates, not for copying wholesale. |
| `https://github.com/0xeb/TheBigPromptLibrary` | UI and agent prompt reference | prompt reference | — | Reference only. Do not copy long prompt bodies into this repository. |
| `https://github.com/2-fly-4-ai/V0-system-prompt` | v0 prompt reference | prompt reference | — | Reference only; license/source boundary should be checked before reuse. |

## Promotion Rule

An external source can move from this index into a local self-cultivated skill only after Qihang has repeatedly used it and extracted stable, reusable judgment into his own words.

Do not promote by copying. Promote by distilling.
