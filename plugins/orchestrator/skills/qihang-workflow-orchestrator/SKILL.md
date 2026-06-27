---
name: qihang-workflow-orchestrator
description: Route Qihang's proven workflows. Use when Qihang asks to run, package, choose, or maintain workflows for agent-reach research to Qihang writing to Codex/md2wechat layout, product-to-frontend, product-to-investment IC memo / visual report, or skill-library maintenance. This skill only routes; workflow details live in references.
---

# Qihang Workflow Orchestrator

Route to one chain definition, then follow that chain. This file only routes; chain bodies live in `references/chains/`.

## 触发场景
当启航要求跑、打包、选择某条经典工作流（公众号写作、投研 IC memo、产品转前端）时使用。

## 路由表
| 用户意图 | 链定义 |
| --- | --- |
| 公众号选题、agent-reach 搜索、启航写作、md2wechat 排版 | `references/chains/wechat-writing.md` |
| 产品洞察后做前端 brief、页面、原型、HTML 验收 | `references/chains/product-frontend.md` |
| AI case 是否值得投、IC memo、DD、可视化研报 | `references/chains/investment-icmemo.md` |

## 端到端交付铁律（所有链继承）
1. 任何端到端 workflow 必须先创建 run folder（项目文件夹），不允许散落文件。
2. 每个有保留价值的中间产物必须按所选 chain 定义落盘。
3. 最终交付物不得替代过程包——成品与过程包同时存在。

## 执行规则
- 只读取一个 chain 定义，除非用户明确要求组合。
- 链路顺序执行；search/素材收集在写作或 memo 组装之前。
- 外部能力经 skill-index 解析（探测 + 提示安装）。
- domain-investment 等领域只放瓦片技能，不含第二个领域调度器。
