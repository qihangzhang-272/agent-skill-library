---
name: impeccable-index
description: Use when evaluating, installing, or invoking the Impeccable frontend design skill from this library. This wrapper points to the vendored upstream core archive and explains the runtime path constraints before an agent runs Impeccable scripts.
---

# Impeccable Index

This is a wrapper and index for `pbakaus/impeccable`. It is not a path-patched fork of the upstream runtime.

Use this wrapper when a project needs one of these Impeccable capabilities:

- frontend design critique, audit, polish, or redesign
- UI anti-pattern detection
- design system extraction and hardening
- live browser iteration for local frontend surfaces
- high-craft product UI, dashboard, landing page, component, form, onboarding, or empty-state work

## Local Archive

The upstream agent-compatible core is preserved at:

`upstream/.agents/skills/impeccable/`

Read the archived upstream `SKILL.md` and command references when you only need guidance.

## Runtime Boundary

The upstream skill expects scripts to live at one of its official install locations, especially:

`node .agents/skills/impeccable/scripts/context.mjs`

Do not run the archived scripts from this library path as if they were already installed in a target project. Before running Impeccable scripts, install or copy the upstream core into the expected project-level path, then run the commands from the target project root.

Recommended runtime options:

1. Use the upstream installer or marketplace flow documented by `pbakaus/impeccable`.
2. Copy this archived core into the target project's `.agents/skills/impeccable/`.
3. If using Claude-specific paths, use the upstream Claude package rather than silently rewriting this archive.

## Risk Notes

Treat Impeccable as a medium-risk executable skill:

- it includes Node scripts, local server/browser tooling, and file-editing workflows
- its context script checks the upstream update endpoint by default
- live copy-edit flows may pass through Claude/Anthropic credentials already available in the user's environment
- several commands can modify project files

Use it for deliberate frontend work, not as a passive prompt reference.

## Handoff Output

When routing an agent to Impeccable, include:

- the target project path
- the desired Impeccable command or mode
- whether the upstream core is already installed at `.agents/skills/impeccable/`
- whether live browser tooling is allowed
- the acceptance criteria for the resulting frontend changes
