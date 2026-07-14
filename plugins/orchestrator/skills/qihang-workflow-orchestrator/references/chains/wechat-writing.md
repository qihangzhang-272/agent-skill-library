# Chain: WeChat Writing

## 适用
公众号选题、agent-reach 搜索、编辑判断、起草、事实审校、三层 AI 味审校、Baoyu 排版推草稿箱。

## 链路
```
domain-writing:topic-research-deposition（素材沉淀）
  -> 编辑判断（竞争解释 / 反证 / 未知项 / 暂时结论 / 删除哪些材料）
  -> domain-writing:qihang-writing-style（可选框架 + 起草）
  -> 事实审校
  -> 三层 AI 味审校（结构 / 语言 / 认知）
  -> Baoyu（baoyu-post-to-wechat）配图、排版、推草稿箱
```

## 落盘协议（领域细则）
项目夹: `writing/<YYYY-MM-DD>-<选题>/`
  ↑ 路径相对「用户当前工作项目目录」（运行时所在的项目根），不是技能库/插件仓库本身。
    绝不把产物写进 plugins/ 或本技能库 repo 内。若不确定项目根在哪，先问用户。

过程包:
```
01-topic-research/           # 跨平台素材沉淀（agent-reach 截图与原始素材）
01.5-editorial-judgment.md   # 编辑判断：竞争解释 / 反证 / 未知项 / 暂时结论 / 删除哪些材料
02-outline.md
03-draft.md
04-revised.md
```

端到端成品:
```
05-final.md + Baoyu 排版推送草稿箱
```

## 执行规则
- 素材搜索与沉淀在起草之前完成。
- **编辑判断在选框架之前完成**，落盘到 `01.5-editorial-judgment.md`。这一步比选框架更重要--避免素材直接堆成综述，也避免带着预设结论找证据。
- 框架可选：不强制选一个、不强制逐步确认、不设默认字数下限。可以只取局部、可以组合、可以不用。
- AI 味审校看**频率/分布/功能**，不简单禁词；去 AI 味不制造另一种 AI 味（不编造个人经历，经验不足加事实和推理）。
- **Baoyu（baoyu-post-to-wechat）是外部能力**，经 skill-index 探测/提示安装。md2wechat 已废弃，不再使用。
