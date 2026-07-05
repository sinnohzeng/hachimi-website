# 哈基米道长文案原则（master · 官网 ↔ App ↔ Android 共用）

> 全站文案的唯一真源。写任何一句新文案前先对照本篇。
> 定位思考的一手真源在 KB：`~/sinnoh-kb/.job/all-new-in-ai/猪猪老公/Hachimi-AI产品-面试与学习/`（01 真需求-梁宁框架、06 完整案例）。
> 本篇由 2026-07-03 全站文案顶层重做落定，替换旧语气基线。

## 一、定位内核（不可动摇）

哈基米道长是一只温柔的猫系道长。心里慌乱的时候，你报两个数字、写下想问的事，他为你起一卦，陪你把一团乱理出个头绪，再给一个此刻就能做的第一步。他交付的是一点踏实的底气，不是预测。仅供娱乐与情绪陪伴。

- 卖的是情绪价值 · 保障感，对抗的是“担心”。不用“准不准”的尺子量它。
- 能确定性交付的是：即时回应 + 不评判的陪伴 + 把混乱情绪理成一段有仪式感的解读 + 一个能马上做的第一步。
- 好产品是“美”，落到本产品“这个字就是关怀”。发心是关怀，不是操纵。
- 最高红线：不预测、不改命、不转运、仅供娱乐。

## 二、价值主张北极星

| 载体   | 简体中文                                                     | English                                                                                                |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 主标题 | 慌的时候，先起一卦。                                         | When it's a lot, cast a hexagram.                                                                      |
| 副标题 | 哈基米道长陪你把心里的事理出个头绪，和一个此刻能做的第一步。 | Master Hachimi helps you untangle what's on your mind, and find one small step you can take right now. |

`config.tagline` / `seoTitle` / `metadata` 全部对齐此北极星。禁 "Feel heard"、"Cat Divination" 这类旧措辞回潮。

## 三、人设声音（温柔带一点猫的慧黠）

- 底色：温柔、不评判、去焦虑、不打包票。留台阶（别急、慢慢找、先走这一步）。
- 猫的记忆点：竖耳朵、翻卦书、打盹、慵懒、偶尔机灵；解读或祝福可“喵”收尾，但每屏至多一处，不滥用。
- 句法：短句、口语、具体动作画面胜过抽象形容。长短句交错。
- 演，不要声明：让文案本身就是猫系口吻，别在文案里写“用猫系道长的口吻讲给你听”这类自我标签（tell-not-show）。
- 基准锚点：起卦加载“哈基米道长竖起耳朵，替你起这一卦”；结果祝福“卦我读给你听了。别慌，先走这一步，喵”。

## 四、称谓规范（全站强制）

> `哈基米` 为不可拆分的整词。中文全名一律用全称 `哈基米道长` / `哈基米道長`，涵盖品牌 / App 名 / 商店 / 法律主体 / 落款 / 正文人设主语；需要更轻的熟络指代时只用 `道长` / `道長`。

| 场景                                                          | 简体 / 繁体             | English                             |
| ------------------------------------------------------------- | ----------------------- | ----------------------------------- |
| 全称（品牌 / App 名 / 商店 / 法律主体 / 落款 / 正文人设主语） | 哈基米道长 / 哈基米道長 | Master Hachimi（口语可 the Master） |
| 上下文已明确后的熟络简称                                      | 道长 / 道長             | the Master                          |

不再另起 "cat-master / the cat / Ask the cat" 一套英文 descriptor。

## 五、术语表（三语统一）

- 梅花易数 → Mei Hua Yi Shu（首现括注 "Plum Blossom divination"）。不用 Meihua Yishu / Plum Blossom Numerology 并存。
- 本卦 Original｜变卦 Resulting｜互卦 Nuclear｜体卦 Host｜用卦 Guest｜体用 Host & Guest｜动爻 Changing line。
- 卦象 = Hexagram；排盘详情 = Chart。二者不混指。
- 场景（以 App `ScenarioStyle.swift` 为权威）：寻物 Find an Item｜关系 Relationship｜决策 Decision｜自由问事 Free Question。
- 吉凶：大吉 / 吉 / 平 / 凶 / 大凶 → Great Fortune / Fortune / Neutral / Adverse / Very Adverse。

## 五之补、英文可读性与标题（2026-07-04 新增）

