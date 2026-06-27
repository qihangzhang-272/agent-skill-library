# Agent Skill Library — 架构章程

## 这是什么
一个 Claude Code marketplace 形态的个人技能库。本体即 `plugins/<group>/`，按职责分三层：
- 元层 foundation：系统是什么、怎么生长、为谁服务。
- 骨架层 orchestrator / skill-index：怎么调度、怎么找技能。
- 能力层 domain-writing / domain-investment / domain-product / commons：具体干活。

## 为什么这么设计
- `plugins/<group>/` 直接做一等本体，不再设独立 skills/ 源 + 构建复制，消除漂移。
- 调度是 orchestrator 路由 SKILL 的职责（逻辑中心，非物理中心），链定义集中在其 references/chains，唯一权威源。
- 技能生态两层：我的技能（本地）+ GitHub 外部技能（skill-index 索引、探测、提示安装）。
- 端到端交付必须建项目夹、沉淀过程、成品不替代过程包。

## 怎么扩展
新增技能/领域请用 skill-architecture 元技能生成，不要手写散落结构。
principles（上位价值观）的创建同样由 skill-architecture 驱动。

## 技能库维护
- 技能分类、catalog 维护、版本（manual semver）、marketplace 注册与 `claude plugin validate . --strict` 校验，统一通过 skill-architecture 元技能的 references 约定执行。
- 外部 GitHub 技能（如 agent-reach）保持外部，由 skill-index 索引，不收编进本库 plugins。
- 端到端交付产物（runs）落到项目工作区，绝不写进插件目录。
