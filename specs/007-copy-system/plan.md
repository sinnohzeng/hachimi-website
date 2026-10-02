# Plan 007：官网文案接上三层真源怎么造

> 对应 [spec.md](spec.md)。状态：已落地｜创建：2026-10-02

主对话一人做。文案起稿、DeepSeek 点评与审稿人的研判记在 hachimi-ios `specs/113-copy-system/plan.md` 的落地记录，这里只记官网的做法。

## 文案

- `lib/i18n/types.ts`：`hero` 加 `bridge`，`what` 加 `eyebrow`，注释写明各对应哪一句定稿句。
- `lib/i18n/zh.ts` 与 `en.ts` 按 spec 各节改。
- `app/[locale]/page.tsx` 的页面描述由称呼与记忆锤拼成；`lib/config.ts` 的站点描述与 `public/site.webmanifest` 同口径。
- `scripts/build-llms.mjs` 把过桥句与称呼写进 `llms.txt` 与 `llms-full.txt`，重新生成。

## 组件

- `components/hero.tsx`：口号下加一段过桥句，入场比口号晚一拍。
- `components/manifesto.tsx`：大字上方加称呼行，作本节标题；大字只有一行，字号降一档。

## 门

- `scripts/count-copy.mjs`：过桥句单列一档，中文 16 字；称呼行并进定位一档。
- `package.json`：`check:canon` 跑 `python3 ../hachimi-ios/scripts/copy-canon-gate.py --only web --require-sibling`，挂进 `check`。

## 验收

1. `npm run check`。
2. 本机构建后起静态服务，浏览器实拍桌面 1440 与手机 390、中英、浅深，看过桥句、称呼行与记忆锤的断行。
3. 推 main，线上回读首屏与 `llms.txt`。

## 落地记录

- 定稿句：首屏过桥句、定位一节的称呼与记忆锤、常见问题会员一条里的 C6，`check:canon` 逐字核对通过。DeepSeek 与审稿人的采纳和驳回记在 hachimi-ios plan 113 的落地记录。
- 审稿后改的官网句子：定位第一件写“同一个真太阳时”，第二件改成“两张盘都在这份命例里，起过的每一卦和事后补记的结局按时间排着”，第三件标题去掉“换”；命例走查删去“道长接着上回说”；八字卡写“原局和岁运的刑冲合害分开列”；梅花卡展开删去与过桥句重复的一句；常见问题“能和我现在用的盘对上吗”与“要联网吗”改写；删除数据页补停用在线解读的路径与匿名标识的用途，支持页写 iPadOS。删除数据页与支持页的 `pageDates` 改为 2026-10-02。
- 断行：英文 390 宽下称呼行孤一个词，定位三件的英文标题在 1440 宽把 “Ba Zi” 拆在两行，`components/manifesto.tsx` 的称呼行与三件标题加 `text-balance`。
- 实测：`wrangler pages dev out` 下 zh 1440 浅色、zh 390 浅色、en 390 深色、en 1440 深色，首屏过桥句与定位一节无横向溢出、断行落在标点或词间。
