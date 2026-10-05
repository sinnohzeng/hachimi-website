# Plan 009：手机端首屏性能

> 怎么造。上游：[spec](spec.md)。

## 测量

- 本地：`npm run build` 后用一个仿 Pages 干净网址与 brotli 的静态服务托 `out/`，`npx lighthouse@13.5.0 <url> --only-categories=performance,accessibility --chrome-flags="--headless=new"`，默认手机档（Lantern 模拟，150 ms RTT、1.6 Mbps、CPU 四倍），每页三次取中位数。
- 现网：同一条命令对 `https://hachimi.ai/zh`，只读。

## 改动

| 处                                                       | 做法                                                                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/shots.ts`、`scripts/build-shots.mjs`                | AVIF 四档 440 / 660 / 880 / 1320（质量 55），WebP 两档 660 / 1320 兜底，两张宽度表由页面与脚本共用                                    |
| `components/app-shot.tsx`                                | `<picture>` 先给 AVIF `source`，`img` 留 WebP；`sizes` 写屏幕层宽度，手机边框每侧占机身宽的 1.9/35.6                                  |
| `components/hero.tsx`、`components/case-journey.tsx`     | `sizes` 改成屏幕层宽度，手机首屏取 440 档                                                                                             |
| `lib/fonts.ts`、`scripts/build-web-fonts.mjs`            | `next/font/local` 取 `assets/fonts/` 的子集，`declarations` 写 `unicode-range`；子集由 pyftsubset 经 uvx 切，码位从 `lib/fonts.ts` 读 |
| `lib/orb/host.ts` 的 `afterLoadAndEngage`、`cat-orb.tsx` | load 与第一次输入都到了才开始观察视口、装运行时；两张静帧 `loading="lazy"`，被 `display: none` 的那张不取                             |

## 结果

本地中位数（2026-10-04）：`/zh` 81 → 94，`/en` 69 → 94；LCP 3.8 s → 3.1 s，TBT 220 到 930 ms → 0，CLS 0，无障碍 96 不变。现网 `/zh` 同法量得 73（LCP 4.1 s、TBT 360 ms）。

## 剩下的差距

LCP 3.1 s，高于 2.5 s。Lantern 把首帧绘出之前请求的字节都算进 LCP，现在首帧前约 335 KB，其中约 200 KB 是水合脚本（React 与 Next 运行时约 110 KB、motion 约 40 KB、各节组件约 23 KB）。再往下压要让首屏不依赖 motion 与客户端组件，是结构改动，另立规约。
