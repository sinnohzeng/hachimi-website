# 手机端性能与 Lighthouse（工程教训）

每条先写怎么回事，再写做法。新坑写进这一份，标题带日期。

## Lighthouse 的 LCP 按首帧前的总字节算，不看优先级（2026-10-04）

现象：首屏截图已经 `fetchpriority="high"`、不懒加载，本地手机档 LCP 仍是 3.8 s；本机实际首帧在 65 ms 就画出来了。

根因：Lighthouse 默认的模拟节流（Lantern）把实际首帧之前结束的请求都放进 LCP 的依赖图，再按 1.6 Mbps 平分带宽重算，不区分高低优先级。本机首帧之前，水合脚本、预载字体、徽章与懒加载距离内的截图都已取完，全算在 LCP 头上。

做法：减首帧前的字节数，调优先级没用。量的时候把 `network-requests` 里 `networkEndTime` 早于观测 LCP 的请求加总，看哪几项占大头。本站现在首帧前约 335 KB，其中约 200 KB 是 React、Next 运行时与 motion。

## Rive 的 webgl2 运行时每帧在主线程上走十几毫秒，TBT 全是它（2026-10-04）

现象：手机档 TBT 220 到 360 ms，挡掉 Rive 的三份文件后归零。trace 里是一串间隔一帧、每个 12 到 20 ms 的 `FireAnimationFrame`，落在 Rive 运行时的 chunk 上。

根因：Rive 每帧的推进与绘制在主线程上跑，本机 M5 Pro、走真 GPU（headless Chrome 在 macOS 上用 ANGLE Metal，不是 SwiftShader）也要十几毫秒；Lighthouse 按四倍 CPU 折算，每一帧都超过 50 ms。用 `failIfMajorPerformanceCaveat` 探软件渲染挡不住它。

做法：`lib/orb/host.ts` 的 `afterLoadAndEngage` 让运行时等 load 与访客第一次输入都到了再装，之前显示同一张脸的静帧。以后在首屏加任何常驻 rAF 的东西，先在 Lighthouse trace 里看单帧时长。

## 被 `display: none` 的图，eager 照取，lazy 不取（2026-10-04）

现象：道长的浅深两张静帧都是普通 `<img>`，暗色下也把浅色那张取了。

根因：浏览器对 eager 图不管显不显示都取；`loading="lazy"` 的图要等布局判定可见才取，`display: none` 就一直不取。

做法：成对按明暗显隐的图都写 `loading="lazy"`；只有顶 LCP 的那张保持 eager，代价是暗色下白取一次浅色版。

## React 19 只给 `<img>` 自动预载，`<picture>` 里的不预载（2026-10-04）

现象：截图改成 `<picture>` 加 AVIF `source` 之后，`<head>` 里那条 `rel="preload" as="image"` 没了；徽章那两张普通 `<img>` 的预载还在。

做法：首屏截图在 HTML 前段，预载扫描器照样早早发现它，`fetchpriority` 写在 `img` 上对选中的 `source` 同样生效，不必补预载。测量时别把这条预载的消失当成退步。

## next/font/local 的子集与 unicode-range（2026-10-04）

- `declarations: [{ prop: "unicode-range", value: "..." }]` 能给 `@font-face` 加码位范围；next/font 只认字面量，码位不能从别的模块导入。
- `@font-face` 的 family 名取自 `localFont` 赋给的常量名，`app/globals.css` 按 `GeistSans`、`GeistMono` 直接引用，改常量名要一起改。
- 产物 CSS 会把 `U+0000-00FF` 压成 `U+??`，是同一个范围。
- 字体文件只要在 DOM 里有用到它的字就会取，与在不在视口无关。等宽字体只用在首屏之下，照样在首帧前取完，所以把它切到只剩数字（4.9 KB）才有收益。

## motion 的 `m` 加 `LazyMotion` 在 Turbopack 下不减包（2026-10-04）

现象：组件全换成 `m.*`、外面包 `LazyMotion features={domAnimation}` 之后重新构建，motion 那个 chunk 仍是 126 KB，拖拽与布局投影的代码都在。

根因：`motion/react` 整包再导出 framer-motion，Turbopack 的生产构建没把用不上的特性摇掉。

做法：想减 motion 的首屏体积，先在产物里 grep `projection`、`drag`，确认真摇掉了再动组件。
