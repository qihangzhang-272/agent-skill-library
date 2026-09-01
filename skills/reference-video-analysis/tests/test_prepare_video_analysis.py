from __future__ import annotations

import importlib.util
import json
from pathlib import Path


SCRIPT = Path(__file__).parents[1] / "scripts" / "prepare_video_analysis.py"
SPEC = importlib.util.spec_from_file_location("prepare_video_analysis", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_srt_keeps_timing_and_neighbor_context(tmp_path: Path) -> None:
    subtitle = tmp_path / "sample.srt"
    subtitle.write_text(
        "1\n00:00:01,000 --> 00:00:03,500\n先交代问题。\n\n"
        "2\n00:00:03,500 --> 00:00:07,000\n然后展示证据！\n\n"
        "3\n00:00:07,000 --> 00:00:09,000\n最后给出结论。\n",
        encoding="utf-8",
    )

    prepared = MODULE.prepare(subtitle, title="Example")

    assert prepared["source"]["title"] == "Example"
    assert prepared["metrics"]["durationSeconds"] == 8.0
    assert prepared["segments"][1]["previous"] == "seg-001"
    assert prepared["segments"][1]["next"] == "seg-003"
    assert prepared["segments"][1]["sentences"][0]["text"] == "然后展示证据！"


def test_plain_text_is_fully_covered_by_sentence_units(tmp_path: Path) -> None:
    transcript = tmp_path / "sample.txt"
    transcript.write_text("为什么现在要做？因为旧办法太慢。\n这里给一个实际例子。", encoding="utf-8")

    prepared = MODULE.prepare(transcript)

    sentence_text = "".join(
        sentence["text"] for segment in prepared["segments"] for sentence in segment["sentences"]
    )
    assert sentence_text == "为什么现在要做？因为旧办法太慢。这里给一个实际例子。"
    assert prepared["metrics"]["sentenceCount"] == 3
    assert "sentenceRoles" in prepared["analysisContract"]
    assert "creationWorkflow" in prepared["analysisContract"]


def test_write_prepared_refuses_existing_output(tmp_path: Path) -> None:
    transcript = tmp_path / "sample.txt"
    transcript.write_text("hello", encoding="utf-8")
    output = tmp_path / "analysis-input.json"
    output.write_text("existing", encoding="utf-8")

    try:
        MODULE.write_prepared(transcript, output)
    except FileExistsError:
        pass
    else:
        raise AssertionError("existing analysis input was overwritten")
