# Claude Code Plugins

`plugins/` 是 Claude Code 可安装插件分发层。

这里不是源内容目录。源技能继续维护在 `skills/`，分发映射维护在 `catalog/claude-plugins.json`。

## 生成

```powershell
.\scripts\build-claude-plugins.ps1
```

脚本会根据 `catalog/claude-plugins.json` 生成每个插件目录：

```text
plugins/<plugin-name>/
  .claude-plugin/plugin.json
  skills/<skill-name>/SKILL.md
```

## 当前插件

| 插件 | 主板块 | 用途 |
| --- | --- | --- |
| `agent-product` | product | AI 产品分析、商业模式、叙事审计和研报前置判断 |
| `agent-writing` | writing | 中文自然语气、保留作者声音和文稿润色 |
| `agent-frontend-design` | frontend-design | 前端设计、UI/UX、视觉风格和 GSAP 动效 |
| `agent-investment` | investment | OSS 投资评分、VC 问题和 DD 判断 |

## 安装测试

在仓库根目录验证 marketplace：

```powershell
claude plugin validate .
```

在 Claude Code 内添加本地 marketplace：

```text
/plugin marketplace add .
```

再按需安装单个插件：

```text
/plugin install agent-product@agent-skill-library
```
