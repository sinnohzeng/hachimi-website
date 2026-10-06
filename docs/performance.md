# 首屏性能

> 动首屏、字体、截图或动效时读。指标与验收见[规约 009](../specs/009-mobile-perf/spec.md)。

- LCP 按首帧前的总字节算：减首帧前的字节，调优先级没用；量时把 `networkEndTime` 早于 LCP 的请求加总，看哪几项占大头。
- 首屏加任何常驻 rAF 的东西，先在 Lighthouse trace 里看单帧时长；道长运行时等 load 与访客首次输入之后再装，写法在 `lib/orb/host.ts` 的 `afterLoadAndEngage`。
- 成对按明暗显隐的图写 `loading="lazy"`，只有顶 LCP 的那张 eager。
- `next/font/local` 的 `unicode-range` 只认字面量；字体只要 DOM 里有用到它的字就会取，与在不在视口无关。
- 减 motion 的体积，先在产物里 grep `projection`、`drag`，确认真摇掉了再改组件。
- 核首屏用设备模拟跑手机与桌面两档宽度，截视口内的首屏单独评，逐层报：渲染正确（截断、重叠、破图、明暗主题），可读（对比度、字号、行宽），首屏价值（三秒看出产品是什么，主按钮在首屏）。
