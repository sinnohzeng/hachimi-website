#!/usr/bin/env node
/**
 * 对客文案润色管线（owner 硬要求：站上每一句字都由 DeepSeek V4.1 Flash 写定，
 * 不用实现者自己的措辞）。
 *
 * 用法：
 *   export DEEPSEEK_API_KEY="$(grep '^DEEPSEEK_API_KEY=' ../hachimi-ios/.env | cut -d= -f2-)"
 *   node scripts/polish-copy.mjs --mode zh \
 *     --in docs/copy/2026-09-14-v2/facts.zh.json \
 *     --out docs/copy/2026-09-14-v2/polished.zh.json
 *   node scripts/polish-copy.mjs --mode en \
 *     --in docs/copy/2026-09-14-v2/polished.zh.json \
 *     --out docs/copy/2026-09-14-v2/polished.en.json
 *
 * 可选：--only a.b,c.d 只重跑这几条并并回已有的输出（事实漂了就改事实稿重跑那一条）。
 *       --concurrency N 并发数，缺省 4。
 *       --facts <facts.zh.json> 英文那一遍用它取每条的 limit 与 verbatim；
 *         英文的输入是中文成稿（一张扁平的字符串表），限额只有事实稿里有。
 *
 * 事实稿两种形态都吃：
 *   "key": "事实句"                      老形态，字数上限走本文件的 LIMITS 表，按字符数收
 *   "key": { text, limit, verbatim, en } 第三版形态，limit 是简体字数（标点不计），
 *                                        英文上限由 limit × 0.6 换算成词数
 * verbatim 为真的条目原样透传，不送模型：北极星与已定案的品类锚、差异句改起来要先
 * 改 docs/copy-principles.md，不能让模型每跑一次就换个说法。
 *
 * 超限只重试一次，再超就报错退出，绝不静默截断。
 *
 * 密钥只从环境变量读，不落盘、不回显、不进任何输出。
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { countFor, enCapFor } from "./lib/count-units.mjs";

const ENDPOINT = "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-flash";
const TEMPERATURE = 0.7;
const MAX_ATTEMPTS = 4;

// ---------------------------------------------------------------------------
// 判据
// ---------------------------------------------------------------------------

/**
 * 参考来源与竞争对手的名字，词表逐字取自 hachimi-ios 的
 * `scripts/no-reference-mentions.py`（那一份是 iOS 侧 `make check` 的静态门）。
 * 简体与正體各列一份：差一个字的那一份进不了表就拦不住。
 */
const BANNED_WORDS = [
  "文墨",
  "问真",
  "問真",
  "jizhen",
  "对标",
  "對標",
  "对照成品",
  "對照成品",
  "电脑版",
  "電腦版",
];

/** 同一份脚本里的表情符号区段：图标一律走 SF Symbols / lucide，不拿表情当图标。 */
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

/** 去 AI 味红线（docs/copy-principles.md 第六节）。 */
const AI_TASTE_ZH = [
  ["让我们", "翻译腔"],
  ["值得注意的是", "翻译腔"],
  ["不仅", "否定平行 / 英式排比"],
  ["接住", "客服咨询师腔"],
  ["托住", "客服咨询师腔"],
  ["共情", "客服咨询师腔"],
  ["看见你", "客服咨询师腔"],
  ["被听见", "客服咨询师腔"],
  ["不玩玄虚", "网感词"],
  ["故弄玄虚", "网感词"],
  ["智商税", "网感词"],
  ["干货", "网感词"],
  ["赋能", "公文黑词"],
  ["闭环", "公文黑词"],
  ["校准", "官腔词"],
  ["把关", "官腔词"],
];

const AI_TASTE_EN = [
  "delve",
  "tapestry",
  "testament",
  "seamless",
  "seamlessly",
  "leverage",
  "harness",
  "furthermore",
  "moreover",
  "elevate",
  "unlock",
  "embark",
  "realm",
  "navigate the",
  "in today's",
  "it's worth noting",
  "not only",
];

