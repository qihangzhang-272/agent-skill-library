# 写作

写作板块只保留启航自培养的写作运行能力。外部写作、改写和发布工具统一进入 `qihang-skill-index` 的 GitHub 索引。

## 本地正式技能

### `qihang-writing-style`

用途：按启航当前偏好的公众号写作节奏生成或修改中文长文，尤其适合 AI 工具、Skill 方法论、产品分析和写作系统相关文章。

本仓库技能包：

- `skills/qihang-writing-style/SKILL.md`
- `skills/qihang-writing-style/references/`

维护原则：

- `SKILL.md` 只保留路由和流程，不塞全文风样本。
- 具体风格观察放入 references，按需读取。
- 写作风格保持轻量，不用脚本做机械检查，除非用户明确要求。

### `topic-research-deposition`

用途：公众号写作第 0 步，围绕一个选题串行搜索 Twitter/X、Reddit、网页和微信公众号，把原始素材按平台沉淀为 Markdown，并为有 URL 的素材截图留证。

本仓库技能包：

- `skills/topic-research-deposition/SKILL.md`
- `skills/topic-research-deposition/references/`

维护原则：

- 只做素材沉淀，不提前消化成观点或文章结构。
- 搜索由主对话直接串行执行，主对话负责搜索、落盘、截图和概览汇报。
- 概览汇报后等待用户确认，再进入 `qihang-writing-style` 的 SCQA framing。

## 外部索引

以下能力不再作为本地技能包保存，统一从 `skills/qihang-skill-index/references/github-skill-index.md` 查询：

- `Humanizer-zh`
- `agent-style`
- `md2wechat`
- `agent-reach`

## 调用链

- `orchestrations/wechat-product-research-writing-publish.json`
