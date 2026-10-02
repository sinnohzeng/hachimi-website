# Plan 006：官网改单页怎么造

> 对应 [spec.md](spec.md)。状态：已落地｜创建：2026-10-02

主对话一人做，不拆片：文案与结构改的是同一批文件。

## 文案

1. 主对话按 hachimi-ios `docs/copy-principles.md` 起稿，背景包交 DeepSeek 独立写一版并逐条挑刺，主对话合稿进 `lib/i18n/zh.ts` 与 `en.ts`。
2. 合稿后派一个不看起稿过程的审稿人，口吻与站位放第一位；文案抽成 Markdown 跑 `scan-ai-taste.sh`，红线归零。
3. `lib/config.ts` 的站点描述与 `public/site.webmanifest` 同口径；`pageDates.home` 改成 2026-10-02。

## 结构

- 删 `app/[locale]/methodology/` 与 `components/methodology.tsx`；`lib/i18n/types.ts` 去掉 `methodology` 块与 `nav.methodology`。
- `components/header.tsx`：导航表全是锚点，删掉真页那一支的判断。
- 页脚“产品”栏在 `lib/i18n` 里改成命例、工具、学堂、常见问题四项。
- `public/_redirects`：`/methodology` 302 到 `/en#faq`；`/:locale/methodology` 与带斜杠的那条 301 到 `/:locale#faq`，放在占位符规则一组。
- `app/sitemap.ts`、`lib/config.ts` 的 `pageDates`、`scripts/page-dates.test.mjs`、`scripts/build-llms.mjs` 去掉这一页，重新生成 `public/llms.txt` 与 `llms-full.txt`。
- `scripts/count-copy.mjs`：“给命理师”一档改名“定位”，键表与上限不动。
- `README.md`、`deploy/cloudflare-pages.md` 的页面清单与冒烟循环跟着改。

## 换屏

`components/case-journey.tsx` 的 `ScreenLayer`：五层按序叠放，`index <= active` 的层不透明、其余透明，只动 `opacity`，后一层压在前一层上面。往前滚是新层在上面淡入，往回滚是上层淡出，下面那层一直不透明，所以过程中不露底色。淡入时带一点从 1.02 回到 1 的缩放，压暗层撤掉。时长与缓动用 `lib/motion-tokens.ts` 的档位。`StepText` 的位移从 32 收到 12。

## 验收

1. `npm run check`。
2. 本机 `npm run build` 后起静态服务，浏览器实拍桌面 1440 与手机 390、中英、浅深；滚过命例走查截几帧看渐变；点导航四项看落点。
3. 推 main，线上回读：`/zh`、`/en` 200，三个旧网址的跳转目标，`llms.txt` 不再列这一页。

## 落地记录

- 文案：DeepSeek 的独立稿与点评采纳三处：紫微卡“和别人的盘对上”不点名老师与同行，命例库“发给别人”不分同行朋友，英文 `Cast for this person` 一类动作句；不采纳两处：定位句改成“给看盘、起卦的人做的工具”，命例走查引言去掉人群枚举，两处都会让爱好者读不出自己在里面。审稿人提的引言指代、英文术语对齐 App、紫占释义、刑冲合害英文、站点描述去掉 serious 都已改；其余旧句的可读性意见不在本次三条之内，未动。
- 断行：手机上定位句会在“爱好”与“者”之间断开。`what.titleLines` 按行给出，`components/manifesto.tsx` 每行包一个 `inline-block`，行内不断；`scripts/count-copy.mjs` 校验各行拼起来等于整句，`hero.headlineLines` 同一条规则。走查引言第二句改成“两张盘和为这个人起过的每一卦，都在名下。”，桌面两行断在句号上。
- `npm run typecheck` 先跑 `next typegen`，删了路由不必先构建一次。
- 实测：`wrangler pages dev out` 下四个旧网址的状态码与落点、导航四个锚点、zh 360 与 en 390 与 1440 宽的断行、逐帧采样的换屏透明度（无位移，下层始终不透明），均与验收标准一致，无横向溢出。
