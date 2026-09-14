# 官网首页写法调研：消费级App与命理占星App对照

调研目的：为哈基米道长官网第三版重写提供依据。owner口径：首屏只留一句“慌的时候先起一卦”，八字与紫微往下放，官网不等于每个功能配截图加介绍，取舍是业务问题。本调研只提供事实依据，不替业务拍板。

调研范围：A组消费级App官网8个，B组命理与占星App官网8个，均以2024年到2026年现行页面为准。访问日期统一为2026-09-14，工具为Parallel Search的`web_search`与`web_fetch`。

## 一、结论先行

1. 首屏字数上限：英文站点克制派（Notion、Arc、Headspace）首屏正文普遍10到20个单词，中文命理App克制派（测测）首屏不到10个字，即便信息量最大的灵机妙算也没超过30字。哈基米道长当前首屏的eyebrow加两行标题加description加memory加CTA合计约140字，应压到一句口号加至多一句补充，其余全砍。
2. 全页节数上限：克制型站点（Notion、Arc、Duolingo、Bear、The Pattern）全页维持在5到7节。节数冲到10节以上的站点（Sanctuary、Nebula）都是按分钟计费的问卜市场型网站，靠SEO长文承接搜索流量，不是哈基米道长现在的品牌调性该学的对象。哈基米道长现在首页有10节加一个大页脚，应砍到6到7节。
3. 截图预算：克制型站点全页1到4张产品截图，Arc是“一个功能块配一张截图”的1比1节奏，Notion、Duolingo、Headspace、Bear大多用插画或短视频代替截图。命理App官网本身也普遍不在首页堆砌截图，灵机妙算和准了的官网首页几乎没有产品截图，截图证据反而在App Store页面里。哈基米道长现在的命盘展示与学堂展示两节合计已经预置5张以上截图，应收紧到3到4张，优先给“这是什么”的一张整体图，而不是逐个子功能配图。
4. CTA数量：克制型站点固定1到2个CTA反复出现，通常是下载或免费开始。只有Sanctuary和Nebula这类按分钟计费的问卜市场型网站会把CTA做成每位顾问一个，页面上同时出现十几个转化按钮，这是转化优先而非品牌优先的做法。哈基米道长应维持1个主CTA反复出现，不学市场型站点。
5. 专业术语要不要上首页：这是B组里分化最大的一条。The Pattern、测测、Nebula都刻意在首页回避“占星”“星座”“八字”这类硬词，走“认知自我”“自我发现”的软化包装，官网术语密度明显低于自家App Store listing的标题。灵机妙算、准了、Sanctuary则完全不避讳，直接把“紫微斗数”“八字”“求签问事”摆进首屏或第一段。哈基米道长现在的品牌调性更接近The Pattern和测测这一派，紫微斗数、八字、大限流年、神煞等硬术语不该上首页，应收进命盘与学堂的二级页。
6. 社会证明有没有：A、B两组几乎所有站点都有某种社会证明，评分、下载量、媒体logo、用户证言至少占一样，只有Duolingo敢完全不放，因为它已是国民级品牌。哈基米道长现在首页完全没有这一块，App Store下载徽章不算社会证明。这是一个明显缺口，建议等有真实评分或下载量数据后，参照Notion或Bear“一行文字或几枚徽章”的极简做法补上，不要在没有真实数据前编造。
7. FAQ放不放：A、B两组里把FAQ直接摆在首页的站点不算多，Headspace和Calm是少数把FAQ整块搬上首页的例子，其余都是链接到二级页。哈基米道长现在的FAQ第一条就是“这是真的算命吗”，直接接住B组普遍要回避的信任疑虑，这个做法应该保留，控制在5到6条即可，不用像Calm那样铺成一个小型帮助中心。
8. 功能矩阵露多少：消费级克制站点（Notion、Arc、Bear、Things）首页都不逐项穷举功能，用3到6个关键词或场景卡片带过，深度机制说明全部放二级页。哈基米道长现在紫微斗数三种盘式、84条格局规则、安星设置十组六十余项这类深度机制说明都摆在首页，应该整体搬到命盘二级页，首页只留“同一份生辰排两张盘”这一句概括。
9. 页脚放什么：A组页脚普遍是下载徽章加多栏导航加语言切换加法律链接加社交媒体，Headspace的页脚多达5栏。B组命理App页脚普遍简单，多为经营许可备案信息加社交链接。哈基米道长的Stats节里那组数字，154本古籍、2408章正文这类，可以压缩成页脚上方一行小字，不必单独占一屏。
10. 信息架构参照系：哈基米道长现在10节加长首屏的结构，比A组任何一个克制型站点都重，又没有B组Sanctuary和Nebula那种转化型长页配套的社会证明密度和CTA密度，处在两头不靠的位置。往A组克制路线收，6到7节、一句首屏、3到4张截图、术语退到二级页，是与现有“先起一卦”品牌口径最一致的方向。

