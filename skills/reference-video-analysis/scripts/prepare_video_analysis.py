#!/usr/bin/env python3
"""Normalize a transcript into timestamped, context-linked analysis units."""

from __future__ import annotations

import argparse
import json
import os
import re
import tempfile
from pathlib import Path


TIMING_RE = re.compile(
    r"(?P<start>\d{1,2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(?P<end>\d{1,2}:\d{2}:\d{2}[,.]\d{3})"
)
SENTENCE_RE = re.compile(r"[^\n。！？!?；;.]+[。！？!?；;.]*")
TAG_RE = re.compile(r"<[^>]+>")


ANALYSIS_CONTRACT = {
    "audiencePromise": "Who should care, what tension holds attention, and what payoff is promised.",
    "titleAndOpening": "Diagnose the title promise and the opening's first useful move.",
    "narrativeAndHighlights": "Map the argument, turns, peaks, payoff, and action in source order.",
    "sentenceRoles": "Account for decisive sentence roles with their before-and-after context.",
    "pacingAndEfficiency": "Locate acceleration, repetition, overload, pauses, and removable material.",
    "rhetoricAndAIPatterns": "Explain voice, rhetoric, sentence rhythm, and formulaic or synthetic patterns.",
    "evidenceAndMaterial": "Inventory demonstrations, examples, screenshots, data, authority, and unsupported claims.",
    "cognitiveGap": "Show what the audience must already know and where explanation bridges fail.",
    "creationWorkflow": "Infer a practical research, drafting, visual, and revision workflow for an original piece.",
    "transferableMechanisms": "Prioritize reusable mechanisms and a generalized structure without copying identity or wording.",
}


def seconds(value: str) -> float:
    hours, minutes, rest = value.replace(",", ".").split(":")
    return int(hours) * 3600 + int(minutes) * 60 + float(rest)


def clean_text(value: str) -> str:
    return re.sub(r"[ \t]+", " ", TAG_RE.sub("", value)).strip()


def sentence_units(text: str, segment_id: str) -> list[dict[str, str]]:
    units = [clean_text(match.group(0)) for match in SENTENCE_RE.finditer(text)]
    units = [unit for unit in units if unit]
    if not units and text.strip():
        units = [clean_text(text)]
    return [
        {"id": f"{segment_id}-sent-{index:02d}", "text": unit}
        for index, unit in enumerate(units, start=1)
    ]


def parse_timed_text(raw: str) -> list[dict[str, object]]:
    normalized = raw.replace("\r\n", "\n").replace("\r", "\n")
    blocks = re.split(r"\n\s*\n", normalized.strip())
    parsed: list[dict[str, object]] = []
    for block in blocks:
        lines = [line.strip("\ufeff") for line in block.splitlines() if line.strip()]
        timing_index = next((index for index, line in enumerate(lines) if TIMING_RE.search(line)), None)
        if timing_index is None:
            continue
        match = TIMING_RE.search(lines[timing_index])
        assert match
        text = clean_text("\n".join(lines[timing_index + 1 :]))
        if text:
            parsed.append(
                {"start": seconds(match.group("start")), "end": seconds(match.group("end")), "text": text}
            )
    return parsed


def parse_json_transcript(path: Path) -> list[dict[str, object]]:
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    raw_segments = data.get("segments") if isinstance(data, dict) else data
    if not isinstance(raw_segments, list):
        raise ValueError("JSON transcript must be an array or contain a segments array")
    parsed = []
    for item in raw_segments:
        if not isinstance(item, dict) or not clean_text(str(item.get("text", ""))):
            continue
        parsed.append(
            {
                "start": float(item["start"]) if item.get("start") is not None else None,
                "end": float(item["end"]) if item.get("end") is not None else None,
                "text": clean_text(str(item["text"])),
            }
        )
    return parsed


def parse_transcript(path: Path) -> list[dict[str, object]]:
    suffix = path.suffix.lower()
    if suffix == ".json":
        segments = parse_json_transcript(path)
    else:
        raw = path.read_text(encoding="utf-8-sig")
        segments = parse_timed_text(raw) if suffix in {".srt", ".vtt"} else []
        if not segments:
            paragraphs = [clean_text(item) for item in re.split(r"\n\s*\n|\n", raw) if clean_text(item)]
            segments = [{"start": None, "end": None, "text": paragraph} for paragraph in paragraphs]
    if not segments:
        raise ValueError("transcript contains no readable text")
    return segments


def prepare(path: Path, *, title: str | None = None, source_url: str | None = None) -> dict[str, object]:
    path = path.resolve()
    raw_segments = parse_transcript(path)
    segments: list[dict[str, object]] = []
    for index, raw in enumerate(raw_segments, start=1):
        segment_id = f"seg-{index:03d}"
        segments.append(
            {
                "id": segment_id,
                "start": raw.get("start"),
                "end": raw.get("end"),
                "text": raw["text"],
                "previous": f"seg-{index - 1:03d}" if index > 1 else None,
                "next": f"seg-{index + 1:03d}" if index < len(raw_segments) else None,
                "sentences": sentence_units(str(raw["text"]), segment_id),
            }
        )

    timed = [segment for segment in segments if segment["start"] is not None and segment["end"] is not None]
    duration = round(float(timed[-1]["end"]) - float(timed[0]["start"]), 3) if timed else None
    sentence_count = sum(len(segment["sentences"]) for segment in segments)
    char_count = sum(len(str(segment["text"])) for segment in segments)
    return {
        "schemaVersion": 1,
        "source": {"title": title or path.stem, "url": source_url, "transcript": path.name},
        "metrics": {
            "durationSeconds": duration,
            "segmentCount": len(segments),
            "sentenceCount": sentence_count,
            "characterCount": char_count,
        },
        "segments": segments,
        "analysisContract": ANALYSIS_CONTRACT,
    }


def write_prepared(
    transcript: Path,
    output: Path,
    *,
    title: str | None = None,
    source_url: str | None = None,
) -> dict[str, object]:
    output = output.resolve()
    if output.exists():
        raise FileExistsError(f"analysis input already exists: {output}")
    data = prepare(transcript, title=title, source_url=source_url)
    output.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{output.name}-", dir=output.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as handle:
            json.dump(data, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
        os.replace(temporary_name, output)
    except Exception:
        try:
            os.unlink(temporary_name)
        except FileNotFoundError:
            pass
        raise
    return data


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("transcript", type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--title")
    parser.add_argument("--source-url")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    data = write_prepared(
        args.transcript,
        args.output,
        title=args.title,
        source_url=args.source_url,
    )
    print(
        json.dumps(
            {"ok": True, "segments": data["metrics"]["segmentCount"], "output": str(args.output.resolve())},
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
