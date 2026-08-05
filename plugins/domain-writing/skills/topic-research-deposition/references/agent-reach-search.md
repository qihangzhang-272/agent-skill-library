# Agent-Reach Search Policy

Use this reference whenever a research mode needs external search or platform access.

## Default Tool

Use `agent-reach` as the default reach layer for search, browsing, platform access, and source discovery.

多后端平台（小红书/Reddit/B站/Twitter 等）先跑 `agent-reach doctor --json`，按各平台 `active_backend` 选命令组；agent-reach 不可用或不覆盖时才 fallback（见下方 Fallback Policy）。

Treat platform names as agent-reach surfaces, not separate workflow nodes:

- Twitter / X
- Reddit
- Exa / general web
- 微信公众号
- GitHub
- Hacker News
- YouTube
- podcasts
- papers / research pages
- product docs and changelogs

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
| `quick` | User needs orientation or a small fact check | 3-5 high-quality sources |
| `standard` | Default research depth | 8-15 sources across 2-4 surfaces |
| `deep` | Writing, product analysis, or investment work | 15+ sources, opposing evidence, primary docs, screenshots where useful |

## Deposition Rules

- Save source material before analysis.
- Keep platform/source metadata: title, author, date, URL, capture method, metrics when available.
- Preserve full text or the full relevant excerpt. Do not replace source deposition with bullet summaries.
- Mark source status: `full`, `partial`, `metadata-only`, or `failed`.
- Record exact queries or agent-reach search intents so the run is reproducible.

## Fallback Policy

Use direct commands from `platform-commands.md` only when:

1. agent-reach is unavailable.
2. agent-reach cannot access a required surface.
3. agent-reach returns partial data and direct fetch is needed for completeness.
4. The user explicitly asks to use a specific command.

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
- The research obligation is complete; this internal method never decides the next Skill.

This search method never invokes another Skill. In the managed investment workflow it returns its evidence to `topic-research-deposition`, which writes `01-source-intake.md` without adding an extra approval pause.