## 二、A组：消费级App官网

节数统计口径：首屏单独算一节，每个独立的内容板块算一节，页脚不计入节数单独列出。

| 站名 | 首屏字数 | 首屏主标题原文 | 节数 | 截图张数 | CTA数与文案 | 社会证明 | FAQ | 页脚 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Notion | 约19词 | “Where teams and agents Think together.” 加副标题“Capture context, find answers, and automate tasks with AI built for your team.” | 5 | 0，用一段产品演示短片代替 | 2个，“Get Notion free”“Request a demo” | 有，hero正下方一行“Trusted by 98% of the Forbes Cloud 100”，另有Cursor、Faire、Ramp三位高管具名具职位的引用 | 无 | 未见于抓取范围，官网另有独立的模板与社区站 | 首页现在整体转向企业AI定位，功能细节全部靠“See what Notion can do”五个场景链接分流到二级页，首屏没有一处逐条功能说明 |
| Things | 约24词 | “Things is the award-winning personal task manager that helps you plan your day, manage your projects, and make real progress toward your goals.” | 6 | 1张，Mac、iPhone、iPad、Apple Watch四端合成图 | 5处入口，“Watch Introduction Video”加4个分平台下载按钮 | 有，11条以上具名媒体锐评，含Apple Design Award、Wirecutter、WIRED、MacStories等，不放用户数或评分 | 无，链接到独立support站 | 简单，订阅newsletter加隐私政策链接 | 押注编辑背书而非用户数的社会证明策略，首屏文案不含任何数字，功能矩阵全部让位给“See features”二级页 |
| Bear | 约20词 | “Write naturally” 加副标题“Bear is a beautiful, powerfully simple Markdown note taking app to capture, write, and organize your life.” | 5 | 抓取文本中未见明确截图alt文案，视觉以大幅产品图为主 | 2处，App Store与iPhone、iPad下载徽章组 | 有，hero里直接放3枚奖项徽章（Editor's Choice 2020、Design Award 2017、App of the year 2016），另有The Verge引用与3条商店短评 | 无，链接到独立/faq页 | 简单，社交账号链接 | 三枚奖项徽章直接摆进首屏，把媒体背书压缩成视觉勋章而不是大段引用文字 |
| Flighty | 约45词，含副标题 | “Get the truth when you travel” 加副标题“The only app that tells you everything about your flight...” | 约4，按“起飞前、机场、落地后”三段旅程时间线组织 | 抓取文本未见明确截图alt文案 | 1个，“Download”，常驻导航栏 | 有，5条短媒体锐评紧贴hero下方 | 无，链接到独立Help Center | 简单，Pricing、Gift Cards、Passport、Airports、Help Center、About、Press、Businesses等导航链接 | 用“按旅程阶段分三段”代替传统功能九宫格，把复杂功能收进一条时间线叙事 |
| Headspace | 约12词 | “Stress less” 加“all with Headspace” 加“Mental health app with expert-led meditations and tools” | 7节加大页脚 | 抓取文本未见明确产品截图，视觉以插画为主 | 2个，“Try for $0”“Check your coverage”，分别对应订阅与保险覆盖的心理咨询两条转化路径 | 有，“Over 4,000 leading organizations choose Headspace” | 有，7条问题，直接摆在首页 | 5栏，含产品、内容、关于我们、支持、我的Headspace，另有语言切换与社交图标 | 首屏用一排6个情绪标签代替传统功能列表，FAQ直接放首页而非二级页，页脚信息量极大 |
| Arc | 约10词 | “Arc is the Chrome replacement I've been waiting for.”，直接用一句评测者原话当H1，配The Verge评测链接 | 5 | 3张，每个功能块配一张对应截图 | 2个，“Download Arc for Windows”“Download Arc for Mac”，重复出现3处 | 有，评测链接加3条未标注粉丝数的推特引用 | 无 | 简单，导航链接到Max、Mobile、Developers、Students、Blog | 用真实评测者的一句话原样当作H1，是本组里社会证明前置到极致的唯一样本。官网当前正处产品迁移期，力推继任产品Dia，不是稳定态最佳实践基准 |
| Duolingo | 约7词到39词不等，视版本而定 | “The world's most popular way to learn” | 5 | 未见产品截图，视觉以吉祥物插画为主 | 2个，“Get started”“I already have an account” | 无，全组唯一不放任何量化社会证明的站点，只有一句不带引用的“research shows that it works” | 无 | 未见于抓取范围 | 完全不摆数字化社会证明，靠品牌本身的知名度和吉祥物形象撑首屏，只适合已经家喻户晓的品牌，不建议哈基米道长现阶段照搬 |
| Calm | 约14词 | “Calm your mind. Change your life.” 加“The #1 app for sleep, meditation and relaxation” | 至少3节，抓取范围有限 | 抓取文本未见明确截图alt文案 | 主CTA为“Try Calm for Free” | 有，标题级社会证明“Over 2 million 5-star reviews”，另有具名带地名的用户评语 | 有，分General、Stress & Anxiety、Sleep等类目，条目详尽，接近一个小型帮助中心 | 未见于抓取范围 | 把“Over 2 million 5-star reviews”做成大标题级别的社会证明，比多数App更敢把数字放大，FAQ内容详尽到承担了产品说明书的功能 |

