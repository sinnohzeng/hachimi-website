# 官网第四版改版调研（2026-09-22）

> 四路并行调研的结构化结果，供 spec 005 取材。事实各带出处，引用前按出处再核一遍。

## 一、官网历史版本

### 第零版：React Bits Pro Finance 模板与前身产品（考古起点，非哈基米道长）

- 范围：6632ecf..34fe655（2025-12-31 至 2026-03-17）

节结构：

- b1fc2e7 app/page.tsx 的模板节序：Hero / TrustedBy / FeatureCards / FeatureHighlight / Principles / Stats / TestimonialsSlider / Pricing / FAQ / BlogShowcase / FinalCTA / Footer，整站骨架从此继承
- a472bf6（2026-02-22）改成前身产品 Hachimi 的双语站，34fe655 时节序已收成 Hero / FeatureCards / FeatureHighlight / Principles / Stats / FAQ / FinalCTA
- commit b1fc2e7 标题写明站点来自“React Bits Pro - Finance Template”，也就是说现在官网的每一节都是这套金融模板删减出来的

文案主题：

- 前身产品的“awareness companion”叙事（34fe655），与哈基米道长无关，只作考古

视觉手法：

- three.js 单色噪声光束 shader 首屏（components/hero.tsx 自 e97dcd3 起内联 GLSL，白色 1px 框线加四角白点的装饰框也来自这里）
- gradual-blur.tsx、logo-loop.tsx、testimonials-slider.tsx、trusted-by.tsx 这些模板件在 02419f7 重定位时被删

### 第一版 a：重定位为哈基米道长的初稿（机制头牌期）

- 范围：02419f7..1482bee（2026-06-14 至 2026-07-02）

节结构：

- app/[locale]/page.tsx@02419f7：Hero / FeatureCards（問·卦·讀三卡）/ FeatureHighlight / Principles / Stats / FAQ / FinalCTA / Footer，共七节
- FAQ 六条，第一条已是“这是真的算命吗？”（lib/i18n/zh.ts@02419f7 faq.items[0]）
- Stats 四个数：64 卦象 / 6 解读维度 / 0 账号 / 3 语言（components/stats.tsx@02419f7 statsData）

文案主题：

- 首屏“问问道长，被认真接住。”加 badge“即将登陆 App Store”，securityBadge 直接点名 Google Gemini（zh.ts@02419f7 hero）
- 三卡讲“把心里的事告诉道长 / 起卦：每次都是同一种算法 / 道长把卦读给你听”，确定性算法当头牌（zh.ts@02419f7 featureCards）
- Principles 写“不卖焦虑、不收智商税”“确定性起卦”，FeatureHighlight 写“一位真的会听你说话的猫道长”“没那么孤单”“用温度回应你”（zh.ts@02419f7 principles、featureHighlight）

视觉手法：

- three.js 光束 shader 首屏，H1 与副标全部挂载后淡入（hero.tsx@02419f7）
- 三卡用大号衬线汉字 問 / 卦 / 讀 做半透明水印，无插图（feature-cards.tsx@02419f7 cardGlyphs）
- FeatureHighlight 右栏是手机占位框（zh.ts featureHighlight.phonePlaceholder），2026-07-03 26c7ef6 才换成真截图 result.webp
- Stats 数字滚动计数器 AnimatedCounter（stats.tsx@02419f7）

### 第一版 b：文案顶层重做后的问事线定稿（情绪价值·保障感）

- 范围：7c5c77c..f1d3d50（2026-07-03 至 2026-08-25）

节结构：

- page.tsx@f1d3d50：Hero / ScenarioCards / FeatureCards / FeatureHighlight / Principles / Stats / FAQ / FinalCTA / Footer，八节，ScenarioCards 于 7c5c77c 新增
- 新增方法论页 /[locale]/methodology（ff027bc 2026-07-03）：01 起卦 / 02 解卦 / 03 评测门 / 说在前头四块，无排盘节（zh.ts@f1d3d50 第 307 至 411 行）
- FAQ 八条：算命吗 / 解读怎么生成 / 隐私 / 收集问事记录（90 天）/ 道长怎么记住（卦忆）/ 平台 / 花钱 / 删数据（zh.ts@f1d3d50 faq）
- 2026-07-09 236a540 切成“已上架叙事”，双商店徽章进首屏与结尾（components/store-badges.tsx）

文案主题：

- 北极星“慌的时候，先起一卦。”自 7c5c77c 起定下（docs/copy-principles.md 第二节）
- 2026-07-21 372d2ef 加品类锚 eyebrow“一款占卜 App，里面住着一只会起卦的 AI 猫”与差异句“通用 AI 不记得你上回问过什么，道长记得，一卦接一卦陪你。”（zh.ts@f1d3d50 hero.eyebrow、hero.memory），起因是朋友“第一眼看不懂”（docs/2026-07-21-first-glance-handoff.md 第二节）
- 场景卡三张：寻物（附方位注）/ 感情 / 事业，加“自由问事”虚线条；7c5c77c 时是寻物 / 关系 / 决策，e5e18b1 2026-07-20 对齐 App 1.3.0 改名（zh.ts@f1d3d50 scenarioCards）
- FeatureHighlight“一只肯陪你慢慢把事想开的猫道长”，每段解读收尾落在“一件此刻就能做的小事”（zh.ts@f1d3d50 featureHighlight）
- 去 AI 味红线与能说不能说清单在 docs/copy-principles.md 第六节落定，“接住 / 被听见 / 智商税”从此禁用

视觉手法：

- 首屏：shader 拆成 hero-shader.tsx 动态加载并留静态深墨渐变兜底（400bcfe），H1 不做淡入以保 LCP；真截图 PhoneShot 进首屏，移动端垫底向下渐隐、桌面端贴框线底边裁掉下半截（hero.tsx@f1d3d50）
- FeatureCards 三张自绘 SVG 线稿：输入框光标 / 泰卦六爻 / 竖排文字栏，配大字水印，整卡链接进方法论页（feature-cards.tsx@f1d3d50 cardArt）
- ScenarioCards：尋 / 緣 / 業 大字出血水印，斜体场景句，寻物卡脚注，虚线“自由问事”条（scenario-cards.tsx@f1d3d50）
- FeatureHighlight 左文右图，截图放在 accent 色调面板里顶对齐（feature-highlight.tsx@f1d3d50）
- Principles 四个正方形图标格；Stats 计数器；FinalCTA 另配一块 shader（final-cta-shader.tsx）
- 动效 token 集中到 lib/motion-tokens（55b10d9），View Transitions 与 reduced motion 全站接通（d17bccb、918f2b5）
- 方法论页：01 / 02 / 03 步骤头、SHA-256 指纹芯片、“AI 负责的 / 系统锁死的”双列、评测数字四格（45 / 8 / 4 / 每次提交）、四张“不做”卡（components/methodology.tsx@f1d3d50）

### 第二版：起卦加排盘的道长，十节长页（只活了半天）

- 范围：0cc9917..edb3799（2026-09-14 上午）

节结构：

- page.tsx@edb3799 注释写明顺序即产品结构：Hero / FeatureCards（底部四格一览）/ ChartShowcase（命盘深讲）/ AcademyShowcase / ScenarioCards / FeatureHighlight / Principles（本机排盘）/ Stats / FAQ / FinalCTA / Footer，十节加页脚
- ChartShowcase 三个 block：紫微斗数排盘（4 条 bullet）/ 八字排盘（4 条）/ 词条卡片（2 条），每块一段 body 加一排截图（zh.ts@edb3799 chart.blocks）
- AcademyShowcase 一块三图：根屏 / 书目录 / 阅读页（academy-showcase.tsx@edb3799）
- FAQ 十五条：旧八条加排盘七条（排盘要联网吗 / 三种盘式区别 / 安星派别 / 八字和紫微是两个功能吗 / 命例会不会丢 / 深色模式 / 古籍要下载吗）（zh.ts@edb3799 faq.items）
- 方法论页加“排盘”一节四条：真太阳时 / 历法 / 安星派别可调 / 本机排盘（zh.ts@edb3799 methodology.paipan）
- 任务书 docs/plan/2026-09-14-site-v2-ziwei-brief.md，事实稿与润色稿在 docs/copy/2026-09-14-v2/

文案主题：

- 首屏两句“慌的时候先起一卦，想看清楚，就排一张盘。”，品类锚扩成“一款占卜与排盘 App，里面住着一只会起卦、也会排盘的 AI 猫”，副标补“排盘全在这台手机上算”（zh.ts@edb3799 hero）
- 四格一览：问事 / 命盘 / 学堂 / 我的，各一句（zh.ts@edb3799 featureCards），“我的”那格写外观、语言、命例存文件与 iCloud 备份
- 命盘深讲把机制全摊开：三合 / 四化 / 飞星三盘、限流七层、84 条格局、安星十组六十余项、中州派三盘、紫占、四柱反查、四柱表六柱表、大运流年流月、神煞刑冲合害、断事笔记、文本命盘、盘上按住星名出词条卡片
- Principles 改讲“生辰不出这台设备，离线也能排盘”，四格：本机排盘 / 飞机上也能排盘 / 不用注册账号 / 备份在你手里（zh.ts@edb3799 principles）
- Stats 八个数：154 本古籍 / 2408 章 / 287 词条 / 84 格局 / 3 盘式 / 5 科 / 7 层 / 0 账号，逐条注明 spec 出处（stats.tsx@edb3799）
- 结尾“起一卦，还是排一张盘？”；所有对客字串首次经 DeepSeek 润色流水线 scripts/polish-copy.mjs（0cc9917）

视觉手法：

- 桌面首屏三盘扇形：三合盘居中带 shadow-2xl，四化盘与飞星盘在两侧各转 6 度、65% 透明度探出半截，一眼看出三种盘式；移动端只留三合盘垫底渐隐（hero.tsx@edb3799）
- 共享 Showcase 版式：kicker / 标题 / 副标抬头，下面若干“一段文字加一排截图”的行左右交替；ShotRow 窄屏负边距出血横滑、sm 起平分（showcase.tsx@edb3799）
- AppShot 浅深两张 img 叠放按 html.dark 显隐，srcSet 603 / 1206 两档，截图统一 iPhone 17 Pro 整屏 1206 乘 2622（showcase.tsx@edb3799）
- 站上截图 11 张：ziwei-sanhe / sihua / feixing / fortune / geju / glossary、bazi-pillars / sixpillars、academy-home / book / reading（770e9b8 补入，2e367f6 删到只剩三张）

### 第三版：一句话首屏与七节（现网，供对照）

- 范围：1b82e9a..688996a（2026-09-14 下午至 2026-09-22）

节结构：

- page.tsx@HEAD：Hero / WhatItIs / Remembers / ChartShowcase（两格）/ AcademyShowcase（一句）/ Principles（一句加三标签）/ FAQ（五条）/ FinalCTA / Footer
- spec 004（2026-09-22）按 owner 新口径把定位语写进第二节标题、命盘节 lead、结尾句、FAQ 第一条与页脚 tagline，页脚统计行与“法律”栏删掉（specs/004-positioning-and-footer/spec.md）
- 方法论页排盘一节扩到八条：真太阳时 / 历法 / 排盘 / 看格局 / 安星派别可调 / 八字这一面 / 更多排法 / 本机排盘（lib/i18n/zh.ts@HEAD methodology.paipan）

文案主题：

- 首屏只剩“慌的时候，先起一卦。”在逗号处断行（zh.ts@HEAD hero.headlineLines）
- 第二节标题“一款学习与研究中国民俗术数的 App：起卦、排盘、管命例，里面住着一只猫道长。”；命盘节 lead“命例一份份分开管，每一位的盘与名下起过的卦都在一处，翻回去对得上。”（zh.ts@HEAD whatItIs、chart）
- 字数门 scripts/count-copy.mjs 挂进 npm run check：首屏 9 字、全页除 FAQ 250 字、FAQ 每条 60 字（specs/001-site-v3-concise/spec.md 验收 3）

视觉手法：

- 首屏仍是 three.js 光束 shader；截图改用 React Bits Pro Device 手机框（09683d7，components/react-bits/device.tsx）
- 猫道长换成 Rive 签名文件 v0.16.0 与 App 同源（64df53d，components/cat-orb.tsx），球径 96 px 桌面移动同档（spec 004）
- 截图只剩 cast-result / ziwei-sanhe / bazi-pillars 三张浅深各一（components/app-shot.tsx SHOTS）

### 值得拿回来的

- **第二版命盘深讲的机制事实全集：三合 / 四化 / 飞星三盘、限流七层、84 条格局、安星十组六十余项、中州派三盘、紫占、四柱反查、四柱表与六柱表、大运流年流月、神煞与刑冲合害、断事笔记、文本命盘、盘上按住星名出词条卡片**（lib/i18n/zh.ts@edb3799 chart.blocks 三个 block 的 body 与 bullets；事实稿 docs/copy/2026-09-14-v2/facts.zh.json；HEAD 方法论页 methodology.paipan 八条仍在）：第三版把它们撤下首页的前提是“品牌调性接近 The Pattern 与测测，硬术语不上首页”（docs/research/2026-09-14-landing-page-practice.md 结论 5）。新定位的读者是命理爱好者与职业命理师（spec 004 站位），同一份调研对 iztro 的判词是“目标受众是懂行的人时术语可以毫无保留放在最前面”。这批句子已经过 DeepSeek 润色、数字带 spec 出处、词表门零命中，可以直接做一个排盘功能页或首页的功能区，不必从头核事实。
- **第二版 FAQ 里的排盘七条，尤其“命例会不会装一次 App 就丢”那条备份答案**（lib/i18n/zh.ts@edb3799 faq.items 第 9 至 15 条）：这是改版前唯一具体写到命例的对客文案：存到文件、文件名带日期、从文件 / 微信 / AirDrop 导回、默认合并、取更新时间新的那份、页顶写上次备份时间。新定位把多命例管理当最核心长处，这一条与“三种盘式区别”“安星派别可调”“八字和紫微是两个功能吗”都是第三路人会问的题；第三版 FAQ 收成五条时只留了“排盘要联网吗”。数字与流程要按 iOS 现版（099 已改备份入口归“我的”）重核一遍再用。
- **第二版桌面首屏的三盘扇形**（components/hero.tsx@edb3799 桌面端 HeroBoard 三联：三合盘居中带 shadow-2xl，四化盘与飞星盘各转 6 度、65% 透明度从两侧探出半截）：改版前所有版本里唯一一处不靠文字就把“产品有深度”摆出来的视觉手法，也是最贴“炫酷”的一版。第三版换成单张起卦结果图是为了服务“慌的时候先起一卦”的陪伴口径。新定位下多命例与多盘式正是卖点，这个扇形可以升级成 React Bits Pro Device 多机并排或命例卡片堆叠，思路能直接搬。
- **第二版 Showcase 共享版式与 ShotRow 横滑**（components/showcase.tsx@edb3799（706f96a 新建，ab820b0 删除））：抬头加“一段文字配一排截图”左右交替的行、窄屏负边距出血横滑、sm 起平分、AppShot 浅深两份按 html.dark 显隐、srcSet 两档，这些工程细节都实测过 390 与 1440 两档无横滚（v2 任务书验收）。要做多截图的功能区，拿它当底比重写省事；截图源在 iOS 仓截图枪，11 张被 2e367f6 删掉但可按 v2 任务书写的 manifest 流程重出。
- **第二版“底下四格”一览：问事 / 命盘 / 学堂 / 我的**（lib/i18n/zh.ts@edb3799 featureCards；page.tsx@edb3799 注释“顺序即产品结构”）：对工具类 App，官网结构照着 App 的信息架构走是最省解释的“这是什么”。四格文案里“命盘”那句已写到三盘切换与大限流年逐层点开，“我的”那句已写到命例存文件与 iCloud。拿回来要改一处：把“我的”换成“命例”做第四格，写多命例管理与每份命例名下的卦追得回去，这是 spec 004 定的核心长处。
- **方法论页的整套设计与排盘一节**（components/methodology.tsx@ff027bc 起，zh.ts@edb3799 methodology.paipan 四条，HEAD 扩到八条）：01 / 02 / 03 步骤头、SHA-256 指纹芯片、“AI 负责的 / 系统锁死的”双列、评测数字四格、四张“不做”卡，这一页是全站最像“学习与研究工具”的一页，可信度靠它。真太阳时、历法五类说明、安星派别可调、同一份生辰同一套设置排出来每个字都一样，这些句子在新定位下可以从二级页提到首页功能区。搬之前删“两端一个样：iOS 和安卓”那条（HEAD zh.ts methodology.cast.points[1]），安卓口径见下面“不要”的第六条。
- **第一版 b 的场景卡：寻物（附方位注）/ 感情 / 事业 加“自由问事”虚线条**（components/scenario-cards.tsx@f1d3d50，lib/i18n/zh.ts@f1d3d50 scenarioCards；7c5c77c 新建，ab820b0 删除）：起卦仍是三件事之一，这是改版前唯一把“起卦能问什么”写具体的一节，场景名与 App ScenarioStyle 对齐（docs/copy-principles.md 第五节术语表）。第三版删它是为了节数与字数，不是内容错。拿回来放在起卦区做次级内容即可，不进首屏；英文版去掉尋 / 緣 / 業 装饰汉字（docs/2026-07-21-first-glance-handoff.md 第二节雷点）。
- **第一版 b 的三张自绘 SVG 线稿与大字水印卡**（components/feature-cards.tsx@f1d3d50 cardArt 与 cardGlyphs：输入框光标 / 泰卦六爻一爻描金 / 竖排文字栏，整卡链接进方法论页）：不用截图就有一套“墨与金”的图形语言，和猫道长圆球是一个调子，扩到命例 / 排盘 / 学堂三个新图标成本很低；hover 缩放与整卡可点的可发现性都做过（a11y 注释在文件里）。第三版全砍成纯文字三步是为了字数门，不是视觉不好。
- **品类锚与差异句两行原文，以及 count-copy 字数门**（docs/copy-principles.md 第二节 2026-07-21 与 2026-09-14 三行；scripts/count-copy.mjs（74b9327））：“通用 AI 不记得你上回问过什么，道长记得”是 2026-07-21 用梁宁框架与测测对比话术推出来的“凭什么是你”，第三版仍独占一节；新定位可以把它扩成“每份命例名下的卦追得回去”的记忆叙事。字数门的阈值是第三版口径，重构时要改数，但“可见正文进 npm run check”这个机制值得留着，免得再长回十节。

