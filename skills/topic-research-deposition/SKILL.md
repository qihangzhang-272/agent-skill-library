---
name: topic-research-deposition
description: >
  公众号写作第 0 步——跨平台选题搜索与原始素材沉淀。当用户提到"搜一下选题"、"开始搜索"、"第 0 步"、"选题搜索"、"帮我搜一下 XX"、"看看 XX 话题"、"素材沉淀"或"补截图"时触发。在四个平台（Twitter/X、Reddit、Exa 全网、微信公众号）串行执行 3-4 轮递进搜索，将原始素材按平台归档为 md 文档，并截图留证。不做信息消化或预判。搜索完成后做概览汇报，等待用户发令才进入下一步。
---

# 选题搜索与素材沉淀

公众号写作流程的第 0 步。只做信息搜集和沉淀，不做提炼或预判。第 1 步 SCQA framing 由 `qihang-writing-style` 接管。

## 前置确认——搜索前必须做的三件事

**搜索是为写作服务的。在动手搜索之前，必须用 `AskUserQuestion` 向用户确认以下三件事。必须确认之后再创建目录、开始搜索。**

### 确认一：想了解什么？

用户的选题想法可能很模糊（比如"我想写点 AI 哲学的东西"），此时需要追问：

- 你具体想了解这个选题的哪些方面？（发展历史？当前争议？关键人物？技术原理？商业模式？）
- 你对这个选题已有的认知大概有多少？（完全陌生 / 略知一二 / 有深入研究）
- 你最想通过这篇文章回答什么核心问题？

### 确认二：想搜什么平台和内容类型？

- 有没有特别想看的平台？（Twitter 热度 / Reddit 深度讨论 / 公众号中文圈 / 英文长文博客 / 学术论文）
- 有没有特别不想看的平台？（比如纯中文圈不需要英文、纯技术圈不需要公众号）
- 需要多深的内容？（浅层现象级讨论 / 中层分析评论 / 深层学术论文）

### 确认三：想写的文章大致方向和体裁？

- 这篇文章是什么体裁？（深度评论 / 产品分析 / 技术科普 / 行业综述 / 哲学随笔 / 观点论证）
- 有没有大致的立场或想要论证的主张？
- 有没有特别想避开的角度？
- 有没有已经知道的想引用的文章、人物、项目？

### 确认结果记录

把用户的回答整理成 **3-5 句前置确认摘要**，用 `Write` 写入 `{draft_dir}/_确认.md`，让后续每一轮搜索都围绕这个核心问题展开，而不是漫无目的地撒网。

### 确认示例

```
## AI 哲学 选题前置确认

- **想了解**：AI 哲学目前有哪些主流讨论方向（意识、对齐、因果、自由意志等）、各方向代表人物和观点、有争议的非共识意见
- **平台**：中英文都需要，Twitter 看热度、Reddit 看深度讨论、Exa 看英文长文、公众号看中文圈论述
- **写作方向**：哲学评论，从现象梳理出发提出若干共识与非共识，不预设立场，保持开放探讨
- **核心问题**：当前 AI 哲学讨论中，哪些是真正有进展的问题？哪些是重复千年的旧问题换了新皮？
```

## 核心原则

1. **只沉淀，不消化。** 保存原文全文，不写"这篇文章值得关注因为…"这类预判。
2. **最低限度清理。** 去除微信 UI 噪声，保留正文 + 作者 + 时间 + 链接 + 互动数据。
3. **全文拉取，禁止概括。** Exa 文章用 `maxCharacters: 15000` 以上拉取完整全文，禁止用 highlights/summary 代替，禁止用 `[...]` 省略。
4. **每篇单独一个 md。** 按平台建子文件夹，文件命名 `{序号}-{简短slug}.md`。
5. **截图留证。** 每条有 URL 的素材截一张 PNG，详见下方"截图流程"。
6. **3-4 轮递进搜索。** 每轮基于上一轮发现调整角度，五维度全盖则收手。
7. **概览汇报后停等。** 用户说"继续"/"进入 SCQA"之前绝不自动推进。

## 执行方式

