# 迭代 spec：官网上架切换（2026-07-09）

> 时点产物。App 已上架 App Store（id6787621766）与 Google Play（com.hachimi.hachimi_app），官网从“预告期”叙事切换到“已上架”。调研依据见 `docs/research/2026-07-store-badges-seo-geo.md`。

## 需求

1. 双商店官方徽章上 Hero（含移动端 UA 收敛、Smart App Banner）。
2. 导航/IA 重排：methodology 升顶导航、导航全站显示、下载成为全站唯一主 CTA。
3. 公司实名最小化：署名统一 Hachimi.ai，实名只留法律页（英文页仅英文名、中文页仅中文名）。
4. SEO/GEO 保鲜：结构化数据补商店链接、sitemap 日期改真实内容日期、llms 文件刷新口径。

## 落地清单

- 徽章资产：`public/badges/`（Apple SVG en/zh + Play PNG en/zh，官方素材自托管）。
- 新组件：`components/store-badges.tsx`（useSyncExternalStore 读 UA，server 快照 null = 双徽章，hydration 安全；App Store 第一位、视觉等高）。
- Hero：胶囊条改为 methodology 引流真链接；CTA 区 = 双徽章 + “看看怎么玩”次级文字链。
- FinalCTA：`id="download"` 下载区（双徽章 + 一行事实小字），是 header/移动菜单“下载 App”的落点。
- 导航三项制：怎么玩（锚）· 起卦的门道（真页）· 常见问题（锚）；数说道长移出一级导航、页脚保留；导航全站显示，子页锚点回跳 `/{locale}#…`。
- smooth-scroll 拦截器升级：只拦同页 hash，跨页/外链/mailto 放行。
- 页脚：品牌列加双店小徽章（sm 档）；Product 列锚点改绝对路径（修子页坏锚）；Legal 列补“账号与你的数据”。
- methodology：intro 下可见“最后更新”；页尾加双徽章，读完门道就地可下载，ctaHome 降为次级文字链。
- 实名：`lib/config.ts` authors → Hachimi.ai（meta author + JSON-LD Organization 跟随）；页脚版权 → `© 2026 Hachimi.ai`；en.ts 法律页 7 处去中文前缀；llms 两文件同步。
- SEO/GEO：SoftwareApplication 单节点双类型（+MobileApplication）、`operatingSystem: "iOS, Android"`、`downloadUrl`/`sameAs` 商店链接、`dateModified`；sitemap 读 `pageDates`。

## 关键决策（含“评估不做”）

| 决策                                      | 结论                                       | 理由                                                                                                     |
| ----------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| JSON-LD Organization 是否留 `legalName`   | 不留                                       | 最小暴露优先；法律义务由法律页正文履行；可逆决策，日后可补                                               |
| SoftwareApplication 拆两条（iOS/Android） | 不拆，单节点双类型                         | 一个产品一个实体，拆分稀释实体信号                                                                       |
| `aggregateRating`                         | 暂不加                                     | 无真实商店评分，虚假评分有手动处罚风险；有评分后回填                                                     |
| FAQPage 标记                              | 保留                                       | 富结果虽弃用，但零维护成本、AI 检索器仍消费结构化 QA                                                     |
| 桌面二维码 / `/get` UA 跳转页             | 不做                                       | Hero 视觉密度已到上限；主路径已被徽章 + Smart App Banner 覆盖；真实场景是印刷物料，届时 30 分钟可加      |
| 移动端 header 常驻下载胶囊                | 不加                                       | Smart App Banner + Hero 徽章 + 汉堡菜单主按钮已够                                                        |
| Hero 胶囊条                               | methodology 引流                           | 已上架信度由徽章承担；首屏最顶端视觉位留给作品集诉求（用户拍板）                                         |
| llms.txt                                  | 保留但只保鲜                               | 实证对 AI 搜索无效，维护成本约等于零                                                                     |
| Play 徽章透明边距                         | 裁掉纯透明边距，与 Apple 徽章同高排布      | en/zh 两版边距比例不同（168/250 与 192/250），CSS 补偿无法两语言等高；裁边不触碰徽章图形本体（用户反馈） |
| 中文页斜体                                | `:lang(zh) .italic` 全局回正               | 中文排版没有斜体传统，衬线斜体只保留在 en 页（用户反馈）                                                 |
| 宣传口径边界                              | “免费/无广告/无账号”只作信息陈述，不作卖点 | 未来可能收费/加账号云同步，卖点只写长期成立的产品事实，FinalCTA 小字改为起卦耗时（用户反馈）             |

## pageDates 维护规约

`lib/config.ts` 的 `pageDates` 是全站“内容最后更新”SSOT：

- sitemap `lastModified` 与 JSON-LD `dateModified` 都从这里读，**永不使用 build 时间**（CF Pages 每次 push 全站重建，build 时间会把每次部署都伪装成内容变更，日期信号作废）。
- 某页可见内容变更时手动 bump 对应键；法律页必须与 `lib/i18n` 里的可见 `effectiveDate` 同步；methodology 页另有可见 `lastUpdated` 文案，三处 lockstep。

## Owner 手动清单（站外，代码做不了）

1. Play Console → Developer account → About you → Developer name 改为 `Hachimi.ai`，保存等审核（列表/搜索处即显示品牌名；“关于开发者”区块的法定名+地址为平台强制公示，无法关闭）。
2. （可选缓冲）核对 Payments/D-U-N-S 公示地址为公司注册处地址，开发者邮箱/电话用 voice@hachimi.ai 与业务号码。
3. Google Search Console + Bing Webmaster Tools：提交 sitemap，对 `/en`、`/en/methodology` 请求重抓（Gemini 信息纠错的最后一步）。
4. ASC 下个 iOS 版本随审确认 Copyright 显示 `2026 Hachimi.ai`（fastlane 已改）。

## 验收

- 门：`npm run format:check && npm run lint && npm run typecheck && npm run build` 全绿。
- 产物断言：`out/en.html` 含 `apple-itunes-app`、`"operatingSystem":"iOS, Android"`、`downloadUrl` 双链接；首页可见内容零实名（RSC 水合载荷中的法律页文案除外）；`out/sitemap.xml` 日期为真实内容日期；en/zh 首页各用本语言徽章。
- 法律页：en 仅 `Yuenchuk Investment Limited`（3 处），zh 仅“元竹投資有限公司”（3 处）。
