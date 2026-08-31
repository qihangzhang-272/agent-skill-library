# Acquisition Modes

## 先写采集契约

开始前把以下内容写进 run manifest：

- 目标账号、主页线索或 URL 列表
- `known-url-batch` / `account-history`
- 日期起止、每账号最大条目数、是否只保留显式标记原创的文章
- 正文、HTML、图片等需要的字段
- 私人研究、内部对标或已获授权归档等用途
- 实际使用的适配器、版本或 endpoint

用户未指定账号历史范围时，默认每账号最近 30 个文章条目。不要把“抓全量”当作隐含默认值。

## Runtime Configuration And Probe

`wechat-article-exporter` 不随本技能打包。运行前从 `external-skill-index` 解析当前上游，再由以下运行时配置提供实例：

- `WECHAT_ARTICLE_EXPORTER_BASE_URL`：用户认可的公开实例或自托管实例，优先使用。未设置时只能从当前上游官方文档解析其公开实例，并在调用前说明；不得静默猜测第三方 endpoint。
- `WECHAT_ARTICLE_EXPORTER_AUTH_KEY`：仅账号搜索/历史接口需要，由用户在上游完成登录后放入当前进程环境；不得回显或落盘。
- `WECHAT_ARTICLE_EXPORTER_API_TOKEN`：可选，只在实例当前文档要求会员/速率 token 时使用；不得回显或落盘。

按以下 HTTP contract 探测，不新增仓库脚本：

| 能力 | 请求 | 验收 |
| --- | --- | --- |
| API 可达 | `GET {base}/api/public/v1/memberinfo` | HTTP 200 且返回 JSON；`notfound` 只表示没有 API token，不代表服务不可达。 |
| 已知 URL 正文 | `GET {base}/api/public/v1/download?url={encoded_url}&format=html` | HTTP 200、非空 HTML，且存在 `#js_article` 与 `#js_content`；公共实例可能按 IP 严格限速。 |
| 账号搜索 | `GET {base}/api/public/v1/account?keyword={encoded}&begin=0&size=5` + `X-Auth-Key` | `base_resp.ret == 0`，候选账号含可验证标识。 |
| 历史页 | `GET {base}/api/public/v1/article?fakeid={encoded}&begin=0&size=20` + `X-Auth-Key` | `base_resp.ret == 0` 且 `articles` 为数组。 |

若配置了 API token，只通过 `X-Api-Token` header 传递。默认请求 HTML 后在本地规范化；除非实例当前文档与探测明确允许，不假设公共 endpoint 可直接返回 Markdown/JSON。

环境变量必须对实际执行请求的进程可见；在另一个终端临时设置变量不会自动注入已经运行的 Agent。不可见时不要让用户把秘密贴进聊天，改用用户自行导出，或由用户重启已配置环境的执行进程。

选择该 exporter 适配器正式批量前必须做 smoke run：API 可达 + 一篇用户目标 URL；`account-history` 还需完成一次账号搜索与一页历史列表。把结果记录为 `probe-only`、`known-url-verified` 或 `account-history-verified`。任一验收失败时不得声称对应批量抓取能力可用；可以改为接收用户导出，但必须记录 `input_origin=user-provided-export`，并在文件可读、账号归属和最小字段校验通过后标记 `verification=import-validated`。

## Mode A: Known URL Batch

适用于用户直接提供 URL、文本清单、CSV 或 JSON 清单。

1. 先规范化并去重 URL，保留原始输入位置。
2. 使用当前环境中可用的只读网页/微信文章提取能力；记录实际适配器，不声称使用了未调用的工具。
3. 每个 URL 单独记录 `full`、`partial`、`metadata-only` 或 `failed`。
4. 遇到 CAPTCHA、登录墙或限流时停止重试并记录缺口，不绕过平台检查。

该模式不需要微信登录，也不能因为批量处理而请求 cookie、token 或 auth-key。

## Mode B: Account History

适用于对标账号历史、最近 N 篇、日期区间或原创内容集合。

首选外部运行时为 `wechat-article-exporter`。通过 `external-skill-index` 解析当前来源、许可证和核验版本；本技能不重复维护 URL 或 commit。

执行顺序：

1. 探测当前环境是否已有该运行时、其自托管实例或用户认可的公开服务。
2. 若不可用，说明三个选项：安装上游、自托管、或由用户在上游网页完成导出后把结果交给本技能。未经请求不自动安装。
3. 若上游要求公众号后台登录、扫码或选择账号，把这一步交给用户完成；Agent 不接收或回显秘密字段。
4. 导出后先保存原始文件，再按本技能的 corpus contract 规范化。
5. 过滤日期、作者、合集或原创标记时，保留过滤前后计数和筛选条件。

分页时 `size` 不得超过 20，`begin` 按请求的 `size` 递增；一条发布消息可能展开成多篇文章。达到日期/数量上限、返回空数组、连续失败或授权失效时停止。对每个文章 URL 再走正文下载与本地规范化，不把历史列表元数据误当完整 corpus。

公开服务的免费额度、稳定性和数据处理条款可能变化；每次运行应读取当前上游说明，不能把历史额度写成保证。

## 多账号对标

- 每个账号保持独立目录、manifest 和失败列表，不先合并再猜来源。
- 账号别名与可验证标识分开保存；同名账号不能仅凭名称合并。
- 先完成各账号覆盖报告，再由研究 owner 比较选题、叙事、频率或内容机制。
- 语料数量不是账号表现；本技能不根据文章数生成优劣结论。

## 不支持的增强模式

阅读量、点赞、转发、收藏、评论和回复通常需要短期凭据、代理或证书。本技能不启动这条路径，不将其混入普通对标抓取。如果用户明确需要，应先单独评估数据归属、上游许可证、账户授权和设备风险，再决定是否另立受控任务。