### 不要的

- **第一版 a 的机制头牌与客服腔：“确定性起卦”“指纹校验”做卖点头牌，“不卖焦虑、不收智商税”“被认真接住”“被听见”“没那么孤单”“用温度回应你”**：2026-07-03 顶层重做把它诊断为“写出了工具味”（docs/2026-07-21-first-glance-handoff.md 第一节），docs/copy-principles.md 第六节把接住 / 被听见 / 智商税 / 不卖焦虑列为禁词，教训第 1 条写明确定性是信任底座不是营销头牌。新定位是工具类，但“可复算”仍只该在方法论页与功能区讲事实，不回到首屏当口号。
- **第一版 b 的首屏叠层：eyebrow 品类锚加两行 H1 加副标加差异句加双徽章加文字链加截图**：调研按现状数出首屏约 140 字，对照克制派 10 到 20 个单词（docs/research/2026-09-14-landing-page-practice.md 结论 1）。owner 2026-09-14 原话首屏只留一句，spec 004 不做第一条写明首屏口号是北极星不动。首屏可以换视觉手法，不能把这一叠文字加回去。
- **第二版 ChartShowcase 九条 bullet 原样摆回首页**：owner 2026-09-14 三条口径的第三条：官网不等于每一个功能的截图加介绍（docs/plan/2026-09-14-site-v3-思路.md 第一节）。机制事实值得拿回来，但落点是功能页或收紧后的功能区，不是首页三块各四条的 bullet 墙。
- **Stats 数字条与页脚统计行：154 本古籍 / 2408 章 / 0 个账号那一组**：owner 2026-09-22 原话“页脚那行统计没有意义”（specs/004-positioning-and-footer/spec.md 为什么第 2 条），“无账号无广告”卖点位也在 591a966 退出。古籍本数若要写，写进学堂那一句当事实，不再做独立计数节，也不写“0 个账号”。
- **社会证明条、用户证言、准确率承诺，以及模板遗留的 TrustedBy / Testimonials / Pricing / BlogShowcase**：思路文第三节放弃两条：没有真实评分与下载量前不摆社会证明，“准确率高达 90%”与不预测红线相反；调研结论 6 同样说宁缺不编。真实用户现状是无外部用户，模板里这些节（b1fc2e7）02419f7 删掉后不要因为想“炫酷”再挂回来。
- **安卓与 Google Play 的现在时陈述：“都上架了，安卓去 Google Play”、store.googlePlayAlt、方法论页“两端一个样：iOS 和安卓”**：这句在 7ea17e4 撤下又被 edd30da 回退，2026-07-21 交接把它列为必须先找 owner 拍板的事实雷点（docs/2026-07-21-first-glance-handoff.md 第二节）。HEAD 的 lib/i18n/zh.ts 里 googlePlayAlt 与“iOS 和安卓”仍在。重构时先按 iOS 现状写，安卓要写先核实。
- **英文页上的装饰汉字：场景卡 尋 / 緣 / 業、功能卡 問 / 卦 / 讀 直接复用到 en**：2026-07-21 交接列为“看不懂”的加重项：对英文用户是纯装饰性汉字（docs/2026-07-21-first-glance-handoff.md 第二节雷点二）。scenario-cards.tsx@f1d3d50 已为西文词另做了一套样式，说明当时也只是半修。
- **文案里点名 AI 供应商（Google Gemini）与“服务器一概不留”这类绝对措辞**：第一版 a 的 hero.securityBadge 与 FAQ 逐句点名 Google Gemini（zh.ts@02419f7），后来 d3e419f、0d8b391 去供应商名，隐私政策成唯一真源（3ad5c45）。docs/copy-principles.md 教训第 5 条禁“服务器一概不留”。owner 口径是后端只有 DeepSeek 且对外不提 Gemini。
- **第二版“我的”那一格的写法：外观、界面语言、备份三件并列**：三件里只有备份与新定位相关，外观与语言是任何 App 都有的设置，占一格是在凑四格。这一格该换成命例。

### 第三版为什么砍

第三版的砍法出自 owner 2026-09-14 下午三条原话（docs/plan/2026-09-14-site-v3-思路.md 第一节）：首屏只留“慌的时候先起一卦”这一句，八字与紫微往下放；整站字太多，要大刀阔斧重写不是修修补补；官网不等于每一个功能的截图加介绍，取舍是业务的事。当天先做了十六站调研（docs/research/2026-09-14-landing-page-practice.md，A 组 Notion / Things / Bear / Flighty / Headspace / Arc / Duolingo / Calm，B 组 Co-Star / The Pattern / Sanctuary / Nebula / 灵机妙算 / 测测 / 准了 / iztro），对照现状量出来：第二版首页十节加页脚、首屏约 140 字、命盘节三块各带 body 与 2 到 4 条 bullet、截图 11 张。调研采纳六条：首屏一句口号不带副标；全页六到七节；三到四张截图不逐功能配图；硬术语退二级页首页讲场景；一个主 CTA 反复出现；FAQ 留首页且第一条直接回应“这是真的算命吗”。放弃两条：没有真实评分与下载量不摆社会证明；不写“准确率高达 90%”这类量化承诺。读者模型是三路人：从 App Store 跳回来确认的、朋友甩链接来的、搜“紫微斗数排盘 App”进来的懂行人，首页只服务前两路，第三路交给方法论页接住。结果落成 spec 001：七节、首屏 9 字、全页除 FAQ 不超过 250 字、三张截图、count-copy 进 npm run check，命盘机制整体搬进方法论页排盘一节。要看清的一点：把排盘深度藏起来的那条理由（结论 5，“哈基米道长的品牌调性更接近 The Pattern 和测测这一派，紫微斗数、八字、大限流年、神煞等硬术语不该上首页”）是按陪伴与情绪价值的定位推出来的；owner 2026-09-22 把对外定位改成学习与研究中国民俗术数的工具类 App、读者是命理爱好者与职业命理师（spec 004 站位），同一份调研对 iztro 的判词就反过来适用：受众是懂行的人时，术语可以放在最前面。所以第二版被砍掉的命盘深讲、排盘 FAQ、三盘扇形是这次最该翻回来的素材；而一句话首屏、不编社会证明、单一 CTA、FAQ 第一条、不做 bullet 墙这几条与定位无关的克制，仍然成立。

## 二、模板库 `reactbits-pro-templates`

`reactbits-pro-templates` 是 React Bits Pro 官方商业模板集的本地解包，共 10 个模板目录：agency、agentframe、ai-app、ai-saas、cloudlight、finance、minimal、saas、shader、wireframe；另有 `原始压缩包存档/` 存 10 个 zip，agency / ai-saas / finance / saas 日期 2026-05-29，ai-app / minimal / shader 08-23，agentframe / cloudlight / wireframe 09-09。根目录没有 README 与 LICENSE，说明文件在各模板内；agentframe 与 cloudlight 无 `.git`，其余有。10 个全是 Next.js 16 App Router + React 19 + Tailwind v4（CSS-first `@theme inline` token）+ TypeScript strict + `motion/react` + `next-themes` class 暗色 + `lucide-react`，没有一个是 Vite，也没有一个配 `output: "export"`。WebGL 分三条路线：ogl（shader、wireframe），raw WebGL / WebGL2（cloudlight `gl-surface.tsx`、ai-saas fluid cursor 与 bulge cards、finance 的 raw three），React Three Fiber（ai-app OrbitField、minimal DitherCursor、agency wave 与 water ripple）。滚动驱动分两派：GSAP ScrollTrigger（agency、ai-saas、shader value-prop）与 motion `useScroll / useTransform / useSpring`（ai-app、saas、cloudlight、wireframe）。所有模板的 globals.css 用同一套 token 名 `--background / --foreground / --muted / --muted-foreground / --border / --ring`，暗色底 `#0a0a0a`。官网仓本身就是 finance 模板 fork 的：`b1fc2e7 update site name in metadata to "React Bits Pro - Finance Template"` 之后紧接 `a472bf6 feat: redesign website for Hachimi with i18n support`，当前 HEAD `36a08d1` 落地 004 定位口径。

许可：React Bits Pro Commercial License，版权 “Copyright (c) 2026 React Bits Pro”。agency / agentframe / ai-app / ai-saas / cloudlight / finance / minimal / saas 八份 LICENSE 的 md5 全同 `c70eaa797e33670ef6b1e1cbb7055ffd`。允许：无限个人项目；为自己或客户做无限商业项目；为自用修改源码。禁止：再分发、转售、再许可；分享给未购买者；制作用于分发或销售的衍生品；删改版权声明。shader 与 wireframe 目录没有 LICENSE 文件，各自 README 只写 “licensed for use in commercial projects, may not resell or redistribute”。把组件抄进 hachimi-website 属 “modify the source code for your own use”，再分发禁令意味着源码只能落在私有仓。

### 逐套判断

#### ai-app（Cortex，AI 手机 App 落地页）（适配 high）

- 路径：reactbits-pro-templates 的 ai-app
- 栈：next 16.1.1、tailwind 4.1.18、motion 12.23.26、three 0.184.0、@react-three/fiber 9.6.1、lenis 1.3.23、next-themes、lucide-react（package-lock 锁定）；README 第 7 行自述 fully static-prerendered
- 亮点：
  - `components/hero.tsx`（640 行）：R3F OrbitField，四圈图块环绕，SDF 圆角矩形 shader 在片元里算中心径向淡出与底边淡出，`useVelocity(scrollY)` 让滚动越快转越快、各圈滞后成涟漪；intro loader 按图片加载进度计数，`lib/intro.ts` 用 useSyncExternalStore 把 `markIntroDone` 广播给 nav 与 theme-switch；`HERO_IMAGES` 是远程 unsplash，注释明写 WebGL 纹理需 CORS
  - `components/app-showcase.tsx`（554 行）：pinned 手机样机，`h-[420svh]` 滚动区加 `sticky top-0 h-svh`，四步按 `scrollYProgress` 确定性切屏，`ScreenLayer` 用 useTransform 做 y / scale / dim / borderRadius 叠层推入，左文右卡片同步淡入，底部 `SegmentTick` 进度；`useIsDesktop() && !reduced` 才 pin，否则退化成一张手机加有序列表
  - `components/nav/nav.tsx`（301 行）加 morph-label / menu-icon / scroll-progress：中央 Menu 药丸展开成 296px 面板，条目 spring 逐个入场，Escape 关闭并还原焦点，桌面端显示滚动百分比
  - `components/features.tsx`（162 行）：hover 列表，跟随光标的图片预览按 `useVelocity` 倾斜
  - `components/manifesto.tsx`（71 行）：逐词 scroll scrub 点亮；`components/gallery.tsx`（178 行）：双行无限 marquee，滚动速度加速并可反向；`components/testimonials.tsx`（165 行）：三列不同速率视差
  - `components/final-cta.tsx`（178 行）：扇形照片 + word-mask 标题 + `magnetic-link.tsx`（45 行）磁吸按钮
  - `lib/motion.tsx`（251 行）：ReducedMotionProvider、useIsDesktop、InView / StaggerContainer 帮手，`softEase = [0.22, 1, 0.36, 1]`；`video-showcase.tsx`（204 行）scroll 驱动从 peek 扩到全宽
- 判断：十个里唯一的手机 App 落地页，pinned phone walkthrough 可以直接挂官网 `public/screenshots/zh/` 已有的三张截图讲“命例 → 排盘 → 起卦 → 回看”。nav、manifesto、gallery、testimonials、final-cta 全是纯 motion 实现，官网已装 motion 与 next-themes，改动只在换图与中文分词。hero 的 OrbitField 要新引 @react-three/fiber，而首屏已由 Rive 猫占着，可以只借下半部分。

#### shader（Lumen）（适配 high）

- 路径：reactbits-pro-templates 的 shader
- 栈：next 16.1.1、motion 12.38.0、ogl 1.0.11、gsap 3.15.0、lenis 1.3.23、next-themes、lucide-react；next.config 配 `experimental.optimizePackageImports: ["lucide-react","motion"]` 与 `async headers()`
- 亮点：
  - `components/shader-canvas.tsx`（327 行）：ogl Renderer / Program / Mesh / Triangle 全屏噪声 shader，uniforms `u_pal_base / warm / mid / cool / cursor / rgScale / u_brightness` 全由 palette 驱动，光标位置 `c` 与强度 `ci` 平滑追随，DPR 上限 1.5，60 fps 节流，IntersectionObserver 离屏停、visibilitychange 停、reduced motion 单帧、卸载调 `WEBGL_lose_context`
  - `lib/shader-variants.ts`（184 行）：五套命名 palette warm / mono / twilight / coffee / royal，每套含 hero 七个字段与 wave 五色；`shader-variant-context.tsx` + `shader-variant-toggle.tsx` 运行时切换
  - `components/hero.tsx`（162 行）：110×60 药丸框 1.8 秒内 `animate(progress)` 扩到全屏，`scrollY 0..80` 经 useSpring 退出并收掉 10px 边距与圆角，标题按行 word-mask 上推
  - `components/wave-shader.tsx`（432 行）：ogl 五层丝带，`WaveShaderHandle.setParams` 供外部逐帧改参；`value-prop.tsx`（279 行）用 GSAP ScrollTrigger pin 三步，逐词点亮并把 wave 参数在三套 preset 间 tween
  - `components/reveal-headline.tsx`（88 行）：word-mask 揭示，`mutedFrom` 压淡后半句；`arrow-chip.tsx` RollingArrow / ArrowChip 悬停滚动箭头
  - `components/footer.tsx`（154 行）：`min-[851px]:sticky bottom-0 z-0` 从页底揭出
- 判断：深色氛围最强、依赖最轻的 shader 宿主。ShaderCanvas 只靠 ogl 和一个 palette 对象，正好替换官网现有两个 raw three.js shader（`hero-shader.tsx` 242 行、`final-cta-shader.tsx` 244 行各自内嵌整段 simplex），再按品牌 accent `#d97706 / #f59e0b` 配一套 amber palette，three 与 @types/three 可以摘掉。药丸开场与 Rive 猫可共存，猫放框内。value-prop 依赖 GSAP 归次选。

#### wireframe（Frame）（适配 high）

- 路径：reactbits-pro-templates 的 wireframe
- 栈：next 16.1.1、motion 12.38.0、ogl 1.0.11、lenis 1.3.23、next-themes、lucide-react；next.config 配 remotePatterns
- 亮点：
  - `components/dither-shader.tsx`（405 行）：ogl WebGL2 `#version 300 es` ASCII dither，Bayer 4×4 加 `synthesizeCharacter` 五档字形，uniforms iResolution / iTime / iMouse / iMouseActive / uTheme / uVariant / uTransparent / uGlyphColor，`variant: "hero" | "cta"`，`tone` 触发透明模式；主题值逐帧插值，`observeVisibility`（`lib/visibility.ts`）近视口才建 context，同步双绘两帧加 DOM 遮罩挡白闪，注释记录过 8 个 context 同时建导致白闪的教训
  - `app/page.tsx`：hairline rails 布局，`SectionCorners`（`section-corners.tsx` 18 行）在节角画 7px 小方块，`Reveal` 包每节
  - `components/showcase.tsx`（359 行）：横向 snap 卡片，点开用 `layoutId` shared-layout morph 成全屏 overlay，Escape 关闭、锁滚动
  - `components/community.tsx`（240 行）：`h-[180vh]` pinned 双行卡片反向平移，底部透明 dither 背景随进度淡出
  - `components/final-cta.tsx`：右侧 dither shader plate；footer 反色卡片
