# Chain: WeChat Writing

## 适用
公众号选题、agent-reach 搜索、强制截图存档、编辑判断、起草、事实审校、三层 AI 味审校、配图、Baoyu 排版推草稿箱。

## 链路
```
domain-writing:topic-research-deposition（素材沉淀 + 强制截图存档）
  -> 编辑判断（竞争解释 / 反证 / 未知项 / 暂时结论 / 删除哪些材料）
  -> domain-writing:qihang-writing-style（可选框架 + 起草，正文标注配图位）
  -> 事实审校
  -> 三层 AI 味审校（结构 / 语言 / 认知）
  -> 配图落实（截图填充 + baoyu-article-illustrator 生成 + baoyu-cover-image 封面）
  -> Baoyu（baoyu-post-to-wechat）排版、推草稿箱
```

## 落盘协议（领域细则）
项目夹: `writing/<YYYY-MM-DD>-<选题>/`
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
- **编辑判断在选框架之前完成**，落盘到 `01.5-editorial-judgment.md`。这一步比选框架更重要--避免素材直接堆成综述，也避免带着预设结论找证据。
- 框架可选：不强制选一个、不强制逐步确认、不设默认字数下限。可以只取局部、可以组合、可以不用。
- AI 味审校看**频率/分布/功能**，不简单禁词；去 AI 味不制造另一种 AI 味（不编造个人经历，经验不足加事实和推理）。
- **Baoyu（baoyu-post-to-wechat）是外部能力**，经 skill-index 探测/提示安装。md2wechat 已废弃，不再使用。
