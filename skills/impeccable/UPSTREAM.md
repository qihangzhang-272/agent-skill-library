# Impeccable Upstream Record

Source: https://github.com/pbakaus/impeccable

- Captured commit: `1aedbcf538e3fa6694ccbf00294cc18e59ba1f21`
- Commit time: `2026-06-05 18:11:15 -0700`
- Commit message: `Add Git submodule skill linking`
- License: Apache-2.0
- GitHub stars at review: `36057`
- Local package: `skills/impeccable/`

## Migrated Scope

- `upstream/.agents/skills/impeccable/`
- `README.md`
- `LICENSE`
- `NOTICE.md`
- local wrapper `SKILL.md`

## Excluded Scope

- `.claude/`
- `.claude-plugin/`
- `.cursor/`
- `.gemini/`
- `.kiro/`
- `.opencode/`
- `.pi/`
- `.qoder/`
- `.rovodev/`
- `.trae/`
- `.trae-cn/`
- `cli/`
- `demos/`
- `docs/`
- `extension/`
- `functions/`
- `plugin/`
- `site/`
- `tests/`
- `tools/`

## Vetting Result

Risk level: `medium`

Reason:

- The core skill includes executable Node scripts and live browser tooling.
- The context script checks `https://impeccable.style` by default unless overridden.
- Some flows can read and modify project files.
- Live copy-edit support can forward credentials already present in the local environment.

No direct credential harvesting or destructive shell behavior was detected in the reviewed subset, but this is not a prompt-only skill. Use the wrapper to route agents to the official install path before running scripts.
