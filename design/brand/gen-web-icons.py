# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow==12.3.0"]
# ///
"""Resize approved native masters. Geometry and maskable fitting live in hachimi-ios."""
import hashlib
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
master = Image.open(ROOT / "design/brand/orb-icon-master-1024.png").convert("RGB")
maskable = Image.open(ROOT / "design/brand/orb-maskable-master-1024.png").convert("RGB")


def output(image, size, name):
    target = ROOT / name
    target.parent.mkdir(parents=True, exist_ok=True)
    image.resize((size, size), Image.Resampling.LANCZOS).save(target)


for size, name in [(512, "app/icon.png"), (180, "app/apple-icon.png"),
                   (192, "public/icon-192.png"), (512, "public/icon-512.png"),
                   (360, "public/brand/og-logo.png")]:
    output(master, size, name)
for size in [16, 32, 48, 96, 128, 180, 192, 256, 384, 512, 1024]:
    output(master, size, f"public/brand/icons/icon-{size}.png")
for size in [192, 512]:
    output(maskable, size, f"public/icon-maskable-{size}.png")
output(maskable, 512, "public/icon-maskable.png")
# Next's ICO decoder needs RGBA, even though all pixels are opaque.
master.convert("RGBA").resize((48, 48), Image.Resampling.LANCZOS).save(
    ROOT / "app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
manifest_path = ROOT / "design/brand/platform-assets.json"
manifest = json.loads(manifest_path.read_text())
for name in manifest["outputs"]:
    manifest["outputs"][name] = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
print("Updated all web sizes from native masters; maskable keeps the complete Orb in its safe circle.")
