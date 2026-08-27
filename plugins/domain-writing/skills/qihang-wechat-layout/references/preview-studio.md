# 启航个人样式工作台

## 目的

`06-final.studio.html` 同时承载真实文章、实时控制面板和启航已经确认的个人样式集。未选择的效果不进入工作台。

## 构建

在本技能目录运行：

```powershell
bun scripts/build-preview.ts --html <run-folder>\06-final.html
```

默认输出 `<run-folder>\06-final.studio.html`。指定路径时使用：

```powershell
bun scripts/build-preview.ts --html <input.html> --output <output.html>
```

命令输出 JSON，其中 `studioPath` 是生成文件，`variantCount` 必须为 `11`。

## 个人样式目录

- 主题：航·编辑蓝、航·云蓝留白、航·纸墨档案、航·暖橙手记、航·雾紫叙事。
- 一级标题：刊头双线（默认）、居中细线。
- 二级标题：编号底线（默认）、居中栏目。
- 三级标题：荧光底线。
- 引用块：居中金句（默认）、衬线大引语。
- 重点标签：主色强调。
- 有序列表：双位编号。
- 无序列表：圆角对勾。
- 表格：极简横线。
- 文字控制：文章字体；H1–H6、正文、引用和重点标签的字号与字重。
- 间距控制：段后、标题上、标题下、图片上和图片下。

页面底部必须出现 11 张 `data-preview-variant` 效果卡。

## 使用边界

- 上半区在真实文章上实时切换，底部陈列个人样式集。
- `677` 与 `375` 切换只改变预览宽度。
- “复制设置”复制本次选择 JSON；“复制当前排版”复制计算后的富文本。
- 临时选择不会改写 `06-final.md`、`05.5-visual-plan.md` 或生产主题。
- `defaults` 中的样式直接用于正式 HTML；临时切换备选不会自动改写默认值。
