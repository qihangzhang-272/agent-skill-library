# Agent Skill Library

私有高质量技能库，用来沉淀个人可复用的 Agent 工作能力。

本仓库不是普通 prompt 收藏夹，也不是某个知识库的附属仓库。它是一个 Agent 运行能力库和项目初始化配置参考库：

- 第一用户是仓库维护者本人。
- 主要使用者是被维护者配置和调用的 Codex、Claude 和后续 agent。
- 仓库记录哪些能力值得用、什么时候用、怎么组合、如何配置到具体项目。
- 外部技能优先以地址、索引、来源和调用方式沉淀；只有明确可迁移且边界清楚的技能包才 vendored 到 `skills/`。
- 网页 prompt、UI 库源码、项目资料和一次性实验结果不进入正式技能包。

## 仓库职能

本仓库只承担两个核心职能：

1. **工作流编排**：把已经验证过的技能链沉淀到 `orchestrations/` 和 `docs/workflows/`。HTML 编排台只是辅助工具，不是源头。
2. **技能收藏索引**：外部好用技能优先记录在 `catalog/skills.yml` 和各 section 文档里。除非边界、许可证和复用价值都清楚，否则不把外部仓库整包搬进来。

Claude Code plugin 只作为自培养技能的分发层。目前默认只分发：

- `agent-product`：`ai-product-analyzer`
- `agent-writing`：`topic-research-deposition`、`qihang-writing-style`

## 分类

| 板块 | 用途 |
| --- | --- |
| `sections/investment/` | VC、投资评估、融资判断、IC 论述、DD 问题 |
| `sections/product/` | 产品分析、案例研究、用户/场景/商业模式判断 |
| `sections/writing/` | 中文写作、改写、语气修订、作者声音和文稿自然化 |
| `sections/frontend-design/` | 前端设计、UI/UX、视觉风格、设计提示词和界面生成质量控制 |
| `sections/technology/` | 技术架构、AI 基础设施、工程可行性 |
| `sections/development-paradigms/` | AI Agent Native 开发范式、TDD、review、调试 |
| `sections/operations/` | 自动化、工作流、知识库同步、投稿与治理 |

## Claude Code 插件市场

本仓库现在同时提供 Claude Code plugin marketplace 分发层。它只负责分发自培养、会高频复用的技能，不承载外部收藏目录：

- Marketplace manifest：`.claude-plugin/marketplace.json`
- 插件分发目录：`plugins/`
- 插件分发索引：`catalog/claude-plugins.json`
- 生成脚本：`scripts/build-claude-plugins.ps1`

`plugins/` 不是源内容目录。源技能仍维护在 `skills/`，分发映射维护在 `catalog/claude-plugins.json`。每次改变自培养技能进入哪个插件后，运行：

```powershell
.\scripts\build-claude-plugins.ps1
```

然后用 Claude Code 验证：

```powershell
claude plugin validate .
```

## 当前种子技能

| 技能 | 板块 | 来源 | 状态 |
| --- | --- | --- | --- |
| `oss-investment-scorecard` | investment | `skills/oss-investment-scorecard/` | 已从 `lucy-cxy/oss-investment-scorecard` 完整迁移 |
| `ai-product-analyzer` | product | `skills/ai-product-analyzer/` | 自培养产品洞察技能，进入 `agent-product` 插件 |
| `chinese-natural-voice-revision` | writing | `skills/chinese-natural-voice-revision/` | 已从用户提供 zip 完全体迁移 |
| `humanizer-zh` | writing | `skills/humanizer-zh/` | 已迁移中文 AI 写作痕迹清理 skill |
| `qihang-writing-style` | writing | `skills/qihang-writing-style/` | 自培养启航写作风格技能，进入 `agent-writing` 插件 |
| `topic-research-deposition` | writing | `skills/topic-research-deposition/` | 已沉淀为公众号选题搜索与素材截图工作流 |
| `frontend-design` | frontend-design | `skills/frontend-design/` | 已迁移 Anthropic 官方 skills repo 的 frontend-design skill |
| `greensock-gsap-skills` | frontend-design | `skills/greensock-gsap-skills/` | 已保守迁移 GSAP 官方 AI skills |
| `awesome-design-skills` | frontend-design | `skills/awesome-design-skills/` | 已保守迁移 5 个已验证风格 skill |
| `typeui-fundamentals` | frontend-design | `skills/typeui-fundamentals/` | 已迁移 TypeUI 基础 UI/UX 原则 skill |
| `taste-skill` | frontend-design | `skills/taste-skill/` | 已保守迁移核心 `skills/` 目录 |
| `impeccable-index` | frontend-design | `skills/impeccable/` | 已归档核心包并以 wrapper/index 收录 |

