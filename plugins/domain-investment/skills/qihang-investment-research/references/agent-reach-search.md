# Agent-Reach Search Policy

Use this reference whenever the investment fact pack needs external search or platform access.

## Default Tool

Use `agent-reach` as the default reach layer for search, browsing, platform access, and source discovery.

Treat platform names as agent-reach surfaces, not separate workflow nodes:

- GitHub (OSS 真实性、star/fork/活跃度、commit 历史、license)
- company 官网 / product docs / changelog
- 工商信息 / 天眼查 / 企查查类企业核验
- 招投标 / 招采公告（客户与订单真实性）
- 公众号 / 知乎（行业、技术叙事、口碑）
- 抖音 / 小红书 / 微博 / B站（案例、素材、终端证据）
- LinkedIn（团队背景核验）
- Reddit / X (Twitter)（海外口碑、技术讨论）
- YouTube / 播客（demo、创始人访谈）
- Exa / general web（融资新闻、行业报告、市场规模）
- papers / research pages（技术真实性、算法可证伪点）

## Search Shape

For each research run, define:

```text
Research question:
Mode:
Must-cover surfaces:
Optional surfaces:
Do-not-search surfaces:
Depth:
Stop condition:
```

Depth options:

| Depth | Use When | Expected Coverage |
| --- | --- | --- |
| `quick` | 单点事实核验或工商核验 | 3-5 high-quality sources |
| `standard` | 默认投资调研深度 | 8-15 sources across 2-4 surfaces |
| `deep` | IC memo、尽调、或叙事存疑需多方证伪 | 15+ sources，含反面证据、一手文档、必要截图 |

## Deposition Rules

- Save source material before analysis.
- Keep platform/source metadata: title, author, date, URL, capture method, metrics when available.
- Preserve full text or the full relevant excerpt. Do not replace source deposition with bullet summaries.
- Mark source status: `full`, `partial`, `metadata-only`, or `failed`.
- Record exact queries or agent-reach search intents so the run is reproducible.
- 区分「材料/BP 披露」与「外部调研核验」，外部事实在 fact pack 里标注来源渠道与 URL，未找到的标 `not found`。

## Fallback Policy

Use direct platform commands or plain web search only when:

1. agent-reach is unavailable.
2. agent-reach cannot access a required surface.
3. agent-reach returns partial data and direct fetch is needed for completeness.
4. Qihang explicitly asks to use a specific command.

When falling back, record:

```text
Fallback reason:
Fallback tool:
Command or method:
Result status:
```

## Stop Rules

Stop and report coverage when:

- The research question is answered with enough source diversity.
- Required surfaces have been covered or explicitly failed.
- Further search is producing duplicates.
- The next step belongs to another skill, such as `qihang-ai-product-judgment`, `qihang-competitive-landscape`, or `qihang-investment-dd`.