## 三、B组：命理与占星App官网

| 站名 | 首屏字数 | 首屏主标题原文 | 节数 | 截图张数 | CTA数与文案 | 社会证明 | FAQ | 页脚 | 怎么说自己是算命 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Co-Star | 约16词 | “Co–Star. The astrology app that deciphers the mystery of human relations through NASA data and biting truth.” | 6以上 | 0，官网通篇以大号排版取代产品截图 | 3类以上，“DOWNLOAD iOS”“DOWNLOAD ANDROID”“LEARN MORE”，重复出现约4处 | 极重，12家以上媒体logo与锐评轮播，含Financial Times、Vogue、New York Times，还有音乐人Phoebe Bridgers的具名引用 | 无，链接到独立/faq页 | 简单，Natal chart、Learn Astrology、Shop三个链接加双平台下载 | 只用“astrology app”一词，通篇避开“算命”“占卜”“预测”，强调“NASA data”的科学感与“biting truth”的个性化吐槽，“horoscope”一词只出现在网页title标签里，不出现在可见文案中 | 占星与心理学包装做得最彻底的样本，几乎不用任何产品截图，靠文字与媒体背书撑起整页 |
| The Pattern | 约28词，紧贴一条用户评价 | “Understand Yourself on a Deeper Level” 加“The Pattern is a personalized astrology app that helps you understand the patterns shaping your life and influencing your relationships.” | 7 | 4到5张，功能截图分布在各段 | 2个，App Store与Google Play图标，重复出现约4处 | 有，5条商店评价与会员引用，另有“4.2★ on the App Store · Used by millions worldwide” | 无，链接到独立Zendesk站 | 简单，条款、隐私、联系与支持、FAQ、安全与心理健康、社交图标 | 明确写“personalized astrology app”，但标题主打“Understand Yourself／Your Connections on a Deeper Level”，通篇不用“horoscope”“prediction”，唯一的硬术语落点是CTA文案“Get your free natal chart” | 官网的术语密度明显低于产品定位，读起来更像一个自我成长App，是首页去术语化的典型样本 |
| Sanctuary | 约20词，另有顶部促销条 | “Expert Psychic Readings Online — Get Clarity in 5 Minutes” 加“Transform Your Life with Trusted Guidance from Top Psychic Readers” | 10以上 | 0，视觉以真人顾问头像为主，无产品界面截图 | 极多，每位顾问一个“Connect”按钮，页面同时展示9位顾问，另有礼品卡与App下载入口 | 重，7家媒体logo，含Vanity Fair、New York Times、Forbes，每位顾问带独立星级与评价数，另有7条具名用户证言与“Join over 7 million people who love our horoscopes” | 链接在页脚，未展开在首页 | 简单，隐私、条款、快捷链接、社交图标、App下载 | 标题直接是“Expert Psychic Readings”，通篇不避讳“psychic”“astrology”“tarot”字眼，是本组术语最直白的按分钟计费站点之一 | 本质是一个问卜市场型网站，CTA密度和社会证明密度都远超品牌型App，不适合照搬结构，但“As Seen In”一行媒体logo的摆法可以借鉴 |
| Nebula | 约28词 | “With each psychic reading, get closer to grounded wisdom” 加“Nebula is a spiritual guidance space offering personalized tools to support self-discovery and spiritual well-being.” | 11以上，SEO长文风格 | 8到10张，每个话题配一张App内截图 | 极多，每位顾问一个“Start chat”按钮，另有多处“Get Started” | 重，“900+ psychics”“24/7 availability”“4.3⭐ 17k+ reviews on Trustpilot”“50 countries”，每位顾问也带独立评分 | 本页未见，未展开 | 未见于抓取范围 | hero刻意避开“astrology”一词，主打“psychic reading”“spiritual guidance”“self-discovery”的软化包装，但同一产品在App Store的名字是“Nebula: Horoscope & Astrology”，官网品牌语言比商店listing更软 | 全页接近一篇长篇SEO软文，中间穿插大量转化点，节数和CTA密度是本次调研两组里最高的站点 |
| 灵机妙算 | 约20字，含“准确率高达90%”的量化承诺 | “灵机妙算 全新设计V8.0，全球首款全面的精准预测应用，准确率高达90%” | 约6 | 未见明确产品截图，视觉以分类图标与代言人图为主 | 2处，文案统一为“根据手机，免费下载” | 有，台湾、香港、新加坡、马来西亚地域信任背书，另提及明星代言 | 无 | 简单，公司版权与备案信息 | 本组术语最硬最直白的样本，标题即“算命、占卜、星座、运势、测算、八字”，功能矩阵直接列“传统命相”“求签问事”“起名育儿”等词，并给出“准确率高达90%”这类量化承诺 | 官网整体走下沉市场直给转化路线，量化准确率承诺是本次调研独有的社会证明形式 |
| 测测 | 约10字 | “遇见更好的自己” | 约2，官网本质是企业公关页而非营销页 | 0 | 未见明确下载按钮文案 | 弱，只有“36氪WISE2022新经济之王”一类企业获奖新闻，不是用户社会证明 | 无 | 简单，意见反馈邮箱、备案信息 | 官网首页完全不提“星座”“八字”字样，只讲“认知自我”“心理陪伴”，与其App Store listing标题“测测，星座，八字，AI问答”形成鲜明反差 | 应用商店蹭星座八字流量词，官网品牌定位却完全去术语化，是本次调研里商店与官网口径反差最大的样本 |
| 准了 | App Store描述首段约45字，官网本身无可抓取文字 | “准了——莫小奇打造的星座神器，融合占星学、心理学与天文学智慧，帮你实现自我认知、疗愈与天赋开发的app” | App Store描述分5个编号功能段 | 官网无截图，App Store商店页通常另有多张截图，未纳入本次统计 | 商店内固定“获取”按钮 | 有，App Store评分4.6到4.7，评分数在数万到九万级 | 无 | 官网goddessxzns.com本身是纯图片二维码下载页，无文字页脚 | 术语密度本次调研最高的样本之一，App Store描述首段就摆出“星盘、八字、紫微斗数、二十八星宿”四个硬术语工具名，品牌名“准了”本身就是算命应验的双关 | 官网goddessxzns.com已经退化成纯下载二维码页，真正的营销文案全部沉淀在App Store listing里，这提示品牌自有域名并非这类App的主战场 |
| iztro | 约20字 | “这，不仅仅是文档，轻量级紫微斗数排盘工具库iztro的文档以及紫微斗数相关知识科普” | 4 | 0 | 1个，“点击开启”导向AI解盘产品，另有顶部导航到排盘与解盘子站 | GitHub仓库4153星标加673 fork，但展示在GitHub页面，不在docs首页本身 | 无 | 简单，友情链接 | 对照组，面向开发者与同好，标题直接就是“紫微斗数排盘”，专业术语原生态使用，不做任何软化包装 | 当目标受众是懂行的人而非大众消费者时，术语可以毫无保留地放在最前面，这提示二级页面向进阶用户时可以更直白，首页面向大众时不能这样处理 |

