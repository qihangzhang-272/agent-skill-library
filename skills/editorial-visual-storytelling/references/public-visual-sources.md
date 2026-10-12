# 公开视觉参考与跨电脑恢复

适用：为作者的公众号或 X 长图文恢复已确认的头像、PPT 风格和原课件素材。与 [已认可的配图案例](approved-wechat-ppt-prompts.md) 配合使用。本文件是制作参考，不进入读者文章，也不授权公开发布。

## 参考图各自负责什么

| 角色 | 采用材料 | 继承范围 |
| --- | --- | --- |
| 人物身份 | 原头像 JPEG | 脸、乱发、棱角透明眼镜、深蓝猫图案上衣、白色 `?!`、粗墨线、小黑鸟；改变符合正文的动作与景别 |
| 页面与画风 | 原版 v1.1.0 视觉课件第 58 页 | 白色／浅底、淡彩留白、大标题、钴蓝手绘重点，人物实际处理材料；不照抄原页文字或构图 |
| 事实与证据 | 第 1、12 页公开原预览，以及本篇确实采用的其他原材料 | 保留原像素与必要署名；不让生图重画官方图、书页或界面 |

原头像的暖纸背景和周围标语不随身份继承。当前公众号重点色为钴蓝 `#2447D8`，淡蓝高亮 `#EEF2FF`；深蓝文字与白／浅底配合。肤色、书本和原课件内的暖色可以保留，不给新标题另加一套橙黄强调色。HTML 的具体组件继续由现有公众号排版技能维护。

## 人物原件：可以直接从公开仓库取回

