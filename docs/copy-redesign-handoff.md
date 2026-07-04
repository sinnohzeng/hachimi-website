# 交接：哈基米道长全站文案顶层重做（2026-07-03）

> 给新对话的入口 brief。当前文案已是「机检红线干净」的基线，但 owner 对整体定位与语气不满意，要求**顶层重做**，不在现版上继续润色。

## 目标

把哈基米道长的**全部文案**（官网 + iOS App，三语）按产品定位顶层重新设计一遍，做到官网与 App 风格统一。方法：先回到梁宁《真需求》重定位，设计好核心文案原则，再用《怎样写作》（任仲然）的写作逻辑慢慢写。现版文案当作**待替换的基线**，不是待润色的稿子。

## 方法论（务必按此顺序）

1. **回到梁宁《真需求》做定位**。用其框架重新想清楚：用户是谁、在什么真实场景下打开、当时是什么情绪（痛点／痒点／爽点）、真需求还是伪需求、用户价值公式、产品定位（点线面体）。哈基米道长不是算命工具，是情绪价值产品，核心真需求由新对话自行推导，别照抄旧结论。
2. **从定位推导「核心文案原则」**：一句话价值主张、人设与语气、术语表、能说不能说清单。先立原则、整体把握，再动笔。
3. **用《怎样写作》写作逻辑**：一文一主题、小切口大思路、结构服务内容、材料事实、平实克制。
4. **官网↔App 统一**：同一套人设、术语、语气。先定 master 文案原则，再分别落到官网 i18n 与 iOS xcstrings。
5. **慢慢写，多轮打磨**。用 writing-polish Polish Protocol：主线串行改稿（禁并行 writer），clean-context reviewer 子代理多角度多轮评（立意／结构／材料·事实／AI味·标点）。

## 硬约束（不可协商）

- **禁破折号**（——／em-dash）。
- **禁括号内叙事**。合法法律括号可留：术语首释、缩写首现、公司名注、法条引用、URL。
- **GB/T 15834 中文标点**：弯引号 “”‘’、中文冒号 ：、中文括号 （）。禁 ASCII 直引号、禁直角引号「」。
- **去 AI 味**（writing-polish v7 全套红线）：禁「接住／被听见／共情／看见你」客服咨询师腔、否定平行「不是 X 而是 Y」、公文黑词、网感词（智商税／本站／干货）、数学符号（+／=／→）、战斗化戏剧化叙事。
- **产品定性红线**：仅供娱乐与情绪陪伴，不预测、不改命、不转运、无功效声称（App Store 5.x + 法律合规）。
- **三语一致**：简体中文（源）+ 繁体中文 + English。
- **commit 无任何 Claude／Anthropic 署名**。

## 产品事实（真源，勿失真）

- 名称：哈基米道长 / Master Hachimi，品牌 Hachimi.ai。运营主体：元竹投資有限公司（香港）。
- 品类：梅花易数占卜 × 情绪价值 App。人设：一只温和的猫系道长「基米道长」。
- 玩法：写下想问的事 + 凭直觉报两个数字 + 选问事场景（寻物／关系／决策／自由问事）→ 后端按确定性方法起卦 → 卦象、时辰、问题、场景发往第三方 AI 服务（当前 Google Gemini）付费档 → 以道长口吻生成解读。两个起卦数字不发往该服务。
- 三大问事卡：寻物（找回丢失的东西）、关系（理一理和某个人的心结）、决策（在两难之间拿个主意），外加自由问事。
- 隐私：无账号、无登录；卦历只存本地设备；后端瞬时转发不持久化；首次解读前征得同意、可随时撤回。
- 平台：iOS 先上（即将登陆 App Store），Android 原生重建中（ADR-0022）。官网先于 App Store 上线。

## 文案所在位置

- **官网**：`hachimi-website/lib/i18n/zh.ts` + `en.ts`（结构定义 `types.ts`）。区块：nav / hero / featureCards / featureHighlight / principles / stats / faq / finalCta / footer / privacy / terms / accountDeletion / dataDeletion / support。构建 `npm run build`（Next 15 static export），本地预览 `npx serve out -l 4321`。
- **iOS App**：`hachimi-ios/App/Localizable.xcstrings`（144 键/语，zh-Hans 源 + zh-Hant + en）。SwiftUI `Text("中文")` 走 LocalizedStringKey 自动本地化，这是 App 全部界面文案的真源。本 session 未动，仍是旧语气，须纳入统一重做。
- **Android**：`hachimi-android`（原生重建中，字符串资源；优先级次于 iOS，但风格须对齐）。

## 工具与技能

- **写作技能 v7**：源码 `~/Workspace/xuan-jiang/plugins/writing-polish/`。主 SKILL `skills/writing-polish/SKILL.md`；反 AI 味锚点 SSOT `references/anti-ai-taste-anchors.md`（230+ 条）；reviewer 子代理 `agents/writing-reviewer.md`；硬扫脚本 `scripts/scan-ai-taste.sh <file>`。或直接 `/writing-polish`。注意：对 `.ts` 扫描时，ASCII 引号计数是 TypeScript 字符串定界符 `"` 的假阳性，忽略（文案内容用的是弯引号）。
- **梁宁《真需求》**：应用其产品分析框架。项目调研与思考在 KB `~/sinnoh-kb/wiki/themes/lost-and-found-divination/`（若目录名有变，在 `~/sinnoh-kb/wiki/themes/` 下找占卜/寻物主题）。

## 本 session 已完成（基线）

- 官网 CJK 豆腐 bug 已修复并部署：`--font-sans` 直接点名 `@font-face` 家族名，绕开 next/font 把 `--font-geist-sans` 注入 `<body>`、而 `--font-sans` 定义在 `:root` 导致的变量作用域断裂（IACVT → 整页回落 `system-ui` 链 → iOS 中文豆腐）。commit `379e4c2`。
- FeatureHighlight 手机占位框已替换为真实 App 截图（result 屏，locale 感知，WebP）。commit `26c7ef6`。
- 文案去 AI 味首轮已部署：清破折号／括号内叙事／数学符号／客服腔红线。commit `24138d3`。**这是重做的干净起点，但 owner 要顶层重做，不在此版上继续润色。**

## 验收

- 官网：`npm run build` 绿 + `scan-ai-taste.sh` 红线归零 + iOS 模拟器实拍（zh/en × light/dark；豆腐已修，CJK 正常渲染）。用真机模拟器，别用 macOS Chromium（有 PingFang 会假绿）。
- App：`make check`（项目唯一门，含 swiftlint + test）。
- commit + push：无 Claude 署名；官网 push main 自动部署 CF Pages。
- 落盘：定位结论与文案原则蒸馏进 KB theme + 项目 docs（SDD 零漂移）。

## 开场第一步（新对话）

1. 读本文件 + KB theme 目录（产品调研与定位思考）。
2. 读 writing-polish `SKILL.md` + `anti-ai-taste-anchors.md`。
3. 读现版 `zh.ts` / `en.ts` / `Localizable.xcstrings` 当基线。
4. 进 brainstorming／plan：先用《真需求》推导定位与核心文案原则，与 owner 对齐后再写。