## 四、对哈基米道长的信息架构建议

以下草案依据第一节十条结论与A、B两组的具体做法，给出逐节字数预算与截图预算。仓库现状对照：当前`app/[locale]/page.tsx`装配了Hero、FeatureCards、ChartShowcase、AcademyShowcase、ScenarioCards、FeatureHighlight、Principles、Stats、FAQ、FinalCTA共10节加Footer，`lib/i18n/zh.ts`里hero的eyebrow加headline1加headline2加description加memory加cta合计约140字，ChartShowcase三个板块每块还各带一段body加2到4条bullet的深度机制说明。这是owner所说“字太多”的主要来源。

草案共7节，比现状少3节：

1. 首屏。字数预算：一句口号，20字以内，例如现有的“慌的时候先起一卦”。截图预算：0到1张，可以保留当前的紫微三合盘作为背景视觉，但不需要配文字说明。CTA：1个，直接指向下载或往下滚动，不需要eyebrow和memory这类补充句。参照Notion、Arc、Headspace的极简hero做法，也参照Nebula和The Pattern在B组里同样把首屏压到一句话的做法。当前的description一句、memory一句、eyebrow一句全部砍掉或下移到二级页。
2. 社会证明条，可选节。字数预算：15字以内一行文字，或3枚以内的徽章。参照Notion“Trusted by 98% of the Forbes Cloud 100”与Bear把奖项做成徽章的做法。这一节现在完全空缺，建议等有真实App Store评分或下载量数据后再补，不要在没有数据前虚构评分或用户数。
3. 场景入口，对应当前FeatureCards加ScenarioCards合并。字数预算：4到6个关键词或场景短语，每项15字以内，不需要完整句子。参照Headspace用6个情绪标签代替功能列表、Duolingo用一句话加按钮的做法。截图预算：0到1张，可选一张四宫格界面图代表“这是什么”。
4. 命盘与学堂概览。字数预算：每项一句话，20字以内，合计不超过80字。截图预算：1到2张代表性截图，不需要逐个盘式配图。紫微斗数三种盘式、84条格局分析规则、安星设置十组六十余项、中州派天盘地盘人盘这类深度机制说明，以及学堂154本古籍2408章正文这类细节，全部移到命盘详情页与学堂二级页展开，首页只留“同一份生辰排两张盘”一类概括句。这一条直接对应结论5和结论8，参照The Pattern与测测把专业术语退到二级页的做法。
5. 隐私与本地化，对应当前Principles。字数预算：一句口号加3个关键词标签，30字以内。不需要现有description那样的长段说明。
6. 常见问题，对应当前FAQ。保留，控制在5到6条，第一条继续保留“这是真的算命吗”这类直接回应信任疑虑的问题。这一条对应结论7，Headspace与Calm是A组里少数把FAQ整块放首页的站点，哈基米道长现有做法已经踩对，不用改。
7. 最终CTA与页脚。当前Stats节的8个数字统计，154本古籍、2408章正文可读、287条词条、84条格局规则等，压缩成页脚上方一行小字，不单独占一屏。页脚参照A组通行做法，保留下载徽章、语言切换、法律链接、社交媒体入口，不需要额外扩充。