- 判断：官网页脚已经在手写同一套线框，`hachimi-website/components/footer.tsx` 第 22 到 37 行是竖线加四角小方块，wireframe 是这套语言的完整版本。dither 点阵质感与卦爻天然相近，透明 `tone` 模式能垫在 Rive 猫下不抢戏，依赖只有 ogl，与 shader 模板共用一个库。

#### cloudlight（适配 medium）

- 路径：reactbits-pro-templates 的 cloudlight
- 栈：next 16.3.4、tailwind 4.3.3、motion 12.43.0、next-themes、lucide-react；无 three / ogl / gsap / lenis，raw WebGL2；README 第 183 行注明用默认 image optimizer、未配置静态导出
- 亮点：
  - `components/gl-surface.tsx`（244 行）：零依赖 WebGL2 全屏 fragment 宿主，props `fragment / stillTime / dprCap / resScale / fps`，`low-power` context，uniforms uRes / uTime / uTheme，主题经 MutationObserver 监听 `html.class` 后逐帧 crossfade，reduced motion 只画 `stillTime` 一帧，离屏与隐藏停帧，卸载删 buffer / program 并 loseContext
  - `cloud-canvas.tsx`（207 行，resScale 0.36）与 `wave-canvas.tsx`（93 行，resScale 0.35、fps 30）：两段 GLSL 各自内置明暗两套色
  - `components/nav.tsx`（657 行）：docking nav，hero 内 absolute glass header，IntersectionObserver 看 `#hero` 离开后切 fixed solid header，hover / focus 子菜单，mobile dialog 锁滚动、Escape、焦点还原
  - `components/rail.tsx`（50 行）：`max-w-[calc(1200px+6rem)]` 两侧竖线容器，divider / fadeTop / fadeBottom；`pill-tabs.tsx`（101 行）roving tabindex 键盘 tabs 加 `layoutId` 滑块
  - `components/manifesto.tsx`（76 行）：逐词 scroll scrub，reduced motion 直出文本并保留 sr-only；`hero.tsx` 是 `m-4 rounded-[1.5rem]` 卡片式 hero
- 判断：GlSurface 是十个模板里最干净的 shader 宿主，不装任何库，若不想引 ogl 可直接拿它承载官网现有的 simplex 片元。但整体是浅蓝云雾的明亮 SaaS 调性，与深色术数相反；nav、rail、pill-tabs 是结构件可借。

#### agentframe（适配 medium）

- 路径：reactbits-pro-templates 的 agentframe
- 栈：next 16.3.4、tailwind 4.3.3、motion 12.43.0、next-themes、lucide-react；无 three / ogl / gsap / lenis；Lora serif + Geist + Geist Mono 走 next/font；README 第 183 行注明未配置静态导出
- 亮点：
  - `components/landscape-canvas.tsx`（306 行）：canvas 2D 把一张照片量化到 35 色 palette 加 Bayer 4×4 dither，24 fps 只重绘水面条带的 sin 位移与 15 个 glint，pointer 影响 ripple，IntersectionObserver / visibilitychange 暂停，reduced motion 定帧；无 WebGL
  - `components/run-journey.tsx`（349 行）：三段连线图 brief → tools → output，SVG `pathLength=100` 加 `stroke-dasharray` 6 秒 `travel` 动画，`data-running / data-manual / data-reduced` 控制 CSS keyframes，键盘 roving tabs 切说明
  - `docs/design.md`：完整设计说明，palette、字体、几何、交互、路由十条
  - serif hero、`/pricing` `/notes/[slug]` `/about` 多页结构，注释记 “Changing content reserves its geometry”
- 判断：零 WebGL 依赖却有质感。run-journey 的三段图正好类比“命例 → 排盘 → 卦”的追溯链路，是官网核心长处“多命例管理、每份命例名下的卦都追得回去”最贴的可视化范式；canvas-2D dither 可以给猫的静帧或截图做旧纸效果。整体是浅色纸感，深色站要重配色。

#### agency（Pulsewave）（适配 medium）

- 路径：reactbits-pro-templates 的 agency
- 栈：next 16.1.1、tailwind 4.1.18、motion 12.23.26、three 0.182.0、@react-three/fiber 9.5.0、@react-three/drei ^10.7.7、@react-three/postprocessing ^3.0.4、gsap 3.14.2、lenis 1.3.17、next-themes
- 亮点：
  - `components/hero.tsx`（364 行）：R3F 三色波浪 shader，明暗两套混合公式，CRT 扫描线与 beam 高光，`iScroll` 随滚动旋转波向，标题三行 `rotateX -90 / z -200` 3D 翻入
  - `components/water-ripple.tsx`（286 行）：R3F + drei useTexture + postprocessing Bloom，鼠标划过在 FBO 里画 30 个衰减笔刷，主 shader 按位移扭曲图片并 duotone
  - `components/services.tsx`（271 行）：GSAP ScrollTrigger pin 标题逐字 scaleY 立起；flowing menu 按鼠标进入边缘决定覆盖层上下滑入、字符逐个跳动
  - `components/footer.tsx`（148 行）：`lg:sticky lg:bottom-0 lg:z-0 bg-foreground text-background` 反色页脚从 main 底下揭出，main 需 `lg:relative lg:z-10`
- 判断：视觉最炫，代价最重：R3F、drei、postprocessing、GSAP 四个新依赖，water-ripple 常驻 FBO 与 Bloom 后处理会和 Rive 猫抢 GPU。真正值得搬的是 sticky reveal footer 这段纯 CSS 与 flowing menu 的交互思路，后者可用 motion 重写。

#### finance（Finaro）（适配 low）

- 路径：reactbits-pro-templates 的 finance
- 栈：next 16.1.1、tailwind 4.1.18、motion、three 0.182.0 raw 无 r3f、lenis 1.3.17、next-themes、lucide-react；next.config 配 remotePatterns
- 亮点：
  - `components/hero.tsx`（322 行）与 `final-cta.tsx`：raw three.js simplex 极光 shader，`iMouse` 推开噪声场；官网 `hero-shader.tsx` / `final-cta-shader.tsx` 与此同源
  - `components/feature-highlight.tsx`（163 行）：纯 CSS `PhoneInCard` 手机样机，卡片内截半个手机
  - `components/feature-cards.tsx`（198 行）：三张卡各配 comparison / chart / code 三种入视小动画
  - `components/gradual-blur.tsx`（115 行）：多层 mask 加 backdrop-filter 的渐进模糊边缘；`logo-loop.tsx`（196 行）速度平滑、hover 减速的 marquee，按容器宽自动算副本数
- 判断：官网就是从它 fork 的，`b1fc2e7` → `a472bf6`，能借的早已借完；结构是通用 SaaS 落地页，与大刀阔斧重构的方向相反。只剩 gradual-blur 与 logo-loop 两个零件还有用。

#### saas（适配 low）

- 路径：reactbits-pro-templates 的 saas
- 栈：next 16.1.1、motion、lenis 1.3.17、next-themes、lucide-react；next.config 配 unsplash remotePatterns；README 列 Cloudflare Pages / static hosting
- 亮点：
  - `components/features-bento.tsx`（324 行）：两档 `PhoneMockup` full / compact 嵌在 bento 卡片里，同心装饰圆环，hover 整卡 scale
  - `components/how-it-works.tsx`（113 行）：左栏 `lg:sticky lg:top-48`，右栏三步竖线随 `useScroll` 填充
  - `components/blur-in-headline.tsx`（83 行）：逐词 opacity 加 blur 随滚动清晰，用原生 scroll 事件不依赖 motion
  - hero：鼠标视差加 LogoLoop
- 判断：明亮 SaaS 调性；unsplash 头像与 remotePatterns 在静态导出下要改本地图。bento 里的 PhoneMockup 与 sticky 三步是可借版式，其余无关。

#### minimal（适配 low）

- 路径：reactbits-pro-templates 的 minimal
- 栈：next 16.1.1、three 0.182.0、@react-three/fiber 9.5.0、@react-three/drei、lenis 1.3.17、clsx、tailwind-merge、next-themes；README 列 Cloudflare Pages / static hosting
- 亮点：
  - `components/dither-cursor.tsx`（358 行）：R3F + drei useFBO / shaderMaterial ping-pong 模拟，curl noise 扩散，Bayer 8×8 点阵渲染光标拖尾；hero 只在非移动端且标题入视时挂载并平滑淡入
  - `components/rotating-cards.tsx`（377 行）：motion spring 驱动的环形卡片轮盘，可拖拽、滚轮、hover 暂停
  - hero 标题逐字 blur-in；`lib/config.ts` 单一真源
- 判断：单色极简、内容通用。dither-cursor 效果好但要 r3f 加 drei，wireframe 的 ogl dither 更轻；rotating-cards 放六十四卦勉强能用，属锦上添花。

#### ai-saas（Kraft）（适配 low）

- 路径：reactbits-pro-templates 的 ai-saas
- 栈：next 16.1.1、motion、gsap 3.14.2、lenis 1.3.17、next-themes；raw WebGL；next.config 配 remotePatterns
- 亮点：
  - `components/fluid-cursor.tsx`（510 行）：raw WebGL 多 pass 流体模拟，全窗 fixed canvas，`mix-blend-multiply blur`，无指针时自动巡游
  - `components/showcase-cards.tsx`（443 行）：raw WebGL bulge 纹理卡片，每卡一个 context，Safari 走 CSS 回退 `useIsSafari`
  - `components/text-reveal.tsx`（127 行）：逐字 scroll scrub，中间字最大、两侧递减，scale / y / rotate / blur 四通道
  - `components/image-reveal.tsx`（210 行）：GSAP ScrollTrigger 三列图片从两侧压扁拉入；`tools-carousel.tsx`（182 行）motion drag 横向卡片，跟随光标的 Drag 标签
- 判断：fluid cursor 全窗常驻 raw WebGL 与 Rive 猫抢 GPU，视觉上是 AI 设计工具味；bulge cards 每卡开一个 WebGL 上下文。只有 text-reveal 与 tools-carousel 两个纯 motion 组件值得看。

### 可借的组件

- **AppShowcase pinned phone walkthrough**（reactbits-pro-templates ai-app/components/app-showcase.tsx）：讲“建命例 → 排盘 → 起卦 → 回看”四步；`SCREENS` 换成官网 `components/app-shot.tsx` 的 cast-result / ziwei-sanhe / bazi-pillars 三张本地截图，`PhoneFrame` 换成已装的 React Bits Pro Device 并把 `ScreenLayer` 叠层塞进它的 screen slot；`ASIDES` 放命例卡片与卦象小卡。依赖：motion 已装；`useIsDesktop` 从 `ai-app/lib/motion.tsx` 抄一个 hook，`useReducedMotion` 官网 `lib/motion.tsx` 已有；去掉 `next/image` 与 unsplash 改本地 `<img>`
- **Nav kit（Menu 药丸）**（reactbits-pro-templates ai-app/components/nav/nav.tsx 加 morph-label.tsx、menu-icon.tsx、scroll-progress.tsx）：替换官网 `components/header.tsx` 的 mix-blend-exclusion 双 header，中央药丸展开面板放 chart / academy / methodology / faq 与 LangSwitch。依赖：motion、lucide-react 已装；不做 intro loader 时删掉 `useIntroDone`
- **MagneticLink**（reactbits-pro-templates ai-app/components/magnetic-link.tsx）：下载 CTA 与 StoreBadges 外壳，鼠标靠近轻微吸附，`pointerType !== "mouse"` 自动跳过触屏。依赖：motion 已装
- **Manifesto 逐词 scrub**（reactbits-pro-templates ai-app/components/manifesto.tsx，或 reactbits-pro-templates cloudlight/components/manifesto.tsx（带 sr-only 全文））：官网 `components/remembers.tsx` 那句“道长记得”改成随滚动逐字点亮。依赖：motion 已装；中文改 `split("")` 按字
- **Gallery velocity marquee**（reactbits-pro-templates ai-app/components/gallery.tsx）：六十四卦卦名或多张 App 截图横向流动，滚动加速可反向。依赖：motion 已装；图片改本地
- **Testimonials 三列视差**（reactbits-pro-templates ai-app/components/testimonials.tsx）：日后有用户评价时用；或把原则 / FAQ 做成视差卡。依赖：motion 已装
- **FinalCta 扇形照片加 word-mask 标题**（reactbits-pro-templates ai-app/components/final-cta.tsx）：官网 `components/final-cta.tsx` 现在是 shader 底加一句加徽章，可加五张截图扇形与 word-mask 标题。依赖：motion 已装
- **ShaderCanvas 加 shader-variants palette**（reactbits-pro-templates shader/components/shader-canvas.tsx 与 lib/shader-variants.ts）：替换官网 `hero-shader.tsx` 与 `final-cta-shader.tsx`，一份组件加两套 palette（amber、ink）；`useShaderVariant` context 简化成 props。依赖：ogl 1.0.11 新引入；three 与 @types/three 可摘掉
- **Hero 药丸开场**（reactbits-pro-templates shader/components/hero.tsx）：首屏 110×60 药丸 1.8 秒扩到全屏，滚动 80px 内退出并收掉边距圆角；Rive 猫放框内。依赖：motion 已装；底层用 ShaderCanvas 或 GlSurface
- **RevealHeadline word-mask**（reactbits-pro-templates shader/components/reveal-headline.tsx）：各节标题揭示，`mutedFrom` 压淡后半句。依赖：motion 已装；中文按字或按官网 `t.hero.headlineLines` 断行数组切
- **ArrowChip / RollingArrow**（reactbits-pro-templates shader/components/arrow-chip.tsx）：方法页链接与下载按钮尾巴的悬停滚动箭头。依赖：lucide-react 已装
- **Sticky reveal footer**（reactbits-pro-templates shader/components/footer.tsx，或 reactbits-pro-templates agency/components/footer.tsx（反色版））：页脚从页底揭出；agency 版 `bg-foreground text-background`，main 加 `lg:relative lg:z-10`。依赖：无，纯 CSS sticky
- **DitherShader 加 observeVisibility**（reactbits-pro-templates wireframe/components/dither-shader.tsx 与 lib/visibility.ts）：`tone` 透明模式垫在 Rive 猫下，`variant="cta"` 做 final-cta 右侧版画；近视口才建 context。依赖：ogl 新引入；next-themes 已装
- **SectionCorners 加 hairline rails**（reactbits-pro-templates wireframe/components/section-corners.tsx 与 app/page.tsx 的 `border-x border-border` 容器）：把官网 `components/footer.tsx` 第 22 到 37 行手写的线框抽成全站节容器。依赖：无
- **Showcase morph cards**（reactbits-pro-templates wireframe/components/showcase.tsx）：梅花易数 / 紫微 / 八字 / 命例四张卡，点开 `layoutId` 放大讲细节，替代现在 `chart-showcase.tsx` 的两图。依赖：motion、lucide-react 已装
- **Community pinned rows**（reactbits-pro-templates wireframe/components/community.tsx）：六十四卦或命例卡片双行反向平移。依赖：motion 已装；背景 DitherShader 需 ogl
- **GlSurface**（reactbits-pro-templates cloudlight/components/gl-surface.tsx）：不引 ogl 的备选：零依赖 WebGL2 宿主承载现有 simplex 片元，GLSL 1.0 改 `#version 300 es`。依赖：无；`useReducedMotion` 官网已有
- **Docking nav**（reactbits-pro-templates cloudlight/components/nav.tsx）：hero 内玻璃 header 离开 hero 后切实底 fixed，比 ai-app nav 更适合含 methodology 真页的多页站。依赖：motion、lucide-react 已装
- **Rail 加 PillTabs**（reactbits-pro-templates cloudlight/components/rail.tsx 与 pill-tabs.tsx）：Rail 做节容器；PillTabs 切“梅花 / 紫微 / 八字”截图。依赖：motion 已装
- **run-journey 三段连线图**（reactbits-pro-templates agentframe/components/run-journey.tsx）：“命例 → 排盘 → 卦”追溯链路可视化，SVG dash travel 动画加键盘 tabs。依赖：motion、lucide-react 已装；keyframes `travel` / `signal` 从 agentframe `app/globals.css` 搬
- **LandscapeCanvas dither**（reactbits-pro-templates agentframe/components/landscape-canvas.tsx）：给猫静帧 `public/brand/orb-still-dark.png` 或截图做 35 色点阵纸感。依赖：无，canvas 2D；palette 按品牌重配
- **GradualBlur**（reactbits-pro-templates finance/components/gradual-blur.tsx）：截图列表底部与 header 底部的渐进模糊边缘。依赖：无
- **LogoLoop**（reactbits-pro-templates finance/components/logo-loop.tsx）：卦名 / 星曜名 marquee，hover 减速。依赖：无
- **HowItWorks sticky steps**（reactbits-pro-templates saas/components/how-it-works.tsx）：方法页三步，左栏 sticky 右栏竖线随滚动填充。依赖：motion、lucide-react 已装
- **TextReveal 逐字**（reactbits-pro-templates ai-saas/components/text-reveal.tsx）：口号“慌的时候先起一卦”逐字从中间放大回落，`split("")` 天然按字。依赖：motion 已装
- **Flowing menu**（reactbits-pro-templates agency/components/services.tsx）：方法页目录或页脚大字导航，按鼠标进入边缘滑入覆盖层。依赖：gsap 新引入；建议只保留 `findClosestEdge` 思路用 motion 重写

