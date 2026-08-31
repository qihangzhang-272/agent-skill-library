#!/usr/bin/env python3
"""Render normalized X post data into HTML cards, PNGs, and an optional MP4."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import subprocess
from pathlib import Path


MAX_CHARS = 520


def split_text(text: str, limit: int = MAX_CHARS) -> list[str]:
    clean = re.sub(r"[ \t]+", " ", text.replace("\r\n", "\n")).strip()
    if not clean:
        raise ValueError("post text must not be empty")
    if len(clean) <= limit:
        return [clean]

    pieces: list[str] = []
    remaining = clean
    preferred = "\n。！？!?；;，, "
    while len(remaining) > limit:
        window = remaining[: limit + 1]
        cut = max(window.rfind(mark) for mark in preferred)
        if cut < max(80, limit // 2):
            cut = limit
        else:
            cut += 1
        pieces.append(remaining[:cut].strip())
        remaining = remaining[cut:].lstrip()
    if remaining:
        pieces.append(remaining)
    return pieces


def find_browser() -> str | None:
    configured = os.environ.get("CHROME_PATH")
    candidates = [
        configured,
        shutil.which("chrome"),
        shutil.which("google-chrome"),
        shutil.which("msedge"),
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    ]
    return next((str(path) for path in candidates if path and Path(path).is_file()), None)


def media_records(post: dict, input_root: Path) -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    for item in post.get("media", []):
        media_type = str(item.get("type", "file"))
        raw_path = item.get("path")
        if not raw_path:
            continue
        path = (input_root / raw_path).resolve() if not Path(raw_path).is_absolute() else Path(raw_path).resolve()
        records.append({"type": media_type, "path": str(path), "exists": str(path.is_file()).lower()})
    return records


def card_html(*, author: dict, body: str, source_url: str, page: int, total: int, image: Path | None, video_names: list[str]) -> str:
    avatar = author.get("avatar")
    avatar_html = ""
    if avatar:
        avatar_path = Path(str(avatar))
        if avatar_path.is_file():
            avatar_html = f'<img class="avatar" src="{html.escape(avatar_path.resolve().as_uri())}">'
    image_html = f'<img class="media" src="{html.escape(image.as_uri())}">' if image else ""
    video_html = ""
    if video_names:
        joined = "、".join(html.escape(name) for name in video_names)
        video_html = f'<div class="video-note">原帖视频已作为独立素材保留：{joined}</div>'
    paragraphs = "".join(f"<p>{html.escape(part)}</p>" for part in body.split("\n") if part.strip())
    return f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><style>
*{{box-sizing:border-box}} html,body{{margin:0;width:1080px;height:1440px;overflow:hidden}}
body{{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;background:#f7f1e5;color:#10224a}}
.card{{position:relative;width:100%;height:100%;padding:82px 78px 70px;background:
linear-gradient(90deg,rgba(28,86,214,.06) 1px,transparent 1px),
linear-gradient(rgba(28,86,214,.05) 1px,transparent 1px),#f7f1e5;background-size:42px 42px}}
.rail{{position:absolute;left:34px;top:58px;bottom:58px;width:10px;background:#1c56d6;border-radius:8px}}
.accent{{position:absolute;right:56px;top:52px;width:150px;height:18px;background:#f28b22;transform:rotate(-2deg);border-radius:12px;opacity:.9}}
.author{{display:flex;align-items:center;gap:18px;padding-bottom:30px;border-bottom:4px solid #1c56d6}}
.avatar{{width:92px;height:92px;border-radius:50%;object-fit:cover;border:5px solid #fff;box-shadow:0 4px 0 #f28b22}}
.name{{font-size:37px;font-weight:800}} .handle{{font-size:25px;color:#53709f;margin-top:4px}}
.body{{font-size:39px;line-height:1.55;font-weight:560;letter-spacing:.2px;margin-top:34px}}
.body p{{margin:0 0 24px}} .media{{display:block;max-width:100%;max-height:430px;margin:30px auto 0;border-radius:24px;object-fit:contain;border:4px solid #10224a;background:#fff}}
.video-note{{margin-top:28px;padding:19px 24px;border-left:8px solid #f28b22;background:#fff5df;font-size:25px;line-height:1.45}}
.footer{{position:absolute;left:78px;right:70px;bottom:54px;display:flex;justify-content:space-between;gap:24px;font-size:22px;color:#60708e}}
.source{{max-width:770px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
</style></head><body><main class="card"><div class="rail"></div><div class="accent"></div>
<header class="author">{avatar_html}<div><div class="name">{html.escape(str(author.get('name','Unknown author')))}</div><div class="handle">{html.escape(str(author.get('handle','')))}</div></div></header>
<section class="body">{paragraphs}{image_html}{video_html}</section>
<footer class="footer"><span class="source">{html.escape(source_url)}</span><span>{page}/{total}</span></footer>
</main></body></html>"""


