#!/usr/bin/env python3
"""Render normalized X post data into HTML cards, PNGs, and an optional MP4."""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import tempfile
import urllib.request
import zipfile
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image


MAX_CHARS = 520
X_STATUS_RE = re.compile(r"https?://(?:www\.)?(?:x|twitter)\.com/[^/]+/status/(\d+)", re.IGNORECASE)
MEDIA_HOSTS = {"pbs.twimg.com", "video.twimg.com", "abs.twimg.com"}


STYLE_PRESETS = {
    "blue-paper": {"background": "#f7f1e5", "foreground": "#10224a", "primary": "#1c56d6", "accent": "#f28b22", "panel": "#fff5df", "grid": ".055", "font": '"Microsoft YaHei",sans-serif'},
    "ink-note": {"background": "#f4f0e8", "foreground": "#1f2428", "primary": "#25282c", "accent": "#d84a3a", "panel": "#fffdf7", "grid": ".035", "font": '"Noto Serif SC","SimSun",serif'},
    "terminal": {"background": "#0d1117", "foreground": "#d7fbd0", "primary": "#45d483", "accent": "#f7c948", "panel": "#15211a", "grid": ".09", "font": 'Consolas,"Microsoft YaHei",monospace'},
    "editorial": {"background": "#fffdf8", "foreground": "#161616", "primary": "#161616", "accent": "#d92b2b", "panel": "#f2eee5", "grid": "0", "font": '"Noto Serif SC","SimSun",serif'},
    "cobalt": {"background": "#eaf0ff", "foreground": "#0b1d52", "primary": "#1747c8", "accent": "#ff7a21", "panel": "#ffffff", "grid": ".045", "font": '"Microsoft YaHei",sans-serif'},
    "sunset": {"background": "#fff0e7", "foreground": "#45231e", "primary": "#d74f3f", "accent": "#6f4ad3", "panel": "#fff9f2", "grid": ".03", "font": '"Microsoft YaHei",sans-serif'},
    "mono": {"background": "#f1f1f1", "foreground": "#111111", "primary": "#111111", "accent": "#777777", "panel": "#ffffff", "grid": ".03", "font": 'Arial,"Microsoft YaHei",sans-serif'},
    "notebook": {"background": "#fffdf1", "foreground": "#183153", "primary": "#3478c7", "accent": "#ef5c4a", "panel": "#ffffff", "grid": ".075", "font": '"Microsoft YaHei",sans-serif'},
    "neon": {"background": "#17142a", "foreground": "#f3efff", "primary": "#9d75ff", "accent": "#35e3c2", "panel": "#25203d", "grid": ".08", "font": '"Microsoft YaHei",sans-serif'},
    "forest": {"background": "#edf3e8", "foreground": "#193524", "primary": "#28734a", "accent": "#d8922b", "panel": "#fbfff7", "grid": ".045", "font": '"Microsoft YaHei",sans-serif'},
    "lavender": {"background": "#f4efff", "foreground": "#302451", "primary": "#7656c8", "accent": "#e05f91", "panel": "#fffaff", "grid": ".04", "font": '"Microsoft YaHei",sans-serif'},
}


def post_id_from_url(url: str) -> str:
    match = X_STATUS_RE.fullmatch(url.strip()) or X_STATUS_RE.search(url.strip())
    if not match:
        raise ValueError("expected a public X status URL")
    return match.group(1)


def normalized_author(value: object) -> str:
    return str(value or "").lstrip("@").casefold()


def media_type_from_url(url: str) -> str:
    parsed = urlparse(url)
    suffix = Path(parsed.path).suffix.lower()
    return "video" if parsed.hostname == "video.twimg.com" or suffix in {".mp4", ".mov", ".webm"} else "image"