## 当前运行链

| 调用链 | 文档 | 作用 |
| --- | --- | --- |
| 公众号产品 / 选题文章链 | `orchestrations/wechat-product-research-writing-publish.json` | 把产品洞察、选题调研、启航写作和公众号排版发布串成稳定工作流 |
| 投资 / 产品问题到研报 | `docs/workflows/investment-product-to-research-report.md` | 把产品判断、投资评分、DD 问题树整理成研报、case memo 或 IC memo |
| PRD 到前端实现 | `docs/workflows/prd-to-frontend.md` | 把模糊需求或 PRD 推进到页面结构、组件计划、前端实现和浏览器验收 |

## 可视化编排

- 本地编排台：`apps/skill-orchestrator/index.html`
- 数据生成：运行 `.\scripts\build-skill-orchestrator-data.ps1`

编排台不运行 Claude，也不做本地 runner。它从当前 `skills/` 扫描技能，支持拖拽拼出动态技能链，实时生成整条链的 Claude handoff prompt。只有反复验证后值得沉淀的链路，才从页面导出 JSON 放进 `orchestrations/`。

## 文档入口

- 文档总目录见 [docs/README.md](docs/README.md)。
- 仓库治理和引用原则见 [docs/governance/](docs/governance/)。
- 技能库宪法见 [docs/governance/library-constitution.md](docs/governance/library-constitution.md)。
- 索引和记录方式见 [docs/governance/catalog-schema.md](docs/governance/catalog-schema.md)。
- 收录、协作、Linear 和跨板块调用链见 [docs/workflows/](docs/workflows/)。
- 各板块的来源、调用链和索引见 [docs/sections/](docs/sections/)。

## 维护规则

1. 新增技能前先判断它属于哪个板块。
2. 每个技能必须记录来源、用途、触发场景、迁移方式和验证状态。
3. 外部技能默认先做索引；只有许可证、边界和复用价值清楚时才复制。
4. 每次收录都更新 `catalog/skills.yml`。
5. Linear 项目用于跟踪收录、审查、去重和重构任务。

## 重要边界

`oss-investment-scorecard` 已经作为单独 skill 包放在本仓库中，替代之前临时整理的 `vc-investment-evaluator`。

`ai-product-analyzer` 是明确需要跨环境复用的例外：它随包携带必要 `references/`，可独立复制到项目或用户级 skills 目录。

`chinese-natural-voice-revision` 按完整包保留 `SKILL.md`、`AGENTS.md`、`skill.json` 和 `agents/openai.yaml`，用于中文自然语气改写，不承诺检测规避，也不伪造个人经历。

`humanizer-zh` 是 MIT 授权的中文写作自然化 skill，按上游核心文件保留，用于识别和清理常见 AI 写作模式；本仓库不把它表述为检测规避保证。

`frontend-design` 是 Anthropic 官方 skills repo 的前端设计技能独立迁移包，用于提升前端页面和组件的视觉质量。

`frontend-design` 板块当前采用“保守迁移 + 引用索引”策略：GSAP 官方 skills、Awesome Design Skills 的已验证风格目录、TypeUI fundamentals、Taste Skill 核心 skills 可以进入 `skills/`；21st.dev、designprompts.dev 等网页 prompt 只记录入口，不复制 prompt 正文。

`impeccable-index` 只作为 Impeccable 的本地索引和核心归档，不把上游完整仓库的 CLI、站点、扩展和多平台适配层作为正式源内容迁入。

本仓库和 Product Hunter 没有长期关系。历史上从某个本地目录借用过内容，只作为导入 provenance，不构成本仓库的上游、资料源或同步关系。
