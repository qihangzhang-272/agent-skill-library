# Product -> Frontend Design

Use when the user asks to turn product analysis, a PRD, or a rough idea into a frontend brief, HTML page, prototype, or target-project implementation.

## Chain

```text
product / PRD input
-> clarify user, business action, page type, states, data
-> ai-product-analyzer when product judgment is needed
-> frontend self-generation or target-project implementation
-> browser verification
```

## Rules

- Do not run investment nodes unless the user asks for investment judgment, IC memo, DD, or worth-investing analysis.
- Use `qihang-skill-index` only to inspect external frontend references. Do not mechanically chain TypeUI, shadcn, Ant Design, Taste, or other sources.
- Prefer frontend self-generation under the frontend constitution when the user asks for a visual report or HTML page.
- Use the target project's stack when a target project exists; otherwise default to one static HTML/CSS artifact.
- Browser-check desktop and mobile before claiming done.

## Frontend Constitution

- Modern, calm, information-dense, and task-oriented.
- Core content should be expanded, not hidden in tabs, accordions, or nested cards.
- Use full-width sections, tables, score strips, timelines, matrices, and simple logic diagrams.
- Text must not overflow or overlap on desktop or mobile.
- Preserve upstream product/report content; frontend may visualize and organize, not delete substantive findings.

## Minimum Handoff

```text
Product / PRD input:
Page type:
Information architecture:
Design source, if any:
Frontend approach:
Artifact path:
Browser verification:
```
