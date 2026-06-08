# Taste Skill Upstream Record

Source: https://github.com/leonxlnx/taste-skill

- Captured commit: `3c7017d636c3a4aad378433ea6d0cfa6c921da4a`
- Commit time: `2026-05-26 21:31:36 +0200`
- Commit message: `feat(skill): round-5 hardening from test-13/14/15 + test-16/17/18 (all Opus 4.7)`
- License: MIT
- GitHub stars at review: `38108`
- Local package: `skills/taste-skill/`

## Migrated Scope

- `skills/`
- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `skill.sh`

## Excluded Scope

- `.github/`
- `assets/`
- `examples/`
- `research/`

## Vetting Result

Risk level: `low`

Reason:

- The migrated core is mostly markdown skill content.
- Reviewed install command examples and external URLs are informational.
- No credential harvesting, destructive shell behavior, or hidden service dependency was detected in the migrated skill files.

Use the individual subskills from `skills/taste-skill/skills/` in frontend design pipelines.