**主对话直接串行执行搜索，不派发子代理。**

### 整体流程

```
用户提选题想法
  ↓
前置确认（AskUserQuestion × 3 → Write _确认.md）
  ↓
创建选题目录 → 环境准备
  ↓
第 1 轮：Twitter → Reddit → Exa → 微信（串行）
  ↓
第 2 轮：追源头/拉全文
  ↓
第 3 轮：反对质疑+概念定义
  ↓
第 4 轮：深度论述+开源项目
  ↓
概览汇报 → 停等用户发令
```

每轮搜索严格按固定顺序：Twitter → Reddit → Exa → 微信，一个平台搜完、写文件、截图完毕后再进入下一个平台。

### 为什么不派发子代理

1. 子代理的文件落盘路径不可控，容易散落到根目录或临时目录。
2. 子代理返回内容可能被截断或被其自身"总结"，无法保证原文完整性。
3. 串行执行让每一步搜到的关键词、人物、子版块可以即时注入下一平台的搜索词中，提高搜索质量。
4. 主对话直接控制文件写入，确保所有 md 落入正确的 `{draft_dir}/{platform}/` 子目录。

## 选题目录创建

**每个新选题开始时，第一步就是创建目录结构：**

```powershell
$base = "C:\Users\Administrator\Desktop\AI\codex\Writing platforms\agent-skill-library-management\writing\wechat\drafts\{YYYY-MM-DD}-{topic-slug}"
New-Item -ItemType Directory -Force -Path "$base\twitter" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\reddit" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\web" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\wechat" | Out-Null
New-Item -ItemType Directory -Force -Path "$base\screenshots" | Out-Null
```

**此后所有搜索结果的 md 文件一律写入对应平台子目录，截图一律写入 screenshots/，严禁写入根目录或其他位置。**

## 环境准备

每次搜索前加载环境变量：

```bash
source ~/.bash_profile          # Twitter/X auth token
# Reddit: python -m rdt_cli
# Exa: mcporter call 'exa.web_search_exa(...)'
```

## 递进搜索策略

所有搜索通过 Bash 工具直接执行命令行（`mcporter`、`twitter`、`python -m rdt_cli`、`curl`），主对话解析返回结果后用 Write 工具写入 md 文件。

| 轮次 | 目标 | 方向 | 执行 |
|------|------|------|------|
| **1** | 现象全貌 | 话题核心关键词，中英文 | 串行执行：Twitter → Reddit → Exa → 微信 |
| **2** | 火爆现象源头 | 追关键人物、账号、推文 ID、子版块，拉原文全文 | 基于第 1 轮发现的具体链接/人物/子版块，exa.web_fetch_exa 拉全文 |
| **3** | 概念定义 + 反对质疑 | "XX 是什么"、"质疑 XX"、反对声音、社区批评，中英文 | 搜批评/质疑/替代概念 |
| **4** | 理性论述 + 开源项目 | 深度技术博客、论文、GitHub、生产案例 | 搜 GitHub/论文/生产实践 |

**收手标准——五维度覆盖：**
- [ ] 现象本身（有什么？谁在说？多火？）
- [ ] 概念定义（这东西到底是什么？从哪来的？）
- [ ] 至少一条反对/质疑声音
- [ ] 至少一条理性系统论述
- [ ] 至少一个生产案例或开源项目

每轮搜索完立即将结果写入对应 md。平台命令细节见 `references/platform-commands.md`。

### 每轮串行执行流程

```
Round N 开始:
  1. Twitter 搜索 → 解析 JSON → Write md 到 {draft_dir}/twitter/ → 截图
  2. Reddit 搜索 → 解析 JSON → Write md 到 {draft_dir}/reddit/ → 截图
  3. Exa 全网搜索 → 解析结果 → 拉全文 → Write md 到 {draft_dir}/web/ → 截图
  4. 微信搜索（via Exa）→ 解析结果 → 拉全文 → Write md 到 {draft_dir}/wechat/ → 截图
  5. 记录本轮发现的关键人物/子版块/术语，注入下一轮搜索词
```

