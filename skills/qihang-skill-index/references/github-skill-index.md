# GitHub Skill Index

This is Qihang's lightweight external skill/source index. It records where useful external capabilities live and how they fit into current workflows. It does not mirror their contents.

Source URLs intentionally point to GitHub repository roots. A source may be a pure skill repo, a repo containing one or more skill directories, or a broader reference repo used by a workflow.

Last repo-root verification: 2026-06-13 via `git ls-remote --symref <repo> HEAD`. All listed GitHub repositories resolved successfully at verification time.

## Writing And Style

| Source | Role | Status | Notes |
| --- | --- | --- | --- |
| `https://github.com/op7418/Humanizer-zh` | Chinese text naturalization and AI-pattern cleanup | reference | Useful as a cleanup reference. Do not let it override `qihang-writing-style`. |
| `https://github.com/yzhao062/agent-style` | Human-like agent writing/style reference | reference | User-added source. Keep as a style reference until specific reusable rules are absorbed into `qihang-writing-style`. |

Local archive without GitHub source:

- `chinese-natural-voice-revision-universal.zip` was previously imported as a complete package. Without a stable GitHub source, it should not remain as a primary indexed external skill.

## WeChat Publishing

| Source | Role | Status | Notes |
| --- | --- | --- | --- |
| `https://github.com/geekjourneyx/md2wechat-skill` | Markdown to WeChat formatting, preview, image handling, and draft publishing protocol | reference adapter | Use upstream CLI/discovery output at runtime. License is source-available/BUSL-style; keep as link unless Qihang explicitly vendors a minimal adapter again. |

## Product And Investment

| Source | Role | Status | Notes |
| --- | --- | --- | --- |
| `https://github.com/lucy-cxy/oss-investment-scorecard` | OSS/AI company investment scorecard and structured output source | promoted local skill | Promoted to `skills/oss-investment-scorecard/` from upstream commit `28a210d0a194ba0f31fe59edaf413abfafa2008e`. Keep this repo root as the update source; use the local skill in `product-analysis`. |

## Research And Web Reach

| Source | Role | Status | Notes |
| --- | --- | --- | --- |
| `https://github.com/Panniantong/agent-reach` | Internet reach, cross-platform search/access, and external content discovery for agents | installed external capability | Default reach layer for `topic-research-deposition` and product/investment fact collection. Treat Twitter/X, Reddit, Exa/web, WeChat, GitHub, and other sites as agent-reach surfaces, not separate default workflow nodes. Keep implementation outside this repository. |

## Frontend Design And UI

| Source | Role | Status | Notes |
| --- | --- | --- | --- |
| `https://github.com/anthropics/skills` | Official Anthropic skills source, including `frontend-design` | skill collection | Prefer upstream source for generic frontend design guidance. |
| `https://github.com/greensock/gsap-skills` | Official GSAP skills for animation work | skill collection | Use when a project explicitly needs GSAP. |
| `https://github.com/bergside/awesome-design-skills` | Design style skill collection | skill collection | Good for style discovery. Do not copy all style folders by default. |
| `https://github.com/bergside/typeui` | UI/UX fundamentals and design-system references | skill/source repo | Use for typography, accessibility, and UI principles. |
| `https://github.com/leonxlnx/taste-skill` | Anti-slop frontend design and redesign skill collection | skill collection | Strong source, but large; keep as GitHub reference unless a small rule subset becomes Qihang-specific. |
| `https://github.com/pbakaus/impeccable` | High-craft frontend design workflow and commands | skill/source repo | Runtime-heavy. Install upstream in target projects instead of archiving scripts locally. |
| `https://github.com/shadcn-ui/ui` | React component and design-system reference | docs/source | Reference for component choices, not a skill mirror. |
| `https://github.com/tailwindlabs/tailwindcss` | Tailwind layout and styling reference | docs/source | Reference only. |
| `https://github.com/mui/material-ui` | Enterprise React UI reference | docs/source | Reference only. |
| `https://github.com/ant-design/ant-design` | B2B SaaS and enterprise UI reference | docs/source | Reference only. |
| `https://github.com/motiondivision/motion` | React/JS animation reference | docs/source | Reference only. |
| `https://github.com/magicuidesign/magicui` | Animated landing-page component reference | docs/source | Use sparingly for landing-page polish. |

## Skill Discovery And Prompt Sources

| Source | Role | Status | Notes |
| --- | --- | --- | --- |
| `https://github.com/BehiSecc/awesome-claude-skills` | Claude Skills discovery index | discovery | Use for finding candidates, not for copying wholesale. |
| `https://github.com/0xeb/TheBigPromptLibrary` | UI and agent prompt reference | prompt reference | Reference only. Do not copy long prompt bodies into this repository. |
| `https://github.com/2-fly-4-ai/V0-system-prompt` | v0 prompt reference | prompt reference | Reference only; license/source boundary should be checked before reuse. |

## Promotion Rule

An external source can move from this index into a local self-cultivated skill only after Qihang has repeatedly used it and extracted stable, reusable judgment into his own words.

Do not promote by copying. Promote by distilling.
