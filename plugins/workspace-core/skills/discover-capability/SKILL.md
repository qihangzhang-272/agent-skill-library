---
name: discover-capability
description: Use when a Personal Workspace may lack a capability, when choosing between an adopted local Skill, the user's Agent Skill Library, an existing candidate, or an internet source, or when asked to find a Skill, MCP, Prompt, Agent, API, or other reusable capability for later adoption.
---

# Discover Capability

Find the smallest missing capability without bypassing the user's existing library or running unadopted code.

## Core Rule

Resolve capability sources in this order and stop at the first adequate layer:

1. active Skills and scenario Workflows in the target Personal Workspace;
2. the user's maintained `libraries/agent-skill-library/`;
3. that Workspace's candidates, trials, and registered local upstream repositories;
4. internet sources such as GitHub, Skill marketplaces, MCPs, Prompts, Agents, and APIs.

Popularity never overrides fit, provenance, license, permissions, or script risk.

## Apply

1. State the concrete capability gap in one sentence. Do not search for a vague topic when an existing Skill already covers the required outcome.
2. Identify the target Personal Workspace. If none exists, return that `initialize-workspace` is required; do not write into the global Library as a substitute.
3. Inspect Workspace Skill descriptions and scenario entries. If an adopted Skill covers the gap, return it and stop.
4. Inspect the maintained Agent Skill Library by Skill description, package content, Plugin, reference chain, and current Git commit. If it covers the gap, create a Workspace candidate pointing to that exact Library package and stop before internet search.
5. Inspect existing candidates, trials, and registered upstream sources. Reuse a matching record instead of duplicating it.
6. Only when all local layers are insufficient, search external sources. Compare the complete package, maintenance state, license, dependencies, scripts, permissions, and actual fit; stars and marketing claims are weak signals.
7. Write one candidate to `<workspace>/candidates/<candidate-id>/CANDIDATE.md`. Preserve source URLs or repository, exact path, version or commit when available, license, proposed relation (`import`, `fork`, `wrap`, or `absorb`), risks, the unresolved gap, and a realistic trial request.
8. Return the candidate path and hand the next action to `cultivate-skill`. Do not install, execute, activate, project, or add the candidate to a stable Workflow.

## Candidate Boundary

A candidate is evidence about a possible capability, not a local Skill. External Skill, MCP, Prompt, Agent, API, model, script, or command becomes callable only after `cultivate-skill` turns it into a complete local Trial Skill.

Personal candidates stay in the Personal Workspace. Update the global Agent Skill Library only when the user separately asks to maintain or distribute the Library itself.

## Unable To Find

After reasonable searches, record what was checked and why it was inadequate. Return the best adopted local alternative and the remaining gap so `pursue-goal` can continue honestly instead of deadlocking.

## 完成标准

- The target Workspace and concrete capability gap are explicit.
- All four source layers were considered in order, with no unnecessary internet search after an adequate local hit.
- Any new candidate is stored only under the target Workspace and identifies an exact, inspectable source.
- License, executable dependencies, permissions, and material risks are stated or explicitly unknown.
- No candidate code or remote service was run, installed, projected, or inserted into a stable Workflow.
- The result names either an adopted Skill, one candidate for `cultivate-skill`, or an honest unresolved gap with a usable local fallback.