def screenshot(browser: str, html_path: Path, png_path: Path) -> None:
    command = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--allow-file-access-from-files",
        "--force-device-scale-factor=1",
        "--window-size=1080,1440",
        "--run-all-compositor-stages-before-draw",
        f"--screenshot={png_path}",
        html_path.as_uri(),
    ]
    result = subprocess.run(command, capture_output=True, text=True, timeout=60)
    if result.returncode or not png_path.is_file():
        raise RuntimeError(result.stderr.strip() or "browser did not create screenshot")


def build_video(images: list[Path], output: Path, seconds: float) -> None:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg is required for --video")
    concat = output.parent / "cards.ffconcat"
    lines = ["ffconcat version 1.0"]
    for image in images:
        safe = image.resolve().as_posix().replace("'", "'\\''")
        lines.extend([f"file '{safe}'", f"duration {seconds}"])
    safe_last = images[-1].resolve().as_posix().replace("'", "'\\''")
    lines.append(f"file '{safe_last}'")
    concat.write_text("\n".join(lines) + "\n", encoding="utf-8")
    command = [
        ffmpeg,
        "-y",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        str(concat),
        "-vf",
        "format=yuv420p",
        "-movflags",
        "+faststart",
        str(output),
    ]
    result = subprocess.run(command, capture_output=True, text=True, timeout=180)
    if result.returncode or not output.is_file():
        raise RuntimeError(result.stderr.strip() or "ffmpeg did not create video")


def render(input_path: Path, output: Path, *, html_only: bool = False, video: bool = False, seconds: float = 4.0) -> dict:
    if output.exists():
        raise FileExistsError(f"output directory already exists: {output}")
    data = json.loads(input_path.read_text(encoding="utf-8"))
    posts = data.get("posts")
    if not isinstance(posts, list) or not posts:
        raise ValueError("input must contain a non-empty posts array")

    input_root = input_path.resolve().parent
    author = dict(data.get("author") or {})
    if author.get("avatar"):
        avatar = Path(str(author["avatar"]))
        author["avatar"] = str((input_root / avatar).resolve() if not avatar.is_absolute() else avatar.resolve())

    cards: list[dict[str, object]] = []
    all_media: list[dict[str, str]] = []
    for post_index, post in enumerate(posts, start=1):
        chunks = split_text(str(post.get("text", "")))
        media = media_records(post, input_root)
        all_media.extend({"post": str(post_index), **item} for item in media)
        images = [Path(item["path"]) for item in media if item["type"] == "image" and item["exists"] == "true"]
        videos = [Path(item["path"]).name for item in media if item["type"] == "video"]
        for chunk_index, chunk in enumerate(chunks, start=1):
            cards.append(
                {
                    "post": post_index,
                    "part": chunk_index,
                    "text": chunk,
                    "image": images[0] if chunk_index == 1 and images else None,
                    "videos": videos if chunk_index == 1 else [],
                }
            )

    output.mkdir(parents=True)
    browser = None if html_only else find_browser()
    if not html_only and not browser:
        raise RuntimeError("Chrome or Edge not found; use --html-only only for diagnosis")

    generated: list[dict[str, object]] = []
    png_paths: list[Path] = []
    for index, card in enumerate(cards, start=1):
        stem = f"card-{index:02d}"
        html_path = output / f"{stem}.html"
        html_path.write_text(
            card_html(
                author=author,
                body=str(card["text"]),
                source_url=str(data.get("source_url", "")),
                page=index,
                total=len(cards),
                image=card["image"],
                video_names=list(card["videos"]),
            ),
            encoding="utf-8",
        )
        record: dict[str, object] = {
            "index": index,
            "post": card["post"],
            "part": card["part"],
            "html": html_path.name,
        }
        if browser:
            png_path = output / f"{stem}.png"
            screenshot(browser, html_path, png_path)
            png_paths.append(png_path)
            record["png"] = png_path.name
        generated.append(record)

    video_path = None
    if video:
        if not png_paths:
            raise RuntimeError("--video requires browser-rendered PNG cards")
        video_path = output / "cards.mp4"
        build_video(png_paths, video_path, seconds)

    manifest = {
        "schemaVersion": 1,
        "sourceUrl": data.get("source_url", ""),
        "author": {"name": author.get("name", ""), "handle": author.get("handle", "")},
        "cards": generated,
        "media": all_media,
        "video": video_path.name if video_path else None,
    }
    (output / "cards.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return manifest


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--html-only", action="store_true")
    parser.add_argument("--video", action="store_true")
    parser.add_argument("--seconds-per-card", type=float, default=4.0)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    manifest = render(
        args.input.resolve(),
        args.output.resolve(),
        html_only=args.html_only,
        video=args.video,
        seconds=args.seconds_per_card,
    )
    print(json.dumps({"ok": True, "cards": len(manifest["cards"]), "output": str(args.output.resolve())}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
