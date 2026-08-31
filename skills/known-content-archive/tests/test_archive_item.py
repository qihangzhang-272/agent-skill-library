from __future__ import annotations

import importlib.util
import json
from pathlib import Path


SCRIPT = Path(__file__).parents[1] / "scripts" / "archive_item.py"
SPEC = importlib.util.spec_from_file_location("archive_item", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_builds_immutable_package(tmp_path: Path) -> None:
    text = tmp_path / "input.md"
    text.write_text("hello archive", encoding="utf-8")
    asset = tmp_path / "image.png"
    asset.write_bytes(b"not-a-real-image")

    package = MODULE.build_package(
        source="https://example.com/item",
        title="Known Item",
        output_root=tmp_path / "archives",
        text_file=text,
        assets=[asset],
        retrieved_at="2026-08-31T00:00:00+00:00",
    )

    manifest = json.loads((package / "source.json").read_text(encoding="utf-8"))
    assert manifest["source"]["platform"] == "web"
    assert manifest["content"]["sha256"]
    assert manifest["assets"][0]["path"] == "assets/image.png"
    assert (package / "receipt.md").is_file()


def test_refuses_to_overwrite_package(tmp_path: Path) -> None:
    output = tmp_path / "archives"
    MODULE.build_package(source="local:a", title="Same", output_root=output, slug="same")

    try:
        MODULE.build_package(source="local:b", title="Same", output_root=output, slug="same")
    except FileExistsError:
        pass
    else:
        raise AssertionError("existing archive package was overwritten")


def test_chinese_title_gets_stable_fallback_slug() -> None:
    slug = MODULE.make_slug("一篇文章", "https://example.com/cn")
    assert slug.startswith("content-")
    assert len(slug) == 18
