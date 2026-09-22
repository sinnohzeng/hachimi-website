# Plan 005：官网第四版怎么造

> 对应 [spec.md](spec.md)。状态：进行中｜创建：2026-09-22

## 切片与文件归属

三片并行，文件不交叉；`app/[locale]/page.tsx` 的节序与 `package.json` 由主对话最后合。

| 片     | 谁                | 做什么                                                                                                             | 只碰这些文件                                                                                                                                                                                                                                            |
| ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B 光束 | Opus 5            | 把两处 three.js shader 换成 ogl 一份组件加两套调色板；three 摘掉                                                   | `components/shader-canvas.tsx`（新）、`lib/shader-palettes.ts`（新）、`lib/visibility.ts`（新）、`components/hero-shader.tsx`、`components/final-cta-shader.tsx`、`package.json` 与 lock（只动 ogl 与 three 两项）                                      |
| C 节   | Opus 5            | 新首页各节组件、导航、i18n 键、字数门键表                                                                          | `components/{manifesto,case-journey,tool-cards,reveal-headline,academy-marquee,principles,faq,final-cta,header}.tsx`、`components/app-shot.tsx`（SHOTS 表加两张）、`lib/i18n/{types,zh,en}.ts`、`lib/academy-titles.ts`（新）、`scripts/count-copy.mjs` |
| A 截图 | Opus 5，在 iOS 仓 | 站上五张截图按 1.13.0 界面重截，浅深各一                                                                           | hachimi-ios `AppUITests/DeviceScreenshotPass+Site.swift`；产物到 `build/device-walk/sim-14-{light,dark}`                                                                                                                                                |
| 合     | 主对话            | 文案过润色管线进 i18n；页面节序；`scripts/build-shots.mjs` 映射；llms、manifest、README 口径；浏览器验收；提交上线 | 其余                                                                                                                                                                                                                                                    |

## B：光束 shader

- 源：`~/reactbitspro-templates/shader/components/shader-canvas.tsx` 与 `lib/shader-variants.ts`；`~/reactbitspro-templates/wireframe/lib/visibility.ts`。
- 组件 `ShaderCanvas({ palette, className })`：ogl Renderer 加全屏 Triangle；DPR 封顶 1.5；60 fps 节流；IntersectionObserver 离屏停、`visibilitychange` 停；减弱动态只画一帧；卸载调 `WEBGL_lose_context`。光标位置与强度平滑追随，只在指针设备上接。
- 调色板两套各带明暗：`amber`（首屏，深色以 `#0D1B2A` 一路暖到品牌琥珀，浅色是纸色上淡淡的暖光）与 `ink`（收尾，墨与金）。品牌 token 在 `app/globals.css`，别另起颜色。
- `hero-shader.tsx` 与 `final-cta-shader.tsx` 保持导出名与 `next/dynamic` 用法不变，内部改成 `ShaderCanvas` 加对应调色板；`ShaderFallback` 静态渐变留着顶住分包加载。
- `npm rm three @types/three`，`npm i ogl@^1.0.11`。构建后 `out/_next/static` 里不再有 three 的 chunk。

## C：首页各节

节的规格见 spec 节表；文案先用 `docs/copy/2026-09-22-v4/facts.zh.json` 的 `text`（英文先按 `en` 或自行直译，主对话之后用润色稿覆盖）。i18n 键名照事实稿的键，一字不差。

