# 微信文章抓取

微信公众号文章是特殊难点——exa、jina 都可能被 CAPTCHA 拦截。agent 被派发微信文章抓取任务时，**按以下优先级逐级尝试**，直到成功拿到完整正文。

| 优先级 | 方法 | 命令 | 适用情况 |
|--------|------|------|---------|
| 1 | exa.web_fetch_exa | `mcporter call 'exa.web_fetch_exa(urls: ["..."], maxCharacters: 15000)'` | 大部分普通文章可用；微信文章可能超时 |
| 2 | exa.web_search_exa 先搜 | `mcporter call 'exa.web_search_exa(query: "site:mp.weixin.qq.com 文章标题核心词", numResults: 5)'` 找到文章后，再用 `exa.web_fetch_exa` 拉全文 | 搜索可能返回同文章其他站点转载 |
| 3 | **curl + 移动端 UA** | 见下方完整流程 | 2026-06-11 验证有效，绕过微信环境检测 |

## 方法 3 完整流程（agent 可直接复制执行）

```bash
# 步骤1: 用移动端UA抓取HTML
curl -s --max-time 30 \
  -H "User-Agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36" \
  "https://mp.weixin.qq.com/s/ARTICLE_ID" \
  > /tmp/wechat_article.html

# 步骤2: 提取 js_content 正文
python3 -c "
import re, html
with open('/tmp/wechat_article.html', 'r', encoding='utf-8') as f:
    content = f.read()
m = re.search(r'id=\"js_content\"[^>]*>(.*?)</div>\s*<script', content, re.DOTALL)
if m:
    text = m.group(1)
    text = re.sub(r'<[^>]+>', '\n', text)
    text = html.unescape(text)
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    noise = ['Scan to Follow', '继续滑动看下一个', '轻触阅读原文',
             '预览时标签不可点', 'Got It', '在小说阅读器中沉浸阅读',
             'Scan with Weixin', '微信扫一扫', '关注该公众号']
    lines = [l for l in lines if not any(n in l for n in noise)]
    print('\n'.join(lines))
"
```

## 失败处理

**如果上述所有方法都失败**，agent 必须诚实返回每一步的失败原因，不得返回概括版 highlights。
