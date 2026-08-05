# WeChat Writing Workflow

权威运行定义：`plugins/orchestrator/skills/workflow-orchestrator/references/chains/wechat-writing.md`

## 目标

从可选的账号语料采集、主题研究和 `human-writing` 写作与改稿，走到清晰的视觉叙事、Markdown 排版、HTML 预览与公众号草稿箱。运行时项目夹统一为：

`writing/drafts/{YYYY-MM-DD}-{topic-slug}/`

## 主链

```text
[要求账号历史 / 对标账号语料时] 账号级公开语料采集与规范化
  -> 研究沉淀
  -> human-writing 写作、改稿与上游检查
  -> Markdown 排版
  -> 视觉计划（内容判断、Visual Copy Desk、形式与 Render owner）
  -> 按 05.5-visual-plan.md 选择性调用视觉技能
  -> 06-final.md
  -> HTML 预览
  -> 公众号草稿箱
```

## 职责分离

- `workflow-orchestrator` 只选择 chain、依次调用技能并检查 Handoff。
- `wechat-account-corpus-research` 只在需要账号历史、批量 URL 或对标语料时运行；它输出可审计 corpus，不生成竞品判断。
- `topic-research-deposition` 消费 corpus manifest，并继续补齐主题、反证和跨平台材料。
- `human-writing` 是唯一正文写作 owner，读取研究过程包，按上游规则完成起草、改稿和 `check_prose.py` 检查；本库不修改其技能正文。
- `editorial-visual-storytelling` 独立负责视觉内容判断、文案、是否配图、资产形式和 Render owner。
- 各 Baoyu 技能只负责渲染。

视觉领域技能读取排版后的正文，生成唯一的 `05.5-visual-plan.md`。Orchestrator 只读取其中的 `Render owner` 并分发任务，不自行补写文案或选择形式。

## Visual Copy Desk

- 封面标题、图注、节点标签、漫画旁白和对白分别处理，不使用一套“金句模板”。
- 文案先描述能确认的事实或动作，再决定需要补时间、语境、声音还是关系。
- 每项资产写 2–3 个信息角度不同的候选，不做同义改写竞赛。
- 画面已经表达的动作不由字幕重复；没有文字缺口时允许 `Copy role: none`。
- 每个画内文本单元优先 4–8 字、硬上限 10 个中文字符；长句与解释移到图外 caption。
- 生成 prompt 只能使用 brief 里审校后的 `Exact text`，不能临时扩写。

## 公众号架构图

- 默认使用清晰编辑主题，不再固定暗色技术风。
- 简单关系优先 Mermaid 语义源，经自动布局输出 SVG。
- 主要节点优先 3–5 个，超过 6 个先拆图。
- 一张图只回答一个自然语言问题，并保持一个抽象层级。
- 色调可继承作者头像的暖纸、深海军蓝、钴蓝和暖橙；线条、文字与节点保持清晰。

## 知识漫画

- 漫画文案由 `editorial-visual-storytelling` 先写动作与节奏。
- 每格先写 `Scene fact`，再选择旁白、对白或无字；对白必须影响下一步动作。
- `baoyu-comic` 再生成角色表、正式 storyboard、prompt 与页面。
- 不使用“问题—分析—顿悟—结论”的默认四格闭环。
- 角色必须与材料、工具或他人发生可见关系；不能只是替作者朗读论纲。

## 发布边界

- `04-revised.md` 是正文语义源。
- `05.5-visual-plan.md` 是视觉语义、文案、形式和 Render owner 的唯一来源。
- `06-final.md` 是唯一发布源。
- HTML 只用于预览。
- 发布只进入草稿箱，不自动扩大为群发。

## 账号语料边界

- 对标账号抓取只覆盖获准访问的公开文章与用户给出的 URL；每次运行必须限定账号、日期或数量范围。
- 账号语料保存到 `01-topic-research/sources/wechat-accounts/`，原始导出、规范化正文和 manifest 分开。
- 账号历史可使用外部索引登记的 `wechat-article-exporter`；需要后台登录或扫码时由用户完成，并在动作前单独确认。
- 阅读量、评论、凭据捕获、代理证书和系统代理不属于该可选分支。
