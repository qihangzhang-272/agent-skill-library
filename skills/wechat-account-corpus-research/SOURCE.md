# Source

- Origin: https://github.com/qihangzhang-272/agent-skill-library
- Source path: plugins/domain-writing/skills/wechat-account-corpus-research
- Commit: a5389a4f9a9b7e01cdb878e3445069b71e7e908a
- Relation: migrated from GitHub latest upstream into this Environment
- License: inherit from the user-owned Agent Skill Library repository
- Local changes: completion standards are embedded in SKILL.md; legacy sidecars and upstream schedulers are not imported.

## Runtime dependencies

- Optional runtime: `wechat-article-exporter` — https://github.com/wechat-article/wechat-article-exporter ; kept external, not bundled.
- Historical verification: 2026-08-04, commit `47da63edfd5c7e7aabaf44c96faf88e0f6b8290f`; the archived source record reported MIT and a successful public API / known-URL HTML probe. Account-history access still required a separate authorized login and probe.
- Record origin: recovered from this library's archived source index; not reverified in this cleanup. Check the current upstream license, documentation, and actual instance before use; a historical probe is not a readiness guarantee.
- Setup and probe: see `references/acquisition-modes.md`. Keep credentials in the host/process environment, not in this file.