### 本仓已有

- motion ^12.42.2（`hachimi-website/package.json`），版本高于任何模板锁定版，所有模板的 `motion/react` 用法可直接跑
- next-themes ^0.4.6 class 暗色，`app/globals.css` 的 `@custom-variant dark` 与模板同法
- lucide-react ^1.24.0
- lenis ^1.3.25，`components/react-bits/device.tsx` 已引用 `ReactLenis`，`Providers` 的 SmoothScroll duration 1.6
- three ^0.185.0 加 @types/three，`hero-shader.tsx` 与 `final-cta-shader.tsx` 的 raw 用法与 finance 模板同源
- clsx、tailwind-merge、`lib/utils.ts` cn，装 Device 时补的（`design/brand/README.md`）
- Tailwind v4 ^4.3.2 加 @tailwindcss/postcss，token 名 `--background / --foreground / --muted / --border / --accent / --ring` 与模板一致，模板 class 可原样用
- React Bits Pro Device（`components/react-bits/device.tsx` 374 行，目录里只有这一个文件，registry `@reactbits-starter/device-tw`，本地改动见文件头注释）
- Rive 猫 Orb（`components/cat-orb.tsx`，`@rive-app/webgl2 2.42.2`，hero / footer 两处，`lib/orb/placement.ts`）
- `lib/motion.tsx` ReducedMotionProvider / useReducedMotion，与 ai-app、cloudlight 的同名实现一字不差
- `lib/motion-tokens.ts` EASE `[0.16, 1, 0.3, 1]`、DUR、reveal / mountRise / mountDrop 帮手，带 `data-animate` 无 JS 回显
- `components.json` 三个 registry @react-bits、@reactbits-starter、@reactbits-pro，REACTBITS_LICENSE_KEY 只在 `.env.local` 或 shell
- geist 包本地字体 GeistSans / GeistMono，模板用的是 `next/font/google`
- i18n `[locale]` 路由与 `getTranslations`，模板全是单语硬编码
- 静态导出 `output: "export"` 加 `images.unoptimized: true`（`next.config.ts`），Cloudflare Pages Git 集成跑 `npm run build` 输出 `out`（`deploy/cloudflare-pages.md`）

### 接入注意

- 静态导出：官网 `next.config.ts` 是 `output: "export"` 加 `images.unoptimized: true`，十个模板没有一个配 `output: "export"`。agentframe / ai-saas / cloudlight / finance / saas / wireframe 的 `images.remotePatterns`、shader 的 `async headers()`、agentframe 与 cloudlight README 第 183 行自述的默认 image optimizer 在官网全无效。模板里 `next/image` 的 unsplash / picsum 远程图一律换成 `public/` 本地 `<img>`。
- CORS：ai-app `hero.tsx` 第 26 到 29 行注释明写 “Remote hero images (CORS-enabled, required for WebGL textures)”，WebGL 纹理用远程图要 `crossOrigin="anonymous"` 且对方给 CORS 头；官网截图在 `public/screenshots/zh/` 同源，无此问题。
- 新依赖按路线分：ogl 1.0.11 最轻，覆盖 shader 与 wireframe 全部效果；@react-three/fiber 加 drei 重，且与官网已有 raw three 并存成两套用法；@react-three/postprocessing 只有 agency water-ripple 要；gsap 只有 agency services、ai-saas image-reveal、shader value-prop 要。建议只加 ogl，GSAP 场景用 motion `useScroll` 重写。
- GPU 预算：官网首屏已有 Rive 猫 webgl2 加 hero shader 两个上下文，final-cta 再一个。ai-saas fluid-cursor 全窗常驻、minimal dither-cursor、agency water-ripple 都再开常驻上下文。wireframe `dither-shader.tsx` 第 353 到 356 行注释记录过 8 个 context 同时建导致白闪，它的 `observeVisibility` 近视口才建 context 值得沿用。
- 换掉 raw three 的收益：`hero-shader.tsx` 242 行与 `final-cta-shader.tsx` 244 行各自内嵌整段 simplex 噪声与渲染循环；shader 模板的 ShaderCanvas 一份代码加 palette 对象覆盖两处，three 与 @types/three 可从 `package.json` 摘掉，`dynamic()` 分包从 three 降到 ogl。
- 官网血统：`b1fc2e7` 之后 `a472bf6` 改成 Hachimi，`09683d7` 装 Device，`64edf53` 首屏与页脚改播 Rive，`36a08d1` HEAD 落地 004 定位口径。重构时 finance 遗留的 hero / final-cta shader 是最该先换的。
- 中文文本动效：模板 word-mask 与逐词 scrub 全按 `split(" ")`，中文没有空格，要 `split("")` 按字或按官网 `t.hero.headlineLines` 手工断行数组；ai-saas text-reveal 天然按字；`RevealHeadline` 的 `mutedFrom` 按词序号也要改成按字。
- 字体：模板 `next/font/google` 加载 Geist，agentframe 另有 Lora；官网用 `geist` 包本地且不加载 CJK web font（`app/globals.css` 注释）；模板 class 的 `font-mono` 依赖 `--font-geist-mono`，官网已定义 GeistMono。
- Reduced motion：模板模式是 `useReducedMotion` 后给静帧或静态列表回退，ai-app app-showcase 退化成一张手机加有序列表，cloudlight manifesto 保留 sr-only 全文；官网 `Providers` 已有 `MotionConfig reducedMotion="user"` 加 ReducedMotionProvider，抄进来的组件直接用官网 hook。
- Lenis 并存：ai-app hero 第 549 到 559 行锁滚动注释写 “native + Lenis, which drives window scroll”，只改 `documentElement.style.overflow` 即可；GSAP ScrollTrigger 与 Lenis 并存要 `gsap.ticker.lagSmoothing(0)` 并把 Lenis raf 交给 gsap ticker，shader value-prop 只做了前半，这是不引 GSAP 的又一理由。
- Device 更新规则：`design/brand/README.md` 写明更新前先比对 registry 源码再保留本地适配、禁止 overwrite；借 ai-app `PhoneFrame` 时不要覆盖 `components/react-bits/device.tsx`，把 `ScreenLayer` 叠层塞进 Device 的 screen slot。
- 许可证：八份 LICENSE 禁止再分发源码，组件抄进官网仓属自用修改，源码只能落在私有仓。

## 三、App 能力清单（1.13.0）

1.13.0（project.yml MARKETING_VERSION，工作区已改未提交，CHANGELOG 1.13.0 节日期 2026-09-22；已推 tag 最新 v1.12.0，HEAD 206cfcb8 落地 spec 100 形象换到 v0.16.0；1.12.0 build 1545 在审、1.11.0 在架，见 docs/claude-memory/handoff.md）

### 起卦（梅花易数、仪式、解读、卦历、道长记忆与手记）

- 唯一对用户暴露的起卦法门是梅花易数报数起卦：报两个数字，缺省取设备本地钟点定动爻；先天八卦数取上下卦、两数加时辰序取动爻、含动爻的经卦为用、另一为体；吉凶基调由体用生克固化，不由模型发挥（hachimi-ios docs/constitution.md §四 起卦法门；docs/adr/0011）
- 起卦在端上算：按下起卦即冻结两数、时刻、时区，随包 engine bundle 在本机当场排出本卦、互卦、变卦、动爻、体用、方位与 SHA-256 校验和，先落库再谈网络，飞行模式一样起得了卦（hachimi-ios docs/architecture.md §五 起卦在端上；specs/capabilities/cast/spec.md 问事页末条（086））
- 问题可不填：不写问题也能起卦（纯卦），纯卦只交付确定性卦象，不调模型、不弹许可；事后可在结果页“补问”一句再请解读，解读落回同一卦（hachimi-ios specs/capabilities/cast/spec.md 结果页第 6 条；CHANGELOG.md 1.9.0 “纯卦与补问（spec 079）”）
- 问事页从上到下：道长与招呼句、梅花易数两格报数、所问之事（上限 2000 字素簇，右侧玻璃圆钮听写，iOS 端上语音转写、音频不出设备）、为谁问；两个数字都成立才出现滑动起卦条，滑动全程有触感，辅助技术在场时降级为按钮（hachimi-ios specs/capabilities/cast/spec.md §问事页（表单）；CHANGELOG.md 1.11.0 “问事页道长回到最上面”）
- 起卦仪式：道长到场打招呼（由 Rive 角色定长），随后六爻、卦名与锚句一齐显出，停 350 毫秒交给结果页；离线与在线同一条时间线；低特效档跳过招呼（hachimi-ios specs/capabilities/cast/spec.md §起卦仪式）
- 结果页六段固定：问题头与起卦时刻、卦象（本卦互卦变卦、动爻、体用）、解读位、卦象解释（本卦与变卦锚句、体用五行生克，确定性不经模型）、排盘细节（可折叠，含起卦回执、卦象档案、起卦指纹与“复制排盘，去问别的 AI”导出）、免责；解读位是全页唯一随网络变的一格（hachimi-ios specs/capabilities/cast/spec.md §结果页）
- 解读由后端唯一端点 POST /v1/divine 经可插拔 LLM 生成，此刻是 DeepSeek V4.1 Flash；后端重算一遍卦对校验和才解读；六字段结构化契约（guaPresentation、tiYongAnalysis、fortune、reading、advice、blessing）；断网时解读位写“联网后再试”，路回来或回前台自动重发一次，同一 castId 不重复计额（hachimi-ios docs/architecture.md §二 ②③、§五；specs/capabilities/cast/spec.md §解读那一趟）
- 道长卡合成一张、署名一次（“哈基米道长”），依次是解读正文、建议、祝福；没有解读时页面不出现道长头像与称呼（hachimi-ios specs/capabilities/cast/spec.md §结果页第 5 条（022、086））
- 安全分流先于一切：问题经端上引擎 safetyScan 规则表，命中危机档不出结果页、直接进静态分流页、不发任何请求；健康或财务档正常出结果页，解读位换成对应说明；热线与边界提示只来自客户端静态清单（hachimi-ios docs/constitution.md §一 安全分流；specs/capabilities/cast/spec.md §起卦仪式第 2 条）
- 结果页有“这卦接住你了吗”本地反馈、“分享这一卦”品牌图卡（卡底一行 cast_ 加 26 位角标，同一卦恒定，不带生辰）与“举报内容”五选一理由；分享图卡始终深色（hachimi-ios specs/capabilities/cast/spec.md §结果页第 8 到 9 条；specs/capabilities/me/spec.md §外观页脚句）
- 道长记忆：每卦解读随响应带回蒸馏产物（主题、情绪、要点、证据），只存端上、按命例隔离；起卦时确定性预排序前三条同命例卦忆瞬态上送，只进解读的 prompt 围栏、绝不进起卦核，有无记忆卦象字节一致；云端零记忆（hachimi-ios docs/architecture.md §五 记忆陪伴；docs/constitution.md §二 记忆只存端上）
- 道长手记：结果页“更多”打开这一卦蒸馏的卦忆，可编辑要点、改主题、补记结局、删除；卦历有角标与画像条、回访卡，可整本 Markdown 导出；“我的 → 我的记忆”总开关默认开，关掉后不记新的、不翻旧的，已记的保留（hachimi-ios docs/architecture.md §五 呈现层；specs/capabilities/cast/spec.md §结果页第 10 条；specs/capabilities/me/spec.md §我的记忆）
- 卦历：全局列表，可按命例筛选，纯卦、未关联命例与已删除命例的记录都可搜索到；卦历不设条数或时间的自动裁剪，删除只由用户逐条侧滑或“删除本机问事数据”触发（hachimi-ios specs/capabilities/cast/spec.md §命例与卦历第 2 条；specs/capabilities/persistence/spec.md §数据留存）
- 解读按本卦 kingWen 序取对应经典语料拼进提示词，不做向量检索；输入消歧只许单步澄清即停，模型无权二次追问（hachimi-ios docs/architecture.md §五 解读是工作流（006、007、ADR-0018））
- 第三方 AI 解读需显式许可：全新安装默认拒绝，首次实际在线问事才弹版本化披露（具名 DeepSeek、逐类字段、留存期），同版本不重复；撤回只在隐私政策承载页底部（hachimi-ios specs/capabilities/me/spec.md §第三方 AI 在线解读许可；docs/constitution.md §七）

### 命例（命例库、多命例管理、默认命主、备份与导入导出）

- 命例是全 App 的枢纽身份：紫微盘、八字盘、亲密与问事四面共用同一位命例；打开一条命例，盘页底部模块导航条四格依次为八字、紫微、亲密、问事，缺省第一眼是八字（hachimi-ios AGENTS.md 这是什么；CHANGELOG.md 1.11.0 “打开一条命例，第一眼是八字”（spec 094））
- 录入三选一：公历、农历（可选公元或干支纪年，闰月可勾）、四柱（八格干支）；生辰可敲十二位数字一次填完；出生地三种填法：按省市选、手工输经度、取当前位置（只取经度）；非东八区可选时区，含印度 5.5、尼泊尔 5.75 一类半区刻区（hachimi-ios specs/capabilities/case-library/spec.md §录入与编辑；CHANGELOG.md “命例录入与备份（2026-09-13，spec 033）”）
- 命例字段：姓名、性别、生辰、出生地、分组（可空）、备注；八个固定分组槽位可改名，每组上限 100 条，条数在管理分组页（hachimi-ios specs/capabilities/case-library/spec.md §录入与编辑、§列表与命例库页末条）
- 列表按首字母分节带索引条（中文名走拼音首字母），或按八个分组分节；排序四键（创建时间、最后修改、姓名笔画、出生年月）两方向；搜索匹配姓名与出生地；筛选菜单六节可组合：性别、分组、日主五行、日主天干、生肖、出生年代（十年一档），节间且、节内或（hachimi-ios specs/capabilities/case-library/spec.md §列表与命例库页）
- 命例行右侧直接显示四柱、每字按五行上色，姓名过长中间截断四柱不让位；命例列表与“为谁问”挑人表共用同一种行、同一套分节与筛选（hachimi-ios CHANGELOG.md 1.11.0 “命例列表与‘为谁问’共用同一种行”（spec 093）；specs/capabilities/case-library/spec.md 塑成表 071）
- “我的命盘”：长按一条命例设为我的命盘，恒排列表第一、姓名后带“我”字标记；“我的 → 紫微斗数”里可开“自动打开我的命盘”，启动后第一次进命盘格直接排出它（hachimi-ios specs/capabilities/case-library/spec.md §列表第 7 条；specs/capabilities/ziwei/spec.md §设置第 1 条）
- 删除是行内二次确认，确认句写清姓名与“连同名下 N 卦”，级联删除该命例名下的卦；命例可单条分享成文件，对方打开即合并进他自己的库、不带你的其他命例（hachimi-ios specs/capabilities/case-library/spec.md §列表第 2 条、§归档第 5 条；CHANGELOG.md 1.9.2 “命例现在可以单条分享成文件”）
- 默认命主：问事页“为谁问”一行，挑人表里“每次起卦都带上这位”开关立默认命主（UserDefaults 键 cast.profile.defaultCaseId），起完一卦回到默认；“我的 → 功能 → 问事”同一格可改；带命主的一卦解读贴着他的日主讲，上行只有七格派生摘要（日主、阴阳、旺衰、格局、调候用神、性别、年龄段），无姓名与生辰（hachimi-ios specs/capabilities/cast/spec.md §问事页“为谁问”条、§解读那一趟末条；docs/architecture.md §八 设置真源表 默认命主行）
- 生辰试算：同一命例内紫微、八字、亲密共用一份试算生辰草稿，农历与四柱可直接编辑，盘顶有状态条随时结束；只有明确“采用”才改正式生辰，原值进修改记录可恢复；草稿随命例导出导入（hachimi-ios specs/capabilities/case-library/spec.md §生辰试算）
- 备份页五段：备份状态、iCloud、存到文件、分享、本机定期备份（缺省开，一天最多一份、留最近 7 份）；外来文件、从文件导入、本机备份挑一份三条来路走同一张两档卡：“合并进现有命例”或“覆盖全部”；空库屏有“从备份恢复”（hachimi-ios specs/capabilities/persistence/spec.md §归档文件与备份页；specs/capabilities/case-library/spec.md §归档第 7 条）
- 归档文件第五版顶层七键（format、version、writtenAt、categories、myChartID、cases、casts），卦随命例一起走；对外标识用 TypeID（case_ 或 cast_ 加 26 位）；更早版本文件整份拒收，不做兼容（hachimi-ios specs/capabilities/persistence/spec.md §归档文件第 4 条、§库与标识符）
- 多设备同步：登录 iCloud 的设备自动把五张表同步到 CloudKit 私有库（CKSyncEngine），逐字段最后写入者赢，没有 App 内开关，系统设置里“iCloud → 哈基米道长”就是开关；没登录、断网、配额满都只是不上云，本机照常读写；退出登录不删本机数据（hachimi-ios specs/capabilities/persistence/spec.md §同步；docs/architecture.md §七 多设备同步）
- 命例数据只进本机与用户自己的 iCloud 私有库，不进日志、遥测或解读提示词；生辰、出生地与姓名不出设备（hachimi-ios specs/capabilities/case-library/spec.md §边界末条；specs/capabilities/cast/spec.md §边界第 2 条）