def normalize_opencli_thread(rows: list[dict[str, object]], source_url: str) -> dict[str, object]:
    focus_id = post_id_from_url(source_url)
    focus = next((row for row in rows if str(row.get("id")) == focus_id), None)
    if not focus:
        raise ValueError(f"retrieval result does not contain focus post {focus_id}")

    focus_author = normalized_author(focus.get("author"))
    selected_ids = {focus_id}
    selected = [focus]
    for row in rows:
        row_id = str(row.get("id", ""))
        if row_id == focus_id:
            continue
        if normalized_author(row.get("author")) == focus_author and str(row.get("in_reply_to", "")) in selected_ids:
            selected.append(row)
            selected_ids.add(row_id)

    excluded: list[dict[str, str]] = []
    for row in rows:
        row_id = str(row.get("id", ""))
        if row_id not in selected_ids:
            excluded.append({"id": row_id, "reason": "different-author-reply"})
    for row in selected:
        quote = row.get("quoted_tweet")
        if isinstance(quote, dict) and quote.get("id"):
            excluded.append({"id": str(quote["id"]), "reason": "quoted-post-body"})

    posts = []
    for row in selected:
        media = [
            {"type": media_type_from_url(str(url)), "url": str(url)}
            for url in row.get("media_urls", []) or []
            if str(url).startswith("http")
        ]
        posts.append(
            {
                "id": str(row.get("id", "")),
                "text": str(row.get("text", "")),
                "created_at": row.get("created_at"),
                "source_url": row.get("url"),
                "media": media,
            }
        )
    return {
        "schema_version": 1,
        "source_url": source_url,
        "author": {"name": str(focus.get("author", "")), "handle": f"@{str(focus.get('author', '')).lstrip('@')}"},
        "posts": posts,
        "selection": {"focus": focus_id, "included": [post["id"] for post in posts], "excluded": excluded},
    }


def fetch_opencli_thread(source_url: str, *, limit: int = 50) -> dict[str, object]:
    executable = shutil.which("opencli")
    if not executable:
        raise RuntimeError("opencli is unavailable; install the Mode's Agent Reach retrieval dependency or provide JSON")
    result = subprocess.run(
        [executable, "twitter", "thread", source_url, "--limit", str(limit), "-f", "json"],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=120,
    )
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "X retrieval failed")
    rows = json.loads(result.stdout)
    if not isinstance(rows, list):
        raise ValueError("opencli returned an unexpected X thread shape")
    return normalize_opencli_thread(rows, source_url)


def timeline_plan(cards: list[dict[str, object]], *, seconds: float) -> list[dict[str, object]]:
    return [
        {
            "card": index,
            "kind": "source-video" if card.get("videos") else "still",
            "duration": None if card.get("videos") else seconds,
            "audio": "source-only" if card.get("videos") else "silence",
            "video": str(card["videos"][0]) if card.get("videos") else None,
        }
        for index, card in enumerate(cards, start=1)
    ]


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


def safe_media_url(url: str) -> None:
    host = (urlparse(url).hostname or "").lower()
    if host not in MEDIA_HOSTS:
        raise ValueError(f"refusing media outside X CDN allowlist: {host or url}")


def download_media(url: str, destination_root: Path, *, index: int) -> Path:
    safe_media_url(url)
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        content_type = response.headers.get_content_type()
        suffix = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp",
            "image/gif": ".gif",
            "video/mp4": ".mp4",
            "video/webm": ".webm",
        }.get(content_type, Path(urlparse(url).path).suffix.lower() or ".bin")
        destination_root.mkdir(parents=True, exist_ok=True)
        destination = destination_root / f"media-{index:03d}{suffix}"
        with destination.open("wb") as handle:
            shutil.copyfileobj(response, handle)
    return destination


def materialize_remote_media(data: dict[str, object], destination_root: Path) -> None:
    counter = 0
    for post in data.get("posts", []):
        if not isinstance(post, dict):
            continue
        for item in post.get("media", []) or []:
            if not isinstance(item, dict) or item.get("path") or not item.get("url"):
                continue
            counter += 1
            item["path"] = str(download_media(str(item["url"]), destination_root, index=counter))


