"""Rebuilds curbme/manifest.json from the files in this folder (run after adding / replacing a file).

    python curbme/update_manifest.py

- Every file in tutorials/, music/, wallpapers/dark|light/, live/ is listed. New files get a title from the file name.
- A title / logo you typed into manifest.json for an existing entry is kept; bytes + sha256 are always recomputed.
- "file" is the name the app saves it under (and the id it stores); never change it for a file already in use.
- "url" is relative to the manifest, or a full https:// link (use a full link to host one file somewhere else).
- "logo" is a picture for the list row (relative or full link); empty = the app draws its own icon.
"""
import hashlib
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / "manifest.json"
AUDIO = {".mp3", ".ogg", ".m4a", ".aac", ".wav", ".flac", ".opus"}
IMAGE = {".jpg", ".jpeg", ".png", ".webp"}
VIDEO = {".mp4", ".webm", ".3gp", ".mkv"}

old = {}
if OUT.exists():
    data = json.loads(OUT.read_text(encoding="utf-8"))
    for section, items in data.items():
        if isinstance(items, list):
            for item in items:
                old[(section, item["file"])] = item


def title_of(name: str) -> str:
    base = pathlib.Path(name).stem.replace("_", " ").replace("-", " ").strip()
    return base[:1].upper() + base[1:]


def entry(section: str, key: str, path: pathlib.Path, extra: dict) -> dict:
    raw = path.read_bytes()
    prev = old.get((section, key), {})
    item = {"file": key}
    if section != "tutorials":
        item["title"] = prev.get("title") or title_of(path.name)
        item["logo"] = prev.get("logo", "")
    item.update(extra)
    item["url"] = prev["url"] if str(prev.get("url", "")).startswith("http") else path.relative_to(ROOT).as_posix()
    item["bytes"] = len(raw)
    item["sha256"] = hashlib.sha256(raw).hexdigest()
    return item


def files(folder: str, kinds: set) -> list:
    return sorted(p for p in (ROOT / folder).glob("*") if p.suffix.lower() in kinds)


manifest = {
    "version": 1,
    "tutorials": [entry("tutorials", p.name, p, {}) for p in files("tutorials", VIDEO)],
    "music": [entry("music", p.name, p, {}) for p in files("music", AUDIO)],
    "wallpapers": [
        entry("wallpapers", f"{cat}/{p.name}", p, {"category": cat})
        for cat in ("dark", "light")
        for p in files(f"wallpapers/{cat}", IMAGE)
    ],
    "live": [entry("live", p.name, p, {}) for p in files("live", VIDEO)],
}
OUT.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print({k: len(v) for k, v in manifest.items() if isinstance(v, list)})
