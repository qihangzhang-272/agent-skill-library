---
name: workflow-orchestrator
description: Route the library's proven workflows. Use when the user asks to run, package, choose, or maintain workflows for agent-reach research to public-account writing to Baoyu layout, product-to-investment IC memo / visual report, public-equity initiating coverage, or skill-library maintenance. This skill only resolves a chain reference for the current Host session; it does not execute business nodes or own a Run.
---

# Workflow Orchestrator

Select exactly one matching chain definition and return that reference to the current Host session. Chain bodies live in `references/chains/`.

This Skill is a thin routing entrypoint, not a business node and not a second scheduler. The current visible Codex App task or Claude Code session remains the sole execution owner. This Skill must not invoke domain Skills, advance nodes, retry work, accept Handoffs, or maintain hidden runtime state.

## 触发场景

当用户要求运行、打包、选择或维护一条已验证工作流（公众号写作、投研 IC Memo、公开市场首次覆盖）时使用。

## 路由表

| 用户意图 | chain 定义 |
| --- | --- |
| 公众号选题、agent-reach 搜索、编辑判断、公众号编辑写作、Baoyu 排版 | `references/chains/wechat-writing.md` |
| AI case 是否值得投、IC Memo、DD、可视化研报 | `references/chains/investment-icmemo.md` |
| 已上市公司首次覆盖、股票研究、目标价/评级框架、业绩前瞻 | `references/chains/public-equity-coverage.md` |

`references/chains/product-frontend.md` 是未跑通的草稿，未挂入路由表。跑通后按 `skill-architecture` 的场景 C 主动挂回。

## 路由输出

本 Skill 只返回：

- 命中的精确 chain 路径；
- 若存在多个会改变执行路径的合理匹配，返回需要用户回答的一个关键问题；
- 若没有稳定匹配，返回“无稳定 chain”，由 Host 决定是否提出临时 Workflow。

它不能把 chain 摘要当作节点输出，也不能在路由阶段替用户授权运行、安装能力或产生外部副作用。

## 所有稳定 chain 的共同边界

1. Host 在运行前把意图、Workflow、完整 Skill 顺序、Skill revision、质量合同、Artifact 路径、可选节点和权限冻结进 Plan。
2. Run 固定落在用户当前项目的 `.asl/runs/<run-id>/`；不得把业务产物写入 `plugins/` 或技能库仓库。
3. 唯一业务节点单位是 Skill。Prompt、MCP、Agent、API、脚本和 Tool 只能作为本地 Skill 已声明的内部实现，不能成为隐藏的平行节点。
4. 每个纳入 Plan 的 Skill 都必须产生一个独立 Artifact。不存在“只保存有保留价值的中间产物”这一自由裁量；最终成品不能替代过程包。
5. Standalone 和 Workflow 调用使用同一核心质量合同。处于长链中不能降低 Skill 的研究、判断、验证或交付义务。
6. Harness 只检查确定性义务；直接消费者负责语义验收。拒收必须回到真正责任 Skill 的新 attempt，不创建 Review Skill。
7. 合同允许未知且有界尝试耗尽时，可以 `accepted-with-gaps` 继续，但必须传播尝试、原因、影响、fallback 和重新检查条件。
8. 上游 Artifact revision 改变后，引用旧 digest 的下游 Artifact 必须失效并重跑；旧 Artifact、Handoff 和事件保留。
9. 只有用户明确反馈才能进入演化记录。沉默、普通编辑和含义不明确的运行信号一律不解释为偏好。

## 执行规则

- 默认只解析一个 chain，除非用户明确要求组合。
- chain 的完整 Skill 顺序由 Plan 冻结后，当前 Host Session 按节点显式执行；本 Skill 不执行该顺序。
- 搜索和素材收集只能发生在冻结节点中已声明的本地 Skill 内部，并且必须先于只消费上游 Artifact 的写作或组装 Skill。
- 稳定 Run 不得临时从外部索引搜索、安装或插入能力。外部 Skill、MCP、Prompt、Agent 或 API 必须先在 Run 外完成来源登记、本地 Skill 化、隔离试跑和人类批准，才能被新的稳定 Plan 引用。
- 普通未知项按 Skill 合同记录并继续；只有会改变 Workflow 路径、扩大权限、安全边界或导致后续执行无意义时才请求用户。
