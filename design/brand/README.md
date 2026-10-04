# 品牌资产

## 站点图标

App 图标母版是 hachimi-ios 的 `design/brand/orb-icon-master-1024.png`，它怎么来、怎么重出写在 hachimi-ios `design/brand/README.md`。本目录只放官网独有的 maskable 母版 `orb-maskable-master-1024.png`：完整 Orb 落在画布 75% 的中心安全圆里。

```bash
uv run --with pillow==12.3.0 python design/brand/gen-web-icons.py
npm run check
```

`gen-web-icons.py` 从兄弟仓读 App 图标母版，出 App Router 的 favicon、`icon.png`、Apple Touch、manifest 的 192/512 两档与 maskable 两档，以及分享卡上的 `public/brand/og-logo.png`；favicon 是 16/32/48 的 RGBA ICO，Next 的 ICO 解码器要 RGBA。两份母版与全部产物的 SHA 记在 `platform-assets.json`，脚本跑完自动重写。

球更大、偏左下、看向右上；采用黑银皮肤。禁止重画猫耳、胡须或眼睛；它们与 App 内的核心 IP 共用几何。

## 道长本人：Rive 同源文件

首屏与页脚播的是 `public/brand/hachimi-orb.riv`，与 iOS 包里的同一份，由 hachimi-orb 仓的编辑器 Publish 签名导出，SHA 记在 `public/brand/orb-source.json`，与 hachimi-orb 的 `docs/project/current-release.json` 一致。回退静帧 `orb-still-dark.png` 与 `orb-still-light.png` 是标准像（`mood=calm`、`facing=rest`），深浅纸底各一张，由 hachimi-orb 的 `tools/still.sh` 截出。这几份文件保留原字节，不经过 Prettier。

换代步骤：从 hachimi-orb 复制 `build/releases/<版本>/` 下的 `.riv` 与 `reference/frames/` 下的 `still-dark.png`、`still-light.png`，改 `orb-source.json` 的版本、契约版本与三个 SHA；`lib/orb/contract.ts` 的契约版本、版面框与戳中半径照 `current-release.json` 改；跑 `npm run test:orb`，兄弟仓在旁时它逐项比对 `current-release.json`。运行时 `@rive-app/webgl2` 在 `package.json` 里精确钉死，清单的 `runtime` 一格要同步改；wasm 由 `scripts/sync-rive-wasm.mjs` 从 node_modules 复制到 `public/rive/`，不入库，页面从自己的域名取，不碰 CDN。

宿主能写的属性以 hachimi-orb 的 `contract.md` 为准，官网这边的名字表在 `lib/orb/contract.ts`，在场地图在 `lib/orb/placement.ts`。球底下不铺卡片：眼睛按纸底色实描，所以两处都跟站点明暗走，球身与页面色差在一档以内。浅色下是 `8A5F2C` 赭色球身落在纸色上，深色下是 `E8E8E8` 浅灰球身落在夜蓝上，配对表在 hachimi-orb 的 `docs/specs/character-system.md`。

## React Bits Pro Device

官网三处手机样机统一使用 `components/react-bits/device.tsx`，从已购账号的 `@reactbits-starter/device-tw` registry 安装，来源：[Device 官方文档](https://pro.reactbits.dev/docs/components/device)、[安装说明](https://pro.reactbits.dev/docs/installation)。

`components.json` 配置 public、starter、pro 三个 registry；Authorization 保留 `Bearer ${REACTBITS_LICENSE_KEY}` 占位。许可证仅在被 Git 忽略的 `.env.local` 或 shell 环境中；生产构建消费已安装源码，不需要许可证。

```bash
npx shadcn@latest search @reactbits-starter -q device --limit 5
npx shadcn@latest view @reactbits-starter/device-tw
npx shadcn@latest add @reactbits-starter/device-tw
npm run check
```

本地适配：

- 机身尺寸由固定 rem 改为容器单位配合 em，外层保留 356:722 占位，避免 transform 缩小后布局仍占大块空间。原组件引用 `cn` 但 registry 未装工具文件，补了 clsx、tailwind-merge 与 `lib/utils.ts`。
- 只接 `className` 与 `children`：屏幕内容由 AppShot 给真实截图、srcSet、深色版本、alt 与首屏加载优先级。
- 悬停跟随只留弹簧这一种，位移 6px、旋转 2 度写成组件里的常量；减弱动态时位移、旋转与缩放归零。

更新组件时先比较 registry 源码，再保留以上适配，不要直接 overwrite。
