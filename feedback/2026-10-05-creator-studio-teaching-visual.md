# Creator Studio：原版教学视觉接入与双平台交付

用户本轮明确要求：完整长图文配图更丰富；公众号与 X 默认同时整理并在授权范围内同步发布；公众号沿用已打磨的 qihang-editorial 排版和 677px／375px 只读 HTML 预览。随后明确修正生图风格：采用新开源 PPT，并复用其素材搜集、组织、融合生图及最终放入作品的方法，替代旧视觉默认。

## 技能来源与核对

- 原仓库：https://github.com/qihangzhang-272/ai-native-teaching-kit
- 版本：v1.1.0；固定提交：a0082440e7c78e28ac9949973ad00d801b1e81c6。
- 原路径：skills/build-visual-teaching/。
- 接入位置：当前活动 Environment 的 skills/build-visual-teaching/。
- 原版 7 文件：LICENSE、SKILL.md、references/delivery-qa.md、lecture-persona.md、material-integration.md、teaching-depth.md、visual-benchmarks.md。
- 全部阅读并以 Git blob SHA 与 SHA256 核对；原包字节不变，无脚本、凭据请求、安装动作或额外外发入口。公开项目 0 星不能替代质量判断；采用依据为作者本轮指定的方法与已实际查看原 PPT。
- MIT 只适用于该技能包；课程内第三方原图单独保留出处与权利边界。

## 组织边界

只将原版能力加入现有 Creator Studio 的视觉范式，不新增范式、强制执行链或修改上游 Skill；既有渲染、生图、排版与发布责任继续复用。公众号与 X 的文章结构由作者原稿决定，不把课程“总分总”机械强加给文章。

采用原版的三层融合方法：文章内容与素材依据先确定；生图生成与正文对应的周围视觉；排版放入真实原像素、准确文字和实际来源链接。先检查参考样页，再制作；最终逐幅核对人物、文字、裁切与阅读顺序，检查正式 HTML、两宽预览及平台实际结果。

## 长期偏好与本篇参数

长期：新开源 PPT 视觉为当前优先基准；配图有作用且丰富；同一作者确认稿用于两端长图文；正式公众号 HTML 和只读预览共用样式真源；发布和草稿分别记录。

本篇：素材、具体页码、提示词、生成图、检测输入及平台回执留在文章 Case，不写入原版 Skill 或全局画像。旧头像风格候选保留作过程记录，不进入本次公开成品。

当前 Workspace 直接读取 libraries/agent-skill-library 这个唯一真源，不复制到旧迁移工作区，不新增加载器，不改 Junction。

## 公众号第5版编辑呈现已确认

用户查看本地第5版后明确表示满意，指定高亮、粗体、波浪线等需要沉淀，并要求今后由AI主动配齐，再将规范放入对应Skill的references与Creator Studio公众号排版部分。本次明确确认授权只覆盖该排版沉淀；公共说明中的其他Stable等待、新接入和架构更新继续暂停。

已确认：白底／深蓝正文、钴蓝#2447D8重点、同蓝色系#EEF2FF高亮、钴蓝波浪下划线与虚线分隔。按文意安排重点和阅读停顿，保留作者原词与限定，不强制每篇组件或数量；成品不展示“按作者原文整理”“查看原尺寸”“固定提交全文”等制作备注，必要图源署名继续保留。

落点：`skills/qihang-wechat-layout/references/editorial-presentation.md`维护使用约定；原组件目录与共用渲染器维护效果；Mode只引用职责和检查点。Humanizer-ZH、原版采访及教学Skill不改，不新增Mode节点或修改Mermaid。

认可样本：Writing Platforms的`cases/writing/x/2026-10-05-ai-course-dot/wechat-rich/complete-v5/article.html`。本地风格确认不表示微信编辑器粘贴保真已验收，本轮不扩大平台发布授权。

## 公众号第5版配图参考已接入

用户要求将本次配图范式、完整提示词及头像原件的公开恢复方法沉淀到对应 Skill 的 References。可审阅参考包完成后，用户提供新版 AGENTS 并明确“继续”；本轮按该具体任务接入已有视觉 Skill 与 Creator Studio 参考入口，不扩大到其他 Mode、架构或外部发布。

落点：`skills/editorial-visual-storytelling/references/public-visual-sources.md` 保存固定公开来源、素材用途、哈希及原版第58页恢复方法；`approved-wechat-ppt-prompts.md` 保存带字生成、具体场景、连续材料与真实原图穿插的使用判断，按需引用 `ppt-v5-prompts/` 四份完整实际提示词。原头像锁身份和墨线，原PPT锁当前视觉，原图锁证据；角色背景和标语不继承。已验证的头像公开字节与本地原件一致，未来宿主仍须实际取回并打开。

合并头像参考里的旧暖纸／橙黄默认与短标签限制，统一当前白／浅底、深蓝文字、钴蓝重点及必要图内文案；不把本篇三幅生成图、3:2比例或具体教学例子固定到每篇。Mode仅补两份References的按需入口，HTML组件仍归公众号排版Skill，mode.yaml与Mermaid保持原状。

本篇参考包和验证记录留作准备阶段快照；活动规则以当前Skill及其References为准。原版教学、采访、Humanizer-ZH包和已认可第5版成品不因本轮接入改变。本轮只完成本地库接入，不声称远程仓库已更新、旧会话已重新加载或新文章已经发布。
