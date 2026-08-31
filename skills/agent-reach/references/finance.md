# 股票行情与社区（雪球）

雪球（xueqiu.com）- A股/港股/美股实时行情、股票搜索、热帖、热股排行。

需要登录 Cookie。`agent-reach doctor` 查看状态；未安装时运行 `agent-reach install --channels xueqiu`，Cookie 写入 `~/.agent-reach/config.yaml` 的 `xueqiu_cookie` 键。

## Python API

```python
from agent_reach.channels.xueqiu import XueqiuChannel

ch = XueqiuChannel()

# 实时行情（symbol: SH600519 沪 / SZ000858 深 / AAPL 美 / 00700 港）
q = ch.get_stock_quote("SH600519")
# -> symbol, name, current, percent, chg, high, low, open, last_close,
#    volume, amount, market_capital, turnover_rate, pe_ttm, timestamp

# 搜索股票（代码或中文名）
results = ch.search_stock("茅台", limit=3)
# -> [{symbol, name, exchange}, ...]

# 热门帖子
posts = ch.get_hot_posts(limit=20)
# -> [{id, title, text, author, likes, url}, ...]

# 热门股票排行（stock_type: 10=人气榜, 12=关注榜）
hots = ch.get_hot_stocks(limit=10, stock_type=10)
# -> [{symbol, name, current, percent, rank}, ...]
```

## symbol 格式

| 市场 | 格式 | 示例 |
| --- | --- | --- |
| 沪市 | SH + 6位代码 | SH600519（贵州茅台） |
| 深市 | SZ + 6位代码 | SZ000858（五粮液） |
| 港股 | 5位代码 | 00700（腾讯） |
| 美股 | 股票代码 | AAPL（苹果） |

## 注意事项

> **Cookie 必须**：雪球 API 需要登录 Cookie（关键 token 是 `xq_a_token`）。Cookie 过期后需重新登录雪球并更新 `~/.agent-reach/config.yaml` 的 `xueqiu_cookie`。

> **行情延迟**：实时行情有短暂延迟，非交易所直连。用于投研事实收集可以，不适合高频交易。

> **社区内容**：热帖是雪球社区观点，属市场情绪和叙事素材，不是投资结论。事实和观点要分开记录。
