# GitHub Skill Index

This is the library's lightweight external skill/source index. It records where useful external capabilities live and how they fit into current workflows. It does not mirror their contents.

Source URLs intentionally point to GitHub repository roots. A source may be a pure skill repo, a repo containing one or more skill directories, or a broader reference repo used by a workflow.

**Domain 列**：表示该外部技能是否已融入某条 domain 的工作流（chain）。门槛见 `registration-guide.md` -- 只有真进了某条 chain 才标 domain，否则留空（`-`）表示未归类。可选值：`writing` / `investment` / `capital-markets` / `product` / `commons`（绝对通用）/ 逗号分隔（跨领域）/ `-`（未归类）。

Last repo-root verification: 2026-08-04 via GitHub API / `gh repo view`. `KKKKhazix/human-writing` and the three WeChat corpus sources added in this update resolved successfully; previously indexed roots retain their 2026-07-30 verification.

## Writing And Style

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/KKKKhazix/human-writing` | 通用中文创作与改稿的唯一正文写作 owner | migrated reference source | writing | MIT；正式版 `v1.0.0`，tag commit `d86bd7b3c8a77aa4b8ac69778d671a7bafcbdbe9`。从该 tag 原样迁入 `plugins/domain-writing/skills/human-writing/` 并接入 `wechat-writing` chain；本地不修改正文、references、检查脚本或 OpenAI 配置。升级时整目录替换并重新核验 hash。 |
| `https://github.com/op7418/Humanizer-zh` | Chinese text naturalization and AI-pattern cleanup | reference | - | 清理参考，未进 chain。不得覆盖或二次改写 `human-writing`。 |
| `https://github.com/yzhao062/agent-style` | Human-like agent writing/style reference | reference | - | User-added source. 仅作风格参考，未合并进 `human-writing`，暂不归 domain。 |

Local archive without GitHub source:

- `chinese-natural-voice-revision-universal.zip` was previously imported as a complete package. Without a stable GitHub source, it should not remain as a primary indexed external skill.

## WeChat Corpus And Publishing

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/JimLiu/baoyu-skills` | 公众号排版、图像生成、插图、封面、信息图、SVG 图解、知识漫画、HTML 与发布 | migrated reference source | writing | 经维护者明确晋升，MIT；从 commit `6b7a2e417500561a5ecdd0b168332f4142584617` 原样迁入 `domain-writing`：`baoyu-format-markdown`、`baoyu-image-gen`、`baoyu-article-illustrator`、`baoyu-infographic`、`baoyu-diagram`、`baoyu-comic`、`baoyu-cover-image`、`baoyu-markdown-to-html`、`baoyu-post-to-wechat`、`baoyu-compress-image`。保留上游许可证，排除 `node_modules` 与个人配置；项目偏好继续放 `.baoyu-skills/`。 |
| `https://github.com/mcncarl/yichen-skills` | 公众号账号级批量语料工作流参考 | reference | - | 自定义 Personal Learning and Non-Commercial Use License：未经书面许可，不得商业或业务运营使用，不得作为公开技能集合、商业交付或公司内部 toolkit 再打包。本库未复制 `yichen-wechat-mp-batch-exporter`；只在独立需求分析后编写本地 corpus contract。核验 commit `28066c9f91cecd819784fc70bf882473a4fd29fa`。 |
| `https://github.com/wechat-article/wechat-article-exporter` | 公众号搜索、历史同步、正文批量采集和多格式导出的外部运行时 | reference | writing | MIT；作为 `wechat-account-corpus-research` 的可选外部适配器，保持外置，不复制实现。2026-08-04 已通过公开 endpoint 的 API 可达与已知 URL HTML smoke；账号历史仍需用户登录后另验。公共端点的登录、格式、会员与频率限制会变化，运行时读取当前官方文档。核验 commit `47da63edfd5c7e7aabaf44c96faf88e0f6b8290f`。 |
| `https://github.com/wechat-article/wxdown-service` | 阅读量与评论增强采集所需的本地凭据辅助服务 | reference | - | 当前源码仓库没有 LICENSE；不得 vendoring。涉及 mitmproxy 根证书、系统代理和明文短期凭据，已明确排除出 `wechat-account-corpus-research` 默认能力。核验 commit `28feff2095359acb158f856c40b357e77b686d2c`。 |

## Visual Storytelling And Diagramming

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/anthropics/skills` | `canvas-design` / `brand-guidelines` 的视觉哲学与品牌约束参考 | absorbed reference | writing | 已提炼进 `editorial-visual-storytelling`：先声明视觉语言、再产出；优化优先删减和精修。不复制 Anthropic 品牌资产。 |
| `https://github.com/aicontentskills/ai-video-storyboard-skill` | 分镜 purpose、动作和共享视觉主题参考 | absorbed reference | writing | MIT。只吸收逐画面任务与连续性契约，不把短视频 hook/build/payoff/CTA 公式搬进公众号漫画。 |
| `https://github.com/lukilabs/beautiful-mermaid` | Mermaid 自动布局、主题化 SVG 渲染 | installed external capability | writing | MIT；作为 `baoyu-diagram` 的公众号 `simple-editorial` 渲染依赖，保留 `.mmd` 语义源。 |
| `https://github.com/terrastruct/d2` | diagram-as-code、布局引擎与主题参考 | reference | - | MPL-2.0。当前未要求安装；作为复杂 diagram 的后续备选，不进入主链运行时。 |
| `https://github.com/plantuml-stdlib/C4-PlantUML` | abstraction-first 与按受众拆分架构视图 | absorbed reference | writing | MIT；已提炼进公众号 diagram 清晰度规则，不复制宏与主题源码。 |

