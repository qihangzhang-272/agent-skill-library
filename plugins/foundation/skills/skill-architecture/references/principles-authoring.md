# 维护 principles

principles 是启航的个人操作手册，采用「认知原型 + DO / DON'T / CALIBRATION」结构。

> 结构归属：principles 的 SKILL.md **不套** `assets/skill-template/` 的六段式，直接用「认知原型 + DO / DON'T + CALIBRATION」三段。它是 skill-template 的例外--principles 是被动参考库不是可执行技能，六段式不适用。

SKILL.md 骨架（含 frontmatter）：

```markdown
---
name: principles
description: >-
  Use when a workflow or skill needs to align with personal operating
  preferences: how to think, communicate, handle uncertainty, avoid empty output.
  Passive reference library, not a global rule.
---

# Principles -- 个人操作手册

## 认知原型
<面对新任务时的思考方式>

## DO
- <可执行、可检验的偏好>

## DON'T
- <要避免的行为>

## CALIBRATION
- <何时信自己、何时不要盲从>
```

## 定位

- 被动参考库：只有当某个 workflow/skill 需要对齐启航的思考、交付、审美或不确定性处理偏好时才读取。
- 不是全局强制规则：不要把所有任务都变成 principles 驱动。
- 不写身份宣言：写可执行、可检验的偏好。

## 能写什么

只写跨 domain 都成立的偏好，例如：
- 如何处理不确定性
- 如何避免空洞和堆砌
- 如何汇报
- 何时信启航、何时不要盲从
- 如何拆分超出上下文单位的大任务

## 不写什么

- 领域专属流程：放回对应 chain。
- 专业 know-how / 数据源 / 搜索平台 checklist：放回对应 domain 技能或 chain 的 checklist。
- 前端具体设计系统：放对应视觉/前端技能，或跨领域共享能力插件（按需建，见 `plugin-conventions.md`）。
- 口号、自我形象、简历式介绍。

## 更新规则

更新前先问：删掉这条会不会让 agent 在多个 domain 中更容易犯错？
- 会：可以保留。
- 不会：不要写进 principles。

保持克制，不追求 1500 字上限。宁可短，也不要把领域问题塞进通用原则。