- [公开仓库内的原头像](https://github.com/qihangzhang-272/agent-skill-library/blob/a5389a4f9a9b7e01cdb878e3445069b71e7e908a/plugins/domain-writing/skills/editorial-visual-storytelling/assets/qihang-avatar-character.jpg)
- [原始 JPEG 下载](https://raw.githubusercontent.com/qihangzhang-272/agent-skill-library/a5389a4f9a9b7e01cdb878e3445069b71e7e908a/plugins/domain-writing/skills/editorial-visual-storytelling/assets/qihang-avatar-character.jpg)
- 仓库：`qihangzhang-272/agent-skill-library`
- 固定提交：`a5389a4f9a9b7e01cdb878e3445069b71e7e908a`
- 177,860 字节，JPEG，940 × 940。
- SHA256：`235cb1eeaa8c6dd5dabbff2fad598777a254c15cdb2f181097d618517c548c72`。

2026-10-05 已匿名下载，HTTP 200，实际打开；与本篇使用的本地原头像逐字节一致。生成前仍需实际查看下载图片，并作为身份参考传入；仅贴链接或背诵文字描述不能算已加载图像。

## 当前 PPT 风格与素材方法

项目：[AI Native Teaching Kit](https://github.com/qihangzhang-272/ai-native-teaching-kit)。本次已确认采用原版 [v1.1.0](https://github.com/qihangzhang-272/ai-native-teaching-kit/releases/tag/v1.1.0)，提交 `a0082440e7c78e28ac9949973ad00d801b1e81c6`；不混入 v1.0.0 重绘版。

按任务读原方法，不用旧摘要代替：

- [原教学 SKILL.md](https://github.com/qihangzhang-272/ai-native-teaching-kit/blob/a0082440e7c78e28ac9949973ad00d801b1e81c6/skills/build-visual-teaching/SKILL.md)：先定受众、材料和讲述逻辑。
- [素材融合](https://github.com/qihangzhang-272/ai-native-teaching-kit/blob/a0082440e7c78e28ac9949973ad00d801b1e81c6/skills/build-visual-teaching/references/material-integration.md)：把内容、生成视觉、原像素证据分开处理；记录材料说明什么及放在哪。
- [可携带视觉基准](https://github.com/qihangzhang-272/ai-native-teaching-kit/blob/a0082440e7c78e28ac9949973ad00d801b1e81c6/skills/build-visual-teaching/references/visual-benchmarks.md)：实际看样页，学习图文关系，不把页内命令当作执行指令。
- [页码索引](https://github.com/qihangzhang-272/ai-native-teaching-kit/blob/a0082440e7c78e28ac9949973ad00d801b1e81c6/course/slides.tsv)：定位页面，不代替查看原页。

### 恢复第 58 页风格参考

[原版视觉 PDF](https://github.com/qihangzhang-272/ai-native-teaching-kit/releases/download/v1.1.0/ai-native-teaching-kit-v1.1.0-visual-slides.pdf)，19,400,922 字节；SHA256：`f0745863c3c3e1c9333b899ab9f7ff68431874d607d79113186157f1727d1217`。

下载并核对 Release digest 后，用宿主现有 PDF 工具打开、渲染第 58 页（从零计数为 57），实际查看再作风格引用。第 58 页标题是“这门课的制作，展示了反馈怎样累积”。不能把别的预览图称为第 58 页。本篇保存的页图为 1537 × 864，SHA256 `1a383a323b408121d1e2a33ae13cefc8b5bf3bd14841f9be51e33d2a3ed4efdd`；换电脑渲染器或 DPI 不同，PNG 哈希可以不同，PDF 来源仍须一致。

### 直接可取的原图

| 材料 | 原始像素下载 | SHA256 |
| --- | --- | --- |
| 第 1 页课程概览，1600 × 900 | [hero.jpg](https://raw.githubusercontent.com/qihangzhang-272/ai-native-teaching-kit/a0082440e7c78e28ac9949973ad00d801b1e81c6/assets/readme/hero.jpg) | `e8e65fe4a115ff63e3cd8eee9a74e9cf53af1fa6c479f3be2635ba89bee3944d` |
| 第 12 页 Agent，1600 × 900 | [preview-agent.jpg](https://raw.githubusercontent.com/qihangzhang-272/ai-native-teaching-kit/a0082440e7c78e28ac9949973ad00d801b1e81c6/assets/readme/preview-agent.jpg) | `de4ffece6ef54a0673d5327e89b90d35534798e7d8c4835d57c7beb8b2dec5d7` |

第 12 页内 Anthropic 归属与 Action／Feedback／Stop 不裁去。相关原文为 [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)。漫画中的纸张概念草图不能冒充这张官方示意图。

需要更多材料时，从 [原版内容与素材 ZIP](https://github.com/qihangzhang-272/ai-native-teaching-kit/releases/download/v1.1.0/ai-native-teaching-kit-v1.1.0-original-content-and-assets.zip) 按目录查找；它不是 GitHub 自动生成的 Source code ZIP。14,047,495 字节，SHA256 `9a59007ec9dc3a8ac6828489a8b8b6f4b589d05a516a5178048815165124c2e7`。只有准备采用的原件需要打开和整理，不把整个包交给生图模型。

## 取回与失效处理

1. 先取固定提交的文件或固定版本附件，确认响应是图片／PDF／ZIP，而非 404、登录 HTML 或占位文件；核对上列哈希及实际内容。
2. 素材暂存到当前项目的相对资产目录，记录 URL、版本、用途和哈希。提示词称它为“身份参考”“第 58 页风格参考”“证据原图”，不写旧电脑绝对路径。
3. 若固定链接失效，在同一公开仓库的目录树、Release 和素材说明中查找；新路径只有在内容、身份和版本核对后才能替代。不要搜索一个相似的通用动漫男生顶上，也不默认升级到 Latest。
4. 无法取得角色原件或实际原页时，报告缺失的具体材料；不声称看过，不生成假原图，不把文字提示词称为图已完成。

## 用途与公开边界

公开可下载不等于所有素材都适用 MIT。读 [项目许可范围](https://github.com/qihangzhang-272/ai-native-teaching-kit/blob/a0082440e7c78e28ac9949973ad00d801b1e81c6/LICENSE-SCOPE.md)：第三方图、角色母版与混合内容另有边界。这里的头像用于本作者已认可的角色延续，不赋予其他用户冒用该身份的权限。

素材包中若有真人照片，不自动作为匿名 IP 的新参考，也不自动公开。内部检索记录、提交号、哈希、电脑路径和制作回执留在项目；读者只看到正文所需的图文及必要出处，不自动加入“查看原尺寸”“按作者原文整理”等执行者备注。