### 紫微斗数

- 紫微盘在本机由随包 JavaScriptCore 引擎（hachimi-engine 同一份内核）排出，飞行模式下新建命例同样立刻出盘；换设置、换层、挪生辰都是即时重排，不存在离线缓存与“显示上次结果”提示（hachimi-ios specs/capabilities/ziwei/spec.md §引擎与离线；docs/adr/0038）
- 盘面三式：三合（星曜亮度、生年四化、限流叠宫）、飞星（虚岁串、公元年串、大限宫名、来因宫红框）、四化（灰星配大号红色 ABCD 与飞化连线）；一条系统分段控件钉在导航栏下沿切换，切换不重新请求（hachimi-ios specs/capabilities/ziwei/spec.md §盘面与三式第 2 条）
- 十二宫加中宫方格盘，按格宽等比排版；点任一宫立太极点，其余宫名前出现“X之Y”，该宫宫干四化四颗星带底色，三方四正虚线或色块；星名三档配色主星红、辅星紫、杂曜蓝，身宫竖排两字红框（hachimi-ios specs/capabilities/ziwei/spec.md §盘面与三式第 1、4 条）
- 中宫本命态五枚快捷键（日↑、日↓、天盘▽、时↑、时↓），天盘▽ 点开切中州派地盘、人盘或命盘调整；限流态换成六枚层开关（本、限、年、月、日、时）（hachimi-ios specs/capabilities/ziwei/spec.md §盘面与三式第 3 条）
- 缩放是重新排版不是拉伸：双指 1.0 到 3.2 倍连续缩放，双击在整屏与 2.0 倍之间切换并把点到的宫居中；平移交给系统滚动视图带惯性与橡皮筋；VoiceOver 逐宫朗读（hachimi-ios specs/capabilities/ziwei/spec.md §缩放与平移）
- 限流：大限、流年、流月、流日、流时逐层叠盘；面板两形态（平铺、紧凑）四种规格（二、四、五、七层）；闰月流月带标记可选排法；限流层飞化箭头按“层命宫宫干四化落本宫或对宫”画；切层只重算变化的格，几乎感觉不到等待（hachimi-ios specs/capabilities/ziwei/spec.md §限流）
- 格局分析：“更多 → 格局分析”列出本命盘成立的格局，每条带吉凶徽标、手风琴展开正文，限流态按层判并写明出自哪一层；只对三合盘有效；格局判定是内核规则表，端上一个字不抄（hachimi-ios specs/capabilities/ziwei/spec.md §格局、四柱反查、紫占、命盘调整第 1 条；CHANGELOG.md “格局分析页（2026-09-13，spec 034）”）
- 四柱反查：选四柱与六十年窗口反查公历日期（公历与农历各写一行），可直接排盘或存成命例；老命书只有四柱没有公历日期时从这里进（hachimi-ios specs/capabilities/ziwei/spec.md §格局、四柱反查、紫占、命盘调整第 2 条；CHANGELOG.md “四柱反查页（2026-09-13，spec 035）”）
- 紫占排盘：不按生辰、按此刻时间或一个报数起一张盘问事，六项起法（当前时刻男盘、女盘，系统随机自动、报数，当前时刻起七层限流盘男盘、女盘），可选当前位置经度参与，起出的盘不入命例库除非勾选保存（hachimi-ios specs/036-zizhan-page/spec.md 验收 1；specs/capabilities/ziwei/spec.md §格局等第 2 条）
- 命盘调整与中州派：调月系星位置、调命宫位置（给双胞胎定盘或别派起法用），调整过的盘中宫短码显示星号；中州派地盘、人盘一键切（hachimi-ios specs/capabilities/ziwei/spec.md §格局等第 3 条；CHANGELOG.md “命盘调整与中州派天地人盘（2026-09-13，spec 037）”）
- 安星设置：二十三槽由一个安星码整体表达，可复制、贴入、恢复出厂，输一个别人给的码盘就与对方一模一样；设置三层（枢纽页三节十行、八页分页、系统 Picker），拨一下当场生效重排，无保存按钮；排盘规则含安星方法、四化表、历法、安星码四页（hachimi-ios specs/030-anxing-settings-page/spec.md 头注与用户故事 2；specs/capabilities/ziwei/spec.md §设置）
- 星曜显隐按星逐个关：四空（截空、副截、旬空、副旬）、六枚杂曜（华盖、劫煞、咸池、天德、月德、龙德）、流曜逐星、大限流年精简、精简星曜；层色五枚（大限到流时）可单独关；三方四正可选指示线或色块；中宫可分项隐藏姓名、出生时间、四柱与大运（hachimi-ios specs/capabilities/ziwei/spec.md §设置第 3、4 条）
- 输出与分享：右上角分享推出预览面板，渲成专用排版图（抬头命例名与盘式、中段盘体、下段品牌行动区 Logo、名称、口号、二维码），可存相册或系统分享；隐藏生辰开着时图上同步隐藏；“更多 → AI 分析”出结构化文本命盘，可编辑提示词后复制去问别的大模型（hachimi-ios specs/capabilities/ziwei/spec.md §输出与分享）
- 盘上按住有释义的星名或宫名升起词条卡片，深链到学堂读全文，返回时盘停在离开时的位置（hachimi-ios specs/capabilities/academy/spec.md §术语点即看）

### 八字

- 八字盘在本机由与紫微共用的随包引擎排出，飞行模式同样立刻出盘；四个页签（基本信息、基本排盘、专业细盘、断事笔记）全免费，专业细盘整页可看（hachimi-ios specs/capabilities/bazi/spec.md 引文与 §引擎与离线）
- 基本排盘页四柱表十行：主星、天干、地支、藏干、副星、星运、自坐、空亡、纳音、神煞，天干地支按五行上色；表下原局天干、原局地支、原局整柱三行与调候用神、调候落位、月令论断（hachimi-ios specs/capabilities/bazi/spec.md §基本信息与基本排盘第 2 条）
- 基本信息页档案行：生肖、虚岁、姓名逐字五行、农历、阳历、真太阳时、出生地区、人元司令、出生节气、交节时刻、星座、星宿、胎元、空亡、命宫、胎息、身宫、命卦、日主属性、阴阳、旺衰、格局参考、同党异党、五行能量、五行旺相休囚死、袁天罡称骨、出生天体图（月相小盘）（hachimi-ios specs/capabilities/bazi/spec.md §基本信息第 1 条；CHANGELOG.md “八字页上那些‘等内核’的格子换成了真数（spec 039 阶段 5）”）
- 专业细盘：七列六柱表（流年与大运排在年柱之前），页首“当前运限”一行写清哪一步大运（带起止年份）、哪一年、哪个月；下有起运交运司令行、大运带十二格、流年带（附小运行）、流月带、岁运三行、四柱神煞、大运神煞、流年神煞；首进停在今日所在的那一步大运与那一年，“今”按钮回到今天（hachimi-ios specs/capabilities/bazi/spec.md §专业细盘）
- 内核此刻只出大运、流年、小运、流月四层；流日与流时两层暂未接入，非会员选中流月后流月带下出现“开通会员 · 流日流时”升级位（推广期内不出现）（hachimi-ios specs/capabilities/bazi/spec.md §专业细盘末条；specs/capabilities/paywall/spec.md §推广期内的表现）
- 断事笔记：一条命例一段纯文本，停手约半秒自动保存，只存本机、随命例删除、不进文本命盘导出（hachimi-ios specs/capabilities/bazi/spec.md §断事笔记）
- 每个字段都点得开：四个页签上有名字的字段（十神、纳音、长生、神煞、藏干、刑冲合害等）都带虚线锚点，长按升起半屏词条卡片，卡片底部进学堂读全文；显示设置可开“轻点出词条”（hachimi-ios specs/capabilities/bazi/spec.md §词条与轻点）
- 排盘规则设置：人元司令分日诀六套任选，年柱按立春或正月初一分界；晚子时与紫微历法页共用同一槽，改一处两页同步（hachimi-ios specs/capabilities/bazi/spec.md §排盘规则设置）
- 显示设置六节：基本排盘逐行显隐、专业细盘各行与各带显隐、五行颜色三枚、顺序（四柱与流运先后、年月日时正倒、大运流年流月正倒）、其它（显示大运年数 120/80、进入页、轻点出词条）、圆点（岁运并临、流年天合地合、天克地冲）；按页重置（hachimi-ios specs/capabilities/bazi/spec.md §显示设置）
- 导出与分享：右上角分享渲成专用排版长图（抬头写页与所选层、命主卡加四柱表或六柱表连同运带、品牌行动区 Logo 名称口号 hachimi.ai 水印与二维码），四柱页与六柱页各出一张；隐藏生辰开着时图上同步隐藏（hachimi-ios specs/capabilities/bazi/spec.md §导出与分享）
- “更多 → AI 分析”出一整份八字文本命盘（四柱主星藏干星运自坐旬空纳音、胎元胎息命宫身宫、空亡人元司令、大运十二步与小运、两档神煞、刑冲合害），配可改的提示词一键复制去问大模型（hachimi-ios CHANGELOG.md “八字盘有了断事笔记，也能整份交给 AI 了（spec 039 阶段 3）”）

### 亲密（命盘第三面）

- 亲密是命盘页模块导航条的一格：按端上引擎确定性算出的证据，把这条命例在相处上的倾向按匹配度降序排出，只显示够准的、最多八条，另有成格一节；不调用大模型、生辰不出端（hachimi-ios specs/capabilities/kink/spec.md 引文、§列表页、§边界）
- 首次切进先问一句“这一页聊聊亲密相处的倾向，仅供娱乐。看看吗？”；文案是中性覆盖表（简繁英），不出现露骨用词；可分享成最多五行的长图，不含证据颗粒、生辰与命例名（hachimi-ios specs/capabilities/kink/spec.md §开关屏、§分享、§文案）

### 学堂

- 学堂是一级导航第三格：山医命相卜五科胶囊、类目胶囊、命科“怎么用”两本手册（紫微斗数、八字排盘各六节）、词条一排、三列封面书架（iPad 与横屏四到六列）；封面程序绘制、一科一套印色、线装书脊与竖排题签（hachimi-ios specs/capabilities/academy/spec.md §根屏与书架；CHANGELOG.md 1.6.0 “学堂改成书架（spec 057）”）
- 全部内容随包离线：书目、词条与逐本正文全来自随包 JSON，飞行模式下书架、阅读页、搜索、锚点与卡片照常可用，不经网络、不判定登录态；带图的书图也在本地（hachimi-ios specs/capabilities/academy/spec.md §离线与产物；docs/architecture.md §九）
- 阅读器：连续版心、段首空两格，京華老宋体章题、系统宋体正文；Aa 面板三项（字号五档、行距三档、宋体或系统字体）全书共用存本机；文末上一章下一章；阅读进度按书记在本机，再进从上次那一段接着读；章内插图可全屏缩放；阅读页收起标签栏（hachimi-ios specs/capabilities/academy/spec.md §阅读器）
- 搜索只按名字查词条名、别名、书名三张表，命中分完全相同、名字打头、名字中间三档；打“紫微星”落到“紫微”词条（hachimi-ios specs/capabilities/academy/spec.md §搜索）
- 术语点即看：盘面与格局页上有释义的字底下一道虚线，长按 0.6 秒升起卡片（词条名、一句概括、按点中语境的那一维正文默认展开、其余折叠、格局多一段“古籍口径”），底部“在学堂里读全文”；没有释义的字不画虚线、不弹空卡；VoiceOver 有“读释义”动作（hachimi-ios specs/capabilities/academy/spec.md §术语点即看）
- 词条分十五族（概念、阴阳、五行、天干、地支、干支关系、星曜、宫位、十神、十二长生、纳音、神煞、旺衰、格局、二十八宿、节气），紫微与八字两域各一套，七杀、红鸾、天喜、华盖、孤辰、寡宿六个名字两域各有一条（hachimi-ios docs/architecture.md §九 目录内分工与术语锚点；App/Resources/content/glossary/zh-Hans.json 实数 kind 15 种）
- 界面切繁体时科名、类目、书名、作者与词条内容跟着变繁体；封面题签一律中文竖排；英文界面下正文与题签回落简体（hachimi-ios specs/capabilities/academy/spec.md §根屏与书架末条）
- 学堂不做：收藏、笔记、书签、按需下载与全文检索（hachimi-ios specs/capabilities/academy/spec.md §边界末条）

### 通用（离线优先、无账号、外观、语言、iCloud、推广期、形象、隐私）

- 离线优先：起卦、紫微盘、八字盘、两份文本命盘、亲密映射与学堂全在本机；走网络的只有解读、格局分析、四柱反查、紫占、省市表、时区表，加反馈、举报与两条遥测；飞行模式起得了卦、排得了盘，只是没有解读（hachimi-ios docs/architecture.md §一 总体形态；docs/constitution.md §二）
- 不做账户与登录，没有头像昵称；首启指引写明命例与生辰只留在这台设备上、问事那一步要联网、不用注册也没有广告；“暂不同意”照样进得去，命盘全能用（hachimi-ios specs/capabilities/me/spec.md §边界第 1 条；CHANGELOG.md 1.7.0 “第一次打开先说清三件事（spec 065）”）
- 三语首发：简体中文、繁体中文、英文；App 内切换语言即时生效不需重启；核心解读不跨书写系统回落（hachimi-ios docs/constitution.md §一 语言；specs/capabilities/me/spec.md §语言）
- 外观五档：浅色、弱光、深色、深色黑白、跟随系统，默认跟随系统，全 App 即时生效；弱光下道长底色走暖色（hachimi-ios specs/capabilities/me/spec.md §外观；CHANGELOG.md 1.13.0 Changed 第 1 条）
- “我的”页按系统设置样式：功能（问事、紫微斗数、八字排盘）、通用（语言、外观、触感与动效）、数据（我的记忆、命例备份、隐私与数据）、关于四节，一级页零开关；触感总开关、起卦触感、简化起卦动效三枚（hachimi-ios specs/capabilities/me/spec.md §一级页、§触感与动效）
- 推广期：东八区 2027-01-01 零时前人人按会员对待，付费墙、限流锁、升级位、“会员与订阅”整节一处都不出现；商店文案写“会员功能免费开放至 2026 年底”；AI 解读仍有每日额度，用尽时只说“今天的解读次数用完了，明天再来”（hachimi-ios specs/capabilities/paywall/spec.md §推广期闸、§推广期内的表现；fastlane/metadata/zh-Hans/description.txt 推广期段）
- 推广期后的会员形态（此刻不出现）：一份会员覆盖紫微流月流日流时、八字流日流时、AI 解读每天 30 次；季、年两档自动续期加永久买断，走 StoreKit，无账号靠 Apple ID 恢复（hachimi-ios specs/capabilities/paywall/spec.md §付费页与触发入口、§用户故事 3）
- 道长形象以 hachimi-orb 仓的签名 Rive 文件为真源（v0.16.0，契约第十三版），iOS 与官网播同一份文件；首页可戳可拖，打字或听写时转过来正视你，戳一下六种回应，庆祝时带彩带转一圈；减弱动态或电量吃紧时停在静帧（hachimi-ios specs/capabilities/orb/spec.md §样子、事件与在场地图；specs/100-orb-v016-character-rollout/spec.md；CHANGELOG.md 1.13.0）
- 隐私：后端不接收命例姓名、生辰、位置、邮箱、通讯录、照片、GPS 或广告标识符；不使用 ATT；不读取 HealthKit 等健康财务资料；问题原文在后端最多保留 90 天，准入记录最多 8 天，举报 30 天（hachimi-ios docs/legal/privacy-policy.zh-Hans.md §2、§3.1）
- 商店定位：主分类生活方式（LIFESTYLE）、副分类工具（UTILITIES）；App 名“哈基米道长”、英文名 Hachimi.ai、副标题“传统文化排盘与自我探索”；口号“慌的时候，先起一卦。”落款网址 https://hachimi.ai；主体元竹投資有限公司（Yuenchuk Investment Limited，香港）（hachimi-ios fastlane/metadata/primary_category.txt、secondary_category.txt、zh-Hans/subtitle.txt；specs/078-brand-name-and-share-slogan/spec.md 判决 1 到 3；docs/constitution.md §三 命名）
- 官网定位口径（owner 2026-09-22）：学习与研究中国民俗术数的工具类 / 生活方式类 App；首屏口号不动，收尾句改“卦、盘、命例都在一处”；页脚不摆统计数字、同一组入口只出现一次、法律链接只在最底一行；桌面与移动端猫都用 96 px（hachimi-ios docs/claude-memory/feedback-site-positioning-2026-09-22.md）
- 平台：SwiftUI，最低部署目标 iOS 26，支持 iPad（商店截图含 13 英寸 iPad）；Android 客户端待 iOS 稳定后原生重建，网页版暂停推进（hachimi-ios docs/constitution.md §八；README.md 仓库拓扑；store-screenshots/README.md；CHANGELOG.md 1.6.0 仓库拓扑整理）

