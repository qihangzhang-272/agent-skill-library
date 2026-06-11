---
name: topic-research-deposition
description: >
  公众号写作第 0 步——跨平台选题搜索与原始素材沉淀。当用户提到"搜一下选题"、"开始搜索"、"第 0 步"、"选题搜索"、"帮我搜一下 XX"、"看看 XX 话题"、"素材沉淀"或"补截图"时触发。在四个平台（Twitter/X、Reddit、Exa 全网、微信公众号）并行执行 3-4 轮递进搜索，将原始素材按平台归档为 md 文档，并截图留证。不做信息消化或预判。搜索完成后做概览汇报，等待用户发令才进入下一步。
---

# 选题搜索与素材沉淀

公众号写作流程的第 0 步。只做信息搜集和沉淀，不做提炼或预判。第 1 步 SCQA framing 由 `qihang-writing-style` 接管。

## 核心原则

1. **只沉淀，不消化。** 保存原文全文，不写"这篇文章值得关注因为…"这类预判。
2. **最低限度清理。** 去除微信 UI 噪声，保留正文 + 作者 + 时间 + 链接 + 互动数据。
3. **全文拉取，禁止概括。** Exa 文章用 `maxCharacters: 15000` 以上拉取完整全文，禁止用 highlights/summary 代替，禁止用 `[...]` 省略。
4. **每篇单独一个 md。** 按平台建子文件夹，文件命名 `{序号}-{简短slug}.md`。
5. **截图留证。** 每条有 URL 的素材截一张 PNG，详见下方"截图流程"。
6. **3-4 轮递进搜索。** 每轮基于上一轮发现调整角度，五维度全盖则收手。
7. **概览汇报后停等。** 用户说"继续"/"进入 SCQA"之前绝不自动推进。

## 执行架构

所有搜索通过 `general-purpose` 子代理执行，主对话只调度、写文件、验证、汇报。

```
主对话（调度层）                 general-purpose（执行层）
  │                                    │
  ├─ 派发搜索指令 ───────────────────→│ twitter / rdt / mcporter / jina
  │← 返回原始内容 ───────────────────┤
  ├─ 写入 md + 验证                   │
  ├─ 截图（shot-scraper）             │
  ├─ 派发下一轮 ─────────────────────→│
```

**关键规则：**
- 每轮并行派 3-4 个 general-purpose，各平台互不等待
- agent 不写文件、不做选题判断——只返回原始内容
- 派发 prompt 必须嵌入两段硬约束（全文见 `references/agent-constraints.md`）：禁止概括 + 只用 agent-reach 通道
- 主对话不绕过 agent 搜。`WebSearch`/`WebFetch`/`Bash` 仅用于写文件、验证、截图

## 环境准备

每次搜索前自动加载（agent 需要的前置条件也写入任务说明）：

```bash
source ~/.bash_profile          # Twitter/X auth token
# Reddit: python -m rdt_cli
# Exa: mcporter call 'exa.web_search_exa(...)'
```

## 递进搜索策略

| 轮次 | 目标 | 方向 | 派发 |
|------|------|------|------|
| **1** | 现象全貌 | 话题核心关键词，中英文 | 4 agent 并行：Twitter / Reddit / Exa / 微信 |
| **2** | 火爆现象源头 | 追关键人物、账号、推文 ID、子版块，拉原文全文 | 追具体链接，exa.web_fetch_exa |
| **3** | 概念定义 + 反对质疑 | "XX 是什么"、"质疑 XX"、反对声音、社区批评，中英文 | 搜批评/质疑/替代概念 |
| **4** | 理性论述 + 开源项目 | 深度技术博客、论文、GitHub、生产案例 | 搜 GitHub/论文/生产实践 |

**收手标准——五维度覆盖：**
- [ ] 现象本身（有什么？谁在说？多火？）
- [ ] 概念定义（这东西到底是什么？从哪来的？）
- [ ] 至少一条反对/质疑声音
- [ ] 至少一条理性系统论述
- [ ] 至少一个生产案例或开源项目

每轮搜索完立即将结果写入对应 md。平台命令细节见 `references/platform-commands.md`。

## 截图流程

**每完成一轮搜索的文字沉淀后**，对该轮所有有 URL 的素材截图。

**唯一推荐工具：`shot-scraper`**（底层 Playwright，比浏览器 MCP 快）。

```bash
# 基本格式
shot-scraper "<URL>" -o "<screenshots-path>/<filename>.png" --width 1200 --height 800

# Twitter/X 推文（加 --wait 等待动态加载）
shot-scraper "<https://x.com/USER/status/ID>" -o "<screenshots-path>/twitter-NN-slug.png" --width 1200 --height 800 --wait 3000

# 微信公众号（加 --wait 绕过部分检测；部分文章会 page crash，属于已知限制）
shot-scraper "<https://mp.weixin.qq.com/s/ID>" -o "<screenshots-path>/wechat-NN-slug.png" --width 1200 --height 800 --wait 5000
```

**从已有的 superpowers-chrome 截图文件**也可以直接 `Copy-Item` 到 screenshots/。

**截图规则：**
- 文件名：`{platform}-{md文件名去扩展名}.png`（如 `web-01-addy-osmani-loop-engineering.png`）
- 没有 URL 的素材不伪造截图；截图只作证据和候选配图，不替代 md 正文
- Reddit 无 permalink 时先补 URL 再截；Twitter 优先截单条推文页面

## 文件结构

```
writing/wechat/drafts/YYYY-MM-DD-{topic-slug}/
├── twitter/     # 每条推文一个 md（完整 text + 作者 + metric + 时间 + 链接）
├── reddit/      # 每个帖子一个 md（完整 title + selftext + 作者 + subreddit）
├── web/         # 每篇文章一个 md（完整全文，maxCharacters ≥ 15000）
├── wechat/      # 每篇公众号一个 md（清洁后的完整正文）
└── screenshots/ # 每张截图 = {platform}-{md文件名}.png
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
| `references/platform-commands.md` | 需要具体平台命令参考时（Twitter/Reddit/Exa 完整参数说明） |
| `references/agent-constraints.md` | 派发 general-purpose 前——复制约束模板到 prompt |
| `references/wechat-extraction.md` | 微信文章抓取遇到 CAPTCHA 时——逐级尝试 curl + UA 方法 |
| `references/quality-checklist.md` | agent 返回后——逐条验证内容质量 |
