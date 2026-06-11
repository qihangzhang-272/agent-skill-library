---
name: topic-research-deposition
description: >
  公众号写作第 0 步——跨平台选题搜索与原始素材沉淀。当用户提到"搜一下选题"、"开始搜索"、"第 0 步"、"选题搜索"、"帮我搜一下 XX"、"看看 XX 话题"时触发。在四个平台（Twitter/X、Reddit、Exa 全网、微信公众号）并行执行 3-4 轮递进搜索，将原始素材按平台归档为 md 文档，不做信息消化或预判。搜索完成做概览汇报，等待用户发令才进入下一步。
---

# 选题搜索与素材沉淀

公众号写作流程的第 0 步。只做信息搜集和沉淀，不做提炼、预判、或"这篇文章应该怎么写"的建议。后续第 1 步 SCQA framing 由 qihang-writing-style 接管。

## 核心原则

1. **只沉淀，不消化。** 保存推文原文、公众号正文、Reddit 帖子全文、网页全文。不写"这篇文章值得关注因为..."这类预判。
2. **最低限度清理。** 去除微信 UI 噪声（"在小说阅读器中沉浸阅读"、"Scan to Follow"、"预览时标签不可点"等），保留正文 + 作者 + 时间。Twitter 保留 text + author + metrics + createdAt。Reddit 保留 title + selftext + author + subreddit + 时间。
3. **全文拉取，禁止概括。** Twitter 推文保存完整 text 字段。Reddit 帖子保存完整 selftext。Exa 搜索到的核心文章和微信公众号文章必须通过 `exa.web_fetch_exa` 拉取**完整全文**（`maxCharacters: 15000` 以上），不能用搜索返回的 highlights/summary 代替。文章正文不要删节、不要只保留摘要、不要用"..."省略。唯一允许的删减是去除微信 UI 噪声。
4. **每篇文章/帖子单独一个 md 文件。** 每个平台建一个文件夹，里面每条内容一个文件。文件命名：`{序号}-{简短slug}.md`（如 `01-addy-osmani-loop-engineering.md`）。文件头部：标题、作者、时间、链接，然后直接贴清洁后的正文全文。
5. **不消化，不概括。** 不要在正文前后写"这篇文章讲了..."、"值得关注的是..."这类预判。读者打开这个文件夹看到的就是原始素材本身。
6. **截图留证。** 每轮文字素材沉淀完后，对每条有 URL 的素材截一张页面证据图。优先用当前环境可用的浏览器截图能力（Chrome、Playwright 或 Codex 浏览器）；`shot-scraper` 只是可选工具。截图保存在 `screenshots/` 子文件夹，文件名与对应 md 文件同名（仅扩展名不同）。截图是"该页面长什么样的证据"——保留排版、评论区、互动数据等文字抓取无法还原的视觉信息。
7. **3-4 轮递进搜索。** 收手标准：素材充分到能形成对这个话题的深度洞察。递进策略见下方"递进搜索策略"。
8. **搜索完做概览汇报。** 列出各平台素材数量、核心发现摘要（2-3 句事实，不是观点）、覆盖盲区。然后停下来等用户发令。
9. **不压缩交互回合。** 概览汇报后用户说"继续"或"进入 SCQA"之前，绝不自动推进到写作。

## 执行架构：全部搜索走 general-purpose（强制）

**所有搜索操作必须通过 `general-purpose` 子代理执行，主对话不直接搜。** 这是本 skill 的核心规则。主对话只负责调度、写文件和汇报；`general-purpose` 负责在各平台执行实际搜索、内容抓取和结果返回。

```
主对话（调度层）                    general-purpose（执行层）
  │                                    │
  ├─ 发令：搜索关键词 X ──────────────→│ twitter search
  │                                    │ rdt search
  │                                    │ exa.web_search_exa
  │                                    │ exa.web_fetch_exa
  │← 返回：清洁后的素材 ──────────────┤
  │                                    │
  ├─ 写入 md 文件                      │
  ├─ 发令：下一轮搜索 ────────────────→│ ...
```

**调度规则：**
- 每轮搜索派一个独立的 `general-purpose`，给明确的搜索指令：平台、关键词、返回字段、是否需要全文抓取。
- `general-purpose` 返回后，主对话立即将结果写入 md 文件。
- 每轮可以有多个 `general-purpose` 并行跑，各平台互不等待。
- `general-purpose` 不写文件、不做选题判断、不进入 SCQA，只返回可落盘的原始内容和必要元数据。

## 环境准备（自动处理，不问用户）

每次开始搜索前，主对话自动完成以下配置，然后将搜索命令交给 `general-purpose`：

```bash
# Twitter/X 认证（token 写在 ~/.bash_profile 中，直接加载）
source ~/.bash_profile

# Reddit（rdt-cli 已 pip 安装，用 python -m rdt_cli 调用）
alias rdt='python -m rdt_cli'

# Exa（已通过 mcporter 注册，无需 API Key）
# 调用方式: mcporter call 'exa.web_search_exa(...)'
#           mcporter call 'exa.web_fetch_exa(...)'
```

这些是搜索命令的前置条件，在 skill 中自动执行，不作为交互点。派发 `general-purpose` 时，要把这些前置条件写进任务说明，避免子代理缺少环境。

## 递进搜索策略（3-4 轮）

**每轮搜索全部派发 `general-purpose` 执行。** 主对话不亲自搜，只负责发令、收结果、写文件和调下一轮方向。

每搜完一轮，基于该轮发现调整下一轮角度。不要四轮搜同一个关键词。

