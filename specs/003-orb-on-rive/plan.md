# Plan 003：官网的道长换成 Rive 同源文件

> 怎么造。对应 [spec](spec.md)。

## 模块形态

| 文件                         | 角色     | 职责                                                                                                   |
| ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `lib/orb/contract.ts`        | 词汇     | 契约第十三版的名字、取值、artboard 几何、纸底色表、命中比例；纯数据与一个纯函数 `ballGeometry`         |
| `lib/orb/placement.ts`       | 词汇     | 在场地图：两处各自的样子、明暗、配色、种子                                                             |
| `lib/orb/host.ts`            | 可替换件 | 一台 Rive 宿主：按需加载运行时、自托管 wasm、写输入、`track` / `release` / `hits` / `poke`、播放与停帧 |
| `components/cat-orb.tsx`     | 可替换件 | React 壳：尺寸、纸底卡片、静帧与 canvas 切换、视口与前后台、指针事件                                   |
| `scripts/sync-rive-wasm.mjs` | 工具     | node_modules 到 `public/rive/`                                                                         |
| `scripts/orb-asset.test.mjs` | 门       | SHA、契约版本、运行时版本、wasm 同字节、不指 CDN、几何                                                 |

尺寸：球径由调用处的 CSS 变量 `--orb-d` 给，首屏 96 / 112 px，页脚 112 px；框 1.7d 乘 1.4d，canvas 3.69d 乘 1.98d 居中溢出框外，静帧 1.98d 见方。与 iOS 宿主同一比例，耳与手在框外画，框只管排版与命中。

组件只报自己在哪一处，样子在在场地图里领；宿主只写契约里的属性，不按层名或状态名做事。

## 阶段

1. 资产与门：复制签名文件与静帧，清单改 schema 2，sync 脚本，资产测试接进 `check`。
2. 宿主与组件：contract、placement、host、cat-orb；hero 与 footer 接入；旧引擎删除。
3. 文档：README、品牌文档、规约索引，002 标记取代。
4. 验收：`npm run check`；受控浏览器验 `data-orb-ready`、指针跟随、无 CDN 请求、减弱动态回退；推 main，验生产。

## 风险

- 运行时 JS 452 KB 加 wasm 2.2 MB。进视口才取，不进首屏 bundle；首屏那颗在 LCP 之后才开始下载。
- `.riv` 地址带版本号做缓存键；wasm 随运行时版本走，升级运行时时 `npm run test:orb` 会红到清单改对为止。
- 首屏卡片色 `#0D1B2A` 压在近黑的 shader 上会显出一块，这是契约要求的纸底，不做透明处理。

## 落地记录

2026-09-22 四个阶段一次落地。旧引擎八个文件、对拍测试与两份 JSON 删除，`orb-idle.png` 换成 `orb-still.png`。验收细节见提交信息与 `evidence/`。
