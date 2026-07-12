# 2026-07 依赖升级与动效体系调研沉淀

> 调研日期：2026-07-11/12（Firecrawl + npm registry 实测 + 本仓对抗验证）。
> 服务对象：官网动效系统化迭代 + 全量依赖升级（commit fbeeeb5 一系）。
> 目的：下轮升级不必重新调研；结论均带来源与抓取日期。

## TypeScript 6/7（本仓已采官方双别名）

- **TS 7.0.2 正式版 2026-07-08 发布**：原生 Go 编译器，全量构建 8-12x 提速、内存 -6~-26%，官方口径 production-ready（VS Code/Slack/Canva 等实证）。📘 <https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/>（抓取 2026-07-11）
- **7.0 无 JS API（7.1 才有）** ⇒ 依赖 `import "typescript"` 的工具（typescript-eslint 等）必须继续拿 6.x。官方推荐 side-by-side：
  ```json
  "typescript": "npm:@typescript/typescript6@^6.0.2",
  "@typescript/native": "npm:typescript@^7.0.2"
  ```
  `npx tsc` = TS7 原生（typescript 包 bin 名 tsc），typescript6 包只带 `tsc6` bin，无冲突（🔬 本机实测 tsc=7.0.2 / tsc6=6.0.3）。
- **TS 6.0 = 最后的 JS 实现桥版**，稳定版只发布在 `@typescript/typescript6`（主包 `typescript` 的 6.x 仅 beta/dev tag）。其内部编译器浮动 `typescript@^6`（今日解析 6.0.3）——**6.1 面世后重生成 lockfile 前，先查 typescript-eslint 的 `<6.1.0` 运行时上限**。
- **TS6 语义变化对本仓的两处必改**（🔬 对抗验证实测，缺一不可）：
  1. `baseUrl` 弃用（6.0 报 TS5101 需 ignoreDeprecations）/ 移除（7.0 硬错误 TS5102）→ 删掉即可，`paths` 自 TS4.1 起本就相对 tsconfig 目录解析；
  2. `types` 默认 `["*"]` → `[]` → 不显式列 `["node"]` 则 next.config.ts / opengraph-image 的 `process`/`fs` 报 TS2591。📘 <https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/>
- **next@16.2.10 显式兼容 TS6**：`getTypeScriptConfiguration.js` 有 `semver.gte(version,'6.0.0')` 分支、内存中剥 baseUrl；`verify-typescript-setup` 仅设下限 5.1（🔬 读 node_modules 源码验证）。16.1.x 无此分支——**TS 双别名须与 next ≥16.2 同时上**。
- 现状：typecheck（tsgo 7）与 next build（TS 6 API）是两个检查器，微软宣称行为对齐；本仓四门 + CI 双跑均绿。

## ESLint 10（本仓暂缓，留 9.x）

- ESLint 10.0.0 2026-02 发布：📘 <https://eslint.org/blog/2026/02/eslint-v10.0.0-released/>
- eslint-config-next@16.2.10 peer 已放宽 `eslint >= 9`，但其依赖 eslint-plugin-react 7.37.5 / eslint-plugin-import 2.32 / jsx-a11y 6.10.2 的 peer 均止步 `^9`（🔬 npm view 实测 2026-07-12）⇒ eslint@10 会 ERESOLVE。上游 issue：<https://github.com/vercel/next.js/issues/91702>
- **重评触发条件**：上述三个插件任一发布 eslint-10 peer 且 eslint-config-next 收编后再升。

## lucide-react v1（已升 ^1.24）

- v1 移除全部品牌图标、`aria-hidden` 默认开、去 UMD。📘 <https://lucide.dev/guide/version-1>（抓取 2026-07-11）
- 本站仅用通用图标（Chevron/Arrow/Moon/Sun/Plus/Shapes/Sparkles/Smartphone/Heart/ShieldCheck/WifiOff/Palette/Repeat/Fingerprint/PenLine/Lock/Scale/Ban/CircleSlash/Popcorn）⇒ 零迁移成本。商店徽章走 public/badges 静态图，与 lucide 无关。

## 跨文档 View Transitions（已上线 globals.css）

- `@view-transition { navigation: auto }`：纯 CSS、渐进增强；Chromium + Safari 18.2+，Firefox 在途。UA 默认交叉淡入 0.25s（css-view-transitions-1 UA stylesheet）。📘 <https://developer.chrome.com/docs/web-platform/view-transitions/cross-document>
- 坑（📗 css-tricks 系列，抓取 2026-07-11 <https://css-tricks.com/cross-document-view-transitions-part-1/>）：
  - 必须包 `prefers-reduced-motion: no-preference`——全局 `*` kill-switch 够不到 `::view-transition-*` 伪元素；
  - 双页都要 opt-in（同一 stylesheet 天然满足）；4s 超时会静默砍掉过慢页面的过渡（静态站无虞）；
  - 旧 meta 标签写法已废弃；
  - **本仓特有**：固定 header 用 `mix-blend-exclusion`，独立 view-transition-name 快照会丢背景混合 → 刻意留在根快照。
- 前提：全站导航均原生 `<a>`（零 next/link），跨文档 VT 必然触发。App Router 客户端导航不会触发 cross-document VT——若未来引入 next/link 需换 same-document 方案。
- 产物验证：lightningcss（tailwind v4 管线）原生支持 `ViewTransitionRule`，minify 后规则存活（🔬 grep out/_next/static/chunks/*.css）。

## 深色首帧 / 平台预检的既定范式（globals.css + [locale]/layout.tsx）

- next-themes@0.4.6 JS 后必置显式 `light`/`dark` 解析类 + 内联 colorScheme（🔬 读 dist 验证）⇒ CSS 回退用 `@media (prefers-color-scheme: dark) { :root:where(:not(.light)) {…} }`，`:where()` 压特异性 (0,1,0) 且置于 `.dark` 块前，靠源序让显式类恒胜，两块 token 无需锁同步。
- 弃 `light-dark()`：国内旧 Android WebView（< Chromium 123）不支持会丢全部色 token。
- 平台收敛（下载徽章）走"body 首位内联同步脚本写 html[data-platform] + CSS 隐藏"——parser-blocking 保证首帧前生效，与 next-themes 同一保证等级；SSR/无 JS 恒双徽章零位移。

## 版本快照（2026-07-12 实测 npm latest）

next 16.2.10 · react 19.2.7 · motion 12.42.2 · lenis 1.3.25 · three 0.185.1 · lucide-react 1.24.0 · next-themes 0.4.6 · geist 1.7.2 · tailwindcss 4.3.2 · prettier 3.9.5 · prettier-plugin-tailwindcss 0.8.0 · eslint 10.7.0（未采）/ 9.39.5（已采）· typescript 7.0.2 / @typescript/typescript6 6.0.2 · @types/node 24.13.3（CI/CF = Node 24，仓内 `.node-version` 锁定）
