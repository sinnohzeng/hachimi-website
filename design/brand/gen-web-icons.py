#!/usr/bin/env python3
"""从品牌母版生成官网全部派生图标（favicon / apple-touch / PWA / OG logo）。
可复现：改母版后重跑 `python3 design/brand/gen-web-icons.py` 即全量重出。
母版 = design/brand/app-icon-master-1254.png（哈基米道长猫图标，全画幅无 alpha）。"""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
master = Image.open(ROOT / "design/brand/app-icon-master-1254.png").convert("RGB")

def out(size, path):
    img = master.resize((size, size), Image.LANCZOS)
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    img.save(p, "PNG")
    print(f"  {path}  {size}x{size}")

# Next App Router 约定图标（app/ 根，自动服务）
out(512, "app/icon.png")           # 现代浏览器 favicon（metadata 声明 512）
out(180, "app/apple-icon.png")     # apple-touch-icon
# 多尺寸 favicon.ico（16/32/48）。须 RGBA——Next/Turbopack 的 ico 解码器只吃 RGBA。
ico = ROOT / "app/favicon.ico"
master.convert("RGBA").resize((48, 48), Image.LANCZOS).save(
    ico, sizes=[(16, 16), (32, 32), (48, 48)]
)
print(f"  app/favicon.ico  16/32/48 (RGBA)")
# PWA 图标（public/，webmanifest 引用）
out(192, "public/icon-192.png")
out(512, "public/icon-512.png")
out(512, "public/icon-maskable.png")   # 全画幅：猫居中 + 金底充边，圆形遮罩仅裁金底
# OG 社交卡用 logo（build 期 base64 内联，见 app/opengraph-image.tsx）
out(360, "public/brand/og-logo.png")
print("done.")
