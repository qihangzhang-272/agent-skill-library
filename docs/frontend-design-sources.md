# 前端设计技能候选来源

调研日期：2026-06-08

目标：为私有技能库建立前端设计板块，先收集可迁移来源，再决定是否 vendored 到 `skills/`。

## 迁移判断

| 等级 | 含义 | 处理方式 |
| --- | --- | --- |
| 可直接迁移 | 许可证清楚，结构接近 Agent Skill，内容自包含 | 复制到 `skills/`，保留 upstream commit 和 license 信息 |
| 可转换迁移 | 是 rules / DESIGN.md / prompt 集合，不是 skill | 先转成内部 `references/` 或轻量 skill，不直接照搬大段内容 |
| 只做参考 | 许可证不清楚、强 copyleft、或来源混杂 | 只保留链接、摘录自己的判断，不 vendored 原文 |

## 第一批候选

| 来源 | 类型 | 许可证 | 观察 | 建议 |
| --- | --- | --- | --- | --- |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) | DESIGN.md / SKILL.md 索引 | MIT | GitHub 显示约 1168 stars；`skills/` 下有大量风格目录，如 `bento`、`brutalism`、`dashboard`、`glassmorphism`、`shadcn`、`vintage` | 作为风格技能发现入口，不建议一次性全搬 |
| [joshuadavidthomas/agent-skills](https://github.com/joshuadavidthomas/agent-skills) | Agent skills | MIT | 有 `frontend-design-principles/`，包含 `SKILL.md`、`app.md`、`marketing.md`、`references/principles.md` | 最适合作为第一批核心 frontend skill 迁移 |
| [saifyxpro/ui-ux-design-pro-skill](https://github.com/saifyxpro/ui-ux-design-pro-skill) | UI/UX skill 包 | MIT | `skills/ui-ux-design-pro/` 下有 `SKILL.md`、`references/` 和 `cli/`；覆盖大量 styles、palettes、font pairings | 适合第二批迁移；先判断是否保留 CLI |
| [bergside/typeui](https://github.com/bergside/typeui) | 设计 skill CLI / registry | LICENSE.md 为 MIT，GitHub API 显示 Other | 有 `skills/`、`.agents/`、plugin 和 registry，像工具型设计技能平台 | 先作为工具源研究；迁移前检查具体目录和依赖 |
| [spencergoldade/cursor-designer](https://github.com/spencergoldade/cursor-designer) | Cursor UX/UI/IA rules | GPL-3.0 | 有 `.cursor/rules/core`、`.cursor/rules/frontend`、`.cursor/rules/binders`，UX/IA 规则完整 | 不直接混入私有 skill 包；可参考结构或单独隔离 |
| [0xeb/TheBigPromptLibrary](https://github.com/0xeb/TheBigPromptLibrary) | 系统 prompt 集合 | MIT | 包含 `SystemPrompts/V0.dev/20240904-V0.md`，能参考 v0 对 shadcn、Tailwind、lucide、响应式的约束 | 只提炼通用生成约束，不迁移完整系统 prompt |
| [ZeroLu/awesome-gemini-ai](https://github.com/ZeroLu/awesome-gemini-ai) | Gemini prompt 集合 | 未检测到 license | 包含 UI/UX & Design prompts，偏灵感和 style prompt | 只做链接参考，不复制原 prompt |
| [devanshug2307/Awesome-AI-Image-Prompts](https://github.com/devanshug2307/Awesome-AI-Image-Prompts) | 图像 / 风格 prompt 集合 | 未检测到 license | 包含 logo、branding、product photography、architecture、minimalist icons 等视觉 prompt 分类 | 只做风格来源索引，不直接复制 |
| [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | Claude Skills 索引 | 未检测到 license | 大型 Claude skills 索引，包含 UI/UX 相关条目 | 作为继续发现入口 |

## 建议迁移顺序

1. 先迁移 `joshuadavidthomas/agent-skills/frontend-design-principles`。
   - 原因：结构最干净，直接是 skill；MIT；覆盖 app 和 marketing 两种前端设计场景。
   - 目标路径：`skills/frontend-design-principles/`

2. 再从 `bergside/awesome-design-skills` 挑 5-8 个高频风格目录。
   - 建议先看：`dashboard`、`shadcn`、`bento`、`editorial`、`glassmorphism`、`brutalism`、`premium`、`minimal`。
   - 目标路径：如果每个目录都是独立 skill，放 `skills/`；如果只是风格描述，合并成 `skills/frontend-style-router/references/styles.md`。

3. 再评估 `saifyxpro/ui-ux-design-pro-skill`。
   - 如果 CLI 是核心能力：完整迁移 `skills/ui-ux-design-pro/`。
   - 如果 CLI 只是检索辅助：只迁移 `SKILL.md` 和 `references/`，把 CLI 标为后续增强。

4. 把 prompt 集合作为 `references/source-links.md`。
   - 未检测到 license 的 prompt 集合只记录链接、分类和自己的提炼，不复制原文。

## 拿过来的标准流程

```powershell
# 1. 克隆候选源到临时目录
git clone --depth 1 <repo-url> C:\tmp\<repo-name>

# 2. 记录上游 commit
git -C C:\tmp\<repo-name> rev-parse HEAD

# 3. 复制目标 skill 或 reference 到私有仓库
Copy-Item -Recurse -LiteralPath C:\tmp\<repo-name>\<source-path> -Destination C:\Users\Administrator\Desktop\AI\codex\技能库\agent-skill-library\skills\<target-skill>

# 4. 校验依赖边界
rg --hidden -n "C:\\Users|\\.git|\\.cursor|\\.claude|node_modules|api key|secret|token" skills\<target-skill>

# 5. 更新索引
# - README.md
# - catalog/skills.yml
# - sections/frontend-design/README.md

# 6. 提交
git status --short
git add <changed-files>
git commit -m "YYYY-MM-DD HH:mm｜收录前端设计技能包"
git push origin main
```

## 当前结论

最稳的第一步是迁移 [joshuadavidthomas/agent-skills](https://github.com/joshuadavidthomas/agent-skills) 里的 `frontend-design-principles/`。

它最接近我们现在的技能库标准：MIT、自包含、不是单纯 prompt 堆积，也不需要先处理复杂 CLI。
