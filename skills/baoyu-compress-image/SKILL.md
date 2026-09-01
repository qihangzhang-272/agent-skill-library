---
name: baoyu-compress-image
description: Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to "compress image", "optimize image", "convert to webp", or reduce image file size.
metadata:
  version: 1.56.1
  openclaw:
    homepage: https://github.com/JimLiu/baoyu-skills#baoyu-compress-image
    requires:
      anyBins:
        - bun
        - npx
---

# Image Compressor

Compresses images using best available tool (sips → cwebp → ImageMagick → Sharp).

## Script Directory

Scripts in `scripts/` subdirectory. `{baseDir}` = this SKILL.md's directory path. Resolve `${BUN_X}` runtime: if `bun` installed → `bun`; if `npx` available → `npx -y bun`; else suggest installing bun. Replace `{baseDir}` and `${BUN_X}` with actual values.

| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | Image compression CLI |

## Preferences (EXTEND.md)

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | `.baoyu-skills/baoyu-compress-image/EXTEND.md` | Project |
| 2 | `${XDG_CONFIG_HOME:-$HOME/.config}/baoyu-skills/baoyu-compress-image/EXTEND.md` | XDG |
| 3 | `$HOME/.baoyu-skills/baoyu-compress-image/EXTEND.md` | User home |

If none found, use defaults.

**EXTEND.md supports**: Default format, default quality, keep-original preference.

## Usage

```bash
${BUN_X} {baseDir}/scripts/main.ts <input> [options]
```

## Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `<input>` | | File or directory | Required |
| `--output` | `-o` | Output path | Same path, new ext |
| `--format` | `-f` | webp, png, jpeg | webp |
| `--quality` | `-q` | Quality 0-100 | 80 |
| `--keep` | `-k` | Keep original | false |
| `--recursive` | `-r` | Process subdirs | false |
| `--json` | | JSON output | false |

## Examples

```bash
# Single file → WebP (replaces original)
${BUN_X} {baseDir}/scripts/main.ts image.png

# Keep PNG format
${BUN_X} {baseDir}/scripts/main.ts image.png -f png --keep

# Directory recursive
${BUN_X} {baseDir}/scripts/main.ts ./images/ -r -q 75

# JSON output
${BUN_X} {baseDir}/scripts/main.ts image.png --json
```

**Output**:
```
image.png → image.webp (245KB → 89KB, 64% reduction)
```

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.

## 运行依赖

- 包内压缩脚本需要 `bun`，没有 Bun 时使用 `npx -y bun`；两者都不存在时只报告缺失，不改写原图。
- 检查方式：运行 `bun --version`，失败后再检查 `npx --version`。

## 完成标准

- 完成本 Skill 正文中 Mode、Output、Handoff 或最终交付步骤声明的全部适用产物，不因它处在较大任务中而缩减。
- 执行正文已有的检查清单、视觉检查、平台兼容检查或事实检查；不适用项说明理由，失败项先在本 Skill 内返工。
- 返回用户可直接使用或交给下一个完整 Skill 的独立产物，并明确仍需用户授权的外部写入。

