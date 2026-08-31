#!/usr/bin/env python3
"""Build an immutable local package from content that has already been retrieved."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


SLUG_RE = re.compile(r"[^a-z0-9]+")


def file_digest(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def make_slug(title: str, source: str) -> str:
    base = SLUG_RE.sub("-", title.lower()).strip("-")[:56]
    if base:
        return base
    suffix = hashlib.sha256(f"{title}\n{source}".encode("utf-8")).hexdigest()[:10]
    return f"content-{suffix}"


def validate_slug(value: str) -> str:
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,79}", value):
        raise ValueError("slug must contain only lowercase letters, digits, and hyphens")
    return value


def infer_platform(source: str) -> str:
    host = (urlparse(source).hostname or "").lower()
    if not host:
        return "local"
    for label, domains in {
        "x": ("x.com", "twitter.com"),
        "wechat": ("mp.weixin.qq.com",),
        "xiaohongshu": ("xiaohongshu.com", "xhslink.com"),
        "douyin": ("douyin.com",),
        "bilibili": ("bilibili.com", "b23.tv"),
        "youtube": ("youtube.com", "youtu.be"),
        "xiaoyuzhou": ("xiaoyuzhoufm.com",),
    }.items():
        if any(host == domain or host.endswith(f".{domain}") for domain in domains):
            return label
    return "web"


def copy_with_digest(source: Path, destination: Path) -> dict[str, object]:
    if not source.is_file():
        raise FileNotFoundError(source)
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)
    return {
        "path": destination.name if destination.parent.name != "assets" else f"assets/{destination.name}",
        "bytes": destination.stat().st_size,
        "sha256": file_digest(destination),
    }


def unique_asset_name(path: Path, used: set[str]) -> str:
    candidate = path.name
    index = 2
    while candidate.lower() in used:
        candidate = f"{path.stem}-{index}{path.suffix}"
        index += 1
    used.add(candidate.lower())
    return candidate


def build_package(
    *,
    source: str,
    title: str,
    output_root: Path,
    slug: str | None = None,
    platform: str | None = None,
    retrieved_at: str | None = None,
    text_file: Path | None = None,
    assets: list[Path] | None = None,
    access: str = "public-or-local",
) -> Path:
    output_root = output_root.resolve()
    output_root.mkdir(parents=True, exist_ok=True)
    package_slug = validate_slug(slug) if slug else make_slug(title, source)
    destination = output_root / package_slug
    if destination.exists():
        raise FileExistsError(f"archive package already exists: {destination}")

    temp_path = Path(tempfile.mkdtemp(prefix=f".{package_slug}-", dir=output_root))
    try:
        content_record = None
        if text_file:
            suffix = text_file.suffix.lower() or ".txt"
            content_record = copy_with_digest(text_file.resolve(), temp_path / f"content{suffix}")

        asset_records: list[dict[str, object]] = []
        used_names: set[str] = set()
        for asset in assets or []:
            resolved = asset.resolve()
            name = unique_asset_name(resolved, used_names)
            record = copy_with_digest(resolved, temp_path / "assets" / name)
            asset_records.append(record)

        timestamp = retrieved_at or datetime.now(timezone.utc).isoformat()
        manifest = {
            "schemaVersion": 1,
            "source": {
                "id": source,
                "title": title,
                "platform": platform or infer_platform(source),
            },
            "retrieval": {"retrievedAt": timestamp, "access": access},
            "content": content_record,
            "assets": asset_records,
        }
        (temp_path / "source.json").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )

        preserved = []
        if content_record:
            preserved.append(str(content_record["path"]))
        preserved.extend(str(item["path"]) for item in asset_records)
        receipt = [
            f"# {title}",
            "",
            f"- Source: {source}",
            f"- Platform: {manifest['source']['platform']}",
            f"- Retrieved: {timestamp}",
            f"- Access: {access}",
            f"- Preserved: {', '.join(preserved) if preserved else 'metadata only'}",
            "",
            "Hashes and machine-readable metadata are stored in `source.json`.",
            "",
        ]
        (temp_path / "receipt.md").write_text("\n".join(receipt), encoding="utf-8")
        os.replace(temp_path, destination)
        return destination
    except Exception:
        shutil.rmtree(temp_path, ignore_errors=True)
        raise


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, help="Original URL, file identity, or collection identity")
    parser.add_argument("--title", required=True)
    parser.add_argument("--output-root", required=True, type=Path)
    parser.add_argument("--slug")
    parser.add_argument("--platform")
    parser.add_argument("--retrieved-at")
    parser.add_argument("--text-file", type=Path)
    parser.add_argument("--asset", action="append", default=[], type=Path)
    parser.add_argument(
        "--access",
        choices=("public-or-local", "authorized-private"),
        default="public-or-local",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    destination = build_package(
        source=args.source,
        title=args.title,
        output_root=args.output_root,
        slug=args.slug,
        platform=args.platform,
        retrieved_at=args.retrieved_at,
        text_file=args.text_file,
        assets=args.asset,
        access=args.access,
    )
    print(json.dumps({"ok": True, "package": str(destination)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