/** 合规红线：功效性宣称一个都不许出现。 */
const COMPLIANCE_ZH = ["预测", "算准", "改命", "转运", "化解", "包好", "必然"];
const COMPLIANCE_EN = [
  "predict",
  "prediction",
  "fortune-telling accuracy",
  "guarantee",
  "change your fate",
  "change your luck",
];

/**
 * 字数上限，按 key 前缀匹配，先命中的赢。zh 按字符数，en 按 EN_RATIO 放大。
 * 上限是给模型的硬约束，也是收稿时的判据。
 */
const LIMITS = [
  // 具体 key 放最前：先命中的赢，`config.description` 若排在 `.description$`
  // 之后就会被那条 110 字的通例吃掉。
  [/^config\.description$/, 200],
  [/^config\.tagline$/, 24],
  [/\.readMore$/, 8],
  [/^nav\./, 6],
  [/\.kicker$/, 8],
  [/^principles\.cards\./, 10],
  [/^stats\.items\./, 10],
  [/^footer\.links\./, 6],
  [/\.cta$/, 12],
  [/^featureCards\.cards\.\d+\.title$/, 6],
  [/\.badge$/, 18],
  [/\.headline\d?$/, 18],
  [/\.title1$/, 14],
  [/\.title2$/, 16],
  [/\.points\.\d+\.term$/, 10],
  [/\.title$/, 26],
  [/\.subtitle$/, 30],
  [/\.shotAlts?\./, 34],
  [/^hero\.boardAlt\./, 34],
  [/\.note$/, 34],
  [/\.eyebrow$/, 34],
  [/\.question$/, 26],
  [/\.bullets\.\d+$/, 46],
  [/\.features\.\d+$/, 46],
  [/\.memory$/, 46],
  [/\.points\.\d+\.desc$/, 105],
  [/\.description$/, 110],
  [/\.body$/, 110],
  [/\.intro$/, 120],
  [/\.answer$/, 170],
];

/** 英文比中文占字多，按这个倍率放宽字符上限。 */
const EN_RATIO = 2.7;

function limitFor(key) {
  for (const [pattern, max] of LIMITS) if (pattern.test(key)) return max;
  return 110;
}

/**
 * 字段形态提示，按 key 匹配，先命中的赢。写的是“这句字在页面上长什么样、
 * 挨着谁”，不是新事实——模型看不见版面，标签位与半句标题最容易在这里漂。
 */
const HINTS = [
  [
    /^nav\.|^footer\.links\.|^featureCards\.cards\.\d+\.title$/,
    "这是 App 底部标签栏上那一格的名字，照抄不改，不加修饰词、不加前后缀。",
  ],
  [
    /^stats\.items\./,
    "这行字印在一个大数字的正下方，读作“数字 + 这行字”。量词留在最前面，不要把数字本身写进来，也不要添“附赠”“免费”这类草稿里没有的说法。",
  ],
  [
    /\.title1$/,
    "这是标题的上半句，页面上紧接着另一条 title2，两句连起来才是一句完整的话。上半句写完要留一个逗号。",
  ],
  [
    /\.title2$/,
    "这是标题的下半句，页面上接在 title1 之后，两句连起来是一句完整的话，别把上半句的意思再说一遍。",
  ],
  [
    /\.shotAlts?\.|^hero\.boardAlt\./,
    "这是网页 img 标签的 alt 文本，给看不见图的人描述图里是什么，句末不加句号。",
  ],
  [/\.kicker$/, "这是小节左上角的标签词，照抄不改。"],
  [
    /^(academy|chart|scenarioCards|featureCards)\.title$/,
    "这是首页一个大区块的标题，要写明这一块讲的是 App 底部哪一格。品牌名由别处承担，标题里不许出现。",
  ],
  [
    /^hero\.eyebrow$/,
    "这是首屏第一行的品类锚，陌生人靠它一眼判断这是个什么东西。“App”这个品类词与“AI 猫”这个说法都必须留住。",
  ],
  [/\.question$/, "这是常见问题里的问句，用用户自己的口吻问，句末是问号。"],
  [/\.readMore$|\.cta$/, "这是一枚按钮或链接上的字，短、动词打头、不带句号。"],
  [
    /^methodology\.metaTitle$/,
    "这是浏览器标签页上的页名，品牌名由模板另加，这里不许出现品牌名。",
  ],
];

