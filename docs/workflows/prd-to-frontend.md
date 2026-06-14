# PRD 到前端实现调用链

日期：2026-06-08

定位：这是一条从需求确认到前端可验收实现的跨技能运行链。它连接产品澄清、外部设计来源选择、前端实现和浏览器验收，目标是让 agent 在项目初始化时知道如何选择设计技能、组件参考、动效技能和验证流程。

本仓库不保存项目源码，也不复制 UI 库源码。具体前端代码应在目标项目里生成和维护，本仓库只保存调用链、技能选择规则和质量门。

## 适用场景

- 从一句模糊需求开始，产出可执行 PRD 和前端实现计划。
- 从已有 PRD 生成页面结构、组件拆分和前端任务。
- 为客户项目、内部工具、agent workspace、landing page、dashboard 做前端首版。
- 比较多个外部 UI skill / prompt / 组件库，决定项目初始化时拉取哪些能力。

不适用场景：

- 只想快速做一次性 demo，且不需要沉淀复用逻辑。
- 只需要修一个具体 UI bug。
- 已有成熟设计系统，且不需要重新选择风格或组件策略。

## 输入要求

最小输入：

- 业务目标。
- 用户角色。
- 页面或产品类型。
- 必须完成的核心动作。

增强输入：

- PRD、用户故事、竞品页面、品牌限制、技术栈、目标端、数据字段、权限模型。
- 期望风格、不能接受的风格、参考链接。
- 是否需要动效、图表、表格、复杂状态、多人协作或 agent 操控界面。

## 调用链

```text
模糊需求 / PRD
-> 需求澄清
-> 页面类型判断
-> 信息架构
-> 设计策略选择
-> 组件系统选择
-> 动效和交互策略
-> 前端任务拆解
-> 实现与浏览器验收
-> 复用沉淀
```

## 1. 需求澄清

先把 PRD 缺口补齐，不要直接进入界面生成。

必须确认：

- 用户是谁，为什么会进入这个页面。
- 页面要推动什么业务动作。
- 用户完成动作前需要看到哪些信息。
- 页面里哪些状态必须可见：空态、加载、错误、权限、处理中、完成、回滚。
- 是否需要后端、数据库、认证、文件上传、支付、通知或外部 API。

输出：

```text
用户角色：
业务动作：
核心页面：
关键状态：
必要数据：
外部依赖：
验收标准：
```

## 2. 页面类型判断

先判断页面类型，再通过 `qihang-skill-index` 决定参考哪些外部设计来源。

| 页面类型 | 判断标准 | 主路线 |
| --- | --- | --- |
| Landing page | 需要转化、首屏叙事、品牌表达 | Awesome Design Skills / Taste Skill / Magic UI 索引 |
| SaaS dashboard | 需要高频操作、状态总览、筛选、表格 | shadcn / Tailwind / Ant Design / MUI 索引 |
| Agent workspace | 人要操控 agent、审查任务、查看执行链 | dashboard / shadcn + 明确任务队列和审查面板 |
| Onboarding / flow | 需要步骤解释、状态转场、进度感 | shadcn + GSAP/Motion 动效层 |
| Component registry | 管理组件、来源、成熟度、采纳决策 | TypeUI fundamentals + registry reference |
| Data / enterprise UI | 信息密度高、权限复杂、表格和筛选多 | Ant Design / MUI / shadcn reference |

UI 层调用链固定为：页面类型判断 -> 设计策略层 -> 组件系统层 -> 动效层 -> 资产治理层 -> 浏览器验收。

## 3. 信息架构

在选风格前，先确定页面骨架。

必须产出：

- 页面地图：有哪些页面、入口、返回路径。
- 每个页面的主任务。
- 页面级状态：空态、错误态、加载态、权限态。
- 信息优先级：首屏必须看见什么，哪些可以折叠或放详情页。
- 数据流：哪些数据来自用户输入、后端、外部 API、agent 输出。

