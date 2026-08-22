#!/usr/bin/env python3
"""
Converts the supplied campaign artwork into web-ready WebP for Supabase
Storage.

Source images are 1080x1350 / 1080x1440 PNG and JPEG at 0.8-2.5 MB each —
fine for Instagram, far too heavy for a marketing site. This resizes to a
sane long edge and re-encodes to WebP, which the storage bucket's MIME
allow-list accepts.

Output goes to assets/media/, which is the UPLOAD SOURCE for Storage. It is
deliberately not under public/ — the app never serves these from the repo,
it serves them from Storage, so that new work needs no deployment.

    python3 scripts/prepare-media.py <source-dir> [--max 1600] [--quality 82]
"""
import argparse
import json
import pathlib
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install pillow")

Image.MAX_IMAGE_PIXELS = None

# Folder name in the supplied archive -> the project it belongs to.
# Read from the artwork itself; the folders are named only "Project 1..5".
PROJECTS = {
    "Project  1": {"slug": "healthy-clinics", "order": ["عروض الأسنان - تصميم2.png"]},
    "Project 2":  {"slug": "wafiya-loqma",    "order": ["02.png"]},
    "Project 3":  {"slug": "warranty-point",  "order": ["6.png"]},
    "Project 4":  {"slug": "almugheb",        "order": ["Artboard 16.png"]},
    "Project 5":  {"slug": "home-body",       "order": ["home body2 copy.jpg"]},
}

EXTS = {".png", ".jpg", ".jpeg"}


def convert(src: pathlib.Path, dest: pathlib.Path, max_edge: int, quality: int) -> dict:
    with Image.open(src) as im:
        im = im.convert("RGB")
        before = im.size
        im.thumbnail((max_edge, max_edge), Image.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, "WEBP", quality=quality, method=6)
        return {
            "source": src.name,
            "path": str(dest),
            "width": im.width,
            "height": im.height,
            "source_px": f"{before[0]}x{before[1]}",
            "bytes": dest.stat().st_size,
            "source_bytes": src.stat().st_size,
        }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("source", type=pathlib.Path)
    ap.add_argument("--out", type=pathlib.Path, default=pathlib.Path("assets/media"))
    ap.add_argument("--max", type=int, default=1600)
    ap.add_argument("--quality", type=int, default=82)
    args = ap.parse_args()

    manifest: dict[str, list[dict]] = {}
    total_before = total_after = 0

    for folder, meta in PROJECTS.items():
        src_dir = args.source / folder
        if not src_dir.is_dir():
            print(f"  ! missing {folder}", file=sys.stderr)
            continue

        files = sorted(p for p in src_dir.iterdir() if p.suffix.lower() in EXTS)
        # The designated cover leads; the rest follow in stable name order.
        cover = meta["order"][0]
        files.sort(key=lambda p: (p.name != cover, p.name))

        slug = meta["slug"]
        entries = []
        for index, src in enumerate(files):
            name = "cover.webp" if index == 0 else f"gallery-{index:02d}.webp"
            info = convert(src, args.out / "projects" / slug / name, args.max, args.quality)
            info["storage_path"] = f"projects/{slug}/{name}"
            info["role"] = "cover" if index == 0 else "gallery"
            entries.append(info)
            total_before += info["source_bytes"]
            total_after += info["bytes"]

        manifest[slug] = entries
        saved = sum(e["source_bytes"] for e in entries) - sum(e["bytes"] for e in entries)
        print(f"  {slug:<18} {len(entries)} images  -{saved / 1_048_576:.1f} MB")

    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))

    print(f"\n  total {total_before / 1_048_576:.1f} MB -> {total_after / 1_048_576:.1f} MB "
          f"({100 - total_after / total_before * 100:.0f}% smaller)")


if __name__ == "__main__":
    main()