function hintFor(key) {
  for (const [pattern, hint] of HINTS) if (pattern.test(key)) return hint;
  return null;
}

// ---------------------------------------------------------------------------
// 系统提示词：把 docs/copy-principles.md 的规矩、GB/T 标点与两张禁词表写进去
// ---------------------------------------------------------------------------

const SHARED_RULES = `产品事实（只许照抄，不许增补）：
- 哈基米道长（英文名 Hachimi.ai，角色名 Hachimi）是一只猫系道长人设的 App，两件事：一是按梅花易数起卦问事，二是排紫微斗数与八字命盘。品牌 Hachimi.ai。
- 站位：仅供娱乐与情绪陪伴。陪你把心里的事理出个头绪，给一个此刻就能做的第一步。
- 称谓：中文全名一律写“哈基米道长”，上下文已明确后可写“道长”。“哈基米”是不可拆分的整词。

红线（违反即作废）：
1. 不许新增草稿里没有的事实、数字、功能或承诺。数字一个不许改、不许省、不许四舍五入。
2. 不许写“预测”“算准”“改命”“转运”“化解”“保证”“一定”“必然”这类功效性宣称。
3. 不许出现任何参考来源、对照软件或竞争对手的名字，以下词一个都不许出现：${BANNED_WORDS.join("、")}。
4. 不许出现任何表情符号（emoji）。
5. 不许出现 Claude、Anthropic 或任何 AI 供应商的名字，第三方模型一律写“第三方 AI 服务”。
6. 不许写自我标注式的话（例如“用温柔的口吻讲给你听”），要演出来，不要声明。`;

const SYSTEM_ZH = `你是哈基米道长官网的中文文案编辑。输入是一段“事实稿”，写得准但不好读。你的活是把它改成能直接上线的对客文案。

${SHARED_RULES}

语气：温柔、不评判、不打包票，短句口语，具体动作画面胜过抽象形容。留台阶（别急、慢慢找、先走这一步）。猫的机灵偶尔露一点，不滥用，一段里至多一处。

标点按 GB/T 15834：
- 弯引号 “ ” 套 ‘ ’，中文冒号 ：，中文括号 （ ），顿号 、，句号 。
- 禁用 ASCII 直引号 " 与 '，禁用直角引号 「」 『』。
- 禁用破折号 —— — –，禁用数学符号 + = →，禁用 Markdown 粗体标记。
- 中文与英文单词、阿拉伯数字之间留一个半角空格。

去 AI 味（逐条对照，出现即作废）：
- 不写“让我们”“值得注意的是”“不仅…而且”这类翻译腔与英式排比。
- 不写“接住”“托住”“共情”“看见你”“被听见”这类客服咨询师腔。
- 不写“不是 X，而是 Y”的否定平行。句尾单否定作对比收束可以用。
- 不写“不玩玄虚”“智商税”“干货”这类网感词，不写“赋能”“闭环”“校准”“把关”这类公文官腔词。
- 不在括号里补叙事，要补的话拆成两句或改成前置定语。

输出要求：只输出改好的那一句，不加引号、不加解释、不加前后缀、不换行。`;

