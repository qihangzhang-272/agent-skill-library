#!/usr/bin/env python3
"""Turn a host retrieval receipt into one immutable archive run."""

from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
import tempfile
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parent))
from archive_item import build_package  # noqa: E402


VALID_STATUSES = {"ready", "unavailable"}


def resolve_file(root: Path, value: str | None) -> Path | None:
    if not value:
        return None
    path = Path(value)
    return path.resolve() if path.is_absolute() else (root / path).resolve()


def record_for(item: dict[str, object], *, index: int, status: str, **extra: object) -> dict[str, object]:
    return {
        "index": index,
        "source": str(item.get("source", "")),
        "title": str(item.get("title", "")),
        "status": status,
        **extra,
    }


def archive_batch(receipt_path: Path, output: Path) -> dict[str, object]:
    receipt_path = receipt_path.resolve()
    output = output.resolve()
    if output.exists():
        raise FileExistsError(f"archive run already exists: {output}")

    data = json.loads(receipt_path.read_text(encoding="utf-8"))
    items = data.get("items")
    if not isinstance(items, list):
        raise ValueError("retrieval receipt must contain an items array")

    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = Path(tempfile.mkdtemp(prefix=f".{output.name}-", dir=output.parent))
    records: list[dict[str, object]] = []
    failures: list[dict[str, object]] = []
    counts = {"archived": 0, "unavailable": 0, "failed": 0}
    try:
        for index, raw_item in enumerate(items, start=1):
            if not isinstance(raw_item, dict):
                item: dict[str, object] = {}
                record = record_for(item, index=index, status="failed", reason="item must be an object")
                records.append(record)
                failures.append(record)
                counts["failed"] += 1
                continue

            item = raw_item
            source = str(item.get("source", "")).strip()
            title = str(item.get("title", "")).strip()
            status = str(item.get("status", "ready"))
            if status not in VALID_STATUSES:
                record = record_for(item, index=index, status="failed", reason=f"unsupported status: {status}")
                records.append(record)
                failures.append(record)
                counts["failed"] += 1
                continue
            if status == "unavailable":
                record = record_for(
                    item,
                    index=index,
                    status="unavailable",
                    reason=str(item.get("reason", "retrieval unavailable")),
                )
                records.append(record)
                failures.append(record)
                counts["unavailable"] += 1
                continue
            if not source or not title:
                record = record_for(item, index=index, status="failed", reason="source and title are required")
                records.append(record)
                failures.append(record)
                counts["failed"] += 1
                continue

            try:
                content = resolve_file(receipt_path.parent, item.get("content_file"))
                assets = [
                    resolved
                    for value in item.get("assets", [])
                    if (resolved := resolve_file(receipt_path.parent, str(value))) is not None
                ]
                package = build_package(
                    source=source,
                    title=title,
                    output_root=temporary,
                    slug=str(item["slug"]) if item.get("slug") else None,
                    platform=str(item["platform"]) if item.get("platform") else None,
                    retrieved_at=str(item["retrieved_at"]) if item.get("retrieved_at") else None,
                    text_file=content,
                    assets=assets,
                    access=str(item.get("access", "public-or-local")),
                )
                record = record_for(item, index=index, status="archived", package=package.name)
                records.append(record)
                counts["archived"] += 1
            except Exception as error:
                record = record_for(item, index=index, status="failed", reason=str(error))
                records.append(record)
                failures.append(record)
                counts["failed"] += 1

        summary: dict[str, object] = {
            "schemaVersion": 1,
            "collection": data.get("collection"),
            "sourceReceipt": receipt_path.name,
            "counts": counts,
        }
        (temporary / "archive-manifest.jsonl").write_text(
            "".join(json.dumps(record, ensure_ascii=False) + "\n" for record in records),
            encoding="utf-8",
        )
        (temporary / "failures.json").write_text(
            json.dumps(failures, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        (temporary / "run-summary.json").write_text(
            json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        os.replace(temporary, output)
        return summary
    except Exception:
        shutil.rmtree(temporary, ignore_errors=True)
        raise


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("receipt", type=Path, help="JSON receipt produced by the current Host retrieval route")
    parser.add_argument("--output", required=True, type=Path)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    summary = archive_batch(args.receipt, args.output)
    print(json.dumps({"ok": True, **summary, "output": str(args.output.resolve())}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
