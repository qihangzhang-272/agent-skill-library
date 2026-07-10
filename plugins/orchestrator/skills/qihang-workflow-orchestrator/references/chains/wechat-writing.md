# Chain: WeChat Writing

## 适用
公众号选题、agent-reach 搜索、启航文风起草、md2wechat 排版推草稿箱。

## 链路
domain-writing:topic-research-deposition → domain-writing:qihang-writing-style（起草）→ 修订 → md2wechat 排版

## 落盘协议（领域细则）
项目夹: writing/<YYYY-MM-DD>-<选题>/
  ↑ 路径相对「用户当前工作项目目录」（运行时所在的项目根），不是技能库/插件仓库本身。
    绝不把产物写进 plugins/ 或本技能库 repo 内。若不确定项目根在哪，先问用户。
过程包:
  01-topic-research/     # 跨平台素材沉淀（agent-reach 截图与原始素材）
  02-outline.md
  03-draft.md
  04-revised.md
端到端成品:
  05-final.md + md2wechat 推送草稿箱

## 执行规则
- 素材搜索与沉淀在起草之前完成。
- md2wechat 是外部能力，经 skill-index 探测/提示安装。