### 命例与卦的关联

每份命例名下的卦追得回去，机制分五层，都有出处：

1. 库层：全部用户数据在一张 SQLite（hachimi.sqlite）五张表里，卦表 casts 有一列 caseId 外键指向 cases.id，ON DELETE CASCADE；不为谁起的卦 caseId 为空。删一位命例，他名下的卦一起走，没有墓碑（specs/capabilities/persistence/spec.md §库与标识符第 3 条；docs/architecture.md §七“命例与存储”行；ADR-0042、spec 085）。
2. 起卦时绑定：问事页“为谁问”选中某位命例（或默认命主），按下起卦时主体随两数、时刻、时区一起冻结进 CastRequestSnapshot，会话内重试带的是同一位，不改卦身份（specs/capabilities/cast/spec.md §问事页“为谁问”条与末条；CHANGELOG.md 1.6.0 spec 063）。从命例详情“为 TA 起一卦”进来的那一趟主体锁死，页上是一张不可点的命主条（cast spec §问事页 097 条；spec 087 决策 1）。
3. 界面回看：命例详情底部模块导航条第四格“问事”，是一条挂 HistoryCaseFilter.person(_:) 的观察查询，与全局卦历读同一条、排同一个序，按起卦时刻倒序，每行写日期、所问（纯卦写“纯卦”）、本卦与变卦名、吉凶；点一行推的是卦历里同一张 ResultView，退回仍停在这一面；没有卦时写“还没有为 TA 起过卦”（docs/architecture.md §七“问事那一面”；specs/087-casts-under-case/spec.md 决策 1；cast spec §命例与卦历）。
4. 回程与全局：结果页顶上一条落款（姓名、日主与旺衰），点它进这位的问事面看他还问过什么；纯卦或不带命例的卦没有这行。全局卦历保持列表与按命例筛选，纯卦、未关联命例与已删除命例的记录都可搜到（cast spec §结果页第 3 条、§命例与卦历第 2 条；spec 097）。
5. 随命例一起走：删命例确认句“连同 N 卦”并级联删；单条命例导出与分享带他名下的卦，导入回来问事面立刻可见；归档第五版顶层带 casts 键；五张表整体同步到 CloudKit 私有库，卦随命例跨设备（spec 087 决策 3；case-library spec §归档第 1、5 条；persistence spec §同步）。
   另有两条配套：道长记忆的卦忆与画像按命例稳定 UUID 隔离，起卦时只召回同命例前三条卦忆，未关联不召回、不落忆（docs/architecture.md §五 记忆陪伴“记忆隔离而非隐身”）；分享卡底部一行 cast_ 加 26 位 TypeID 角标，同一卦恒定，卡上不带生辰（spec 087 决策 4；ADR-0043）。

### 数字

