# 用户协作边界：热点、阅读、连续采访与原声成文

日期：2026-10-03。来源：本任务用户明确要求。

用户要求 AI 先推荐当前 AI 热点，由作者选题；准备可阅读素材；作者阅读后通过聊天和连续采访表达想法；AI 将实际口述组织成文，用 Humanizer-zh 轻度润色，保留原有言语表达。素材获取、截屏、打包、生图、概念视觉等由 AI 完成，公众号与 X 长文使用同一内容，仅作形式适配。此边界替代此前只能接受书面详实大纲的限制。

用户补充原话：“请在 GitHub 上寻找评分标准或质量较好的采访技能，将其融合到 Creator Studio 中。”不得自行生成采访技能，不得改写找到的技能；协作边界与技能组织仅放在 Mode。

## 筛选依据与结果

采用 [ArcBlock/agent-skills 的 interview-writer](https://github.com/ArcBlock/agent-skills/tree/9f4b98d5ea072e33ef4b1d66051fd5e335b293fe/plugins/content-creation/skills/interview-writer)。它面向博客、社交媒体和观点文章，原文已有基于回答追问、整合作者观点、不编造故事、保留作者语气及不标准化作者风格的要求，与本次任务直接相关。

没有找到它的独立采访质量评分或公开对话实测结果，不能把适配性审阅称为高分测评。2026-10-03 GitHub API 实查仓库为 5 stars；skills.sh 页面显示该技能 9 次安装。这些只表示传播规模，不能证明效果。采用理由是任务匹配和原文边界，后续仍需用真实作者采访验证。

比较过的其他候选：

- [addyosmani/agent-skills 的 interview-me](https://github.com/addyosmani/agent-skills/tree/main/skills/interview-me)：仓库 API 实查 100683 stars，附触发案例和对话评估期望，验证要求比多数候选明确；但目标是开发需求澄清，每个问题附 AI 猜测，收尾输出意图说明，不适合替代收集作者观点的写作采访。没有因为 stars 多就纳入。
- [Axiom_Skills_Created 的 personal-blog-writing-coach](https://github.com/axiom-wang/Axiom_Skills_Created/tree/main/personal-blog-writing-coach)：任务相关，但 API 实查 0 stars，仓库许可证未声明；未复制。
- 已有 `grill-me` 用于盘问方案，`interview-designer` 用于招聘面试，均不作为个人 IP 写作的采访入口。`cangjie-skill` 是内容蒸馏工具，也不作为采访技能。

## 原包保留与检查

固定上游 commit：`9f4b98d5ea072e33ef4b1d66051fd5e335b293fe`。

完整导入 `SKILL.md` 与 `references/` 下的四个文件，五个文件均与 GitHub 固定版本的 Git blob 哈希一致。附上原 MIT LICENSE；本地只增加 Harness 要求的 `SOURCE.md` 来源记录，没有替换、删减或改写原技能说明和参考资料。

按 `skill-vetter` 逐文件检查了全部五个 Markdown 文件和 LICENSE。包内没有执行脚本、依赖安装、凭据读取或上传调用。上游行为包括读取个人画像、自动更新全局画像和根据默认画像推测立场，仍需受本次明确边界约束。采用时不执行其他插件或安装脚本。

原包附带默认观点、思考模式和风格，不能作为作者本人观点。本次边界、原声保留、项目内材料存储、双平台长文要求由 Creator Studio 组织；不为适配而修改上游文件，也不创建另一份自编采访技能或包装 Skill。

## 接入位置

`modes/creator-studio/MODE.md` 保存用户协作边界，`mode.yaml` 在既有研究与写作范式中加入 `interview-writer` 节点及研究、采访、原声编辑的交接关系，没有新增工作模式或执行引擎。已有大纲、成稿和独立视觉任务仍可直接进入对应技能。

核验记录（2026-10-03）：App 附带核心的 `environment.catalog` 和 `mode.files` 均返回成功，`interview-writer` 被 Creator Studio 识别；该 Mode 共有 21 个技能，仍保留原有 3 个范式。`workspace.view.sync` 成功，自动能力视图已同步。五个上游文件与固定版本哈希一致，改动前记录的 623 个既有技能文件没有变化。

整体 `workspace.validate` 尚未通过：App 的 Mermaid 渲染辅助进程未返回有效 JSON，错误为 `MERMAID_RENDERER_UNAVAILABLE`；独立最小图检查中辅助进程退出码为 `2147483651`。没有跳过渲染门禁或将结构检查称为完整验收。当前已验证来源完整性、Mode 识别和技能引用，尚未验证完整图谱渲染及真实作者采访效果。
