---
name: wechat-account-corpus-research
description: >
  Use when the user asks to 批量抓取或导出微信公众号历史文章、建立对标账号语料库、按日期或原创标记筛选公众号内容、批量处理 mp.weixin.qq.com URL，或把账号级素材交给公众号选题研究。该技能只采集并规范化获准访问的公开文章语料，不写文章、不推断私有指标、不发布内容。
---

# WeChat Account Corpus Research

把公众号账号或一组文章 URL 变成可审计、可增量更新、可交给研究链消费的语料包。本技能是采集瓦片，不是研究总入口，也不是写作或发布入口。

## When To Use

- 用户给出一批 `mp.weixin.qq.com` URL，需要统一下载正文和元数据。
- 用户要研究一个或多个对标账号的历史内容、最近文章、选题分布或原创文章。
- 现有公众号写作 run 需要先补充账号级语料，再进入 `topic-research-deposition`。
- 需要更新既有账号语料库，并明确本次新增、失败和覆盖范围。

## Core Rule

先声明范围，再采集；先保留原始证据，再规范化。任何数量都必须带统计口径，任何登录或授权都不得被扩大为指标抓取、代理设置或发布权限。

## How To Apply

1. 建立采集契约：记录目标账号或 URL 列表、日期范围、每账号上限、所需字段、目标目录与用途。禁止无边界抓取；未给范围时，默认每账号最近 30 个文章条目，并在报告中写明该假设。
2. 选择模式并执行授权门禁：
   - `known-url-batch`：只读取用户提供的公开文章 URL，不需要微信登录。
   - `account-history`：通过已登记的外部运行时获取账号公开历史；若运行时要求用户自己的公众号后台登录或扫码，先说明动作与数据用途，并等待当轮明确同意。
3. 按 `references/acquisition-modes.md` 选择可用适配器。账号历史通过 `external-skill-index` 解析当前获准使用的 `wechat-article-exporter` 来源，但运行时保持外置；不得把增强指标服务混入默认路径。
4. 把原始导出保存到账号目录的 `raw/`，随后按 `references/corpus-contract.md` 去重、规范化正文和元数据。失败项必须保留 URL、状态和失败原因。
5. 为每个账号生成 `manifest.json` 与 `export-report.md`，区分发布批次、展开后的文章条目、显式标记原创的条目和成功取得完整正文的条目；拿不到的统计值写 `null`，不能写 `0`。
6. 独立调用时，汇报范围、覆盖、失败和目标路径后停止。若用户已明确要求运行完整 `wechat-writing` chain，且本阶段没有新增授权或缺口，则把语料 manifest 交给 `topic-research-deposition`，不额外制造一次确认。

## 何时不该用

- 单篇文章的普通读取或摘要：交给 `topic-research-deposition` 的微信文章提取路径。
- 全网搜索、观点判断、竞品结论或文章写作：分别交给研究和写作 owner；本技能只产出账号语料。
- 阅读量、点赞、转发、评论、评论回复或其他需要凭据/中间人代理的数据：不属于本技能的默认能力，见 `references/safety-and-authorization.md`。
- 删除内容、关注账号、发送消息、群发或发布：本技能永不操作微信 UI，也不继承发布授权。

## References

- `references/acquisition-modes.md` - 两种采集模式、适配器选择和失败策略。
- `references/corpus-contract.md` - 目录、manifest、文章元数据与统计口径。
- `references/safety-and-authorization.md` - 登录、凭据、代理证书、版权和对标账号使用边界。

## Maintenance

外部运行时的 URL、commit 与许可证状态只在 `external-skill-index` 维护。这里保持稳定的输入、输出和授权契约，不镜像上游实现，也不新增第二个研究调度器。
