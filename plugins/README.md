# Claude Code Plugins

`plugins/` 是 Claude Code 可安装插件分发层。

这里不是源内容目录。源技能继续维护在 `skills/`，分发映射维护在 `catalog/claude-plugins.json`。

插件只放自培养、会高频复用的技能。外部收藏技能默认留在 `catalog/skills.yml` 和 section 索引里，不进入插件分发层。

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
| `agent-product` | product | 启航自培养产品洞察技能，做 AI 产品 BP 逻辑、商业模式和叙事判断 |
| `agent-writing` | writing | 启航自培养公众号写作链路，包含选题素材沉淀和启航写作风格 |

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
