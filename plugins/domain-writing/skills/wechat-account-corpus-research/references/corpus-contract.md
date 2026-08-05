# Corpus Contract

## 目录

在完整公众号写作 chain 中固定写入：

```text
01-topic-research/
  sources/
    wechat-accounts/
      _run-manifest.json
      <account-slug>/
        account.json
        manifest.json
        raw/
        articles/
          YYYY-MM-DD-<short-key>-<article-slug>.md
        assets/                 # 只有明确要求保存图片/HTML 资产时才创建
        export-report.md
```

独立调用时使用用户当前项目下的 `research/wechat-accounts/{YYYY-MM-DD}-{topic-slug}/`，内部结构相同。运行产物不能写入插件目录。

## Run Manifest

`_run-manifest.json` 至少包含：

```json
{
  "schema_version": "1.0",
  "capture_id": "YYYYMMDDTHHMMSSZ",
  "captured_at": "ISO-8601",
  "purpose": "private-research | internal-benchmark | authorized-archive",
  "request_scope": {
    "mode": "known-url-batch | account-history",
    "targets": [],
    "date_from": null,
    "date_to": null,
    "max_items_per_account": 30,
    "fields": ["metadata", "body_markdown"]
  },
  "adapters": [
    {
      "id": "adapter-1",
      "name": "actual-adapter-name",
      "source": "runtime name or endpoint",
      "version_or_commit": null,
      "input_origin": "direct-fetch | live-api | user-provided-export",
      "authorization_mode": "none | interactive-user-login | pre-authorized-export",
      "verification": "probe-only | known-url-verified | account-history-verified | import-validated",
      "probed_at": "ISO-8601"
    }
  ],
  "accounts": [],
  "failures": []
}
```

不得包含 cookie、token、auth-key、pass ticket、二维码内容、凭据文件路径或可复用的登录材料。混合输入允许多个 adapter record；不能用一个 run 级 adapter 覆盖各账号真实来源。

## Account And Article Records

`account.json` 保存展示名、可验证账号标识、主页/样本文章线索、采集范围和别名。拿不到稳定标识时明确写 `null`，不要只凭同名合并。

每账号 `manifest.json` 至少包含：

```json
{
  "schema_version": "1.0",
  "account_ref": "relative/path/to/account.json",
  "scope": {},
  "adapter_ref": "adapter-1",
  "counts": {},
  "merge_summary": {
    "added": 0,
    "updated": 0,
    "unchanged": 0
  },
  "articles": [
    {
      "article_key": "stable-id-or-canonical-url-hash",
      "path": "articles/YYYY-MM-DD-short-key-slug.md",
      "status": "full | partial | metadata-only | failed",
      "checksum": "sha256:...",
      "adapter_ref": "adapter-1",
      "revisions": [
        {
          "captured_at": "ISO-8601",
          "checksum": "sha256:...",
          "raw_ref": "raw/capture-id/source-file"
        }
      ]
    }
  ],
  "failures": [
    {
      "input": "URL or account cursor",
      "stage": "discover | list | download | normalize | merge",
      "code": null,
      "message": "sanitized error",
      "retryable": false
    }
  ]
}
```

`adapter_ref` 指向 run manifest 中稳定的 adapter `id`；用户自行导出的账号必须使用对应的 `user-provided-export` record。

每篇 Markdown 的 frontmatter 至少包含：

```yaml
title:
article_key:
account_name:
account_id: null
author: null
published_at: null
source_url:
canonical_url:
captured_at:
acquisition_status: full
original_marked: null
adapter_ref:
checksum:
raw_ref:
```

正文只保存成功取得的内容。`partial`、`metadata-only` 和 `failed` 不能伪装成完整正文；失败详情进入 manifest。

## 增量合并

- 唯一键优先使用上游稳定文章 ID；没有时使用规范化后的 canonical URL hash，并写入 `article_key`。标题和文件名不是唯一键。
- 每次采集的原始文件写入 `raw/{capture_id}/`，其中 `capture_id` 使用文件系统安全的 `YYYYMMDDTHHMMSSZ`；永不覆盖旧 snapshot。
- 同一 `article_key` 再次出现时，较新的非空元数据可以补齐旧记录；`full` 正文优先于 `partial`，同 checksum 不重复写正文。
- 正文发生变化时更新规范化文章，但旧内容保留在 raw snapshot，并在文章记录中追加 revision 时间与 checksum；不得静默丢弃历史版本。
- `counts` 按合并后的唯一文章集计算；本次变化另写 `merge_summary.added/updated/unchanged`，避免把重复抓取计入新增文章。

## 计数口径

每账号 `manifest.json` 的 `counts` 至少使用以下字段：

| 字段 | 含义 |
| --- | --- |
| `publish_events` | 上游暴露发布/消息组标识时，按唯一组标识计数；不可得则为 `null`。 |
| `article_items` | 多图文展开并按 `article_key` 去重后的文章条目数；无稳定上游 ID 时，`article_key` 才回退为 canonical URL hash。 |
| `original_marked_items` | 上游明确标记为原创的条目数；无可靠标记时为 `null`。 |
| `full_bodies` | 成功取得完整正文的条目数。 |
| `partial_bodies` | 只取得部分正文的条目数。 |
| `metadata_only` | 只有元数据的条目数。 |
| `failed` | 获取失败的条目数。 |

不要用一个无口径的“总文章数”替代上述字段。一条公众号发布可能包含多篇文章，发布次数与文章条目数不是同一个指标。

## Export Report

`export-report.md` 只报告：目标、时间和数量范围、适配器、过滤条件、各口径计数、成功/失败、覆盖盲区、用户完成的授权动作，以及下一步交接。选题解释、账号评价和写作观点留给下游研究与写作技能。
