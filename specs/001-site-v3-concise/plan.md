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

2026-09-14 落地，提交在 `main` 上未推送。

### 字数门

`npm run check:copy`（`scripts/count-copy.mjs`，已挂进 `npm run check`）：

```
简体（字，标点不计）
   首屏              8 / 9
   全页除 FAQ      209 / 250
   FAQ 1 答         44 / 60
   FAQ 2 答         44 / 60
   FAQ 3 答         31 / 60
   FAQ 4 答         40 / 60
   FAQ 5 答         45 / 60

英文（词，上限为简体的 0.6 倍）
   首屏              7 / 北极星原文，不设门
   全页除 FAQ      148 / 150
   FAQ 1 答         36 / 36
   FAQ 2 答         36 / 36
   FAQ 3 答         28 / 36
   FAQ 4 答         35 / 36
   FAQ 5 答         33 / 36
```

`npm run check:mentions`：对客文案门通过，5 份文案真源里没有参考来源的名字，也没有表情符号。

### 实拍

`npm run build` 后 `npx serve out -l 4173`，Playwright 整页实拍八张，落在
`ziweidoushu/.playwright-mcp/`：

| 档位               | 浅色                      | 深色                     |
| ------------------ | ------------------------- | ------------------------ |
| 桌面 1440×900 中文 | `v3-zh-desktop-light.png` | `v3-zh-desktop-dark.png` |
| 桌面 1440×900 英文 | `v3-en-desktop-light.png` | `v3-en-desktop-dark.png` |
| 手机 390×844 中文  | `v3-zh-phone-light.png`   | `v3-zh-phone-dark.png`   |
| 手机 390×844 英文  | `v3-en-phone-light.png`   | `v3-en-phone-dark.png`   |

逐张看过：首屏只有主标题、商店徽章、一张手机图，没有第二句文字；七节齐全，节序
与本篇一致；四档 `scrollWidth - clientWidth` 均为 0，无横向溢出。手机档首屏实测
高 844，图底在 796，留 48 内边距，不挤出屏。深色档三张截图按 `html.dark` 换成了
深色版。

### 两处与 spec 不一致，待 owner 过目

1. **验收 3 的英文 0.6 倍，首屏那一句超一个词。** 英文主标题 `When it's a lot, cast
a hexagram.` 是 7 词，9 字乘 0.6 向上取整是 6 词。spec 同时写着「北极星原文不送
   润色」与「0.6 倍」，这一句上两条撞车。按更具体的那条办：句子不动，`count-copy`
   对它只报数不设门，其余全部照门走。另有三条正文按同样的理由在事实稿里写了
   `enLimit` 覆盖并注明原因（`chart.ziwei` 16 词、`chart.bazi` 15 词、`academy.text`
   17 词）：术语表要求的专名本身就占掉十一个词，压到 0.6 倍只能砍专名。
2. **验收 4 的署名图还没到。** 第四节两张与首屏一张目前都是现有匿名图占位，首屏那张
   是旧的 720 宽起卦结果图，只有一档宽度、没有深色版，源移到了 `assets/shots/`
   不随构建出门。署名「李小龙」的三张由 iOS 仓 spec 059 另产，到位后改
   `scripts/build-shots.mjs` 的 source 并把 `components/app-shot.tsx` 的 `widths`
   与 `dark` 补齐即可，调用点不动。**换图前不推、不部署。**
