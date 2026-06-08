# 前端网页 Prompt 索引

日期：2026-06-08

原则：网页里的 prompt 内容只做索引，不复制正文，不作为 vendored skill 包。后续如果要使用，优先让 agent 到原网页读取最新内容，或在本地实验目录记录一次性测试结果。

## 索引来源

| 来源 | URL | 用途 | 收录方式 |
| --- | --- | --- | --- |
| 21st.dev | https://21st.dev | 组件示例、AI-ready UI prompt、agent UI 方向 | 只记录入口和实验结果，不复制 prompt 正文 |
| Design Prompts | https://www.designprompts.dev/ | 同一需求的多风格视觉 prompt 测试 | 只记录入口和选用风格名称，不复制 prompt 正文 |
| The Big Prompt Library | https://github.com/0xeb/TheBigPromptLibrary | v0 / UI system prompt 参考 | 只提炼约束，不原样搬运长 prompt |
| V0 System Prompt | https://github.com/2-fly-4-ai/V0-system-prompt | v0 行为参考 | 无 license，链接参考，不复制 |

## 与正式技能库的边界

- 正式 `skills/` 只放自包含 skill 包或明确可迁移子包。
- 网页 prompt 不进 `skills/`。
- 网页 prompt 的测试结果可以写入 `local-experiments/frontend-lab/reviews/`。
- 如果某个 prompt 多次验证有效，只把“适用场景、调用时机、选择标准”写进 `docs/`，不复制原 prompt 正文。
