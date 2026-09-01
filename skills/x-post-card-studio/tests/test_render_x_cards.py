from __future__ import annotations

import importlib.util
import json
import shutil
import subprocess
from pathlib import Path

from PIL import Image


SCRIPT = Path(__file__).parents[1] / "scripts" / "render_x_cards.py"
SPEC = importlib.util.spec_from_file_location("render_x_cards", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_split_text_preserves_content() -> None:
    source = "第一段。" * 90
    chunks = MODULE.split_text(source, limit=120)
    assert len(chunks) > 1
    assert "".join(chunks) == source


def test_html_only_render_builds_manifest(tmp_path: Path) -> None:
    source = tmp_path / "source.json"
    source.write_text(
        json.dumps(
            {
                "source_url": "https://x.com/example/status/1",
                "author": {"name": "Example", "handle": "@example"},
                "posts": [{"text": "一条可以独立读懂的内容。"}],
            },
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    output = tmp_path / "cards"
    manifest = MODULE.render(source, output, html_only=True)
    assert len(manifest["cards"]) == 1
    assert (output / "card-01.html").is_file()
    assert (output / "cards.json").is_file()
    assert (output / "x-cards.zip").is_file()


def test_render_refuses_existing_output(tmp_path: Path) -> None:
    source = tmp_path / "source.json"
    source.write_text('{"posts":[{"text":"hello"}]}', encoding="utf-8")
    output = tmp_path / "cards"
    output.mkdir()
    try:
        MODULE.render(source, output, html_only=True)
    except FileExistsError:
        pass
    else:
        raise AssertionError("existing output directory was reused")


def test_normalizes_only_same_author_direct_thread() -> None:
    rows = [
        {
            "id": "100",
            "author": "maker",
            "text": "root",
            "url": "https://x.com/maker/status/100",
            "media_urls": ["https://pbs.twimg.com/media/root.jpg"],
            "quoted_tweet": {"id": "90", "text": "quoted body must not be copied"},
        },
        {
            "id": "101",
            "author": "other",
            "text": "unrelated reply",
            "in_reply_to": "100",
            "url": "https://x.com/other/status/101",
        },
        {
            "id": "102",
            "author": "maker",
            "text": "continuation",
            "in_reply_to": "100",
            "url": "https://x.com/maker/status/102",
        },
        {
            "id": "103",
            "author": "maker",
            "text": "last",
            "in_reply_to": "102",
            "url": "https://x.com/maker/status/103",
        },
    ]

    normalized = MODULE.normalize_opencli_thread(rows, "https://x.com/maker/status/100")

    assert [post["id"] for post in normalized["posts"]] == ["100", "102", "103"]
    assert "quoted body" not in json.dumps(normalized, ensure_ascii=False)
    assert normalized["selection"]["excluded"] == [
        {"id": "101", "reason": "different-author-reply"},
        {"id": "90", "reason": "quoted-post-body"},
    ]


def test_exposes_eleven_distinct_visual_styles() -> None:
    assert len(MODULE.STYLE_PRESETS) == 11
    assert len(set(MODULE.STYLE_PRESETS)) == 11
    assert all("background" in style for style in MODULE.STYLE_PRESETS.values())


def test_timeline_uses_source_video_only_on_its_card(tmp_path: Path) -> None:
    clip = tmp_path / "clip.mp4"
    clip.write_bytes(b"fixture")
    cards = [
        {"videos": []},
        {"videos": [clip]},
        {"videos": []},
    ]

    timeline = MODULE.timeline_plan(cards, seconds=4.0)

    assert [segment["kind"] for segment in timeline] == ["still", "source-video", "still"]
    assert timeline[1]["audio"] == "source-only"
    assert timeline[0]["audio"] == "silence"


def test_real_render_embeds_native_video_and_builds_delivery_files(tmp_path: Path) -> None:
    ffmpeg = shutil.which("ffmpeg")
    ffprobe = shutil.which("ffprobe")
    if not ffmpeg or not ffprobe or not MODULE.find_browser():
        return

    clip = tmp_path / "clip.mp4"
    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-f",
            "lavfi",
            "-i",
            "testsrc=size=320x180:rate=24",
            "-f",
            "lavfi",
            "-i",
            "sine=frequency=440:sample_rate=48000",
            "-t",
            "1",
            "-pix_fmt",
            "yuv420p",
            "-c:v",
            "libx264",
            "-c:a",
            "aac",
            str(clip),
        ],
        check=True,
        capture_output=True,
        text=True,
        timeout=60,
    )
    source = tmp_path / "source.json"
    source.write_text(
        json.dumps(
            {
                "source_url": "https://x.com/example/status/1",
                "author": {"name": "Example", "handle": "@example"},
                "posts": [{"text": "带原生视频的一条内容。", "media": [{"type": "video", "path": "clip.mp4"}]}],
            },
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    output = tmp_path / "cards"
    manifest = MODULE.render(source, output, video=True, seconds=0.5, style="ink-note")

    assert (output / "cards.mp4").is_file()
    assert (output / "contact-sheet.png").is_file()
    assert (output / "x-cards.zip").is_file()
    assert manifest["timeline"][0]["audio"] == "source-only"
    with Image.open(output / "card-01.png") as card:
        assert card.size == (1080, 1440)
    audio = subprocess.run(
        [ffprobe, "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=codec_type", "-of", "csv=p=0", str(output / "cards.mp4")],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    )
    assert "audio" in audio.stdout
