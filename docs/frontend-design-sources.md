# 前端设计技能候选来源

调研日期：2026-06-08

目标：为私有技能库建立前端设计板块。候选源按 GitHub 高星优先筛选，避免把低星 prompt repo 误当成长期沉淀来源。

## 筛选标准

| 规则 | 说明 |
| --- | --- |
| 星标门槛 | 主清单默认只收 `>= 1000 stars` 的公开 repo |
| 许可证 | MIT / Apache / BSD 优先；无 license 或 Other 只做参考或二次提炼 |
| 迁移价值 | 优先收可变成 skill 的执行逻辑、设计系统规则、组件使用约束、动画实践，不收散乱 prompt |
| 低星处理 | 低于门槛的候选从主清单移除，除非用户明确指定后单独评估 |

## 第一批高星候选

### Agent Skill / Prompt 来源

| 来源 | Stars | 许可证 | 观察 | 建议 |
| --- | ---: | --- | --- | --- |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) | 1168 | MIT | DESIGN.md / SKILL.md 风格技能索引，含 `dashboard`、`shadcn`、`bento`、`editorial`、`premium` 等目录 | 作为风格 skill 发现入口；按目录挑选，不全量搬 |
| [bergside/typeui](https://github.com/bergside/typeui) | 1081 | LICENSE.md 为 MIT，GitHub API 显示 Other | 面向 Codex / Claude / Cursor 的设计 skill CLI 和 registry | 先审具体 `skills/` 和 registry，再决定是否迁移 |
| [0xeb/TheBigPromptLibrary](https://github.com/0xeb/TheBigPromptLibrary) | 5111 | MIT | 系统 prompt 集合，包含 v0.dev 相关 prompt | 只提炼 UI 生成约束，不完整搬系统 prompt |
| [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | 9425 | 未检测到 license | Claude Skills 大型索引 | 只做继续发现入口，不复制无授权内容 |
| [2-fly-4-ai/V0-system-prompt](https://github.com/2-fly-4-ai/V0-system-prompt) | 1812 | 未检测到 license | v0 system prompt 单仓库 | 只做参考链接，不复制原文 |

### UI / 设计系统来源

这些不是 skill 包，但很适合沉淀为 `frontend-design` 的 reference：组件选择、视觉层级、设计系统约束、生成质量规则。

| 来源 | Stars | 许可证 | 观察 | 建议 |
| --- | ---: | --- | --- | --- |
| [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | 115953 | MIT | 当前 AI 前端生成最常用的 copy-paste UI 基底 | 建 `shadcn-reference` 或写进主 frontend skill 的组件约束 |
| [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | 95441 | MIT | Utility-first CSS 基础设施 | 沉淀 Tailwind layout / spacing / responsive 约束 |
| [mui/material-ui](https://github.com/mui/material-ui) | 98399 | MIT | Material UI React 组件库 | 做 enterprise / admin / data-heavy UI 参考 |
| [ant-design/ant-design](https://github.com/ant-design/ant-design) | 98297 | MIT | 企业级 React UI 设计语言 | 做 B2B SaaS / console / dashboard 参考 |
| [animate-css/animate.css](https://github.com/animate-css/animate.css) | 82583 | Other | CSS 动画经典库 | 只参考动效命名和节奏，不直接复制 |
| [saadeghi/daisyui](https://github.com/saadeghi/daisyui) | 41085 | MIT | Tailwind CSS 组件库 | 做主题化和快速组件风格参考 |
| [chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui) | 40428 | MIT | SaaS 产品常用 React component system | 做 accessibility / component API 参考 |
| [heroui-inc/heroui](https://github.com/heroui-inc/heroui) | 29588 | Apache-2.0 | 现代 React UI library，原 NextUI | 做现代交互组件参考 |
| [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | 21201 | MIT | 面向 design engineers 的动效组件与视觉效果 | 适合沉淀 marketing / landing / polish 风格 reference |
| [birobirobiro/awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui) | 19736 | MIT | shadcn/ui 生态索引 | 做 shadcn blocks / registry 继续发现入口 |
| [jnsahaj/tweakcn](https://github.com/jnsahaj/tweakcn) | 9982 | Apache-2.0 | shadcn/ui 主题编辑器 | 做 design token / theme 参考 |
| [Manavarya09/design-extract](https://github.com/Manavarya09/design-extract) | 3091 | MIT | 从网站提取 design system，含 tokens、MCP、WCAG、Tailwind v4 | 适合后续做“从参考站点抽取设计系统”的工具型 skill |
| [Jpisnice/shadcn-ui-mcp-server](https://github.com/Jpisnice/shadcn-ui-mcp-server) | 2785 | MIT | 给 LLM 提供 shadcn 组件结构和安装上下文的 MCP | 适合评估是否接入 MCP 或做工具 reference |

### 动效 / GSAP 来源

| 来源 | Stars | 许可证 | 观察 | 建议 |
| --- | ---: | --- | --- | --- |
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | 8479 | MIT | 官方 AI skills for GSAP，含 `gsap-core`、`gsap-react`、`gsap-scrolltrigger`、`gsap-timeline` 等 | 第一批可直接迁移的动效 skill |
| [greensock/GSAP](https://github.com/greensock/GSAP) | 25667 | 未检测到标准 OSS license | GSAP 官方库 | 只作为 API / 官方实践源，不直接 vendored |
| [motiondivision/motion](https://github.com/motiondivision/motion) | 32263 | MIT | React / JS animation library | 做 React 动效 reference，和 GSAP skill 区分 |
| [pmndrs/react-spring](https://github.com/pmndrs/react-spring) | 29103 | MIT | Spring physics React 动画库 | 做物理动效 reference |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | 25543 | Apache-2.0 | 面向 agents 的 HTML 渲染视频工具 | 可作为 motion graphics / video UI 后续研究源 |

## 建议迁移顺序

1. 迁移 [greensock/gsap-skills](https://github.com/greensock/gsap-skills)。
   - 原因：官方、MIT、明确就是 AI skills，且星标足够高。
   - 目标路径：`skills/gsap-skills/`
   - 迁移范围：优先复制 `skills/` 下的 skill 目录和 `skills/llms.txt`，再判断是否需要 `examples/`。

2. 从 [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) 挑高价值风格目录。
   - 建议先看：`dashboard`、`shadcn`、`bento`、`editorial`、`premium`、`minimal`。
   - 不要一次性全搬，避免把风格词堆成不可维护的 prompt 集合。

3. 用 [shadcn-ui/ui](https://github.com/shadcn-ui/ui)、[tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)、[magicuidesign/magicui](https://github.com/magicuidesign/magicui) 做前端设计 reference。
   - 目标不是复制源码，而是沉淀“生成约束”：组件选择、布局密度、响应式、动效、图标、可访问性。

4. 再看 prompt/system prompt 来源。
   - [0xeb/TheBigPromptLibrary](https://github.com/0xeb/TheBigPromptLibrary) 可以提炼，不建议原样搬。
   - 无 license 的 prompt 仓库只保留链接。

## 拿过来的标准流程

```powershell
# 1. 克隆候选源到临时目录
git clone --depth 1 <repo-url> C:\tmp\<repo-name>

# 2. 记录上游 commit
git -C C:\tmp\<repo-name> rev-parse HEAD

# 3. 复制目标 skill 或 reference 到私有仓库
Copy-Item -Recurse -LiteralPath C:\tmp\<repo-name>\<source-path> -Destination C:\Users\Administrator\Desktop\AI\codex\技能库\agent-skill-library\skills\<target-skill>

# 4. 校验依赖边界和敏感内容
rg --hidden -n "C:\\Users|\\.git|node_modules|api key|secret|token|password" skills\<target-skill>

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

前端设计仓库应从“高星设计系统 + 官方 skill + 高星 prompt 索引”三类来源沉淀。

最稳的第一步不是低星 `frontend-design-principles`，而是 [greensock/gsap-skills](https://github.com/greensock/gsap-skills) 和 [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills)。