- `manifesto.tsx`（#what）：源 `~/reactbitspro-templates/cloudlight/components/manifesto.tsx`；中文按字 `split("")`，`sr-only` 留全文；减弱动态直接整句显示。
- `case-journey.tsx`（#case）：源 `~/reactbitspro-templates/ai-app/components/app-showcase.tsx`。桌面：`sticky top-0 h-svh` 的手机加 `h-[420svh]` 滚动区，五步按 `scrollYProgress` 确定性切屏，左文右机；手机壳用本仓 `components/react-bits/device.tsx`，屏幕层用 `AppShot`（浅深、srcSet 逻辑在它里）。移动端与减弱动态：一张手机加有序步骤列表。五张图名：`case-list`、`ziwei-sanhe`、`bazi-pillars`、`cast-result`、`case-casts`。
- `tool-cards.tsx`（#tools）：源 `~/reactbitspro-templates/wireframe/components/showcase.tsx` 的 morph cards；四张卡卡面名字加一句，点开 `layoutId` 放大显示 `detail`；键盘可开合，Esc 关；展开内容对读屏可达。
- `reveal-headline.tsx`：源 `~/reactbitspro-templates/shader/components/reveal-headline.tsx` 的 word-mask，中文按字；用在道长记得那一句。
- `academy-marquee.tsx`（#academy）：源 `~/reactbitspro-templates/ai-app/components/gallery.tsx` 的 velocity marquee，跑的是书名与科名文字；书名从 hachimi-ios `App/Resources/academy/` 的书目 JSON 里取真书名，挑 24 本公版书写进 `lib/academy-titles.ts`，简繁英三版（英文版跑科名与拼音书名）。
- `principles.tsx`（#offline）：一句加四个标签，细线框容器（源 `~/reactbitspro-templates/wireframe/components/section-corners.tsx`）。
- `faq.tsx`：七条，数据驱动，现有手风琴留着；`FaqStructuredData` 自动跟着。
- `final-cta.tsx`：源 `~/reactbitspro-templates/ai-app/components/final-cta.tsx` 的截图扇形加 word-mask 标题，扇形用五张站上截图；徽章不动。
- `header.tsx`：导航五项加下载，锚点 `#case #tools #academy /methodology #faq`。
- `app-shot.tsx`：SHOTS 表加 `case-list` 与 `case-casts`（widths 603 / 1206，dark true）；图片文件由主对话生成。
- `count-copy.mjs`：四档上限按 spec 验收 5 写键表；`footer.tagline` 不计。
- 所有动效走 `lib/motion-tokens.ts` 与 `useReducedMotion`；不新增依赖。

## A：截图

- 在 iOS 仓 `AppUITests/DeviceScreenshotPass+Site.swift` 的 `testWalkSiteShots` 里加两张：S4 命例列表（署名种子重开后列表页）、S5 命例的问事面（先用桩后端为署名那一条起两卦，再进命例详情切到问事面）。起卦结果页那张由主对话另一条 `testWalkSiteCastShots` 真连后端拍一卦吉的。
- 浅深各跑一趟，导出到 `build/device-walk/sim-14-light` 与 `sim-14-dark`，报回 manifest 里每张的 uuid。
- 模拟器只用 `iPhone 17 Pro`，不与发版归档同时跑。

## 合

1. `DEEPSEEK_API_KEY` 从 hachimi-ios `.env` 取，跑 `polish-copy.mjs` 出 `polished.zh.json` 与 `polished.en.json`，人工核事实后进 `lib/i18n`。
2. `scripts/build-shots.mjs` 映射到 `sim-14-*`，出五张浅深 WebP。
3. `page.tsx` 节序按 spec 节表；`llms.txt`、`llms-full.txt`、`site.webmanifest`、`README.md` 描述改口径；`specs/README.md` 001 标“被 005 取代”。
4. 验收：`npm run check`；受控浏览器八张实拍；减弱动态；three 不在产物里；上线后 `curl`。

## 风险

- Rive 猫、首屏 shader 与钉住的手机三者同屏时的 GPU 负载：shader 组件离屏即停，手机走查不开 WebGL；实测掉帧就把 shader 的 `resScale` 压到 0.5。
- 截图依赖 iOS 侧跑得出来：S5 要桩后端为署名命例起卦，若桩路径起不了带命例的卦，退一步只拍命例列表，问事面那一屏用起卦结果页顶替并在 spec 记差。
- 字数门四档是新口径，润色稿超限按事实稿删事实，不删数字与专名。
