# 四平台搜索命令参考

---

## Twitter/X

### 前置条件

```bash
source ~/.bash_profile  # 自动加载 TWITTER_AUTH_TOKEN 和 TWITTER_CT0
```

### 搜索

```bash
twitter search "<关键词>" -n 10 --json
```

参数说明：
- `-n 10`：返回条数（可调整，建议 10-15）
- `--json`：输出 JSON 格式（不要省略，方便后续解析字段）
- 支持中文关键词

### 输出字段

保留到 md 的关键字段：
- `text`：推文原文
- `author.name` / `author.screenName` / `author.verified`
- `createdAt` / `createdAtLocal`
- `metrics.likes` / `metrics.retweets` / `metrics.views` / `metrics.bookmarks`
- `urls`：推文中包含的链接
- `quotedTweet`：引用的推文
- `media`：图片/视频链接

丢弃：`id`（可选保留）、`lang`、`isRetweet`、`score`、`retweetedBy`

### 常用搜索模式

```bash
# 按话题
twitter search "<核心关键词>" -n 10 --json

# 按人物/账号（追源头）
twitter search "<人名> <话题>" -n 10 --json

# 反对/质疑声音
twitter search "<话题> criticism OR 质疑 OR overhyped" -n 10 --json
twitter search "why is <topic> bad" -n 10 --json

# 中文圈反应
twitter search "<话题中文译名>" -n 10 --json
```

---

## Reddit

### 前置条件

```bash
alias rdt='python -m rdt_cli'
# rdt-cli 已 pip 安装，已登录（~/.config/rdt-cli/credential.json）
```

### 搜索

```bash
python -m rdt_cli search "<关键词>" --limit 10 --json
```

参数说明：
- `--limit 10`：返回条数
- `--json`：JSON 输出
- 不支持中文（Reddit 本身英文为主）

### 输出字段

保留到 md 的关键字段：
- `title`：帖子标题
- `selftext`：帖子正文
- `author_fullname`：作者
- `subreddit` / `subreddit_name_prefixed`：所属子版块
- `created_utc`：创建时间
### 其他网页 / Reddit 帖子 / Medium 等

```bash
# 截图任意 URL（如果当前环境安装了 shot-scraper）
shot-scraper "<URL>" -o "<screenshots-path>/<filename>.png" --width 1200 --height 800
```

**截图规则：**
- 每完成一轮搜索的 md 文件写入后，立即对该文件的原始 URL 截图
- 优先使用当前可用的截图能力；`shot-scraper` 是推荐工具，但不是唯一依赖
- Twitter 推文：`https://x.com/{screenName}/status/{tweetId}`
- 公众号文章：`https://mp.weixin.qq.com/s/{articleId}`
- 网页/Substack/Medium：直接截 URL
- 截图文件名使用 `{platform}-{md文件名去扩展名}.png`
- 截图保存在 `screenshots/` 子目录下


### 常用搜索模式

```bash
# 话题搜索
python -m rdt_cli search "<核心关键词>" --limit 15 --json

# 追特定子版块（如果第 1 轮搜到了相关子版块，第 2 轮直接拉）
python -m rdt_cli search "subreddit:<子版块名> <关键词>" --limit 10 --json
```

---

## Exa 全网搜索

### 前置条件

```bash
# Exa 已通过 mcporter 注册，免费无需 API Key
# 直接调用
```

### 搜索（web_search_exa）

```bash
mcporter call 'exa.web_search_exa(query: "<自然语言搜索词>", numResults: 15)'
```

参数说明：
- `query`：支持自然语言，不是关键词。例如 "loop engineering AI agent self-improvement orchestration 2026" 比 "loop engineering" 精确
- `numResults`：建议 15（比 Twitter/Reddit 多，因为覆盖面更广）

### 全文抓取（web_fetch_exa）

```bash
mcporter call 'exa.web_fetch_exa(urls: ["<URL1>", "<URL2>"], maxCharacters: 10000)'
```

参数说明：
- `urls`：数组，最多一次 5-10 个 URL
- `maxCharacters`：单篇文章最大字符数，建议 8000-10000
- 适合抓取：Substack 长文、技术博客、36kr、微信公众号文章（Exa 可穿透微信 CAPTCHA）

### 常用搜索模式

```bash
# 第一轮：关键词搜索
mcporter call 'exa.web_search_exa(query: "<话题> <相关领域> 2026", numResults: 15)'

# 第二轮：追特定来源
mcporter call 'exa.web_search_exa(query: "<话题> <关键人物名> <关键项目名>", numResults: 10)'

# 第三轮：反对/质疑 + 深度
mcporter call 'exa.web_search_exa(query: "<话题> critique problem limitation", numResults: 10)'

# 第四轮：学术/论文/开源
mcporter call 'exa.web_search_exa(query: "<话题> paper github framework architecture", numResults: 10)'

# 微信公众号限定搜索
mcporter call 'exa.web_search_exa(query: "site:mp.weixin.qq.com <中文关键词>", numResults: 10)'
```

### Exa vs Jina Reader

- **Exa** 可以穿透微信公众平台 CAPTCHA，读微信公众号全文
- **Jina Reader**（`curl -s "https://r.jina.ai/URL"`）无法读微信文章（被 CAPTCHA 拦截）
- 一般网页两个都可以，但 Exa 的 `web_fetch_exa` 返回清洁度更高

---

## 微信公众号

微信公众号文章通过 Exa 搜索和抓取。

### 搜索公众号文章

```bash
mcporter call 'exa.web_search_exa(query: "site:mp.weixin.qq.com <中文话题关键词>", numResults: 10)'
```

### 抓取公众号全文

```bash
mcporter call 'exa.web_fetch_exa(urls: ["https://mp.weixin.qq.com/s/<ARTICLE_ID>"], maxCharacters: 10000)'
```

### 清洁规则

公众号全文通过 Exa 抓回后，去除以下 UI 噪声文本：
- `在小说阅读器中沉浸阅读` / `在小说阅读器读本章` / `去阅读`
- `Scan to Follow` / `Scan with Weixin to use this Mini Program`
- `继续滑动看下一个` / `轻触阅读原文` / `向上滑动看下一个`
- `预览时标签不可点` / `Got It`
- `× 分析` / `Comment` / `写留言:`
- `谢谢你看我的文章` / `#AI #Agent #XXX`（文末 hashtag）
- `>/ 作者：xxx` → 保留作者名，去掉 `>/ ` 前缀
- `>/ 投稿或爆料，请联系邮箱：xxx` → 去掉

保留的清洁字段：文章标题、作者（公众号名称）、发布日期、文章正文 Markdown。
