---
name: pursue-goal
description: Use when the user gives a short outcome rather than naming Skills, asks for an end-to-end result in a complex scenario, or expects the current Codex App or Claude Code session to keep improving the work until the scenario Benchmark is met.
---

# Pursue Goal

Turn the user's outcome into continuous work by the current visible Host. Do not turn this Skill into a background planner, dispatcher, or state machine.

## Start From The Goal

1. Preserve the user's original Goal. Resolve references such as “这个主题” from the current conversation and Case files; ask only when the missing choice would materially change the result and cannot be discovered safely.
2. Read the Personal Workspace Profile and match the Goal against active scenario Skill descriptions. When one scenario covers the outcome, load that scenario Skill, its minimal Workflow, and the Benchmark it routes.
3. If no scenario fully matches, compose the smallest temporary sequence from already adopted local Skills in the current Host context. Do not create a permanent Workflow merely to start, and do not use an unlocalized external capability.
4. Start one Harness Run with the original Goal when a stable scenario exists. Missing inputs or an empty Goal field are reminders, never execution gates.

## Execute End To End

1. Execute each selected complete Skill in order. Load the current Skill package only when it becomes responsible; do not preload the whole chain or split a Skill into Prompt, MCP, Agent, API, Review, or handoff nodes.
2. Require the same `## 完成标准` whether the Skill runs alone or inside a Workflow. Write its complete independent Artifact before continuing.
3. Use normal conversation continuity and current Case files. Do not build a second context store, event stream, attempt log, or per-Skill dispatcher.
4. Evaluate the final result against the scenario Benchmark evidence. Benchmark work stays inside the scenario Skill and Case internals; user-facing articles, reports, and visuals contain business language only.
5. When a criterion fails, return to its Owner Skill, rewrite the same Artifact, and revisit only the affected later Skills. Continue while one concrete executable change is reasonably likely to improve the failed criterion.

## Capability Gaps

When an actual missing capability blocks a criterion:

1. name the gap precisely;
2. use `discover-capability` in the required order—Workspace, maintained Agent Skill Library, local candidates/upstreams, then internet;
3. use `cultivate-skill` to create a complete local Trial before calling it;
4. allow a verified Trial to serve the current Case, but do not silently adopt it or rewrite the stable Workflow.

Never call a remote Skill, Prompt, MCP, Agent, API, model, script, or service directly in the middle of the chain.

## Stop Honestly

Deliver the best executable result when any of these is true:

- all Benchmark criteria have adequate evidence;
- the remaining action needs a Secret, external write, purchase, or high-risk permission the user has not granted;
- a fact remains unavailable after reasonable work, and its impact and conservative treatment are stated;
- no evidence-backed next change is likely to improve the failed criterion.

Unavailable work is not success, but it is also not a deadlock. Keep the limitation visible and continue every unaffected part. Request confirmation immediately before an external publish or other consequential action, not before ordinary local work.

## 完成标准

- The user's original outcome remains the Goal, without being replaced by a process checklist.
- One matching scenario Skill was used, or the smallest temporary chain used only adopted local Skills.
- The current Host executed complete Skills and independent Artifacts without a second scheduler or context system.
- Every claimed Benchmark pass has evidence; every miss maps to an Owner Skill, an honest limitation, or a necessary permission.
- A capability gap entered Candidate and local Trial stages before use; no remote capability was called naked.
- Rework changed the responsible Artifact and affected downstream work instead of adding a Review node or retry state.
- The final delivery is readable to the user and omits Harness, provenance, node, and internal Benchmark jargon unless the user asks for implementation details.
