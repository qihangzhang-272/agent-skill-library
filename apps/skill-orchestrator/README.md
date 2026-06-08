# Skill Orchestrator

本地静态技能编排台。它读取 `data.js`，展示当前仓库里的 skills 和 `orchestrations/*.json` 中定义的工作流。

它不运行 Claude，也不启动本地服务。核心用途是：

- 看清楚一条链按什么顺序跑。
- 看每个节点需要哪些 skill、输入什么、输出什么。
- 记录人工运行状态。
- 生成整条链的 Claude handoff prompt。

## 使用

1. 迁移或修改技能后，重新生成数据：

```powershell
.\scripts\build-skill-orchestrator-data.ps1
```

2. 打开：

```text
apps/skill-orchestrator/index.html
```

3. 选择 workflow，填写输入，复制整条链 prompt 给 Claude。

## 边界

- 不复制技能正文。
- 不执行本地 runner。
- 不读取浏览器外的文件系统。
- 状态保存在浏览器 `localStorage`，只用于人工跟踪。
