# Chain 生命周期

## 定位
chain 是技能图的线性特例。瓦技能是核心；存在分支、汇合、可跳过节点或反馈时应使用 `graph-authoring.md`，不要用条件列表伪装成线性 chain。

## 什么时候建 chain
- 你发现自己反复按固定顺序手动调用多个瓦技能跑同一个交付。
- 单个瓦技能不足以端到端完成，需要明确顺序和落盘结构。
- 任意相邻两步交换都会破坏结果，并且不存在有意义的旁路。

不满足这些条件就直接用瓦技能或建立技能图。

## 建一条 chain
1. 复制 `assets/chain-template.md`，放 `orchestrator/skills/workflow-orchestrator/references/chains/<name>.md`。
2. 填三段：适用 / 链路 / 落盘协议。**落盘协议是必填项**--没有落盘协议的 chain 不算完成。
3. orchestrator `SKILL.md` 路由表加一行指向新 chain。
4. 同步 `docs/workflows/` 下对应文档。
5. bump orchestrator version，同步 marketplace，运行两项仓库验证。

## 改一条 chain
- 改 chain 定义文件 + 同步 docs/workflows + bump orchestrator version 与 marketplace version。
- 瓦技能本身不用改--chain 引用瓦技能，不是反过来。
- 运行 `claude plugin validate . --strict` 与 `node scripts/validate-repository.mjs --base HEAD`。

## 不做什么
- 加瓦技能时不自动建/改 chain。chain 永远是你主动发起。
- 不为"管理复杂度"新建包装技能或子调度器。
- chain 不删减瓦技能内容，只编排顺序和落盘。
