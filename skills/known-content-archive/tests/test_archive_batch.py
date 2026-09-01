from __future__ import annotations

import importlib.util
import json
from pathlib import Path


SCRIPT = Path(__file__).parents[1] / "scripts" / "archive_batch.py"
SPEC = importlib.util.spec_from_file_location("archive_batch", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_archives_ready_items_and_records_unavailable_items(tmp_path: Path) -> None:
    content = tmp_path / "article.md"
    content.write_text("retrieved article", encoding="utf-8")
    receipt = tmp_path / "retrieval.json"
    receipt.write_text(
        json.dumps(
            {
                "collection": "two supplied URLs",
                "items": [
                    {
                        "source": "https://example.com/article",
                        "title": "Retrieved article",
                        "status": "ready",
                        "content_file": "article.md",
                        "retrieved_at": "2026-09-01T00:00:00+00:00",
                    },
                    {
                        "source": "https://example.com/private",
                        "title": "Unavailable article",
                        "status": "unavailable",
                        "reason": "login required",
                    },
                ],
            },
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    output = tmp_path / "archive-run"
    summary = MODULE.archive_batch(receipt, output)

    assert summary["counts"] == {"archived": 1, "unavailable": 1, "failed": 0}
    assert (output / "retrieved-article" / "source.json").is_file()
    records = [json.loads(line) for line in (output / "archive-manifest.jsonl").read_text(encoding="utf-8").splitlines()]
    assert [record["status"] for record in records] == ["archived", "unavailable"]
    failures = json.loads((output / "failures.json").read_text(encoding="utf-8"))
    assert failures[0]["reason"] == "login required"


def test_batch_keeps_a_failure_without_losing_successes(tmp_path: Path) -> None:
    receipt = tmp_path / "retrieval.json"
    receipt.write_text(
        json.dumps(
            {
                "items": [
                    {"source": "local:metadata", "title": "Metadata only", "status": "ready"},
                    {
                        "source": "local:missing",
                        "title": "Missing file",
                        "status": "ready",
                        "content_file": "missing.md",
                    },
                ]
            }
        ),
        encoding="utf-8",
    )

    output = tmp_path / "archive-run"
    summary = MODULE.archive_batch(receipt, output)

    assert summary["counts"] == {"archived": 1, "unavailable": 0, "failed": 1}
    assert (output / "metadata-only" / "source.json").is_file()
    failures = json.loads((output / "failures.json").read_text(encoding="utf-8"))
    assert failures[0]["status"] == "failed"
    assert "missing.md" in failures[0]["reason"]


def test_batch_refuses_existing_output(tmp_path: Path) -> None:
    receipt = tmp_path / "retrieval.json"
    receipt.write_text('{"items": []}', encoding="utf-8")
    output = tmp_path / "archive-run"
    output.mkdir()

    try:
        MODULE.archive_batch(receipt, output)
    except FileExistsError:
        pass
    else:
        raise AssertionError("existing batch output was reused")
