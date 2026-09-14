# spec 001：官网第三版，一句话首屏与七节结构

> 状态：待实现｜创建：2026-09-14｜思路：[docs/plan/2026-09-14-site-v3-思路.md](../../docs/plan/2026-09-14-site-v3-思路.md)｜依据：[调研](../../docs/research/2026-09-14-landing-page-practice.md)

## 造什么

把首页从十节压成七节，首屏只留“慌的时候先起一卦。”一句加 App Store 徽章加一张起卦结果图；全页除 FAQ 可见正文不超过 250 字；截图三张，排盘两张署名李小龙；深度机制全部搬进方法页。中英两版同构。

## 为什么

owner 三条口径：首屏只留一句；整站字太多要大刀阔斧重写；官网不等于逐功能截图加介绍。调研十六站给出的克制路线与这三条一致：一句首屏、六到七节、三到四张图、术语退二级页、一个 CTA。

## 七节

按 [思路](../../docs/plan/2026-09-14-site-v3-思路.md) 第四节的表逐节落。组件层面：

| 节 | 组件 | 处置 |
| --- | --- | --- |
| 1 首屏 | `Hero` | 重写：只剩 `headline`、App Store 徽章、一张手机图；删 eyebrow、description、memory、第二 CTA |
| 2 这是什么 | 新 `WhatItIs` | 品类锚做标题，三步做三格短句；取代 `FeatureCards` 与 `ScenarioCards` |
| 3 道长记得 | 新 `Remembers` | 差异句一句；取代 `FeatureHighlight` |
| 4 排一张盘 | `ChartShowcase` | 收成两格：紫微一句加一图、八字一句加一图，一个进方法页的链接；删 bullets 与 body |
| 5 学堂 | `AcademyShowcase` | 收成一句，无图；学堂改版后另起一刀补一张根屏图 |
| 6 本机算 | `Principles` | 一句加三个标签 |
| 7 FAQ 与结尾 | `FAQ`、`FinalCTA`、`Footer` | FAQ 五条；`Stats` 整节删，八个数字压成页脚上方一行 |

## 文案

- 事实稿写在 `docs/copy/2026-09-14-v3/facts.zh.json`，经 `scripts/polish-copy.mjs` 交 deepseek-flash 出 `polished.zh.json` 与 `polished.en.json`，再进 `lib/i18n/{zh,en}.ts`。人不直接写页面文案。
- 主标题“慌的时候先起一卦。”与英文“When it's a lot, cast a hexagram.”是北极星原文，不送润色。
- 品类锚沿用 [copy-principles](../../docs/copy-principles.md) 第二节 2026-09-14 那一行；差异句沿用 2026-07-21 那一行。
- 红线不变：不预测、不改命、不转运、仅供娱乐；排盘只讲可复算与本机算。
- 事实稿里不出现任何对照来源的名字，`check:mentions` 继续做门。
- 字数以简体可见正文计，标点不计；英文按单词计，上限取简体字数的 0.6 倍。

## 截图

- 三张：起卦结果页一张给首屏；紫微三合盘一张、八字四柱一张给第四节。浅色深色各一份，`AppShot` 按 `dark:` 切。
- 排盘两张的命例署名“李小龙”，生辰用公开传记记载，由 iOS 截图枪种子产出，官网仓只收成图，不在本仓写生辰。
- 学堂不配图，直到学堂改版落地。

## 方法页

`/[locale]/methodology` 的排盘一节接住从首页撤下的机制说明：三种盘式、格局规则条数、安星设置十组、中州派三盘、紫占排盘、四柱反查、八字四柱与大运流年。这一页面向第三路人，术语可以直接写。

## 验收

1. GIVEN 桌面 1440×900 与手机 390×844 打开 `/zh`，THEN 首屏只见主标题、App Store 徽章、一张手机图，无第二句文字；英文版同。
2. GIVEN `/zh` 全页，THEN 依次七节，节序如上表；`Stats` 节不存在，统计只在页脚上方一行。
3. GIVEN 统计脚本 `scripts/count-copy.mjs`（新增，见 plan），THEN 首屏简体 ≤ 9 字，全页除 FAQ 简体可见正文 ≤ 250 字，FAQ 五条各 ≤ 60 字；英文对应 ≤ 0.6 倍单词数。脚本进 `npm run check`。
4. GIVEN 首页图片，THEN 恰三张 App 截图（浅深各一套算一张），第四节两张的图内可见“李小龙”，图内无任何空白姓名位。
5. GIVEN 方法页排盘一节，THEN 从首页撤下的七项机制每项至少一句。
6. GIVEN `npm run check`，THEN lint、typecheck、`check:mentions`、`count-copy`、构建全绿；`out/` 里 `zh` 与 `en` 都有 `index.html`。
7. GIVEN 浏览器实拍（Playwright，桌面与手机、浅色与深色、中英），THEN 无溢出框、无空白节、无被遮挡的徽章；英文首屏在 1440×900 不溢出。
8. GIVEN `llms.txt` 与 `metadata`，THEN 与七节口径一致，不再列被撤下的机制。

## 不做

- 社会证明条：没有真实评分与下载量前不摆。
- 功能矩阵、截图画廊、准确率承诺。
- 第五节的学堂图：等学堂改版。
