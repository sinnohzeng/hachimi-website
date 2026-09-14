# plan 001：官网第三版怎么造

> 对应 [spec.md](spec.md)。执行者：官网子智能体（Opus 5）。截图由 iOS 仓另产，见第 5 步。

## 1. 事实稿与润色

1. 新建 `docs/copy/2026-09-14-v3/facts.zh.json`，键与七节一一对应，每条带 `limit`（简体字数上限，取自 spec 字数表）。北极星两句用 `verbatim: true` 标出，脚本原样透传不送润色。
2. `scripts/polish-copy.mjs` 增加 `limit` 处理：润色 prompt 里带上限，返回超限则带着字数重试一次，仍超限则报错退出，不静默截断。
3. 跑 `node scripts/polish-copy.mjs docs/copy/2026-09-14-v3` 出 `polished.zh.json`、`polished.en.json`，DeepSeek 密钥按仓内 README 从 `../hachimi-ios/.env` 读，不打印。
4. 润色稿进 `lib/i18n/zh.ts` 与 `en.ts`：删掉被撤组件的键，新增 `whatItIs`、`remembers` 两组键。繁体由现有流程派生。

## 2. 组件

- `components/hero.tsx`：只剩 `headline`、`<StoreBadge>`、`<AppShot>`；删 eyebrow、description、memory、第二 CTA 与相关样式。
- 新 `components/what-it-is.tsx`：标题一行，三格短句横排，手机竖排。
- 新 `components/remembers.tsx`：一句居中，节高不超过一屏的三分之一。
- `components/chart-showcase.tsx`：两格，每格一句加 `<AppShot>`，末尾一条链接到 `/[locale]/methodology#paipan`。删 bullets 与 body 渲染。
- `components/academy-showcase.tsx`：一句，无图。
- `components/principles.tsx`：一句加三个标签。
- `components/faq.tsx`：五条。
- `components/footer.tsx`：徽章上方加一行统计小字，取自 `stats` 事实。
- 删 `components/feature-cards.tsx`、`scenario-cards.tsx`、`feature-highlight.tsx`、`stats.tsx` 及其测试与 i18n 键。零兼容残留。
- `app/[locale]/page.tsx` 按七节重排。

## 3. 方法页

`app/[locale]/methodology/page.tsx` 排盘一节扩写，锚点 `#paipan`，七项机制每项一句，文案同样走事实稿加润色。

## 4. 字数门

新增 `scripts/count-copy.mjs`：读 `lib/i18n/zh.ts` 与 `en.ts`，按 spec 验收 3 的口径统计首屏、全页除 FAQ、FAQ 每条，超限非零退出并打印超限键。挂进 `package.json` 的 `check`。

## 5. 截图

- iOS 仓截图枪加名人种子并重切三张（起卦结果、紫微三合盘、八字四柱，浅深各一），产物落 `hachimi-ios/build/device-walk/site-v3/`。这一步归 iOS 仓的 [059](../../../hachimi-ios/specs/059-library-default-group-and-named-seed/spec.md)。
- 官网仓 `scripts/build-shots.mjs` 从那个目录取三张，其余四十余张从 `public/shots` 删掉。
- 成图前用现有匿名截图占位把页面搭出来；推 main 之前必须换成署名图，否则不推。

## 6. 验证

1. `npm run check` 全绿。
2. `npm run build` 后 `npx serve out -l 4173`，Playwright 拍桌面 1440×900 与手机 390×844，浅深与中英共八张，逐张看首屏、七节、无溢出。
3. `check:mentions` 与 `count-copy` 的输出贴进落地记录。

## 7. 收尾

- `docs/copy-principles.md` 第二节补“2026-09-14 官网 v3”一行：首屏只留主标题，品类锚做第二节标题，差异句做第三节。
- `public/llms.txt` 与 `app/[locale]/layout.tsx` 的 `metadata` 对齐七节。
- 提交按节分批，Conventional Commits 中文描述，不推送，推送与部署归主对话。

## 落地记录

待填。
