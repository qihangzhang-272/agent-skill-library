# Skill Composer

本地动态技能编排台。它读取 `data.js` 展示当前仓库里的 skills，让维护者把技能拖到链路画布上，按顺序拼出一条 Claude 可执行的工作流。

它不运行 Claude，也不启动本地服务。核心用途是：

- 从当前技能库里选择要用的 skill。
- 拖拽生成一条动态链路。
- 重排、删除和编辑每个节点的职责、输入、输出和验收要求。
- 生成整条链的 Claude handoff prompt。
- 导出或导入某条已经拼好的链路 JSON。

## 使用

1. 迁移或修改技能后，重新生成数据：

```powershell
.\scripts\build-skill-orchestrator-data.ps1
```

2. 打开：

```text
apps/skill-orchestrator/index.html
```

3. 从左侧把 skills 拖到中间画布，填写链路名称、输入材料和节点说明，复制整条链 prompt 给 Claude。

## 边界

- 不复制技能正文。
- 不执行本地 runner。
- 不读取浏览器外的文件系统。
- 当前链路保存在浏览器 `localStorage`，只用于人工编排。