**每步必须做到的硬约束：**
- 搜索结果逐条完整列出，不省略、不合并、不概括
- 每条结果写入独立的 md 文件，文件路径为 `{draft_dir}/{platform}/{序号}-{slug}.md`
- 有 URL 的素材必须截图，保存到 `{draft_dir}/screenshots/{platform}-{序号}-{slug}.png`
- 每步的搜索命令、返回结果直接记录，不经过任何"总结"环节

## 截图流程

**每完成一轮搜索的文字沉淀后**，对该轮所有有 URL 的素材截图。

**唯一推荐工具：`shot-scraper`**（底层 Playwright，比浏览器 MCP 快）。

```bash
# 基本格式
shot-scraper "<URL>" -o "<draft_dir>/screenshots/<filename>.png" --width 1200 --height 800

# Twitter/X 推文（加 --wait 等待动态加载）
shot-scraper "<https://x.com/USER/status/ID>" -o "<draft_dir>/screenshots/twitter-NN-slug.png" --width 1200 --height 800 --wait 3000

# 微信公众号（加 --wait 绕过部分检测；部分文章会 page crash，属于已知限制）
shot-scraper "<https://mp.weixin.qq.com/s/ID>" -o "<draft_dir>/screenshots/wechat-NN-slug.png" --width 1200 --height 800 --wait 5000
```

**从已有的 superpowers-chrome 截图文件**也可以直接 `Copy-Item` 到 screenshots/。

**截图规则：**
- 文件名：`{platform}-{序号}-{slug}.png`（如 `web-01-addy-osmani-loop-engineering.png`）
- 没有 URL 的素材不伪造截图；截图只作证据和候选配图，不替代 md 正文
- Reddit 无 permalink 时先补 URL 再截；Twitter 优先截单条推文页面

## 文件结构

```
writing/wechat/drafts/YYYY-MM-DD-{topic-slug}/
├── twitter/     # 每条推文一个 md（完整 text + 作者 + metric + 时间 + 链接）
├── reddit/      # 每个帖子一个 md（完整 title + selftext + 作者 + subreddit）
├── web/         # 每篇文章一个 md（完整全文，maxCharacters ≥ 15000）
├── wechat/      # 每篇公众号一个 md（清洁后的完整正文）
└── screenshots/ # 每张截图 = {platform}-{序号}-{slug}.png
```

单文件头部模板：

```markdown
# [完整标题]
- **作者/来源**：xxx
- **发布时间**：xxx
- **原始链接**：xxx
- **关键数据**（如有）：likes / RT / views / bookmarks
- **抓取方式**：twitter search / rdt-cli / exa.web_fetch_exa
- **搜索轮次**：第 N 轮
---
[清洁后的正文全文]
```

## 概览汇报模板

四轮搜索后，按此格式汇报并**停下等用户发令**：

```
## [选题名] 搜索沉淀完成

### 素材总量
Twitter: X 条 | Reddit: X 条 | Exa: X 篇 | 微信公众号: X 篇 | 截图: X 张
素材目录: writing/wechat/drafts/YYYY-MM-DD-topic-slug/

### 核心事实摘要
1. （2-3 句纯事实：谁说了什么、什么时候、多火）
2. …

### 五维度覆盖
现象本身 [x] | 概念定义 [x] | 反对质疑 [x] | 理性论述 [x] | 生产案例 [x]

### 覆盖盲区
（有则列，无则"五个维度均已覆盖"）

---
素材沉淀完成。是否进入第 1 步 SCQA framing？
```

## Reference 文件

| 文件 | 何时读 |
|------|--------|
| `references/wechat-viral-logic.md` | **每次搜索前必读**——公众号爆款逻辑、流量分发机制、杂合类账号突围策略，指导搜索如何为爆款写作服务 |
| `references/platform-commands.md` | 需要具体平台命令参考时（Twitter/Reddit/Exa 完整参数说明） |
| `references/wechat-extraction.md` | 微信文章抓取遇到 CAPTCHA 时——逐级尝试 curl + UA 方法 |
| `references/quality-checklist.md` | 每轮搜索完成后——逐条验证内容质量和文件落盘位置 |
