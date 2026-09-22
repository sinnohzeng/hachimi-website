# Spec 003：官网的道长换成 Rive 同源文件

> 造什么与为什么，不碰技术实现。
> 状态：Landed｜创建：2026-09-22｜上游：hachimi-ios spec 100、hachimi-orb 契约第十三版｜取代：[002](../002-orb-ip-motion/spec.md)

## 为什么

owner 2026-09-22 定：把 hachimi-orb 仓最新的哈基米道长形象引进 iOS 与官网，App 图标暂不动。官网首屏与页脚播的是旧 Swift 引擎的 TypeScript 移植（spec 002），与 App 不是同一份文件，iOS 那边 ADR-0044 说的三端同源在官网上一直没有兑现。iOS 同日已换到签名 v0.16.0、契约第十三版；形象仓的角色系统与朝向规则都写清了，官网只需按图落两处。

## 造什么

首屏与页脚改用 Rive 官方运行时播与 App 同一份签名文件，旧的 TypeScript 引擎整条删除。

### 用户故事

1. 作为官网访客，我在首屏与页脚看到与 App 同一份文件播出来的猫猫，鼠标经过时眼睛跟着走，点它有反应。
2. 作为开了减弱动态、或浏览器装不上运行时的访客，我看到的是同一张脸的静帧，不是空白，也不是另一只猫。
3. 作为在国内访问的人，页面不去第三方 CDN 取运行时。

### 验收标准

1. GIVEN 首屏与页脚，THEN 用 `@rive-app/webgl2` 播 `public/brand/hachimi-orb.riv`，文件 SHA-256 与 iOS 包里的一致（`0fcefe713ef1…`），来源清单记版本 0.16.0、契约 13。
2. GIVEN 在场地图，THEN 首屏标准档 `lively`、seed 1，页脚标准档 `calm`、seed 2；两处 `theme=dark`、`palette=amber`、`facing=rest`、`background=false`，球放在纸底色 `#0D1B2A` 的圆角卡片上。
3. GIVEN 鼠标或手指在球的版面框里，THEN 眼睛按球心换算跟过去，离场回正；点在球径六成的命中圆里发 `poke`，忙碌与冷却由文件裁决，宿主不计时。
4. GIVEN 构建产物，THEN Rive 的 wasm 从自己的域名 `/rive/` 取，页面不向 jsdelivr 或 unpkg 发请求；`npm run check` 里有一道门核对 `.riv` 与静帧的 SHA、契约版本、运行时版本三处一致、wasm 与 node_modules 同字节、宿主不指 CDN。
5. GIVEN `prefers-reduced-motion: reduce` 或运行时加载失败，THEN 显示同源静帧（标准像、侧望、深色纸底档）；静帧与 canvas 同一几何，换上去人不动位。
6. GIVEN 球离开视口或页面转后台，THEN 停帧并放掉指针；回来继续。
7. GIVEN 仓库，THEN 旧引擎 `lib/orb/` 下的八个文件、`scripts/orb-motion.test.mjs`、`public/brand/orb-model.json`、`orb-golden.json`、`orb-idle.png` 不再存在；`lib/orb/` 只剩契约名字表、在场地图与宿主三份。
8. `npm run check` 全绿，推 main 上线，生产域验过首屏与页脚。

### 可替换件

`components/cat-orb.tsx` 与 `lib/orb/host.ts`。换掉它们，在场地图 `lib/orb/placement.ts` 与契约名字表 `lib/orb/contract.ts` 不变。

### 不做（范围外）

- favicon、Apple Touch、PWA 与 OG 图不重出：与 App 图标同一母版，owner 定图标暂不变。
- 招呼与庆祝不进官网：那是首启欢迎与起卦仪式的事。
- 站点浅色主题下不换纸底：两处卡片固定深色，首屏本就压在深色 shader 上，页脚那张卡从前就是深的。

## 依赖知识

- hachimi-orb 仓：`contract.md` 第十三版、`docs/specs/character-system.md` 第四、五、八节、`docs/project/current-release.json`、`hosts/web/studio.js` 的宿主封装。
- hachimi-ios 仓：`specs/100-orb-v016-character-rollout/`、`App/Features/Orb/Rive/OrbRiveHost.swift` 的尺寸换算。
- 本仓：`deploy/cloudflare-pages.md`。
