---
name: workflow-orchestrator
description: Route the library's proven workflow graphs and truly linear chains. Use when the user asks to compose tile skills for public-account research, writing, visual production, Qihang layout or draft publishing; or to run maintained investment and capital-markets workflows. Select the smallest composition supported by existing materials; this skill only routes.
---

# Workflow Orchestrator

Route to one workflow definition. Graphs live in `references/graphs/`; truly linear workflows remain in `references/chains/`.

## 触发场景
当用户要求跑、打包、选择某条经典工作流（公众号研究写作、排版与视觉生产、HTML 预览、草稿箱发布；投研 IC memo；公开市场首次覆盖）时使用。

## 路由表
| 用户意图 | 链定义 |
| --- | --- |
| 公众号选题、研究、写作、启航排版、视觉生产、HTML 或草稿箱发布的任意组合 | `references/graphs/wechat-writing.md` |
| AI case 是否值得投、IC memo、DD、可视化研报 | `references/chains/investment-icmemo.md` |
| 已上市公司首次覆盖、股票研究、目标价/评级框架、业绩前瞻 | `references/chains/public-equity-coverage.md` |

`references/chains/product-frontend.md` 是未跑通的草稿，未挂入路由表。

## 端到端交付铁律（所有链继承）
1. 多节点、多资产、需审计或包含外部发布的 workflow 建立 run folder；单瓦技能任务不强制补目录。
2. 只保存跨节点有价值或需要审计的产物，不为制造完整状态而创建空文件。
3. 最终交付物不得替代过程包--成品与过程包同时存在。

## 执行规则
- 根据用户目标和现有材料选择最小子图或 chain；已验证产物直接复用。
- 只按真实材料依赖排序；独立节点可并行，反馈边遵守定义中的停止条件。
- 外部能力经 skill-index 解析（探测 + 提示安装）。
- domain-investment、domain-capital-markets 等领域只放瓦片技能，不含第二个领域调度器。