不该上首页、该挪到二级页或直接不做的：

- ChartShowcase里的安星设置十组六十余项、中州派天盘地盘人盘调整、紫占排盘、四柱反查等进阶机制说明，这类内容只有已经懂紫微斗数或八字的用户才关心，参照iztro作为对照组的经验，术语和机制细节适合放给懂行的人看的二级页，不适合首页。
- AcademyShowcase当前的三张截图与逐段说明，可以只保留一张学堂根屏截图放在概览节，其余细节移入学堂二级页。
- Stats整节单独占一屏的做法，参照A组页脚普遍承载品牌数据的做法，压缩进页脚。
- 不需要新增一个独立的“功能矩阵”或“截图画廊”节，这正是owner所说“官网不等于每个功能截图加介绍”，A组里做得最克制的Notion、Arc、Bear都没有穷举功能的独立节。

## 五、来源列表

- https://www.notion.com/ ，访问日期2026-09-14
- https://www.culturedcode.com/things/ ，访问日期2026-09-14
- https://bear.app/ ，访问日期2026-09-14
- https://www.flightyapp.com/ ，访问日期2026-09-14
- https://headspace.com/ ，访问日期2026-09-14
- https://arc.net/ ，访问日期2026-09-14
- https://www.duolingo.com/ ，访问日期2026-09-14
- https://en.duolingo.com/ ，访问日期2026-09-14
- https://www.calm.com/ ，访问日期2026-09-14
- https://www.costarastrology.com/ ，访问日期2026-09-14
- https://www.costarastrology.com/faq ，访问日期2026-09-14
- https://www.thepattern.com/ ，访问日期2026-09-14
- https://www.thepattern.com/about-us-1 ，访问日期2026-09-14
- https://www.sanctuaryworld.co/ ，访问日期2026-09-14
- https://www.asknebula.com/ ，访问日期2026-09-14，nebulahoroscope.com当前重定向到此内容
- https://www.linghit.com/miaosuan.html ，访问日期2026-09-14
- https://www.cece.com/ ，访问日期2026-09-14
- https://play.google.com/store/apps/details?id=com.lingocc.cc5 ，访问日期2026-09-14，测测Google Play商店listing
- https://www.goddessxzns.com/ ，访问日期2026-09-14，准了官网，纯图片下载页
- https://apps.apple.com/cn/app/准了-星座塔罗紫微情感运势解析/id1356471277 ，访问日期2026-09-14，准了App Store listing，用作官网文字证据不足时的补充来源
- https://docs.iztro.com/ ，访问日期2026-09-14
- https://github.com/SylarLong/iztro ，访问日期2026-09-14

内部参照，非外部来源：

- `/Users/hubby/Workspace/Zixuan/hachimi/hachimi-website/app/[locale]/page.tsx`，当前首页组件装配顺序
- `/Users/hubby/Workspace/Zixuan/hachimi/hachimi-website/lib/i18n/zh.ts`，当前首页中文文案，用于统计现状字数与节数
