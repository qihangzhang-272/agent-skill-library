# Chain: WeChat Writing

> 状态：Library-native legacy chain，尚未迁移为 ASL-WEP 稳定 Workflow。不得直接交给 ASL Harness 运行；Baoyu 等外部能力必须先在 Run 外本地 Skill 化并完成试跑，迁移后才能成为稳定节点。

## 适用
公众号选题研究、写作、配图、Baoyu 排版与草稿箱发布。

## 链路
```
domain-writing:topic-research-deposition
  -> domain-writing:public-account-writing-style
  -> baoyu-article-illustrator + baoyu-cover-image
  -> baoyu-post-to-wechat
```

## 落盘协议（领域细则）
项目夹: `writing/drafts/{YYYY-MM-DD}-{topic-slug}/`
  ↑ 路径相对「用户当前工作项目目录」（运行时所在的项目根），不是技能库/插件仓库本身。
    绝不把产物写进 plugins/ 或本技能库 repo 内。若不确定项目根在哪，先问用户。

过程包:
```
01-topic-research/
  sources/           # 源材料文本（每源一文件）
  screenshots/       # 强制：关键源 URL 截图存档（证据 + 候选配图）。不许空。
01.5-editorial-judgment.md   # 编辑判断五项
02-outline.md
03-draft.md                  # 正文标注配图位 [📷 ...]
04-revised.md
```

端到端成品:
```
05-final.md + 配图 + Baoyu 排版推送草稿箱
```

## 执行规则
- 素材搜索与沉淀在起草之前完成。
- **截图是强制节点，不是可选**：每个被引用的关键源 URL（推文、论文、博客、prompt PDF、官方公告页）都要截图存到 `01-topic-research/screenshots/`，命名 `{surface}-{序号}-{slug}.png`。用 playwright browser 或 shot-scraper。`screenshots/` 空目录 = 流程没走完。不伪造截图（无 URL 访问的源标注 `no-screenshot` 并说明原因）。
- **文章配图是强制节点**：起草时在正文标注配图位 `[📷 配图建议：...]`；定稿前必须落实--用 screenshots/ 里的截图、或 baoyu-article-illustrator 生成的图、或图论/流程示意图填充。封面用 baoyu-cover-image。正文不许只有文字。
- **Baoyu 目前仍是外部能力**；skill-index 只用于 Run 外发现和候选沉淀，不得在本 chain 运行中探测或安装。完成本地 Skill 化前，本 chain 不属于 ASL-WEP Profile。
