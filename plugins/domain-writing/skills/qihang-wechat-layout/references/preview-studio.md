# 启航全量排版工作台

## 目的

`06-final.studio.html` 是一张完整的排版试验台。它同时承载真实文章、实时控制面板和全部效果陈列，不先替用户筛选，也不隐藏复杂效果。

## 构建

在本技能目录运行：

```powershell
bun scripts/build-preview.ts --html <run-folder>\06-final.html
```

默认输出 `<run-folder>\06-final.studio.html`。指定路径时使用：

```powershell
bun scripts/build-preview.ts --html <input.html> --output <output.html>
```

命令输出 JSON，其中 `studioPath` 是生成文件，`variantCount` 必须为 `75`。

## 全量目录

- 主题：航·编辑蓝、航·云蓝留白、航·纸墨档案、航·暖橙手记、航·雾紫叙事。
- 正文组件：16 种标题效果可应用到 H1–H6；另有引用块、代码块、行内代码、加粗、斜体、有序列表、无序列表、表格、分隔线和链接。
- 图片形态：跟随主题、直角、圆角、阴影、圆角加阴影、描边、圆角加描边。
- 文字控制：文章字体；H1–H6、正文、引用、代码、加粗和斜体的字号与字重。
- 间距控制：段后、标题上、标题下、图片上和图片下。

组件共 69 种样式，图片另有 6 种非默认形态；页面底部必须出现 75 张 `data-preview-variant` 效果卡。

## 使用边界

- 上半区在真实文章上实时切换，底部陈列全部效果。
- `677` 与 `375` 切换只改变预览宽度。
- “复制设置”复制本次选择 JSON；“复制当前排版”复制计算后的富文本。
- 临时选择不会改写 `06-final.md`、`05.5-visual-plan.md` 或生产主题。
- 用户确认某组设置后，再更新 `qihang-editorial.json` 或当篇明确指定的主题，并重新渲染正式 HTML。