def media_records(post: dict, input_root: Path) -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    for item in post.get("media", []):
        media_type = str(item.get("type", "file"))
        raw_path = item.get("path")
        if not raw_path:
            continue
        path = (input_root / raw_path).resolve() if not Path(raw_path).is_absolute() else Path(raw_path).resolve()
        records.append(
            {
                "type": media_type,
                "path": str(path),
                "exists": str(path.is_file()).lower(),
                "source_url": str(item.get("url", "")),
            }
        )
    return records


def card_html(
    *,
    author: dict,
    body: str,
    source_url: str,
    page: int,
    total: int,
    image: Path | None,
    video_names: list[str],
    style_name: str,
) -> str:
    style = STYLE_PRESETS[style_name]
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
        video_html = f'<div class="video-note">原帖视频将在导出的 MP4 中原位播放：{joined}</div>'
    paragraphs = "".join(f"<p>{html.escape(part)}</p>" for part in body.split("\n") if part.strip())
    return f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><style>
*{{box-sizing:border-box}} html,body{{margin:0;width:1080px;height:1440px;overflow:hidden}}
body{{font-family:{style['font']};background:{style['background']};color:{style['foreground']}}}
.card{{position:relative;width:100%;height:100%;padding:82px 78px 70px;background:
linear-gradient(90deg,color-mix(in srgb,{style['primary']} {float(style['grid']) * 100:.1f}%,transparent) 1px,transparent 1px),
linear-gradient(color-mix(in srgb,{style['primary']} {float(style['grid']) * 100:.1f}%,transparent) 1px,transparent 1px),{style['background']};background-size:42px 42px}}
.rail{{position:absolute;left:34px;top:58px;bottom:58px;width:10px;background:{style['primary']};border-radius:8px}}
.accent{{position:absolute;right:56px;top:52px;width:150px;height:18px;background:{style['accent']};transform:rotate(-2deg);border-radius:12px;opacity:.9}}
.author{{display:flex;align-items:center;gap:18px;padding-bottom:30px;border-bottom:4px solid {style['primary']}}}
.avatar{{width:92px;height:92px;border-radius:50%;object-fit:cover;border:5px solid {style['panel']};box-shadow:0 4px 0 {style['accent']}}}
.name{{font-size:37px;font-weight:800}} .handle{{font-size:25px;color:#53709f;margin-top:4px}}
.body{{font-size:39px;line-height:1.55;font-weight:560;letter-spacing:.2px;margin-top:34px}}
.body p{{margin:0 0 24px}} .media{{display:block;max-width:100%;max-height:430px;margin:30px auto 0;border-radius:24px;object-fit:contain;border:4px solid {style['foreground']};background:{style['panel']}}}
.video-note{{margin-top:28px;padding:19px 24px;border-left:8px solid {style['accent']};background:{style['panel']};font-size:25px;line-height:1.45}}
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


def run_media_command(command: list[str], *, timeout: int = 240) -> None:
    result = subprocess.run(command, capture_output=True, text=True, timeout=timeout)
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "media command failed")


def video_has_audio(path: Path) -> bool:
    ffprobe = shutil.which("ffprobe")
    if not ffprobe:
        return False
    result = subprocess.run(
        [ffprobe, "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_type", "-of", "csv=p=0", str(path)],
        capture_output=True,
        text=True,
        timeout=30,
    )
    return result.returncode == 0 and "audio" in result.stdout


def build_video(images: list[Path], cards: list[dict[str, object]], output: Path, seconds: float) -> list[dict[str, object]]:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg is required for --video")
    plan = timeline_plan(cards, seconds=seconds)
    has_source_video = any(segment["kind"] == "source-video" for segment in plan)
    if not has_source_video:
        concat = output.parent / "cards.ffconcat"
        lines = ["ffconcat version 1.0"]
        for image in images:
            safe = image.resolve().as_posix().replace("'", "'\\''")
            lines.extend([f"file '{safe}'", f"duration {seconds}"])
        safe_last = images[-1].resolve().as_posix().replace("'", "'\\''")
        lines.append(f"file '{safe_last}'")
        concat.write_text("\n".join(lines) + "\n", encoding="utf-8")
        run_media_command(
            [ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(concat), "-vf", "format=yuv420p", "-movflags", "+faststart", str(output)]
        )
        concat.unlink(missing_ok=True)
        return plan

    parts = Path(tempfile.mkdtemp(prefix=".video-parts-", dir=output.parent))
    try:
        segment_paths: list[Path] = []
        for index, (image, segment) in enumerate(zip(images, plan, strict=True), start=1):
            segment_path = parts / f"segment-{index:03d}.mp4"
            video_path = Path(str(segment["video"])) if segment["video"] else None
            if video_path:
                filter_graph = (
                    "[1:v]scale=900:650:force_original_aspect_ratio=decrease[clip];"
                    "[0:v][clip]overlay=(W-w)/2:590:shortest=1,format=yuv420p[outv]"
                )
                command = [ffmpeg, "-y", "-loop", "1", "-i", str(image), "-i", str(video_path)]
                if video_has_audio(video_path):
                    command.extend(
                        ["-filter_complex", filter_graph, "-map", "[outv]", "-map", "1:a:0", "-shortest"]
                    )
                else:
                    command.extend(
                        [
                            "-f",
                            "lavfi",
                            "-i",
                            "anullsrc=channel_layout=stereo:sample_rate=48000",
                            "-filter_complex",
                            filter_graph,
                            "-map",
                            "[outv]",
                            "-map",
                            "2:a:0",
                            "-shortest",
                        ]
                    )
                command.extend(["-c:v", "libx264", "-preset", "medium", "-crf", "20", "-c:a", "aac", "-ar", "48000", str(segment_path)])
            else:
                command = [
                    ffmpeg,
                    "-y",
                    "-loop",
                    "1",
                    "-i",
                    str(image),
                    "-f",
                    "lavfi",
                    "-i",
                    "anullsrc=channel_layout=stereo:sample_rate=48000",
                    "-t",
                    str(seconds),
                    "-map",
                    "0:v:0",
                    "-map",
                    "1:a:0",
                    "-c:v",
                    "libx264",
                    "-preset",
                    "medium",
                    "-crf",
                    "20",
                    "-pix_fmt",
                    "yuv420p",
                    "-c:a",
                    "aac",
                    "-ar",
                    "48000",
                    "-shortest",
                    str(segment_path),
                ]
            run_media_command(command)
            segment_paths.append(segment_path)

        concat = parts / "segments.ffconcat"
        concat.write_text(
            "ffconcat version 1.0\n"
            + "".join(f"file '{path.resolve().as_posix()}'\n" for path in segment_paths),
            encoding="utf-8",
        )
        run_media_command([ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(concat), "-c", "copy", "-movflags", "+faststart", str(output)])
        return plan
    finally:
        shutil.rmtree(parts, ignore_errors=True)


def file_digest(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_contact_sheet(images: list[Path], output: Path) -> None:
    columns = min(4, max(1, len(images)))
    thumb_size = (270, 360)
    rows = (len(images) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * thumb_size[0], rows * thumb_size[1]), "white")
    for index, path in enumerate(images):
        with Image.open(path) as source:
            thumb = source.convert("RGB")
            thumb.thumbnail(thumb_size)
            x = (index % columns) * thumb_size[0] + (thumb_size[0] - thumb.width) // 2
            y = (index // columns) * thumb_size[1] + (thumb_size[1] - thumb.height) // 2
            sheet.paste(thumb, (x, y))
    sheet.save(output)


def package_outputs(output: Path, names: list[str]) -> Path:
    destination = output / "x-cards.zip"
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name in sorted(dict.fromkeys(names)):
            path = output / name
            if path.is_file():
                archive.write(path, arcname=name)
    return destination


def load_source(value: Path | str, *, thread_limit: int) -> tuple[dict[str, object], Path]:
    raw_value = str(value)
    if X_STATUS_RE.search(raw_value):
        return fetch_opencli_thread(raw_value, limit=thread_limit), Path.cwd()
    path = Path(value).resolve()
    return json.loads(path.read_text(encoding="utf-8")), path.parent


def render(
    input_path: Path | str,
    output: Path,
    *,
    html_only: bool = False,
    video: bool = False,
    seconds: float = 4.0,
    style: str = "blue-paper",
    thread_limit: int = 50,
) -> dict:
    if output.exists():
        raise FileExistsError(f"output directory already exists: {output}")
    if style not in STYLE_PRESETS:
        raise ValueError(f"unknown style: {style}")
    data, input_root = load_source(input_path, thread_limit=thread_limit)
    posts = data.get("posts")
    if not isinstance(posts, list) or not posts:
        raise ValueError("input must contain a non-empty posts array")

    output.mkdir(parents=True)
    materialize_remote_media(data, output / "source-assets")
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
        videos = [Path(item["path"]) for item in media if item["type"] == "video" and item["exists"] == "true"]
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
                video_names=[Path(path).name for path in card["videos"]],
                style_name=style,
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
    timeline = None
    if video:
        if not png_paths:
            raise RuntimeError("--video requires browser-rendered PNG cards")
        video_path = output / "cards.mp4"
        timeline = build_video(png_paths, cards, video_path, seconds)

    contact_sheet = None
    if png_paths:
        contact_sheet = output / "contact-sheet.png"
        build_contact_sheet(png_paths, contact_sheet)

    manifest = {
        "schemaVersion": 1,
        "sourceUrl": data.get("source_url", ""),
        "author": {"name": author.get("name", ""), "handle": author.get("handle", "")},
        "style": style,
        "selection": data.get("selection"),
        "cards": generated,
        "media": all_media,
        "video": video_path.name if video_path else None,
        "timeline": timeline,
        "contactSheet": contact_sheet.name if contact_sheet else None,
        "zip": "x-cards.zip",
    }
    manifest_path = output / "cards.json"
    content_names = [str(record["html"]) for record in generated]
    content_names.extend(str(record["png"]) for record in generated if record.get("png"))
    if video_path:
        content_names.append(video_path.name)
    if contact_sheet:
        content_names.append(contact_sheet.name)

    qa_files = []
    for name in content_names:
        path = output / name
        record: dict[str, object] = {"path": name, "bytes": path.stat().st_size, "sha256": file_digest(path)}
        if path.suffix.lower() == ".png":
            with Image.open(path) as image:
                record["dimensions"] = [image.width, image.height]
        qa_files.append(record)
    manifest["qa"] = {"files": qa_files, "cardDimensions": [1080, 1440] if png_paths else None}
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    package_outputs(output, content_names + ["cards.json"])
    return manifest


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", nargs="?", help="Normalized JSON path or a public X status URL")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--html-only", action="store_true")
    parser.add_argument("--video", action="store_true")
    parser.add_argument("--seconds-per-card", type=float, default=4.0)
    parser.add_argument("--style", choices=tuple(STYLE_PRESETS), default="blue-paper")
    parser.add_argument("--thread-limit", type=int, default=50)
    parser.add_argument("--list-styles", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.list_styles:
        print(json.dumps({"styles": list(STYLE_PRESETS)}, ensure_ascii=False, indent=2))
        return 0
    if not args.input or not args.output:
        raise SystemExit("input and --output are required unless --list-styles is used")
    manifest = render(
        args.input,
        args.output.resolve(),
        html_only=args.html_only,
        video=args.video,
        seconds=args.seconds_per_card,
        style=args.style,
        thread_limit=args.thread_limit,
    )
    print(json.dumps({"ok": True, "cards": len(manifest["cards"]), "output": str(args.output.resolve())}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
