# 前端 UI 调用链

日期：2026-06-08

定位：这是 `frontend-design` 板块的编排说明，不是新的技能包。它描述已有技能、引用源和网页 prompt 索引如何组合使用。

## 调用链

```text
模糊需求
-> 页面类型判断
-> 设计策略层
-> 组件系统层
-> 动效层
-> 资产治理层
-> 人工验收
```

## 1. 模糊需求

输入可以是不完整的产品想法、PRD 草稿、客户项目方向或一句自然语言需求。

先确认：

- 目标用户是谁。
- 页面承担什么业务动作。
- 是展示、操作、分析、交易、协作，还是交付入口。
- 需要端到端产品感，还是只需要一个局部组件。

## 2. 页面类型判断

| 类型 | 判断标准 | 后续主路线 |
| --- | --- | --- |
| Landing page | 需要转化、叙事、品牌首屏、视觉吸引 | 设计策略层 -> Magic UI reference -> shadcn/Tailwind |
| SaaS / Console | 需要反复操作、状态追踪、工作台密度 | Awesome Design Skills -> shadcn/Tailwind |
| Agent workspace | 需要人操控 agent、审查任务、追踪执行链 | Awesome Design Skills dashboard/shadcn -> shadcn/Tailwind |
| Flow / Onboarding | 需要解释步骤、状态转场、流程理解 | shadcn/Tailwind -> GSAP 或 Motion |
| Registry / Component library | 需要管理组件、来源、成熟度和采纳决策 | TypeUI fundamentals + registry reference |
| Data / Enterprise UI | 需要表格、筛选、权限、企业级信息密度 | Ant Design / MUI / shadcn reference |

## 3. 设计策略层

已迁移来源：

- `skills/awesome-design-skills/skills/dashboard/`
- `skills/awesome-design-skills/skills/shadcn/`
- `skills/awesome-design-skills/skills/bento/`
- `skills/awesome-design-skills/skills/premium/`
- `skills/awesome-design-skills/skills/minimal/`

使用方式：

1. 先选择一个主风格和一个备选风格。
2. 主风格决定视觉密度、排版、色彩、页面气质。
3. 备选风格只用于纠偏，不混合成风格大杂烩。

## 4. 组件系统层

引用源，不直接复制源码：

- `shadcn-ui/ui`
- `tailwindlabs/tailwindcss`
- `birobirobiro/awesome-shadcn-ui`
- `jnsahaj/tweakcn`

默认约束：

- React + TypeScript + Tailwind。
- 组件拆分清晰，不做一个巨型页面。
- 复杂页面至少拆出 shell、navigation、content panel、detail panel、state card、review/action queue。
- 每个组件要能说明输入数据、状态、复用边界。

## 5. 动效层

已迁移来源：

- `skills/greensock-gsap-skills/skills/gsap-core/`
- `skills/greensock-gsap-skills/skills/gsap-react/`
- `skills/greensock-gsap-skills/skills/gsap-scrolltrigger/`
- `skills/greensock-gsap-skills/skills/gsap-timeline/`
- `skills/greensock-gsap-skills/skills/gsap-performance/`

引用源：

- `motiondivision/motion`
- `magicuidesign/magicui`

原则：

- 动效服务状态理解、流程解释和关键反馈。
- Console / dashboard 默认不堆叠复杂动效。
- Landing page 可以使用 Magic UI 做 polish，但必须回到组件系统层收束结构。

## 6. 资产治理层

已迁移来源：

- `skills/typeui-fundamentals/`

引用源：

- `bergside/typeui` 的 `REGISTRY.md` 和 registry 思路。

每次实验或迁移要记录：

- 来源 URL。
- 上游 commit。
- 许可证。
- 是否可迁移。
- 哪些是正式 skill，哪些只是 reference。
- 组件是否可复用。
- 进入哪个 section。

## 7. 人工验收

人只看三件事：

- 页面是否真的符合业务场景。
- 视觉质量是否明显超过默认模板。
- 组件和调用链是否能复用到下一个项目。

如果只是一次性页面，不进入正式技能库，只保留实验记录。