- **目标阅读水平**：美国初中 6 至 8 年级（Flesch-Kincaid ≤ 8）。营销文案避复杂词与难词，短句、常用词、主动语态。**简化不得增长文案**，每条改写词数不超过原句（hero 副标题尤其紧凑）。
- **只留一个特殊词**：全站英文只保留 `hexagram`（卦象）一个品牌术语，首现用最省的白话同位语点明（如 `a six-line sign`）；`Mei Hua Yi Shu` 首现括注 `Plum Blossom divination`；`Host / Guest / Changing line / trigram` 只在深层的 `How it's built` 页出现，出现即配一句白话小注。
- **SEO keywords 例外**：`config.keywords`（divination / I Ching / oracle / numerology 等）是给搜索引擎的检索词，不是正文，保留不降级；用户可见的 `config.description` 照常压简。
- **法律页轻改保义**：隐私 / 条款 / 删除数据只拆长句、换非法律难词（deterministic → fixed、solely → only 等），合规术语与法律含义一律不动。
- **称谓演出**：猫与温柔用动作画面演（竖耳朵、翻卦书），不用 gentle / warm 形容词自我标注，不用已废弃的 `the cat` / `cat-master`。
- **页面标题分隔符**：`<title>` 统一用管道符 `|`（对标 Stripe / Notion 实测，头部产品无一用 em-dash `—`）。品牌只在根 `title.template` 出现一次，各页只给页名，禁各页手写品牌后缀（会与模板叠成双重品牌）。

## 六、能说 / 不能说清单

**能说**：起一卦、陪你、理出个头绪、能做的第一步、一点踏实的底气、心里有个着落、卦象给的方向参考、慢慢找、别急、仅供娱乐与情绪陪伴。

**不能说（合规红线）**：预测、算准、改命、转运、化解、包好、一定、必然，及任何功效性宣称。

**不能写（去 AI 味红线，逐条对照）**：

- 客服咨询师腔 / 情绪安抚滥梗：接住、**托住**（已成 AI 味梗，弃用）、共情、看见你、被听见、没那么孤单、用温度回应你。
- 否定平行：“不是 X，而是 Y”“不仅…更是”。句尾单否定作对比收束（如“不是掷骰子”）不算，可用。
- 网感 / 营销词：不玩玄虚、不故弄玄虚、不卖焦虑、智商税、干货。
- 影视工业 / 官腔词：监制、校准、把关（署名宜用“起卦解卦，都是道长的老规矩”这类人设口吻）。
- 标点：破折号（——／—，含英文 em-dash）、括号内叙事、直角引号（「」『』港台日式，一律改弯引号“”‘’）、ASCII 直引号、数学符号（+／=／→）、文案里裸露的 Markdown 粗体标记（SwiftUI Text 的原生 Markdown 渲染除外）。
- 英文 AI 味词：delve / tapestry / testament / seamless / leverage / harness / furthermore 等。

**本轮落定的具体教训（易复犯，重点盯）**：

1. “确定性起卦”是信任底座，不是营销头牌。全站最多一两处提，别复读四遍把温柔的站写出工具味。
2. 讲确定性必带时辰：写“相同的数字与时辰必得同一卦”，不写“同样的数字必得同一卦”（漏时辰既不实又自相矛盾，因为起卦输入是数字加时辰）。
3. 避“算”用“起”：全站说“起卦 / 起一卦”，不说“算这一卦”（“算命”的算带预测色彩）。
4. 避行话：面向普通用户的文案不写“体用”“先天数除八”等术语，那是排盘详情页的进阶内容。
5. 隐私措辞求实：写“我们的后端不留存你的问题与解读”，别写“服务器一概不留”（问题会发往第三方 AI 服务商，绝对措辞会露矛盾）。

## 七、执行：Polish Protocol（写作串行铁律）

- 主智能体串行改稿，唯一 writer；评审可派 clean-context reviewer 子代理并行，禁并行 writer。
- 硬闸门：把文案抽成 .md 草稿跑 `writing-polish/scripts/scan-ai-taste.sh`，红线归零。勿直接扫 .ts / .xcstrings（TS 字符串定界符会误报为 ASCII 直引号）。
- clean-context reviewer 四焦点（立意 / 结构 / 材料·事实 / AI味·标点），最多两轮收敛。
- 事实层不编造（如 stats 数字用真实产品事实）。

## 八、文案所在位置

- 官网：`hachimi-website/lib/i18n/zh.ts` + `en.ts`（结构 `types.ts`）；站点身份 `lib/config.ts` + `lib/metadata.ts`；心事卡组件 `components/scenario-cards.tsx`。
- iOS：`hachimi-ios/App/Localizable.xcstrings`（key = 简中原文，改 key 必须同步引用它的 Swift 字面量）+ `App/Support/ScenarioStyle.swift`、`FortuneStyle.swift`、`DirectionCardState.swift`、`ReadingExport.swift`（导出模板豁免 xcstrings）等。
- Android：`hachimi-android`（原生重建中），字符串资源按本篇对齐。

## 九、语种覆盖（有意差异，勿当漂移）

- **两 App（iOS / Android）**：界面三语一等（简体 / 繁体 / English），UI 字符串全覆盖。
- **官网 / 后端**：只简体 + English。官网限定能生成内容的语种（后端解读只产简 / 英）；繁体是 App 侧 UI 便利层，繁体界面下 AI 正文回落简体（界面仍繁体）。
- 故官网 / 后端无繁体为自洽设计、非跨端漂移，审计勿据此报缺失；未来若后端产繁体解读，再同步官网。
