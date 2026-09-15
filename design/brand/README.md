# Orb 品牌资产

现役母版为 `orb-icon-master-1024.png`，由 hachimi-ios 的 `scripts/render-orb-icons.sh` 与 `scripts/sync-orb-brand.py` 原生代码渲染并同步。

球更大、偏左下、看向右上；采用黑银皮肤。禁止重画猫耳、胡须或眼睛；它们与 App 内的核心 IP 共用几何。

```bash
uv run --with pillow==12.3.0 python design/brand/gen-web-icons.py
npm run test:orb
npm run check
```

`gen-web-icons.py` 生成 App Router favicon、Apple Touch、PWA 与 OG 图标。maskable 版本使用 `orb-maskable-master-1024.png`，完整原生 Orb 位于画布 75% 的中心安全圆；favicon 是 16/32/48 的 RGBA ICO，避免 Next 解码失败。

`public/brand/orb-model.json`、`orb-golden.json` 和 `orb-source.json` 由 iOS 的 `scripts/export-orb-web.sh` 导出；哈希和原生黄金帧用于检查跨端偏差。生成文件保留原字节，不经过 Prettier。

旧 `app-icon-master-1254.png` 仅作历史档案，已从现行生成管线移除。布局和行为验收见 `specs/002-orb-ip-motion/spec.md`。

## React Bits Pro Device

官网三处 AppShot 统一使用 `components/react-bits/device.tsx`。2026-09-15 从已购账号的 `@reactbits-starter/device-tw` registry 安装，来源：[Device 官方文档](https://pro.reactbits.dev/docs/components/device)、[安装说明](https://pro.reactbits.dev/docs/installation)。没有用自绘组件替代指定组件。

`components.json` 配置 public、starter、pro 三个 registry；Authorization 保留 `Bearer ${REACTBITS_LICENSE_KEY}` 占位。许可证仅在被 Git 忽略的 `.env.local` 或 shell 环境中；生产构建消费已安装源码，不需要许可证。

```bash
npx shadcn@latest search @reactbits-starter -q device --limit 5
npx shadcn@latest view @reactbits-starter/device-tw
npx shadcn@latest add @reactbits-starter/device-tw
npm run check
```

本地适配：将固定 rem 机身尺寸改为容器单位配合 em，外层保留 356:722 占位，避免 transform 缩小后布局仍占大块空间。保留官方机身细节、弹簧跟随及自定义内容 API；AppShot 沿用真实截图、srcSet、深色版本、alt 与首屏加载优先级。原组件引用 `cn` 但 registry 未安装工具文件，显式补齐 clsx、tailwind-merge 与 `lib/utils.ts`。

全站展示不启用 autoAnimate 和内部滚动；悬停位移 6px、旋转 2 度；减少动态时位移、旋转及缩放归零。截图用 contain，避免设备屏幕比例轻微不同造成裁切。更新组件时先比较 registry 源码，再保留以上适配，禁止直接 overwrite 丢失。

## 全尺寸派生资源

`public/brand/icons/` 含 16 至 1024 的 11 档 PNG；manifest 同时引用 192/512 maskable，metadata 提供单色 mask-icon。`design/brand/platform-assets.json` 记录源与派生哈希。Apple 分层 `.icon` 和 Android adaptive 的权威规范在 hachimi-ios `design/brand/platform-assets.md`；网页不发布客户端的 Apple 预览文件。
