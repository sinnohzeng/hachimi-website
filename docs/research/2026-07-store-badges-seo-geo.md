# 调研沉淀：商店徽章规范 · 商店开发者名称政策 · SEO/GEO 2026 年中

> 抓取日期：2026-07-09（firecrawl 三线并行）。本篇是结论蒸馏，驱动了同月的官网上架迭代（见 `docs/launch/2026-07-store-launch-iteration.md`）。
> 标注：📘 官方原文｜📗 社区共识/实证｜💭 推断。

## 一、商店徽章官方规范

### Apple App Store 徽章 📘

- 官方生成器已整体迁移到 **App Store Marketing Tools**：`https://toolbox.marketingtools.apple.com/app-store/`；旧域 `tools.applemediaservices.com` 301 过去（实测确认）。
- 徽章 API 直链（本仓已下载自托管到 `public/badges/`）：
  `https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/{en-us|zh-cn}?size=250x83`
- 规则：默认黑色版（灰描边是徽章一部分，不可去）；**与其他商店徽章并排必须黑色版且 App Store 徽章排第一位**；最小留白 = 徽章高 1/4；屏显最小高 40px；只翻译修饰语，“App Store”永远保持英文；禁修改/倾斜/动画化。
- 来源：`https://developer.apple.com/app-store/marketing/guidelines/`

### Google Play 徽章 📘

- 旧自助生成器 `play.google.com/intl/en_us/badges/` 已退役，重定向到需注册的 Partner Marketing Hub；**旧托管 PNG 直链仍有效**（实测 200）：
  `https://play.google.com/intl/en_us/badges/static/images/badges/{en|zh-cn}_badge_web_generic.png`
- 规则：并排时 **Play 徽章不得小于其他商店徽章**（与 Apple 的“第一位”规则合并解 = 两枚视觉等高、App Store 在前）；留白同为 1/4 徽章高；禁改色、禁改徽章图形本体。
- 实测坑 📗：官方 PNG 的透明边距在 en / zh 两版比例不同（内容高 168/250 与 192/250），单一 CSS 高度补偿无法两语言都等高。通行处理是裁掉纯透明边距（徽章图形与配色不动，规范约束的是图形本体），两家徽章按同一显示高度排布即视觉等高。
- 来源：`https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/`

### Smart App Banner 📘

- 仍是 Apple 现行官方推荐，仅 iOS Safari 显示：`<meta name="apple-itunes-app" content="app-id=…, app-argument=…">`。
- Next.js Metadata API 原生支持：`itunes: { appId, appArgument }`（本仓 `lib/metadata.ts`）。
- 来源：`https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners`

### 布局最佳实践 📗

- 双徽章放 Hero 首屏、标题/副标题之下，徽章本身即 CTA，不另造下载按钮；移动端 UA 检测收敛为单徽章（SSG 首帧双徽章，客户端收敛，防 hydration mismatch）；桌面二维码可选（本迭代评估不做，见 spec）。
- 来源：`https://www.klientboost.com/landing-pages/app-landing-page/` 等。

## 二、商店“品牌名替代工商实名”政策

|              | Apple App Store                                                                                                                   | Google Play                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 商店页主显名 | 可用**已注册** trade name/DBA，但**只能在账号首次创建 App record 时设置，事后不可改**📘                                           | Developer name 可随时改成品牌名，过审即生效，无注册要求 📘                         |
| 法定实名底线 | 本项目窗口已过（iOS 已上架），seller 保持 `YUENCHUK INVESTMENT LIMITED`；仅 **Copyright 字段**（per-version 自由文本）可写品牌 📘 | 组织账号的**法定名称+地址+开发者邮箱+电话**在“关于开发者”区块全球公示，无法关闭 📘 |
| EU 增量      | DSA trader 信息（D-U-N-S 地址/电话/邮箱）仅欧盟 27 国商店页显示 📘                                                                | DSA 无额外增量（全球公示已覆盖）                                                   |

- Apple 来源：`developer.apple.com/help/account/membership/program-enrollment/`、`developer.apple.com/help/app-store-connect/create-an-app-record/set-your-developer-name/`
- Google 来源：`support.google.com/googleplay/android-developer/answer/13628312`、`answer/13634081`
- 结论：Play 显示名改 Hachimi.ai（owner 手动）+ ASC Copyright 改 `2026 Hachimi.ai`（fastlane）已是两店合规上限；若未来注册新 Apple 账号（新主体/新 App），首次建 App record 是唯一的 DBA 窗口，务必一次做对 📗。

## 三、SEO/GEO 2026 年中

1. **GEO 即 SEO** 📘：Google 官方《Optimizing for generative AI》明确 AI Overviews/AI Mode 无额外机读文件要求；内容 chunking、为 AI 改写文风、堆结构化数据被官方点名无效。
   来源：`https://developers.google.com/search/docs/fundamentals/ai-optimization-guide`（2026-06-29 更新）
2. **llms.txt 无效但无害** 📘📗：Google Search 明确忽略；Ahrefs 13.7 万站实测 97% 从未被读取。本仓保留两文件，只做内容保鲜，不再投入。
   来源：`https://ahrefs.com/blog/llmstxt-study/`（2026-06-15）
3. **robots 全放行 AI 爬虫** 📘：搜索类爬虫（OAI-SearchBot/Claude-SearchBot/PerplexityBot/Googlebot）是被 AI 引擎收录的硬前提；**Google-Extended 同时控制 Gemini grounding**，禁了它 Gemini 拿不到最新内容。本仓 robots.txt 维持全放行 + Content-Signal。
   来源：`https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers`
4. **信息保鲜与纠错** 📘📗：更新内容 → 页面可见“最后更新”与 JSON-LD `dateModified` 两处一致 → sitemap lastModified 用真实内容日期（禁 build 时间）→ Search Console 请求重抓 + Bing Webmaster Tools/IndexNow（ChatGPT 检索主走 Bing）→ 商店页元数据同样保鲜（AI 答案第二信息源）。
   来源：`https://developers.google.com/search/docs/appearance/publication-dates`、`https://www.semrush.com/blog/fix-ai-brand-misinformation/`
5. **SoftwareApplication schema** 📘：必需 `name` + `offers.price`（免费写 0）；`aggregateRating` 须真实评分，无评分不加；`downloadUrl`/`sameAs` 非 Google 富结果字段但对 LLM 解析与实体归并有价值 📗。
   来源：`https://developers.google.com/search/docs/appearance/structured-data/software-app`
6. **FAQ 富结果已弃用** 📘（2026-05-07 正式，2026-06 删文档）：可见 FAQ 文本保留（LLM 提取有价值），FAQPage 标记保留无害。
   来源：`https://developers.google.com/search/updates`
7. **hreflang 对 Google/Bing 系有效，对 ChatGPT/Perplexity/Claude 基本无效** 📗：三家常引英文版 URL，**英文页保鲜优先级最高**。
   来源：`https://www.gsqi.com/marketing-blog/ai-search-hreflang-multilingual-queries/`（2025-12 实测）
8. **App 深链不再是 SEO 渠道** 📘：Firebase Dynamic Links 已于 2025-08-25 关停；Universal Links/App Links 属产品功能而非 SEO 项。
   来源：`https://firebase.google.com/support/dynamic-links-faq`
