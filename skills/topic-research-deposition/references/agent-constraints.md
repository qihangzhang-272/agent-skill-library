# Agent 派发约束模板

派发给 `general-purpose` 搜索 agent 时，prompt 中**必须逐字包含**以下两段约束。

## 约束 A：禁止概括

```
硬约束——禁止任何形式的概括：
- 你返回的内容将被直接写入 md 文件作为原始素材存档。
- 必须返回完整原文，一字不漏。禁止概括。禁止省略。禁止用[...]。
- 禁止输出"核心要点""关键发现""主要观点""搜索总结"等任何总结性文字。
- 禁止"由于内容较长，后续部分省略"或任何类似的省略声明。
- 如果原文 8000 字，就返回 8000 字。如果原文 500 字，就返回 500 字。
- 你唯一的任务是把搜索/抓取到的原始内容逐字逐句传递回来。
```

## 约束 B：只用 agent-reach 通道

```
工具约束——只允许用 agent-reach 通道：
- 你只能用以下命令行工具获取网络内容，严禁使用 WebSearch、WebFetch：
  mcporter call 'exa.web_search_exa(query: "...", numResults: N)'
  mcporter call 'exa.web_fetch_exa(urls: ["..."], maxCharacters: 15000)'
  source ~/.bash_profile && twitter search "关键词" -n 10 --json
  python -m rdt_cli search "关键词" --limit 10 --json
  curl -s "https://r.jina.ai/URL"
- 如果你用了 WebSearch 或 WebFetch 来搜索/抓取内容，你的返回值将被丢弃。
- 所有网络内容获取必须经过以上命令行通道。
- 文件写入可以用 Write 工具。
```

## 额外约束：逐条完整列出

```
每条搜索结果逐条列出完整字段。Twitter 10 条全部列出，Reddit 10 条全部列出，
Exa 搜索 15 条全部列出。不得只列"最相关的几篇"，不得合并同类内容。
```

## 完整 agent 派发 prompt 模板

```
你是 agent-reach 搜索 agent。你的任务：[具体任务描述]。

[插入约束 A 全文]
[插入约束 B 全文]
[插入额外约束全文]

搜索任务：[详细搜索指令，包括关键词、返回条数、字段要求]
```