const SYSTEM_EN = `You are the English copy editor for the Hachimi.ai marketing site. The input is a finished Chinese line. Rewrite it as natural English marketing copy that says exactly the same thing.

${SHARED_RULES}

English rules:
- Reading level: US grade 6 to 8. Short sentences, common words, active voice.
- Straight quotes (" and '), ordinary English punctuation. No em dashes, no en dashes, no ellipsis characters, no arrows, no Markdown.
- Keep only these special terms: "hexagram" (first use may add a plain-words apposition such as "a six-line sign"), "Mei Hua Yi Shu" (first use add "Plum Blossom divination"), "Zi Wei Dou Shu" (first use add "Purple Star astrology"), "BaZi" (first use add "Four Pillars").
- The app name is "Hachimi.ai"; the cat character is "Hachimi", and in running text "the Master" is fine. Never "the cat", never "cat-master".
- Chinese scenario names translate as: 寻物 Find an Item, 感情 Love, 事业 Career, 自由问事 Open Question. Never write "Free Question".
- Do not use: delve, tapestry, testament, seamless, leverage, harness, furthermore, moreover, elevate, unlock, embark, realm.
- Do not use "not only ... but also" parallels, and do not write "it's not X, it's Y".
- Never claim prediction, accuracy, luck-changing or any guarantee.

Shipped English terms (逐条取自 App 的 Localizable.xcstrings，网站必须与 App 同词，不许另起一套):
- The four bottom tabs: 问事 = "Ask", 命盘 = "Chart", 学堂 = "Academy", 我的 = "Me". Use these exact words, never "Study Hall", "Natal Chart", "Destiny Chart", "My Profile", "Learn".
- 紫微斗数 = "Zi Wei Dou Shu" (first use in a line may add "Purple Star astrology"); short form 紫微 = "Zi Wei".
- 八字 = "Ba Zi" (first use in a line may add "Four Pillars").
- 三合盘 = "San He chart", 四化盘 = "Four Transformations chart", 飞星盘 = "Flying Star chart".
- 限流条 = "fortune bar", 限流面板 = "fortune panel", 限流层 = "fortune layers". NEVER translate 限流 as "rate limit" or "throttle"; it means the luck periods you step through.
- 大限 = "major cycle", 小限 = "minor cycle", 流年 = "Annual", 流月 = "Monthly", 流日 = "daily", 流时 = "hourly".
- 格局分析 = "Chart Patterns", 安星设置 = "Star Settings", 安星码 = "star code", 命盘调整 = "Chart adjustment".
- 中州派天盘 / 地盘 / 人盘 = "Zhongzhou heaven / earth / human board". 紫占排盘 = "zizhan chart". 四柱反查 = "Four Pillars lookup". 太极点 = "Taiji point".
- 命例 = "case", 命例库 = "Case library", 存到文件 = "Save to Files", 隐藏生辰 = "Hide birth details".
- The four Ba Zi tabs: 基本信息 = "Profile", 基本排盘 = "Chart", 专业细盘 = "Details", 断事笔记 = "Notes".
- 命宫 = "Life Palace", 夫妻宫 = "Marriage Palace", 身宫 = "Body Palace", 胎元 = "Conception Pillar", 神煞 = "Symbolic Stars", 纳音 = "Nayin", 藏干 = "Hidden Stems", 十神 = "Ten Gods".
- “这一格”“四格”指的是底部标签页，英文写 "tab" / "tabs"，不要写 "cell" 或 "grid".
- 外观 = "Appearance", 界面语言 = "Language", 卦历 = "reading history", 词条 = "glossary entry", 词条卡片 = "glossary card".
- 山医命相卜五科 = "five arts: Mountain, Medicine, Fate, Physiognomy and Divination". Keep that order and those five words.
- Locked hero wording already shipped on the site: the headline opens "When it's a lot, cast a hexagram."; the memory line reads "A chatbot forgets what you asked last time. The Master remembers, cast after cast."

Output only the finished English line. No quotes around it, no explanation, no prefix, no line breaks.`;

// ---------------------------------------------------------------------------
// 收稿判据
// ---------------------------------------------------------------------------

