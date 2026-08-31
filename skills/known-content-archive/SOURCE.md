# Source

- Origin: local clean-room design for ASL business Environments.
- Designed: 2026-08-31.
- Research sample: `mcncarl/yichen-skills/yichen-content-archive` at commit `259c3f322d939fb2d7aa10b5d79652e18b3b6034` was used only to identify the business need for separating known-content archiving from open discovery.
- Relation: independent functional reconstruction.
- Copied material: none. No upstream prompts, scripts, routing tables, tests, assets, names, or implementation structure are included.
- Runtime dependencies: Python standard library; retrieval remains the responsibility of the current Host and installed local retrieval Skills.
- Local design choices: immutable per-item packages, deterministic hashes, no network code, no cross-platform router, and explicit separation between retrieval and archiving.
