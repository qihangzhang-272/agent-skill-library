from __future__ import annotations

import importlib.util
import json
from pathlib import Path


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