## Product And Investment

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/lucy-cxy/oss-investment-scorecard` | OSS/AI company investment scorecard and structured output source | absorbed reference | investment | Absorbed into `domain-investment/skills/investment-scorecard/references/` from upstream commit `28a210d0a194ba0f31fe59edaf413abfafa2008e`. Do not call the old skill directly; use `domain-investment`. |
| `https://github.com/anthropics/financial-services` | Financial services, investment banking, public equity, and diligence skill references | migrated reference source | investment, capital-markets | Apache-2.0. Selected files came from commit `4bbabc7cd1a474c1667fa05a2bfe58e411dcf9c1`. The library maintainers approved lossless migration of the standalone public-equity and banking skill content into `domain-capital-markets`; only paths, declared dependencies, packaging, and orchestration placement may change. Content that remains inside `domain-investment` may be distilled into its canonical owner. Do not expose the upstream end-to-end agents as parallel runtime orchestrators. |

## Research And Web Reach

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/Panniantong/agent-reach` | Multi-backend internet reach (OpenCLI / per-platform CLIs / APIs) across 15 platforms: search, social, dev, web, video, finance, career | installed external capability | commons | 跨领域默认搜索底座：服务 writing 的素材沉淀、investment 的事实收集。v1.5.0+，多后端路由，`agent-reach doctor --json` 查各平台 active_backend。雪球渠道已装（A/港/美股行情、搜索、热帖、热股）。Treat platforms as agent-reach surfaces, not separate workflow nodes. Keep implementation outside this repository. |

## Frontend Design And UI

> 说明：以下前端源目前均未正式进入任何 chain（`product-frontend` 链仍是骨架）。因此 Domain 一律留空（`-`），待将来某个源真融入前端交付工作流或 commons 前端范式时再标记。

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/greensock/gsap-skills` | Official GSAP skills for animation work | skill collection | - | Use when a project explicitly needs GSAP. |
| `https://github.com/bergside/awesome-design-skills` | Design style skill collection | skill collection | - | Good for style discovery. Do not copy all style folders by default. |
| `https://github.com/bergside/typeui` | UI/UX fundamentals and design-system references | skill/source repo | - | Use for typography, accessibility, and UI principles. |
| `https://github.com/leonxlnx/taste-skill` | Anti-slop frontend design and redesign skill collection | skill collection | - | Strong source, but large; keep as GitHub reference unless a small rule subset becomes library-specific. |
| `https://github.com/pbakaus/impeccable` | High-craft frontend design workflow and commands | skill/source repo | - | Runtime-heavy. Install upstream in target projects instead of archiving scripts locally. |
| `https://github.com/shadcn-ui/ui` | React component and design-system reference | docs/source | - | Reference for component choices, not a skill mirror. |
| `https://github.com/tailwindlabs/tailwindcss` | Tailwind layout and styling reference | docs/source | - | Reference only. |
| `https://github.com/mui/material-ui` | Enterprise React UI reference | docs/source | - | Reference only. |
| `https://github.com/ant-design/ant-design` | B2B SaaS and enterprise UI reference | docs/source | - | Reference only. |
| `https://github.com/motiondivision/motion` | React/JS animation reference | docs/source | - | Reference only. |
| `https://github.com/magicuidesign/magicui` | Animated landing-page component reference | docs/source | - | Use sparingly for landing-page polish. |

## Skill Discovery And Prompt Sources

| Source | Role | Status | Domain | Notes |
| --- | --- | --- | --- | --- |
| `https://github.com/BehiSecc/awesome-claude-skills` | Claude Skills discovery index | discovery | - | Use for finding candidates, not for copying wholesale. |
| `https://github.com/0xeb/TheBigPromptLibrary` | UI and agent prompt reference | prompt reference | - | Reference only. Do not copy long prompt bodies into this repository. |
| `https://github.com/2-fly-4-ai/V0-system-prompt` | v0 prompt reference | prompt reference | - | Reference only; license/source boundary should be checked before reuse. |

## Promotion Rule

An external source can move from this index into a locally maintained skill only after the library maintainers have repeatedly used it and distilled stable, reusable judgment.

Default promotion is by distilling, not copying. A maintainer-approved vendored upstream release is the narrow exception: pin the release and commit, preserve the license, keep the vendored directory unmodified, and upgrade it by whole-directory replacement.