对 agent workspace 和工作台类产品，默认拆成：

- shell / navigation
- task queue
- active work area
- evidence or preview panel
- decision / review panel
- activity log

## 4. 设计策略选择

外部设计来源统一从 `qihang-skill-index` 查询，不再假设本仓库有本地 skill 目录：

- Anthropic `frontend-design`
- Awesome Design Skills
- TypeUI
- Taste Skill
- Impeccable

选择规则：

- 只选一个主风格，一个备选风格。
- 主风格决定密度、排版、颜色、组件形态。
- 备选风格只用于纠偏，不混合成风格拼贴。
- TypeUI fundamentals 用于基础 UX / 可访问性 / 排版审查，不替代设计策略。

网页 prompt 只做索引：

- `https://21st.dev`
- `https://www.designprompts.dev/`

使用时只记录来源和选择理由，不复制 prompt 正文。

## 5. 组件系统选择

默认优先级：

1. 已有项目设计系统。
2. shadcn/ui + Tailwind + lucide。
3. Ant Design / MUI，用于企业后台或复杂数据录入场景。
4. Magic UI，只用于 landing polish 或局部视觉强化，不作为后台主系统。

组件拆分要求：

- 不做一个巨型页面文件。
- 至少按 layout、navigation、panel、card、table/form、state feedback、action area 拆分。
- 每个复杂组件要说明输入数据、状态、事件和复用边界。
- 图表、表格、筛选、权限、异步任务必须有独立状态设计。

## 6. 动效和交互策略

只有动效能提升理解或反馈时才启用。

外部动效来源统一从 `qihang-skill-index` 查询：

- GSAP Skills
- Motion

使用边界：

- Landing page 可以用动效强化叙事。
- Dashboard 和工作台只用动效解释状态变化，不做干扰性装饰。
- Agent workspace 的动效优先服务任务进度、执行链、确认反馈。
- 动效必须可降级，不应阻塞核心操作。

## 7. 前端任务拆解

交给 Codex / Claude 执行前，先把任务拆成可验收单元。

推荐任务包：

```text
1. 建立页面路由和 layout shell
2. 建立设计 token、主题和基础组件
3. 实现核心页面信息架构
4. 实现主要交互和状态
5. 接入 mock data 或真实 API
6. 增加 loading / empty / error / permission states
7. 增加响应式和可访问性检查
8. 用浏览器截图验收桌面和移动端
```

每个任务必须带：

- 文件范围。
- 输入数据。
- 完成标准。
- 验证方式。
- 是否需要人工浏览器验收。

## 8. 浏览器验收

前端不是“代码能跑”就算完成。每次可视化交付至少检查：

- 首屏是否表达正确业务对象。
- 页面类型是否和设计策略一致。
- 文案是否溢出或遮挡。
- 移动端是否可用。
- 交互状态是否完整。
- loading / empty / error 是否存在。
- 核心动作是否能端到端完成。
- 视觉质量是否明显高于默认模板。

如果使用 3D、复杂动效、图表或画布，还要检查：

- 画面非空。
- 动效不遮挡信息。
- 资源加载正常。
- 性能不会影响主要操作。

## 9. 复用沉淀

项目完成后，只把可复用判断沉淀回本仓库：

- 有效的技能组合 -> 更新 workflow 或 `qihang-skill-index`。
- 高质量外部 skill -> 加入 `qihang-skill-index`，不复制正文。
- 可复用组件模式 -> 写成调用策略或验收规则。
- 具体项目源码 -> 不进入本仓库。
- 一次性网页实验 -> `local-experiments/`。

## 10. 最小验收标准

这条链跑完后，至少应产出：

- 一份明确 PRD 或前端 brief。
- 页面类型判断。
- 设计策略选择和理由。
- 组件系统选择和理由。
- 前端任务拆解。
- 浏览器验收记录。
- 是否沉淀为技能、索引或 workflow 的判断。
