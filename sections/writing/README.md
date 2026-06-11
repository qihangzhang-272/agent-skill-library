# 写作

写作板块收集中文写作、改写、语气修订、作者声音和文稿自然化相关技能。

## 已收录

### `chinese-natural-voice-revision`

用途：修改中文文章中空泛、模板化、过度顺滑、AI 味明显的表达，使其更像作者本人真实写出的中文稿。

本仓库技能包：

- `skills/chinese-natural-voice-revision/SKILL.md`
- `skills/chinese-natural-voice-revision/AGENTS.md`
- `skills/chinese-natural-voice-revision/skill.json`
- `skills/chinese-natural-voice-revision/agents/openai.yaml`

维护原则：

- 按完整包保存，不拆散。
- 不承诺检测规避，不伪造作者经历。
- 缺少真实素材时，技能应引导用户补充，而不是代编细节。

### `humanizer-zh`

用途：识别中文文本里的常见 AI 写作模式，并把表达改得更自然、更具体、更像真实编辑后的稿件。

本仓库技能包：

- `skills/humanizer-zh/SKILL.md`
- `skills/humanizer-zh/README.md`
- `skills/humanizer-zh/LICENSE`
- `skills/humanizer-zh/UPSTREAM.md`

维护原则：

- 按上游核心文件保留，不复制 git 元数据。
- 用作中文写作自然化和编辑检查，不承诺检测规避。
- 若缺少事实来源，优先要求补充素材，不编造具体经历或数据。

### `qihang-writing-style`

用途：按用户当前偏好的公众号写作节奏生成或修改中文长文，尤其适合 AI 工具、Skill 方法论、产品分析和写作系统相关文章。

本仓库技能包：

- `skills/qihang-writing-style/SKILL.md`
- `skills/qihang-writing-style/references/writing-process.md`
- `skills/qihang-writing-style/references/voice-quality.md`
- `skills/qihang-writing-style/references/ai-flavor-checklist.md`
- `skills/qihang-writing-style/references/style-rhythm.md`
- `skills/qihang-writing-style/references/skill-methodology-writing.md`

维护原则：

- `SKILL.md` 只保留路由和流程，不塞全文风样本。
- 具体风格观察放入 references，按需读取。
- 写作风格保持轻量，不用脚本做机械检查，除非用户明确要求。
- 该技能定义作者声音；`humanizer-zh` 和 `agent-style` 只作为发布前清理器。

### `topic-research-deposition`

用途：公众号写作第 0 步，围绕一个选题并行搜索 Twitter/X、Reddit、网页和微信公众号，把原始素材按平台沉淀为 Markdown，并为有 URL 的素材截图留证。

本仓库技能包：

- `skills/topic-research-deposition/SKILL.md`
- `skills/topic-research-deposition/references/platform-commands.md`
- `skills/topic-research-deposition/references/agent-constraints.md`
- `skills/topic-research-deposition/references/wechat-extraction.md`
- `skills/topic-research-deposition/references/quality-checklist.md`

维护原则：

- 只做素材沉淀，不提前消化成观点或文章结构。
- 搜索由 `general-purpose` 子代理执行，主对话只做调度、落盘和概览汇报。
- 每条素材单独落盘，保留作者、时间、原始链接和抓取方式。
- 有 URL 的素材尽量截图，截图作为页面证据和公众号候选配图，不能替代正文全文。
- 概览汇报后等待用户确认，再进入 `qihang-writing-style` 的 SCQA framing。

### `md2wechat`

用途：把 Markdown 文章转换为微信公众号格式，支持本地预览、主题排版、封面/配图、图片上传和推送草稿箱。

本仓库技能包：

- `skills/md2wechat/SKILL.md`
- `skills/md2wechat/LICENSE`
- `skills/md2wechat/UPSTREAM.md`

维护原则：

- 只迁入上游 `skills/md2wechat/SKILL.md`，不复制 CLI 源码、主题源码、文档、示例和平台适配层。
- 使用前以本机 `md2wechat` CLI discovery 输出为准，不凭记忆猜主题、模块和 provider。
- `convert --draft`、`upload_image` 等命令有微信接口副作用，必须用户明确要求后再执行。
- 上游许可证为 BUSL-1.1，个人内容创作可用；商业用途需要单独授权。

## 待补充方向

- 长文结构编辑
- 中文商业写作
- 研报叙事打磨
- 多语气改写和语体转换
