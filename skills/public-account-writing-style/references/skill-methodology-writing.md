# Skill Methodology Writing Notes

Use this reference when writing about Skills, agents, context engineering, prompt workflows, or writing-system design.

## Core Thesis To Preserve

Skill is not a long prompt. Skill is a context-engineering container.

The useful distinction:
- `SKILL.md` is the routing and navigation layer.
- `references/` holds details that should be loaded only when needed.
- `scripts/` holds repeated deterministic work.
- `examples/` holds patterns and comparisons.
- `assets/` holds templates and reusable materials.
- `description` is a routing rule, not a feature brochure.
- `gotchas` are often more valuable than generic instructions.

## Good Skill Writing Angle

When explaining Skills, avoid generic praise.

Bad:
"Skill 可以提升效率，沉淀组织能力，打造更智能的工作流。"

Better:
"如果一个支付排障 Skill 每次都让模型重新写 SQL，那这个 Skill 只是把流程写长了。真正该沉淀的是两类东西：为什么 Stripe 返回 200 还不能算成功，以及 check_payment_events 这种已经验证过的查询脚本。"

## Useful Contrasts

Use these contrasts when helpful:
- Instructions provide judgment; scripts provide execution.
- References save context; pasted long rules consume context.
- Description routes the skill; SKILL.md teaches the first move.
- Gotchas capture the old hands' memory; generic best practices waste space.
- Marketplace should follow usage proof, not heavy approval first.

## Anti-Patterns To Call Out

- Putting a full style guide and many examples directly into `SKILL.md`.
- Writing descriptions like product marketing copy.
- Treating every workflow step as instructions instead of scripting repeatable parts.
- Building a large official skill library before testing whether anyone actually uses the skills.
- Using writing skills to imitate surface tone while weakening analysis.

## Preferred Article Shape

1. Start with a concrete tension or question about Skills/workflows — not a polished thesis.
2. Admit the common misunderstanding.
3. Show why the misunderstanding fails in practice — use a specific gotcha or failure.
4. Introduce a better distinction.
5. Use one concrete example to ground the distinction.
6. Turn the distinction into a reusable rule.
7. End by reopening — what does this mean for the next thing we build? Where does this distinction break?

This shape should feel conversational, with self-interruption where the obvious answer falls short. Never let a "simple answer" about Skills stand unchallenged. The point is not to promote Skills — the point is to help the reader understand when Skills work, when they fail, and how to think about the boundary.
