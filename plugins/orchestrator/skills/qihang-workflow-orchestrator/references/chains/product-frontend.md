# Chain: Product to Frontend（草稿，未挂入路由表）

> 未跑通，暂不出现在 orchestrator 路由表。跑通一次后按 skill-architecture 场景 C 主动挂回。

## 适用
产品洞察后做前端 brief、页面、原型、HTML 或浏览器验收。

## 链路
ai-product-analyzer（产品洞察）→ 前端 brief → 页面/原型实现 → 浏览器验收

## 落盘协议（领域细则）
项目夹: research/<YYYY-MM-DD>-<product>-frontend/
  ↑ 路径相对「用户当前工作项目目录」（运行时所在的项目根），不是技能库/插件仓库本身。
    绝不把产物写进 plugins/ 或本技能库 repo 内。若不确定项目根在哪，先问用户。
过程包:
  01-product-insight.md
  02-frontend-brief.md
端到端成品:
  03-page.html（或原型目录）

## 执行规则
- 前端范式与设计偏好引用 foundation/principles + `qihang-skill-index` 的 Frontend Design And UI 分类；缺失部分按通用现代风格交付并注明。
