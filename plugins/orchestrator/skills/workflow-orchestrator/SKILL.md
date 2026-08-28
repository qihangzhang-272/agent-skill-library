---
name: workflow-orchestrator
description: Dynamically select real, available tile skills from maintained workflow graphs based on the user's current conversation, materials and immediate gap; use fixed chains only when order is genuinely mandatory. Use for public-account research, writing, visual production, Qihang layout or draft publishing, and maintained investment or capital-markets workflows. This skill only routes.
---

# Workflow Orchestrator

Use a workflow definition as a capability map, then choose the next real skill at runtime. Graphs live in `references/graphs/`; truly linear workflows remain in `references/chains/`.

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
3. 对话中的临时判断不默认落盘；用户要求完整过程包或外部动作需要追溯时，才保存实际发生的过程产物。

## 执行规则
- 把用户正在说的话、已有文件、链接和已验证产物放进当前材料集合；先判断是否需要技能。
- 只调用当前环境真实可发现、输入已经满足并能直接推进眼前目标的技能；不得把图中的所有节点自动跑一遍。
- 每个技能产出回到材料集合后重新判断下一步；用户改变方向时立即重选，不维护预设整条路线。
- 隐式调用技能前，在 commentary 中标注 `[技能调用：真实技能名]`，并简述原因、实际输入和预期产物；默认不创建调用轨迹文件。
- 只按本轮真实材料依赖排序；独立且同时有用的节点才并行，反馈边遵守停止条件。
- 外部能力经 skill-index 解析（探测 + 提示安装）。
- domain-investment、domain-capital-markets 等领域只放瓦片技能，不含第二个领域调度器。
