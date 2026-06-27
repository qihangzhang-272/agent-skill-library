---
purpose: 选择作者语调（Voice 层），贯穿写作全程
---

# Voice 路由表

Voice 是文章的"语言质地"——句子读起来像谁。
跟 Framework（结构骨架）和 AI-Flavor Filter（质量门）是不同层级。

Voice 从第一句就生效，不是写完才"套"上去。
不论用哪个 Framework，最终的句子都应符合所选 Voice 的语言规则。

## 当前可用 Voices

| Voice | 一句话定位 | 适用 |
|---|---|---|
| `qihang` | Qihang 的中文公众号写作语调——自问自答、口语化、源材料场景化、聚合名词拆解、语气词、Chinese-English 混用 | 默认 voice。Qihang 自己写公众号文章时使用 |

## 默认行为

调用 `qihang-writing-style` 技能时，**默认加载 `voices/qihang.md`**，除非：
- 用户明确指定切换到其他 voice（目前没有其他可选）
- 用户明确要求不用任何 voice（例如让 AI 写一份给别人用的中性模板）

## 未来扩展（占位，本期未实现）

以下 voice 已被研究但本期不实现。未来按需添加：

- `naval` — Naval Ravikant 格言压缩式（短、对比、零修饰、单句独行）
- `housel` — Morgan Housel 故事驱动式（用故事杠杆抽象概念、短章节、记忆点是句子而非段落）

## 加载方式

选定后加载 `references/voices/<name>.md`，贯穿整篇写作。
Voice 在 Framework 的所有 Step 中持续生效——AI 在每一步生成内容时都应参考 Voice 文件中的规则。