/** 按口径量长度：char 是字符数（老事实稿），zhUnit 是简体字数，enWord 是英文词数。 */
function measure(text, unit) {
  if (unit === "char") return [...text].length;
  return countFor(unit === "enWord" ? "en" : "zh", text);
}

/** 这一条是不是长度问题。长度只准重试一次，别的问题照常改到上限。 */
function isLengthProblem(problem) {
  return problem.startsWith("超出") || problem.startsWith("Over the");
}

function violations(key, text, mode, max, unit) {
  const out = [];
  const lower = text.toLowerCase();

  for (const word of BANNED_WORDS) {
    if (lower.includes(word.toLowerCase())) out.push(`出现禁词“${word}”`);
  }
  if (EMOJI.test(text)) out.push("出现表情符号");
  if (/[—–]/.test(text)) out.push("出现破折号，改成两句或换掉");
  if (/[「」『』]/.test(text)) out.push("出现直角引号，中文改弯引号 “ ”");
  if (/[*_`]{1,2}\w/.test(text)) out.push("出现 Markdown 标记");
  if (/\n/.test(text)) out.push("出现换行");

  const length = measure(text, unit);
  if (length > max) {
    out.push(
      unit === "enWord"
        ? `Over the ${max}-word cap: this is ${length} words. Cut it to ${max} words or fewer.`
        : `超出 ${max} 字上限，现在 ${length} 字，必须压到 ${max} 字以内`
    );
  }

  if (mode === "zh") {
    if (/["']/.test(text)) out.push("出现 ASCII 直引号，中文改弯引号 “ ”");
    if (/[+=→]/.test(text)) out.push("出现数学符号");
    for (const [word, why] of AI_TASTE_ZH) {
      if (text.includes(word)) out.push(`出现“${word}”（${why}）`);
    }
    for (const word of COMPLIANCE_ZH) {
      // “不预测”“不改命”这类否定式是产品红线的正当表述，放行。
      if (
        text.includes(word) &&
        !new RegExp(`[不无没never]${word}`).test(text)
      ) {
        out.push(`出现功效性宣称“${word}”`);
      }
    }
  } else {
    if (/[“”‘’]/.test(text))
      out.push("English uses straight quotes, not curly ones");
    for (const word of AI_TASTE_EN) {
      if (lower.includes(word)) out.push(`AI-flavored word "${word}"`);
    }
    for (const word of COMPLIANCE_EN) {
      if (
        lower.includes(word) &&
        !new RegExp(`(no|not|never|non)[ -]${word}`).test(lower)
      ) {
        out.push(`efficacy claim "${word}"`);
      }
    }
  }
  return out;
}

/** 草稿里的数字一个都不许在成稿里丢。半角与全角、阿拉伯与中文数字都算同一个。 */
const CN_DIGITS = {
  零: "0",
  一: "1",
  二: "2",
  两: "2",
  三: "3",
  四: "4",
  五: "5",
  六: "6",
  七: "7",
  八: "8",
  九: "9",
};

/** 英文会给大数加千位逗号（2,408），比数之前先把它抹平，否则误报丢数。 */
function normalizeDigits(text) {
  return text.replace(/(\d),(?=\d{3}\b)/g, "$1");
}

function numbersIn(text) {
  const arabic = normalizeDigits(text).match(/\d+/g) ?? [];
  const chinese = [];
  for (const [glyph, digit] of Object.entries(CN_DIGITS)) {
    if (text.includes(glyph)) chinese.push(digit);
  }
  return new Set([...arabic, ...chinese]);
}

function droppedNumbers(draft, text) {
  const before = normalizeDigits(draft).match(/\d+/g) ?? [];
  const after = numbersIn(text);
  return [...new Set(before)].filter((n) => !after.has(n));
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

async function callModel(apiKey, system, messages) {
  const body = {
    model: MODEL,
    thinking: { type: "disabled" },
    temperature: TEMPERATURE,
    messages: [{ role: "system", content: system }, ...messages],
  };

  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(120_000),
      });
      if (!response.ok) {
        // 正文可能带鉴权细节，只留状态码，密钥与响应体一个字都不回显。
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      const text = json?.choices?.[0]?.message?.content;
      if (typeof text !== "string" || text.trim() === "") {
        throw new Error("空回复");
      }
      return text;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw lastError;
}

/** 模型偶尔会把整句包进引号或补一句解释，收进来之前先剥干净。 */
function tidy(raw) {
  let text = raw.trim().split("\n")[0].trim();
  if (/^[“"'‘]/.test(text) && /[”"'’]$/.test(text))
    text = text.slice(1, -1).trim();
  return text;
}

async function polishOne({ apiKey, key, draft, mode, cap, unit }) {
  const system = mode === "zh" ? SYSTEM_ZH : SYSTEM_EN;
  const kind = key.split(".").slice(-1)[0];
  const hint = hintFor(key);
  const hintLine = hint ? `\n字段形态：${hint}` : "";
  const capLine =
    mode === "zh"
      ? `字数上限：${cap} 字（标点不计，连着的拉丁字母或数字算一个字）`
      : unit === "enWord"
        ? `Length cap: ${cap} words`
        : `Length cap: ${cap} characters`;
  const opening =
    mode === "zh"
      ? `字串 key：${key}（字段类型：${kind}）\n${capLine}${hintLine}\n\n事实稿：\n${draft}`
      : `String key: ${key} (field type: ${kind})\n${capLine}${hint ? `\nField shape (same constraint applies in English): ${hint}` : ""}\n\nFinished Chinese line:\n${draft}`;

  const messages = [{ role: "user", content: opening }];
  let lengthRetries = 0;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const text = tidy(await callModel(apiKey, system, messages));
    const problems = violations(key, text, mode, cap, unit);
    const lost = droppedNumbers(draft, text);
    if (lost.length > 0) problems.push(`丢了草稿里的数字：${lost.join("、")}`);

    if (problems.length === 0) return { text, attempts: attempt };

    // 超限只给一次改的机会。第二次还超就交回去报错，不截断、不放行。
    const tooLong = problems.some(isLengthProblem);
    if (tooLong && lengthRetries >= 1) {
      return { text, attempts: attempt, problems };
    }
    if (tooLong) lengthRetries += 1;

    if (attempt === MAX_ATTEMPTS) {
      return { text, attempts: attempt, problems };
    }
    messages.push({ role: "assistant", content: text });
    messages.push({
      role: "user",
      content:
        (mode === "zh" ? "这一稿不合格：\n" : "That draft fails:\n") +
        problems.map((p) => `- ${p}`).join("\n") +
        (mode === "zh"
          ? "\n\n改掉这些问题，重出一句。只输出那一句。"
          : "\n\nFix these and give the line again. Output only the line."),
    });
  }
  throw new Error("unreachable");
}

/**
 * 把一条事实稿读成统一形状。
 *
 * 老形态（第二版）是裸字符串，上限走 LIMITS 表按字符数收。第三版是对象，自带
 * limit 与 verbatim。英文那一遍的输入是中文成稿（扁平字符串表），limit 与
 * verbatim 只能从 --facts 指的事实稿里取，所以两个来源都要认。
 */
function normalizeEntry(key, raw, facts, mode) {
  const meta = facts?.[key] ?? null;
  const entry = raw && typeof raw === "object" ? raw : null;
  const draft = entry ? entry.text : raw;
  const limit = entry?.limit ?? meta?.limit ?? null;

  if (limit === null) {
    const max = limitFor(key);
    return {
      draft,
      cap: mode === "zh" ? max : Math.round(max * EN_RATIO),
      unit: "char",
      verbatim: false,
    };
  }

  const verbatim = Boolean(entry?.verbatim ?? meta?.verbatim);
  const fixed =
    mode === "zh" ? (entry?.text ?? meta?.text) : (entry?.en ?? meta?.en);
  if (verbatim && !fixed) {
    throw new Error(`${key} 标了 verbatim，但 ${mode} 那一版的原文没给`);
  }
  return {
    draft,
    // enLimit 是英文单独放宽的例外，只给装不下出货术语专名的那几条，理由写在事实稿里。
    cap:
      mode === "zh"
        ? limit
        : (entry?.enLimit ?? meta?.enLimit ?? enCapFor(limit)),
    unit: mode === "zh" ? "zhUnit" : "enWord",
    verbatim,
    fixed,
  };
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith("--")) {
      const name = argv[i].slice(2);
      const value = argv[i + 1]?.startsWith("--") ? "true" : argv[i + 1];
      args[name] = value ?? "true";
      if (value !== "true") i += 1;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const mode = args.mode;
  if (mode !== "zh" && mode !== "en") {
    console.error(
      "用法：--mode zh|en --in <drafts.json> --out <polished.json> [--only k1,k2] [--concurrency 4]"
    );
    process.exit(2);
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error("缺 DEEPSEEK_API_KEY。密钥只从环境变量读，不写进仓库。");
    process.exit(2);
  }

  const inPath = path.resolve(args.in);
  const outPath = path.resolve(args.out);
  const drafts = JSON.parse(await readFile(inPath, "utf8"));
  // 英文那一遍吃的是中文成稿，limit 与 verbatim 只有事实稿里有。
  const facts = args.facts
    ? JSON.parse(await readFile(path.resolve(args.facts), "utf8"))
    : null;
  const only = args.only
    ? new Set(args.only.split(",").map((s) => s.trim()))
    : null;

  const existing =
    existsSync(outPath) && only
      ? JSON.parse(await readFile(outPath, "utf8"))
      : {};

  // 下划线开头的是事实稿里的注释块，不是文案。
  const keys = Object.keys(drafts).filter(
    (k) => !k.startsWith("_") && (!only || only.has(k))
  );
  const concurrency = Number(args.concurrency ?? 4);
  const result = { ...existing };
  const flagged = [];
  let done = 0;

  async function worker() {
    for (;;) {
      const key = keys.shift();
      if (key === undefined) return;
      const spec = normalizeEntry(key, drafts[key], facts, mode);

      if (spec.verbatim) {
        // 北极星与已定案的品类锚、差异句原样透传，一个字都不送模型。
        result[key] = spec.fixed;
        done += 1;
        process.stderr.write(
          `= [${done}/${done + keys.length}] ${key}（原样透传）\n`
        );
        continue;
      }

      const outcome = await polishOne({
        apiKey,
        key,
        draft: spec.draft,
        mode,
        cap: spec.cap,
        unit: spec.unit,
      });
      result[key] = outcome.text;
      done += 1;
      const mark = outcome.problems ? "!" : outcome.attempts > 1 ? "~" : " ";
      process.stderr.write(
        `${mark} [${done}/${done + keys.length}] ${key}（${outcome.attempts} 轮）\n`
      );
      if (outcome.problems) flagged.push({ key, problems: outcome.problems });
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));

  // key 顺序跟着草稿走，diff 才看得懂。
  const ordered = {};
  for (const key of Object.keys(drafts)) {
    if (!key.startsWith("_") && key in result) ordered[key] = result[key];
  }
  await writeFile(outPath, `${JSON.stringify(ordered, null, 2)}\n`, "utf8");

  if (flagged.length > 0) {
    console.error(`\n${flagged.length} 条改到上限仍不合格，逐条人工复核：`);
    for (const { key, problems } of flagged) {
      console.error(`  ${key}：${problems.join("；")}`);
    }
    process.exit(1);
  }
  console.error(`\n全部通过，写入 ${path.relative(process.cwd(), outPath)}`);
}

main().catch((error) => {
  console.error(`失败：${error.message}`);
  process.exit(1);
});