| 项                                    | 值                                                                                                                                                                                                                        | 出处                                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 学堂书目总数 / 随包正文本数 / 下架书  | 157 本书目、154 本随包正文、3 本只留书名                                                                                                                                                                                  | hachimi-ios App/Resources/content/academy/manifest.json stats.books / shipped / hidden                                                                  |
| 学堂随包章数 / 插图                   | 2408 章（书目总章 2423）、27 张图                                                                                                                                                                                         | hachimi-ios App/Resources/content/academy/manifest.json stats.shippedChapters / chapters / images                                                       |
| 学堂五科十三类，各科本数与随包章数    | 山 1 类 12 本 103 章；医 1 类 33 本 895 章；命 3 类（七政四余、八字、紫微斗数）48 本 47 随包 729 章；相 3 类（人相、地相、天文与谶纬）31 本 29 随包 261 章；卜 5 类（六爻、大六壬、奇门遁甲、易经、梅花易数）33 本 420 章 | hachimi-ios App/Resources/content/academy/catalog.zh-Hans.json 现场统计（2026-09-22）                                                                   |
| 学堂正文包体                          | 随包书正文约 22.9 MB（gzip 8.8 MB），图 2.56 MB                                                                                                                                                                           | hachimi-ios App/Resources/content/academy/manifest.json stats.bookBytes / bookGzip / imageBytes                                                         |
| 词条总数与两域分布                    | 420 条（八字域 244、紫微域 176），简繁各一份                                                                                                                                                                              | hachimi-ios App/Resources/content/glossary/manifest.json locales.entries；zh-Hans.json 现场统计 domain                                                  |
| 词条正文池与覆盖度                    | 正文池 1745 段；覆盖 full 392、brief 18、stub 10                                                                                                                                                                          | hachimi-ios App/Resources/content/glossary/manifest.json locales.bodies、coverage                                                                       |
| 词条族数                              | 15 族（格局 122、星曜 65、神煞 59、纳音 30、二十八宿 28、概念 22、干支关系 17、长生 12、地支 12、节气 12、十神 10、天干 10、旺衰 10、阴阳 6、五行 5）                                                                     | hachimi-ios App/Resources/content/glossary/zh-Hans.json 现场统计 kind                                                                                   |
| 紫微格局规则数                        | 84 条（内核规则表；真源在 hachimi-engine 仓，本仓只在 CHANGELOG 记过这个数，当前值未在本仓核实）                                                                                                                          | hachimi-ios CHANGELOG.md “格局分析页（2026-09-13，spec 034）”条                                                                                         |
| 六十四卦锚句                          | 64 卦 × 三语 = 192 句，门禁保证三语齐备                                                                                                                                                                                   | hachimi-ios App/Platform/HexagramAnchors.swift 档头注释                                                                                                 |
| 道长招呼句池                          | 60 句简体真源（繁英各一份），每次进页与每次戳球各抽一句、与最近八句不重                                                                                                                                                   | hachimi-ios App/Features/Cast/Home/Greeting/OrbGreetingPool.swift（Line( 计 60 处）；specs/070-cast-home-order-and-greeting/spec.md 池子的规矩          |
| 戳球回应种类                          | 6 种；庆祝带彩带四拍                                                                                                                                                                                                      | hachimi-ios CHANGELOG.md 1.13.0 Added 第 1 条；specs/100 §为什么                                                                                        |
| 紫微安星设置                          | 23 槽由一个安星码表达；原单页十组一百零七行，现改三层结构                                                                                                                                                                 | hachimi-ios specs/030-anxing-settings-page/spec.md 头注                                                                                                 |
| 紫微盘式 / 限流层 / 缩放              | 三式（三合、飞星、四化）；限流五层（大限、流年、流月、流日、流时）面板四规格（二、四、五、七层）；缩放 1.0 到 3.2 倍                                                                                                      | hachimi-ios specs/capabilities/ziwei/spec.md §盘面与三式、§限流、§缩放与平移                                                                            |
| 紫占起法 / 四柱反查年份域             | 六项起法；反查窗口公元前 1616 年到公元 2404 年，缺省窗口 1924 到 1983                                                                                                                                                     | hachimi-ios specs/036-zizhan-page/spec.md 验收 1；CHANGELOG.md “四柱反查页（spec 035）”条                                                               |
| 八字字段清单 / 页签 / 表格            | 对照成品 82 个字段；四个页签；四柱表十行；六柱表七列；基本信息页 27 格（阶段 1 口径）；大运带十二格                                                                                                                       | hachimi-ios specs/039-bazi-page/spec.md 对照物注与六柱表节；specs/capabilities/bazi/spec.md §专业细盘；CHANGELOG.md “八字盘先出两页（spec 039 阶段 1）” |
| 八字人元司令分日诀                    | 六套任选                                                                                                                                                                                                                  | hachimi-ios specs/capabilities/bazi/spec.md §排盘规则设置                                                                                               |
| 亲密映射表规模                        | 78 行、8 个成格；列表最多显示 8 条；分享长图最多 5 行                                                                                                                                                                     | hachimi-ios HachimiKit/Sources/HachimiContract/Fixtures/kink-copy-manifest.json rows / patterns；specs/capabilities/kink/spec.md §列表页、§分享         |
| 命例分组                              | 8 个分组槽位，每组上限 100 条                                                                                                                                                                                             | hachimi-ios specs/capabilities/case-library/spec.md §列表末条                                                                                           |
| 命例录入方式 / 快捷输入               | 三种录入方式（公历、农历、四柱）；十二位数字一次填完生辰                                                                                                                                                                  | hachimi-ios specs/capabilities/case-library/spec.md §录入与编辑第 1 条                                                                                  |
| 本机定期备份                          | 一天最多一份，只留最近 7 份，缺省开                                                                                                                                                                                       | hachimi-ios specs/capabilities/persistence/spec.md §归档第 7 条                                                                                         |
| 归档文件版本                          | 第五版，七个顶层键，带卦                                                                                                                                                                                                  | hachimi-ios specs/capabilities/persistence/spec.md §归档第 4 条                                                                                         |
| 数据库表数                            | 一张 SQLite 五张表（cases、casts、categories、library、settings），五张表全同步 CloudKit                                                                                                                                  | hachimi-ios specs/capabilities/persistence/spec.md §库与标识符、§同步                                                                                   |
| 语言 / 外观 / 一级导航 / 命例详情面数 | 三语；外观五档；一级导航四格（问事、命盘、学堂、我的）；命例详情四面（八字、紫微、亲密、问事）                                                                                                                            | hachimi-ios docs/constitution.md §一；specs/capabilities/me/spec.md §外观；CHANGELOG.md 1.11.0 spec 094 条                                              |
| AI 解读每日额度 / 推广期截止          | 会员每天 30 次（推广期内人人按会员）；截止东八区 2027-01-01 00:00；商店文案写“免费至 2026 年底”                                                                                                                           | hachimi-ios specs/capabilities/paywall/spec.md §推广期闸、§付费页；fastlane/metadata/zh-Hans/description.txt                                            |
| 后端留存期                            | 问题原文最多 90 天；准入记录最多 8 天；举报 30 天；卦历、命例、卦忆只在设备                                                                                                                                               | hachimi-ios docs/legal/privacy-policy.zh-Hans.md §2 表                                                                                                  |
| 最低系统 / 形象文件版本               | iOS 26；Rive 形象 v0.16.0、契约第十三版（七套配色、两档朝向）                                                                                                                                                             | hachimi-ios docs/constitution.md §八；specs/100-orb-v016-character-rollout/spec.md §为什么                                                              |

### 现有截图

- hachimi-ios store-screenshots/*.png：24 张已入库的商店截图，iphone69 与 ipad13 两机型 × 简繁英 × 四屏（1_home、2_result、3_me、4_welcome）。是旧流程产物；README 说当前流程用 capture-release.sh 拍六屏（首页、紫微、八字、亲密、学堂、问事结果）× 三语 × 三尺寸输出到 build/store-release/screenshots/<语言>/，该目录此刻不存在
- hachimi-ios build/device-walk：不存在（find 计 0 文件），不要引用
- hachimi-ios build/orb-web-evidence/{hero-desktop,hero-mobile,footer-desktop}.jpeg：官网首屏与页脚 Rive 形象验收截图（spec 100 落地证据），是官网截图不是 App 截图
- hachimi-ios AppUITests/DeviceScreenshotPass+Site.swift：官网三张成图的拍法（S1 起卦结果页真连生产后端、紫微三合盘、八字四柱页用署名合成种子），浅深各一趟，跑法在档头注释，输出 build/SiteShots-<appearance>.xcresult 后用 xcrun xcresulttool export attachments 导出；该 xcresult 此刻不存在，要新拍
- hachimi-ios AppUITests/DeviceScreenshotPass.swift 与 +Academy/+Bazi/+Kink/+Me/+Ziwei* 等分文件：全 App 巡检截图，只有 HACHIMI_SCREENSHOT_PASS=1 才拍，附件留在 xcresult 里；build/ 下现有 TestResults.xcresult、UITests.xcresult、UIRerun.xcresult、UISubset-1789997319.xcresult 四份，是否含截图附件未核实
- public/screenshots/zh/{cast-result,ziwei-sanhe,bazi-pillars}{,-dark}-{603,1206}.webp 与 en/result.webp：官网现用 App 截图；handoff.md 悬项记“官网盘页截图要按新界面重截”，它们早于 1.11.0 的界面（页签控件、模块条、宋体、命例行都变了）
- public/brand/hachimi-orb.riv 与 orb-still-light.png、orb-still-dark.png：官网 Rive 形象与静帧，与 iOS 包内同一份文件（spec 100 验收 13）
- hachimi-ios design/brand/：app-icon-master-1254.png、orb-icon-master-1024.png、orb-native-transparent-1600.png、platform-assets.json 等品牌母版与平台资产清单（spec 062 同源出图，owner 定图标暂不变）
- 真机与成品对照截图（docs/功能和界面参考/）不进 git，只在本机；四例对标截图含真人生辰，不得用于官网

### 不能说的

- 不说预测准、改命、转运、灵验、真的能，不做任何功效保证；全平台“仅供娱乐”免责是最高红线（docs/constitution.md §一 智商税红线；docs/launch/app-store-metadata.md 头注禁词表）
- 解读不构成医疗、心理、法律、财务、投资或任何专业建议，不保证任何现实结果（docs/legal/terms-and-disclaimer.zh-Hans.md §1、§2）
- 不把解读说成事实预测：它是基于卦象的联想性、供娱乐的提示；解读由第三方 AI 生成，可能不准确（terms §2、§3）
- 不说解读离线可用：飞行模式只有卦与盘，解读位写“联网后再试”（docs/constitution.md §二 排盘与起卦在端上）
- 不说格局分析、四柱反查、紫占、省市表、时区表离线可用：这几条仍走网络端点（specs/capabilities/ziwei/spec.md §边界）
- 不说八字有流日流时：内核此刻只出大运、流年、小运、流月，流日流时是升级位上先说出的路线（specs/capabilities/bazi/spec.md §专业细盘末条）
- 不说有六爻、小六壬或别的起卦法门，也不说流式解读、一卦多命主：不在范围（specs/capabilities/cast/spec.md §边界；docs/constitution.md §四 唯一法门）
- 不说有账户、登录、自建云端库、跨 iCloud 账号共享（CKShare）；同步只是用户自己的 iCloud 私有库（specs/capabilities/persistence/spec.md §边界）
- 不说 Android 已上线或网页版可用：Android 待 iOS 稳定后原生重建，网页版暂停推进（README.md 仓库拓扑；CHANGELOG.md 1.6.0 仓库拓扑整理）
- 不说“无限起卦”“无限解读”：会员也是每天 30 次，对用户按“每天 30 次”明说（specs/017-monetization/spec.md 2026-09-15 增订注 ③）
- 推广期内不展示任何价格、档位、付费入口（specs/capabilities/paywall/spec.md §推广期内的表现；spec 076 判决 2）
- 不点名 DeepSeek 以外的模型（不提 Gemini 等），不说客户端直连第三方；后端只有 DeepSeek，上游 key 在服务端（docs/claude-memory/MEMORY.md owner 夜间口径 2026-09-15；docs/constitution.md §二）
- 亲密偏好不作心理诊断或关系结果判断，文案中性、不出现露骨用词、不说成性癖测试（fastlane/metadata/zh-Hans/description.txt 使用边界；specs/077 判决 3）
- 不从术数结果推断健康诊断、性取向、宗教或政治身份；问句不等于事实，卦象不证明现实事件（specs/079 决策 3；specs/capabilities/cast/spec.md §命例与卦历末条）
- 用户可见内容不出现受版权保护著作的书名与作者名，不搬运受版权保护内容；学堂里的公版古籍书名（本草纲目、渊海子平等）CHANGELOG 已公开写过，不在此限（docs/constitution.md §七 版权）
- 不写 Master Hachimi：英文名统一 Hachimi.ai，角色名英文 Hachimi，落款网址 https://hachimi.ai（specs/078 判决 1、2）
- 不用旧口径“占卜 App”“慌时有处去”；收尾句改“卦、盘、命例都在一处”；页脚不摆统计数字（随包多少本、0 个账号一类），同一组入口只出现一次（docs/claude-memory/feedback-site-positioning-2026-09-22.md）
- 真人姓名与生辰不进任何对外产物，截图一律用合成命例（AGENTS.md 工作纪律；docs/architecture.md §四 三条纪律）
- 不说已在中国大陆上架或有大陆商店链接：当前上架区域是海外应用商店，大陆是 owner 在争取的方向（README.md 首段；docs/north-star.md NS-1；docs/claude-memory/MEMORY.md owner 晚间口径 2026-09-16）
- 不说 App 使用地理定位或读取健康财务资料；“本地时辰”是设备时钟不是 GPS，出生地定位只取一次经度（docs/legal/privacy-policy.zh-Hans.md §2 注）
- 不说盘与成品逐字段一致或对拍完成：对拍未完成不得宣称一致（specs/079 决策段第 5 条）
- 不把不做隐私遮罩、不设卦历上限这类产品判断写成“功能”去卖；不把编外顾问写成背书（AGENTS.md 这是什么）

## 四、现站与约束

### 栈

- Next.js 16.2.10 App Router，`output: "export"` 静态导出，`images.unoptimized: true`，生产去 console、不出 source map（next.config.ts；package.json）
- React 19.2.7 / react-dom 19.2.7；TypeScript 走 npm 别名 `typescript@npm:@typescript/typescript6@^6.0.2`，另装 `@typescript/native`（TS 7）；tsconfig 全 strict，含 noUncheckedIndexedAccess、exactOptionalPropertyTypes、noUnusedLocals（package.json；tsconfig.json）
- Tailwind CSS v4（`@tailwindcss/postcss` ^4.3.2，`@import "tailwindcss"` 加 `@theme inline` 设计 token，`@custom-variant dark`）；prettier 3 + prettier-plugin-tailwindcss；ESLint 9 + eslint-config-next 16.2.10 core-web-vitals 与 typescript 两套（app/globals.css；eslint.config.mjs）
- 动效：motion ^12.42.2（12 个组件引用 motion/react，动画常量集中在 lib/motion-tokens.ts）；Lenis ^1.3.25 平滑滚动（components/smooth-scroll.tsx，受 `features.smoothScroll` 开关）；`lenis/react` 只被 React Bits Device 组件用（components/react-bits/device.tsx:5）
- WebGL：three ^0.185.0 只在 components/hero-shader.tsx 与 components/final-cta-shader.tsx 两个 simplex noise 光束 shader 里用，都是 next/dynamic ssr:false 按需加载（grep 结果；两文件头注释）
- 道长形象：`@rive-app/webgl2` 精确钉死 2.42.2（不带 ^），播 public/brand/hachimi-orb.riv v0.16.0、契约第 13 版，wasm 由 scripts/sync-rive-wasm.mjs 从 node_modules 复制到 public/rive/（不入库）；宿主三份文件 lib/orb/{contract,placement,host}.ts 加 components/cat-orb.tsx（public/brand/orb-source.json；specs/003-orb-on-rive/plan.md）
- 主题与字体：next-themes ^0.4.6 class 模式、系统缺省；Geist Sans / Mono 自托管（`geist` ^1.7.2，app/[locale]/layout.tsx），CJK 只用系统字体栈，无任何 web font（app/globals.css 注释“CN-CDN survival rule”）
- 图标：lucide-react ^1.24.0；工具：clsx + tailwind-merge（lib/utils.ts 的 cn）；shadcn 风格 components.json 已配三个 registry：@react-bits（公开）、@reactbits-starter、@reactbits-pro（Bearer ${REACTBITS_LICENSE_KEY} 占位，许可证只在 .env.local 或 shell）（components.json；design/brand/README.md）
- Node 24（.node-version，同时锁 Cloudflare Pages 构建镜像）；npm（package-lock.json）；本地素材脚本 scripts/build-shots.mjs 依赖随 Next 装进来的 sharp，不进 package.json（scripts/build-shots.mjs 头注释）
- 文案管线：scripts/polish-copy.mjs 调 DeepSeek `deepseek-flash` 把 docs/copy/<date>/facts.zh.json 润成 polished.zh.json 与 polished.en.json，再人工进 lib/i18n（scripts/polish-copy.mjs 头注释；specs/001 plan 第 1 节）
- 血统：仓库由 React Bits Pro Finance Template 改来（b1fc2e7 “React Bits Pro - Finance Template”，a472bf6 2026-02-22 首次改成 Hachimi 并加 i18n）；参考仓 reactbits-pro-templates 现有 agency、agentframe、ai-app、ai-saas、cloudlight、finance、minimal、saas、shader、wireframe 十套模板加 zip 原档，均为 Next 16.1.1 到 16.3.4，其中 shader 用 ogl（比 three 轻）加五套调色板变体与 JSON-LD，ai-app / minimal 用 @react-three/fiber，agentframe 无 WebGL 依赖（ls 与各 package.json）

### 页面

- `/`：public/_redirects 在 CF 边缘 `/ /en 302`；app/page.tsx 只是 next dev 与非 CF 环境的客户端兜底（meta refresh + router.replace + 裸 <a>），自带 <html>（app/page.tsx 头注释；deploy/cloudflare-pages.md）
- `/en`、`/zh`：首页（app/[locale]/page.tsx），locale 由 lib/i18n/index.ts 的 `locales = ["en","zh"]` 静态生成；未知 locale 回落 en；html lang 在 app/[locale]/layout.tsx 设
- `/{locale}/methodology`：方法论页（起卦的门道），components/methodology.tsx 449 行，节：cast（确定性起卦与 SHA-256 指纹）、ai（AI 写什么、锁什么）、eval（双层评测门与数字）、paipan（排盘的门道，锚点 #paipan，接住首页撤下的七项机制）、limits、closing（lib/i18n/types.ts methodology 段）
- `/{locale}/privacy`：隐私政策，components/privacy-policy.tsx 渲染 t.privacy.sections；zh 最后更新 2026-09-17（lib/i18n/zh.ts），pageDates.privacy 仍写 2026-07-21（lib/config.ts，与可见日期不同步）
- `/{locale}/terms`：使用条款与免责，components/legal-sections.tsx 渲染 t.terms.sections（app/[locale]/terms/page.tsx）
- `/{locale}/support`：支持与帮助，components/legal-page.tsx 的 LegalPageContent（intro + steps + dataTable + sections）（app/[locale]/support/page.tsx）
- `/{locale}/account-deletion`、`/{locale}/data-deletion`：账号与你的数据、删除数据，同 LegalPageContent 渲染器，Google Play 合规页起源于 7a17875（app/[locale]/account-deletion/page.tsx；git log）
- 裸路径 302：`/privacy`、`/data-deletion`、`/account-deletion`、`/terms`、`/support`、`/methodology` 各 302 到 `/en/...`；`/get` 与 `/get/` 302 到 App Store id6787621766（iOS 分享卡二维码落地，spec 013 v2）（public/_redirects）
- 构建期生成：`/sitemap.xml`（app/sitemap.ts，force-static，lastModified 取 lib/config.ts pageDates 而非构建时间）、`/opengraph-image` 与 `/twitter-image`（app/opengraph-image.tsx 用 next/og 内联 public/brand/og-logo.png）、`/404.html`、`/_not-found.html`（out/ 列表）
- 静态文件：public/robots.txt（Content-Signal search/ai-input/ai-train 全 yes）、public/llms.txt（7.3 KB，“Last updated 2026-09-14”）、public/llms-full.txt（20 KB）、public/site.webmanifest（description 仍是“cat-themed Mei Hua Yi Shu divination companion”旧口径）、public/badges/（App Store SVG 与 Google Play PNG 各 en/zh）、public/brand/icons/ 11 档 PNG 与 mask-icon.svg、public/icon-*.png 与 maskable（design/brand/platform-assets.json 记哈希）
- 每页共同挂载：Header（四项导航 chart/academy/methodology/faq 加下载 CTA 与语言切换）、右下角浮动 ThemeSwitch、SkipToContent、SiteStructuredData（Organization + WebSite + SoftwareApplication/MobileApplication JSON-LD）；子页各加 BreadcrumbStructuredData（app/[locale]/layout.tsx；components/structured-data.tsx）

### 首页节

- 首页七节顺序写死在 app/[locale]/page.tsx，注释“加节先改 spec，不在这里悄悄插”；规约出处 specs/001-site-v3-concise/spec.md 七节表，spec 004 在其上改口径不改结构
- 1 Hero（components/hero.tsx）：min-h-dvh，three.js shader 背景（reduced motion 时换静态深墨渐变 ShaderFallback），左侧 CatOrb surface=hero 球径 96px（桌面向左挪 0.35 球径对齐标题）、H1 两行 `hero.headlineLines`（“慌的时候，”“先起一卦。”，行尾全角标点补 0.5em 左内边距）、StoreBadges；右侧 AppShot name=cast-result eager，桌面 absolute 由首屏下沿裁切
- 2 WhatItIs（components/what-it-is.tsx，id=what）：h2 品类锚“一款学习与研究中国民俗术数的 App：起卦、排盘、管命例，里面住着一只猫道长。”加三步 ol（凭直觉说两个数字 / 写下你要问的那件事 / 道长起一卦，末了给第一步），序号 aria-hidden
- 3 Remembers（components/remembers.tsx，无 id）：bg-muted，整节一句差异句“通用 AI 不记得你上回问过什么，道长记得，一卦接一卦陪你。”，节高压在一屏三分之一内
- 4 ChartShowcase（components/chart-showcase.tsx，id=chart）：h2“想看清楚，就排一张盘。”，lead 一句讲多命例管理（spec 004 新增，未提交），两格各一张 AppShot（ziwei-sanhe、bazi-pillars）加一句，末尾 ArrowRight 链接到 `/{locale}/methodology#paipan`
- 5 AcademyShowcase（components/academy-showcase.tsx，id=academy）：bg-muted，一句“山医命相卜五科 154 本古籍 2408 章随 App 装好。”，无图（spec 001 明写等学堂改版再补图）
- 6 Principles（components/principles.tsx，id=offline）：一句“排盘在你手机里算完，飞行模式也能排。”加三个圆角标签（本机排盘 / 离线也能排 / 两张命盘）
- 7a FAQ（components/faq.tsx，id=faq）：五条手风琴（这是真的算命吗 / 同样数字起卦每次结果一样吗 / 排盘要联网吗 / 道长怎么记得我问过什么 / 我的卦历和命例存在哪），Plus 图标旋转 45 度，下方 mailto voice@hachimi.ai；FaqStructuredData 只在首页输出
- 7b FinalCTA（components/final-cta.tsx，id=download，header 下载 CTA 的落点）：three.js 明暗两版 shader 背景，h2“把道长装进手机，卦、盘、命例都在一处。”加 StoreBadges
- 7c Footer（components/footer.tsx）：左 CatOrb surface=footer 96px 明暗跟站点、字标“HACHIMI AI”、定位语“中国民俗术数的学习与研究工具”；右两栏“产品”（命盘 / 学堂 / 起卦的门道 / 常见问题）与“联系”（支持与帮助 / 邮箱）；底行版权加四个法律链接（隐私政策 / 使用条款 / 账号与你的数据 / 删除数据）只出现一次；模板遗留的细线 rail 装饰（spec 004 落地记录）
- 历史对照：v1 模板首页 12 节（Hero/TrustedBy/FeatureCards/FeatureHighlight/Principles/Stats/Testimonials/Pricing/FAQ/Blog/FinalCTA/Footer，b1fc2e7）；2026-07-25 版 8 节（Hero/ScenarioCards/FeatureCards/FeatureHighlight/Principles/Stats/FAQ/FinalCTA，8264a30）；2026-09-14 v2 10 节（加 ChartShowcase 与 AcademyShowcase，edb3799）；同日 v3 收成现在七节（ab820b0）

### 质量门

- **npm run check（唯一门）**：串行跑 format:check → lint → typecheck → test:orb → check:mentions → check:copy → build，任一步非零即停；.githooks/pre-push 只在推 main 时跑它，无 GitHub Actions（2026-07-05 全 workspace 下线，2026-07-21 删残留 ci.yml），每台机器 `git config core.hooksPath .githooks` 一次（package.json scripts.check；.githooks/pre-push；README.md Quality gate）
- **format:check**：prettier --check 覆盖 ts/tsx/js/jsx/mjs/json/css/md；.prettierignore 排除 node_modules、.next、out、lock 文件，还列着两个已删除的 orb-model.json / orb-golden.json（陈旧条目）；.riv 与 png 本就不在扫描后缀内（package.json；.prettierignore）
- **lint**：eslint . 走 eslint-config-next core-web-vitals + typescript，附加 no-unused-vars（下划线前缀豁免）、no-explicit-any 报错、jsx-no-target-blank 强制；忽略 .next/out/build/next-env.d.ts（eslint.config.mjs）
- **typecheck**：tsc --noEmit，strict 全开加 noUncheckedIndexedAccess、exactOptionalPropertyTypes、noUnusedLocals/Parameters、noImplicitReturns；types 只显式列 node（tsconfig.json）
- **test:orb（scripts/orb-asset.test.mjs，node --test，pretest 先 sync wasm）**：五条断言：orb-source.json schema 2 且 .riv 与两张静帧 SHA-256 与清单同字节；清单 contractVersion 等于 lib/orb/contract.ts 的 CONTRACT_VERSION（13）且 artboard 为 Orb；package.json 的 @rive-app/webgl2 精确版本（正则禁 ^ 与 ~）等于已装版本且等于清单 runtime 字段；public/rive/rive.wasm 与 rive_fallback.wasm 与 node_modules 同字节，host.ts 的 WASM_URL 常量为 /rive/ 路径，host.ts 与 cat-orb.tsx 里不得出现 jsdelivr / unpkg / cdn.；ballGeometry 几何算例（scripts/orb-asset.test.mjs；specs/003-orb-on-rive/spec.md 验收 4 与 5）
- **check:mentions（对客文案门，scripts/check-copy-mentions.mjs）**：只扫五份文案真源 lib/i18n/zh.ts、en.ts、types.ts、lib/config.ts、lib/metadata.ts；逐行不分大小写拦禁词表（文墨、问真/問真、jizhen、对标/對標、对照成品/對照成品、电脑版/電腦版），词表逐字同步 hachimi-ios 的 scripts/no-reference-mentions.py，加词两仓一起改；同时拦表情符号（U+1F300 到 1FAFF、U+2600 到 27BF，图标改用 lucide）。组件与文档不扫（scripts/check-copy-mentions.mjs）
- **check:copy（首页字数门，scripts/count-copy.mjs）**：直接 import lib/i18n/{zh,en}.ts 真对象，键表写死：HERO_KEYS=[hero.headline]，BODY_KEYS 16 个（whatItIs.title、steps.0-2、remembers.text、chart.title/lead/ziwei/bazi/cta、academy.text、principles.text、tags.0-2、finalCta.headline）；限额 简体首屏 ≤ 9 字、全页除 FAQ（首屏计入）≤ 250 字、FAQ 五条答案各 ≤ 60 字；英文上限 = 简体上限 × 0.6 向上取整（全页 150 词、FAQ 各 36 词），英文首屏北极星 7 词只报数不设门。计数口径在 scripts/lib/count-units.mjs：汉字一字、连续拉丁一字、连续数字一字、标点不计；英文按空白切词。键表写死意味着新增节的键不会被计入，删键则脚本抛“取不到字符串”而红（scripts/count-copy.mjs；scripts/lib/count-units.mjs；specs/001-site-v3-concise/spec.md 验收 3；specs/004 验收 8）
- **build（prebuild 先 sync-rive-wasm）**：next build 静态导出到 out/，zh 与 en 都要有 index（spec 001 验收 6）；Cloudflare Pages 侧同样跑 npm run build，所以 prebuild 也在 CF 跑（package.json；scripts/sync-rive-wasm.mjs；deploy/cloudflare-pages.md）
- **门外的人工验收（不在 check 里）**：Playwright 实拍桌面 1440×900 与手机 390×844、浅深、中英共八张，看溢出与空白节（spec 001 验收 7）；受控浏览器验 data-orb-ready、指针跟随、无 CDN 请求、减弱动态回退（spec 003 plan 第 4 阶段）；部署后 curl 六个法律 URL 全 200（deploy runbook）；无 Lighthouse 或包体阈值门（specs/001 plan 第 6 节；specs/003 plan；deploy/cloudflare-pages.md 验证段）

### 该留的

- **i18n 机制：lib/i18n/index.ts（locales、getTranslations 回落 en、generateStaticParams）、app/[locale]/ 路由与 `<html lang>` 随 locale、lib/i18n/types.ts 的 Translations 类型契约、LangSwitch 按路径换 locale**：静态导出下唯一的双语路由方案，App 与商店元数据的外链都按 /zh、/en 前缀写死；只需改 types 里的首页键，机制本身零改
- **法律与支持四页及其渲染器：components/privacy-policy.tsx、legal-sections.tsx、legal-page.tsx，lib/i18n 里 privacy / terms / support / accountDeletion / dataDeletion 全文**：iOS AppConfig.swift 写死 https://hachimi.ai/{zh|en}/privacy、/terms、/support；fastlane 元数据 support_url 指 /zh/support 与 /en/support，审核备注引用 /en/privacy；隐私文案以 hachimi-ios docs/legal 为真源，改一字要两仓同步（App/Platform/AppConfig.swift:36-48；fastlane/metadata/*/support_url.txt；deploy/cloudflare-pages.md 关键红线）
- **边缘重定向 public/\_redirects：`/ → /en`、`/get` → App Store、六条裸路径 → /en/...**：/get 已印在分享卡二维码上（iOS AppConfig.appLinkURL），改指向只动这一行；apex 302 是解决静态导出下 redirect() 出错壳的正解（app/page.tsx 注释）
- **站点身份与 SEO 骨架：lib/config.ts（siteConfig、pageDates、商店链接与 appStoreId）、lib/metadata.ts（baseMetadata 与 localizedPageMetadata 的 canonical / hreflang / x-default / og:locale / itunes Smart App Banner）、app/opengraph-image.tsx 与 twitter-image.tsx 构建期生成卡片、app/sitemap.ts 手维护日期、components/structured-data.tsx 三类 JSON-LD、public/robots.txt、site.webmanifest、图标全套与 design/brand/platform-assets.json 哈希清单**：都是从单一真源派生、静态导出兼容的成熟做法；改版只换 description / keywords / 首页 title 的取值与 OG 卡视觉，结构不动。注意 pageDates.privacy（2026-07-21）与 zh 隐私页可见日期（2026-09-17）已不同步，改版顺手对齐
- **Rive 圆球宿主整套：lib/orb/contract.ts（契约 13 名字表与 ballGeometry）、lib/orb/placement.ts（hero / footer 在场地图）、lib/orb/host.ts（按需 import 运行时、自托管 wasm、track/release/hits/poke）、components/cat-orb.tsx（视口挂载、后台停帧、明暗跟站点、静帧回退）、scripts/sync-rive-wasm.mjs、scripts/orb-asset.test.mjs、public/brand/hachimi-orb.riv + orb-still-{light,dark}.png + orb-source.json**：2026-09-22 刚落地的三端同源（spec 003），与 iOS 包同一份签名文件、同一套尺寸比例；spec 003 把 host.ts 与 cat-orb.tsx 定义为可替换件，placement 与 contract 不变。新版面要放球的地方，只需在 placement.ts 加一处 surface 与 seed
- **截图管线：scripts/build-shots.mjs（从 ../hachimi-ios/build/device-walk 取图、1206×2622 统一比例、裁切补纸色、出 603/1206 两档 WebP 与深色版）与 components/app-shot.tsx 的 SHOTS 表（widths / dark 按张记，srcSet 与 sizes、首屏 eager）**：截图的取图口径、命例署名（李小龙，spec 001）、浅深两版与宽度档位都由它保证；换新截图只改 SHOTS 表与 build-shots 的映射，页面调用点不动。v2 曾有 11 张（ziwei-sanhe/sihua/feixing/fortune/geju/glossary、bazi-pillars/sixpillars、academy-home/book/reading，edb3799 components/showcase.tsx），2e367f6 删到三张，iOS 侧走查源仍能重出
- **官方商店徽章组件 components/store-badges.tsx 加 layout 内联平台脚本与 globals.css 的 html[data-platform] 收敛规则**：Apple / Google 徽章规范（并排黑色版、App Store 在前、等高、留白）与首帧单徽章防 CLS 是踩过坑的结果（store-badges.tsx 注释；d17bccb slogan 漂移根治）
- **globals.css 里的三段基础设施：`--font-sans` 直接点名 GeistSans 加系统 CJK 栈（修过 iOS 豆腐块，379e4c2）、系统深色首帧 CSS 回退、`html.no-js [data-animate]` 无 JS 救援、跨文档 View Transitions、`:lang(zh) .italic` 回正**：都是与视觉无关的正确性修补，新设计换 token 值即可，规则保留
- **门与脚本：format / lint / typecheck / test:orb / check:mentions 五道，以及 scripts/lib/count-units.mjs 的计数器、scripts/polish-copy.mjs 润色管线**：mentions 词表与 iOS 同源不能单边撤；count-units 的口径可复用，count-copy 的键表与限额另议（见 disposable）；polish-copy 是 owner 硬要求“对客每一句由 DeepSeek 写定”的落地（脚本头注释；specs/001 plan 第 1 节）
- **docs/copy-principles.md（文案唯一真源）、docs/research/2026-09-14-landing-page-practice.md（十六站调研）、docs/2026-07-21-first-glance-handoff.md 的“陌生人首屏六问”表**：定位内核、称谓规范、术语三语表、能说不能说清单、去 AI 味红线都在 copy-principles；调研给出首屏 10 到 20 词、5 到 7 节、1 到 4 张图、单 CTA、硬术语退二级页、FAQ 第一条直答“是不是算命”这些判据；六问表是可直接拿来验收新首屏的标尺
- **部署 runbook deploy/cloudflare-pages.md 与 README 的项目结构段**：Git 自动部署、wrangler 直传兜底、部署后验证顺序（预览域先行、apex 约 1 分钟传播）、回滚走 Dash 都是实测记录
- **历史里值得回看的三样：8264a30 hero 的品类锚胶囊、琥珀左边线的差异句、桌面端截图贴框线底边裁切与移动端 mask-image 渐隐，以及首屏装饰细线框；8264a30 components/scenario-cards.tsx 用大字“問 卦 讀”与线稿 SVG 做卡片装饰的“墨与金”视觉语言；edb3799 lib/i18n/zh.ts chart.blocks 与 docs/copy/2026-09-14-v2/facts.zh.json 里的具体机制事实（三种盘式、84 条格局规则、安星十组六十余项、中州派三盘、紫占、四柱反查、六柱表、大运流年流月、神煞、断事笔记、文本命盘）加 docs/plan/2026-09-14-site-v2-ziwei-brief.md 里“命例管理、分组、导入导出与备份”一句**：新定位把多命例管理与每份命例名下的卦追得回去当核心长处（spec 004），v2 事实稿正是面向命理爱好者与职业命理师的功能事实，可以直接当新版事实稿的底料；视觉上 7 月版的“墨与金、细线框、大字装饰”比现在的纯文字节更有辨识度

### 可以扔的

- **首页七节组件及其文案键：components/hero.tsx、what-it-is.tsx、remembers.tsx、chart-showcase.tsx、academy-showcase.tsx、principles.tsx、faq.tsx、final-cta.tsx，以及 lib/i18n/types.ts 里 hero / whatItIs / remembers / chart / academy / principles / faq / finalCta 八组键与 zh/en 对应文案**：都是 spec 001 的“一句话首屏与七节”产物，节结构与字数预算是那一轮 owner 口径下的取舍；定位已变（spec 004 只是口径微调，没重排结构），新版按新定位重写节表即可，无人依赖这些键（count-copy 的键表随之改）
- **components/hero-shader.tsx 与 final-cta-shader.tsx（three.js simplex 光束 shader）及 three 依赖**：React Bits Finance 模板遗留（b1fc2e7 hero.tsx 同一段 GLSL），与品牌无关；three 是 out/_next/static 里最大的 chunk 来源（最大 chunk 526 KB）。参考仓 shader 模板用 ogl 做同类效果更轻，或直接不用 WebGL 背景
- **components/header.tsx（mix-blend-exclusion 固定头、HACHIMI AI 字标、四项导航）、components/footer.tsx 的细线 rail 装饰、components/theme-switch.tsx 右下浮动按钮**：同为模板视觉遗留；导航项随节表重定；字标“HACHIMI AI”与 copy-principles 第四节的全称“哈基米道长 / Master Hachimi”并不一致，可趁改版统一
- **count-copy 的限额（9 / 250 / 60 字，0.6 倍）与写死的 BODY_KEYS 键表、EN_UNGATED 例外**：限额出自 spec 001 验收 3 与 docs/plan/2026-09-14-site-v3-思路.md 的预算表，是上一版结构的参数；新版可以改限额、改键表，甚至改成按节声明。计数器 count-units.mjs 与“数可见正文不数 alt / 导航 / 版权”的口径值得留
- **components/smooth-scroll.tsx（Lenis）与 `features.smoothScroll` 开关、lib/motion-tokens.ts 的 reveal / mountRise 预设**：模板动效预设，与新设计的动效语言未必一致；Device 组件还单独依赖 lenis/react，换掉 Device 时一并清
- **components/react-bits/device.tsx（@reactbits-starter/device-tw 本地改造版）**：spec 002 追加条“所有 iPhone 展示用 Device”是 owner 2026-09-15 指定，但 spec 002 已被 003 取代且状态标记为“图标与 Device 两节仍有效”；它是可以按新设计换成任何 Pro 组件的展示壳，AppShot 的 srcSet / 深浅 / eager 逻辑在 Screen 里，与壳解耦
- **对外文本的旧口径：public/llms.txt 与 llms-full.txt（“Last updated 2026-09-14”，仍按四格 tab 叙事）、public/site.webmanifest 的 description（“cat-themed Mei Hua Yi Shu divination companion”）、README.md 顶部描述与 Sections 段、lib/config.ts 的 keywords 列表**：spec 001 验收 8 要求 llms 与首页口径一致，改版必重写；manifest 与 README 描述早于 spec 004 定位，已失真
- **docs/copy/2026-09-14-v2 与 v3 的 polished 稿、docs/plan/2026-09-14-site-v2-ziwei-brief.md、docs/plan/2026-09-14-site-v3-思路.md、specs/001 到 004 的“待实现 / 已落地”状态**：都是过程记录，按仓内约定进历史不当约束（specs/README 表里 001 仍标“待实现”，实际已落地，本身就陈旧）；新版另起 spec 005，旧 spec 标“被取代”即可
- **工作树里未提交的 spec 004 改动：README.md、components/chart-showcase.tsx、final-cta.tsx、footer.tsx、hero.tsx、lib/config.ts、lib/i18n/{en,types,zh}.ts、scripts/count-copy.mjs、specs/003 plan、specs/README.md 与未跟踪的 specs/004-positioning-and-footer/**：改版前要先决定：把这批口径改动 commit 掉作为起点，还是连同旧节一起被新版覆盖。它们改的是文案与页脚，不是基础设施，覆盖无损；但 lib/config.ts 的 description 新口径与 spec 004 的定位文字值得先落库留证
- **.prettierignore 里两条已删文件（orb-model.json、orb-golden.json）、public/icon-192/512 与 brand/icons 的重复副本、components/privacy-policy.tsx 与 legal-sections.tsx 几乎同构的两份渲染器**：小型陈旧与重复，改版顺手清

### 硬约束

- 静态导出、无服务端：`output: "export"`，不能用 middleware、redirect()、route handlers、headers() 与 rewrites；重定向与响应头只能走 Cloudflare Pages 的 public/_redirects（已有）与 `_headers`（尚无）。参考仓模板的 next.config 普遍带 `headers()`（如 shader/next.config.ts），直接搬会在静态导出下失效（next.config.ts；app/page.tsx 注释；deploy/cloudflare-pages.md）
- 部署只有 Cloudflare Pages：项目 hachimi-app-website，Git 集成 push main 自动 `npm run build` 输出 out/，Node 由 .node-version=24 锁定；兜底是 `npx wrangler pages deploy out --project-name hachimi-app-website --branch main`，token 是 hachimi-ios/.env 的 HACHIMI_CLOUDFLARE_API_TOKEN（与后端 Workers 同一把，不入库）；回滚走 Dash（deploy/cloudflare-pages.md）
- 图片不走优化器：`images.unoptimized: true`，next/image 等于普通 img；截图靠 build-shots 预出多档 WebP 自己写 srcSet（next.config.ts；components/app-shot.tsx）
- Rive 运行时必须自托管：wasm 从 /rive/ 取、不得指向 jsdelivr / unpkg / cdn.（spec 003 验收 4，test:orb 断言）；`@rive-app/webgl2` 必须精确钉版本且与 orb-source.json 的 runtime 字段一致；.riv 与静帧 SHA 必须与 hachimi-orb 仓 current-release.json 一致（当前 v0.16.0，契约 13，与 iOS 包同字节）；升级运行时或换代形象要同时改清单，否则门红（scripts/orb-asset.test.mjs；design/brand/README.md 换代步骤）
- 对外 URL 契约不能动：iOS App 写死 https://hachimi.ai/{zh|en}/privacy、/terms、/support（AppConfig.swift:36-48）与 /get（appLinkURL，二维码已印出）；App Store 元数据 marketing_url 为 /en 与 /zh、support_url 为 /zh/support 与 /en/support、审核备注引用 /en/privacy（fastlane/metadata）；locale 只有 zh 与 en，繁体界面走 zh 页，官网无繁体是设计不是缺失（copy-principles 第九节）
- 法律文案与现实一致（App Store 5.1.1）：隐私政策以 hachimi-ios docs/legal/privacy-policy.{zh-Hans,en}.md 与 iOS spec 003 为真源，首次在线问事具名 DeepSeek 并征得许可的口径不能倒退（deploy/cloudflare-pages.md 关键红线）
- 对客文案红线：不预测、不改命、不转运、仅供娱乐，排盘只讲可复算与本机算；不出现参考来源与竞争对手名字（mentions 门，词表与 iOS 同源）；图标不用表情符号；标点用弯引号、不用破折号与直角引号；英文只留 hexagram 一个术语、阅读水平 FK ≤ 8；场景名禁 Free Question（App Store 2.3.7 拒审实证）；称谓全称“哈基米道长 / Master Hachimi”（docs/copy-principles.md 第一、四、五、六节）
- 字体与网络：CJK 不加载任何 web font，只用系统字体栈；Geist 自托管；不引第三方 analytics SDK；不出现 CDN 脚本（app/globals.css 注释；public/llms.txt Privacy 段；spec 003）
- React Bits Pro 组件走 shadcn registry 安装，许可证只在 REACTBITS_LICENSE_KEY 环境变量或 .env.local，永不入库；生产构建消费已安装源码不需要许可证（components.json；design/brand/README.md）
- 质量门只在本地 pre-push，无 CI；`npm run check` 全绿才能推 main，推 main 即上线（.githooks/pre-push；README）
- 文案产出流程：对客每一句由 DeepSeek 润色写定、人不直接写页面文案，北极星句 verbatim 透传（scripts/polish-copy.mjs 头注释；specs/001 spec 文案段）；这是 owner 的流程要求，不是技术限制
- 产品层既有决定（可由 owner 改，改版前要过一遍）：首屏口号“慌的时候，先起一卦。”是北极星（spec 004 不做第 1 条；copy-principles 第二节）；无真实评分与下载量前不摆社会证明、不写准确率承诺（spec 001 不做；调研结论 6）；学堂不加戏（spec 004 不做第 2 条）；App 图标暂不随形象换代（spec 003 不做）
- 工作树非干净：git status 有 12 个已修改文件与未跟踪的 specs/004，均为 spec 004 落地内容，尚未 commit（git status 快照）

### 性能做法

- 没有数值化性能门：check 里无 Lighthouse、包体或 LCP 阈值；现有的是一组做法与一次 LCP 修复战役（400bcfe 2026-07-03）留下的约束
- LCP 元素是 H1，不做挂载后淡入，服务端首帧（含禁 JS）即可见；首屏截图 eager + fetchPriority=high，其余 lazy；深色版另一张 img 靠 dark: 显隐，只有首屏那张会在深色下白取一次浅色版（components/hero.tsx 注释；components/app-shot.tsx 注释）
- three.js 两处 shader 都 next/dynamic ssr:false，不进首屏 bundle；hero 分包加载期间用同色静态渐变 ShaderFallback 顶住防闪白；rAF 循环由 IntersectionObserver 门控离屏即停；devicePixelRatio 封顶 2（components/hero.tsx；hero-shader.tsx；final-cta-shader.tsx）
- Rive 运行时 452 KB JS 加 2.2 MB wasm 都不进首屏 bundle，球进视口（rootMargin 20%）才 import，首屏那颗在 LCP 之后才开始下载；.riv 138 KB 地址带 ?v=0.16.0 做缓存键；离开视口与页面转后台停帧并放掉指针；减弱动态或运行时失败显示同源静帧（specs/003 plan 风险段；lib/orb/host.ts；components/cat-orb.tsx）
- CLS 防护：商店双徽章由 <body> 首位内联脚本在首帧前按平台收敛成单枚；截图写死 1206×2622 宽高占位；系统深色首帧用 CSS 镜像避免闪浅色（app/[locale]/layout.tsx；app/globals.css）
- 字体零网络：Geist woff2 随包、CJK 系统字体；无 web font 是 CN-CDN 生存规则（app/globals.css）
- 当前产物体量（2026-09-22 本地 build）：out/ 共 16 MB，其中 out/rive 两份 wasm 4.4 MB、_next/static 2.3 MB，最大 JS chunk 526 KB，次之 227 KB 与 194 KB；截图每张 43 到 227 KB WebP；徽章 9 到 16 KB（du / ls 结果）
- SEO 保鲜做法：sitemap lastModified 与 JSON-LD dateModified 读手维护的 pageDates，不用构建时间，避免每次部署都被当成全站更新（app/sitemap.ts 注释；lib/config.ts）
- 改版可考虑的减重方向（事实依据）：three 只为两块背景服务，参考仓 shader 模板用 ogl 做同类光束效果，agentframe 模板无 WebGL 依赖；Device 组件带进 lenis/react 与 motion spring，仅为三张截图的悬停位移 6px 旋转 2 度（design/brand/README.md）