| 轮次 | 搜索目标 | 典型关键词/方向 | general-purpose 派发方式 |
|------|---------|---------------|---------------------|
| **第 1 轮** | 关键词 + 现象全貌 | 话题核心关键词，覆盖中文和英文 | 并行派 3-4 个 `general-purpose`：Twitter 一个、Reddit 一个、Exa 全网一个、微信公众号一个 |
| **第 2 轮** | 火爆现象的源头 | 找到第 1 轮中出现的关键人物、账号、推文 ID，追到源头内容 | 派 `general-purpose` 追具体人物、账号、子版块或原文链接，必要时用 `exa.web_fetch_exa` 拉全文 |
| **第 3 轮** | 概念定义 + 反对质疑 | 搜"XX 是什么"、"XX vs YY"、"质疑 XX"、反对声音、社区批评 | 派 `general-purpose` 搜批评、质疑和替代概念，中文和英文都要搜 |
| **第 4 轮** | 理性论述 + 开源项目 | 搜深度技术博客、学术论文、GitHub 项目、系统化文章 | 派 `general-purpose` 搜 GitHub、论文、技术博客和生产实践案例 |

**general-purpose 派发示例：**

```text
Agent(subagent_type="general-purpose", prompt="
第 1 轮 Twitter 搜索：搜索关键词 'XXX' 和 'XXX'，各返回 10 条，JSON 格式。
返回每条推文的 text、author、createdAt、metrics、urls。不要概括，返回原始内容。
")
```

**当素材覆盖以下五个维度时，认为"够了"：**
- [ ] 现象本身（有什么？谁在说？多火？）
- [ ] 概念定义（这东西到底是什么？从哪来的？）
- [ ] 至少一条反对或质疑声音
- [ ] 至少一条理性、系统的技术论述或深度文章
- [ ] 至少一个生产实践案例或开源项目

如果 3 轮后已覆盖全部维度，可以提前收手。如果 4 轮后仍有盲区，在概览汇报中明确标注。

## 四平台并行命令参考

详见 `references/platform-commands.md`。

## 素材文件格式

### 目录结构

```
writing/wechat/drafts/YYYY-MM-DD-{topic-slug}/
├── twitter/
│   ├── 01-addy-osmani-loop-engineering.md
│   ├── 02-peter-steinberger-original-tweet.md
│   └── ...
├── reddit/
│   ├── 01-is-loop-engineering-next-buzzword.md
│   └── ...
├── web/
│   ├── 01-addy-osmani-loop-engineering-full.md
│   ├── 02-reza-rezvani-most-not-build-loop.md
│   └── ...
├── wechat/
    ├── 01-claude-code-while-loop-source.md
    ├── 02-8-mechanisms-chat-to-agent.md
    └── ...
└── screenshots/
    ├── web-01-addy-osmani-loop-engineering.png
    ├── twitter-01-peter-steinberger-original-tweet.png
    └── ...
```

### 单文件头部模板

```markdown
# [完整标题]
- **作者/来源**：xxx
- **发布时间**：xxx
- **原始链接**：xxx
- **关键数据**（如有）：likes / RT / views / bookmarks
- **抓取方式**：twitter search / rdt-cli / exa.web_fetch_exa

---

[清洁后的正文全文]
```

### Twitter：每条推文一个文件
完整保存 `text` 字段原文。对于带 `quotedTweet` 的推文，同时保存被引用推文的 text + author。

### Reddit：每个帖子一个文件
完整保存 `title` + `selftext`。

### Web/公众号：每篇文章一个文件
通过 `exa.web_fetch_exa` 拉取完整全文（`maxCharacters: 15000` 以上），清洁后完整保存。**绝对禁止用搜索返回的 highlights/summary 代替全文。绝对禁止在正文中插入"[...]"省略标记。**

## 概览汇报模板

四轮搜索全部完成后，按以下格式向用户汇报：

```
## [选题名] 搜索沉淀完成

### 素材总量
Twitter: X 条 | Reddit: X 条 | Exa 全网: X 篇 | 微信公众号: X 篇
素材目录: writing/wechat/drafts/YYYY-MM-DD-topic-slug/

### 核心事实摘要
1. （2-3 句纯事实，不是观点：谁说了什么、什么时候、多火）
2. ...

### 五维度覆盖检查
现象本身 [x] | 概念定义 [x] | 反对质疑 [x] | 理性论述 [x] | 生产案例 [x]

### 覆盖盲区
（如有，如实列出来；如无，说"五个维度均已覆盖"）

---

素材沉淀完成。是否进入第 1 步 SCQA framing？
```

**汇报告一段落后必须停下，等待用户明确说"继续"或"开始 SCQA"。**

## 文件落点

所有素材写入 `writing/wechat/drafts/` 下，按 `YYYY-MM-DD-{topic-slug}/` 建文件夹。每个平台建子文件夹，每个素材单独一个 md 文件。

每轮搜索完成后，立即将结果写入对应文件。文件顶部标注抓取时间和轮次。

目录示例见上方"素材文件格式"部分。

## 截图沉淀规则

- 有 URL 的素材尽量截图；没有 URL 的素材只保留文字和抓取方式，不伪造截图。
- 文件名带平台前缀，避免不同平台同序号冲突：`{platform}-{md文件名去扩展名}.png`。
- 网页、Substack、Medium、36kr 和微信公众号优先截首屏或核心标题区；如果页面有原文图表，再补截对应图表区域。
- Twitter/X 优先截单条推文页面；未登录时截图可能包含登录提示，可以保留，因为它仍能证明页面和互动数据。若登录态可用，再截更干净版本。
- Reddit 优先截帖子首屏；如果抓取源没有 permalink，需要先补 URL，再截图。
- 截图只作为素材证据和公众号候选配图，不替代 md 正文全文沉淀。
