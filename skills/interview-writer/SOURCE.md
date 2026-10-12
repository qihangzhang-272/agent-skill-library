# Source

- Origin: https://github.com/ArcBlock/agent-skills
- Upstream path: plugins/content-creation/skills/interview-writer
- Upstream commit: 9f4b98d5ea072e33ef4b1d66051fd5e335b293fe
- Captured: 2026-10-03
- Relation: complete upstream skill snapshot; SKILL.md and all four reference files retained byte-for-byte. The repository's original MIT LICENSE is also retained.
- License: MIT, Copyright (c) 2025 ArcBlock.
- Local additions: this provenance record only; it contains no replacement interview or writing instructions. Collaboration and routing are defined in modes/creator-studio/MODE.md and mode.yaml.
- Reviewed: all five upstream skill files and LICENSE. No executable scripts, package installation, credential access or network transmission are required by this package. Upstream instructions include optional private profile loading and automatic global profile updates; Creator Studio applies the user's explicit project boundary instead.
- Evidence: feedback/2026-10-03-creator-studio-interview-workflow.md; the five original files were checked against the pinned Git blob hashes and local SHA-256 values.
- Runtime: the current Agent reads the Markdown instructions and references. No upstream plugin hooks, setup scripts or unrelated repository skills are installed.
- Update practice: review the pinned upstream diff before adopting another snapshot; keep the upstream package unchanged and organize user-specific behavior only in the Mode.
