# Orb 品牌资产

现役母版为 `orb-icon-master-1024.png`，由 hachimi-ios 的 `scripts/render-orb-icons.sh` 与 `scripts/sync-orb-brand.py` 原生代码渲染并同步。

球更大、偏左下、看向右上；采用黑银皮肤。禁止重画猫耳、胡须或眼睛；它们与 App 内的核心 IP 共用几何。

```bash
uv run --with pillow==12.3.0 python design/brand/gen-web-icons.py
npm run test:orb
npm run check
```

`gen-web-icons.py` 生成 App Router favicon、Apple Touch、PWA 与 OG 图标。maskable 版本把母版缩入中心安全圆；favicon 是 16/32/48 的 RGBA ICO，避免 Next 解码失败。

`public/brand/orb-model.json`、`orb-golden.json` 和 `orb-source.json` 由 iOS 的 `scripts/export-orb-web.sh` 导出；哈希和原生黄金帧用于检查跨端偏差。生成文件保留原字节，不经过 Prettier。

旧 `app-icon-master-1254.png` 仅作历史档案，已从现行生成管线移除。布局和行为验收见 `specs/002-orb-ip-motion/spec.md`。
