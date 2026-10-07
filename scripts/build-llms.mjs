#!/usr/bin/env node
/**
 * llms 文件生成器：public/llms.txt 与 public/llms-full.txt 按 llmstxt.org 的格式
 * 从官网真源拼出来，这里不写任何事实句。
 *
 *   node scripts/build-llms.mjs           生成两份，写进 public/
 *   node scripts/build-llms.mjs --check   重新生成，与 public/ 里的两份逐字节比对
 *
 * 真源：页面文字取 lib/i18n/{en,zh}.ts，网址与商店链接取 lib/config.ts，隐私政策
 * 与条款取 content/legal/ 的英文原文。链到的路由要在 app/[locale]/ 下有页面，锚点
 * 要在 components/ 里有同名 id，对不上就报错。页面上 i18n 没有的事实，这里也不出现。
 *
 * llms.txt：品牌名、一段概述、各页链接（每条的说明取自 i18n），再照录英文隐私政策
 * 第 1 节的摘要。llms-full.txt：首页的英文正文按页面节序拼出，再接英文隐私政策与
 * 条款全文；中文版只给链接。法律件里指向另一份法律件的相对链接改写成
 * 站内绝对网址，其余逐字照录。llmstxt.org 规定第一行是 H1 标题，两份都从
 * `# 品牌名` 起头，生成时核对。
 *
 * --check 挂在 npm run check 里：改了文案或法律件却没重新生成，就报红。
 */
import { existsSync } from "node:fs";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const { en } = await import("../lib/i18n/en.ts");
const { zh } = await import("../lib/i18n/zh.ts");
const { siteConfig } = await import("../lib/config.ts");
const { legalFiles, lastUpdatedOf } = await import("../lib/legal-files.ts");

const OUTPUTS = {
  "public/llms.txt": buildIndex,
  "public/llms-full.txt": buildFull,
};

// ---- 网址：路由对 app/[locale]/，锚点对 components/ 里的 id ----

const componentFiles = await readdir(path.join(ROOT, "components"), {
  recursive: true,
});
// 去掉注释再找 id：有几处注释里写着 `id="download"` 这样的字样，不能算数。
const componentSource = (
  await Promise.all(
    componentFiles
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => readFile(path.join(ROOT, "components", file), "utf8"))
  )
)
  .join("\n")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|[^:])\/\/.*$/gm, "$1");

/** 站内页面网址。slug 是 app/[locale]/ 下的目录名，空串是首页。 */
function pageUrl(locale, slug = "", anchor = "") {
  const page = path.join("app/[locale]", slug, "page.tsx");
  if (!existsSync(path.join(ROOT, page))) {
    throw new Error(`${page} 不存在，链接对不上路由`);
  }
  if (anchor && !componentSource.includes(`id="${anchor}"`)) {
    throw new Error(`components/ 里找不到 id="${anchor}"，锚点对不上`);
  }
  const route = slug ? `/${locale}/${slug}` : `/${locale}`;
  return `${siteConfig.url}${route}${anchor ? `#${anchor}` : ""}`;
}

/** /get 是 functions/get.ts 按平台分流的入口。 */
function getUrl() {
  if (!existsSync(path.join(ROOT, "functions/get.ts"))) {
    throw new Error("functions/get.ts 不存在，/get 对不上");
  }
  return `${siteConfig.url}/get`;
}

// ---- 文本小件 ----

function link(label, url, note) {
  return note ? `- [${label}](${url}): ${note}` : `- [${label}](${url})`;
}

function list(items) {
  return items.join("\n");
}

/** 段落之间空一行，整份以一个换行结尾。 */
function document(blocks) {
  return `${blocks.filter(Boolean).join("\n\n")}\n`;
}

function storeLinks() {
  return [
    `[${en.store.appStoreAlt}](${siteConfig.appStore})`,
    `[${en.store.googlePlayAlt}](${siteConfig.googlePlay})`,
  ].join(" · ");
}

// ---- 法律件 ----

async function legalMarkdown(kind, locale) {
  const file = legalFiles[kind][locale];
  return readFile(path.join(ROOT, "content/legal", file), "utf8");
}

const legalUrlOfFile = new Map(
  Object.entries(legalFiles).flatMap(([kind, files]) =>
    Object.entries(files).map(([locale, file]) => [file, pageUrl(locale, kind)])
  )
);

/** 法律件之间的相对链接改成站内绝对网址，与 lib/legal.ts 渲染页面时同一张表。 */
function absoluteLegalLinks(markdown) {
  return markdown.replace(/\]\(([^)\s]+)\)/g, (match, href) => {
    if (/^([a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return match;
    const [file = "", hash] = href.split("#");
    const url = legalUrlOfFile.get(file);
    if (!url) throw new Error(`content/legal 里的相对链接对不上：${href}`);
    return `](${hash ? `${url}#${hash}` : url})`;
  });
}

/** 英文隐私政策第 1 节：标题与正文原文。 */
function firstSectionOf(markdown) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => /^## 1\. /.test(line));
  if (start === -1) throw new Error("英文隐私政策里找不到第 1 节");
  const next = lines.findIndex((line, i) => i > start && /^## /.test(line));
  const body = lines
    .slice(start + 1, next === -1 ? undefined : next)
    .join("\n")
    .trim();
  return { heading: lines[start].replace(/^## /, ""), body };
}

// ---- 两份文件共用的开头 ----

function title() {
  return `# ${siteConfig.seoTitle}`;
}

/** 概述：站点描述 siteConfig.description。 */
function summary() {
  return `> ${siteConfig.description}`;
}

// ---- llms.txt ----

async function buildIndex() {
  const privacyEn = await legalMarkdown("privacy", "en");
  const { heading, body } = firstSectionOf(privacyEn);
  const email = siteConfig.email;
  const contact = en.support.table;
  const emailRow = contact?.rows.find((row) => row.cells.includes(email));
  if (!contact || !emailRow) throw new Error(`支持页联系表里找不到 ${email}`);
  const responseColumn = contact.columns.length - 1;

  return document([
    title(),
    summary(),
    "## Home page",
    list([
      link(
        siteConfig.name,
        pageUrl("en"),
        `${en.hero.headline} ${en.hero.bridge}`
      ),
      ...en.what.items.map((item) =>
        link(item.title, pageUrl("en", "", "what"), item.body)
      ),
      link(en.case.title, pageUrl("en", "", "case"), en.case.lead),
      ...en.tools.cards.map((card) =>
        link(card.name, pageUrl("en", "", "tools"), card.line)
      ),
      link(en.nav.academy, pageUrl("en", "", "academy"), en.academy.text),
      link(
        en.faq.title,
        pageUrl("en", "", "faq"),
        en.faq.items.map((item) => item.question).join(" ")
      ),
      link(
        en.nav.download,
        pageUrl("en", "", "download"),
        en.finalCta.headline
      ),
    ]),
    `## ${en.meta.support.title}`,
    list([
      link(en.meta.support.title, pageUrl("en", "support"), en.support.intro),
      link(
        en.meta.dataDeletion.title,
        pageUrl("en", "data-deletion"),
        en.dataDeletion.intro
      ),
      link(
        email,
        `mailto:${email}`,
        `${contact.columns[responseColumn]}: ${emailRow.cells[responseColumn]}`
      ),
    ]),
    `## ${en.nav.download}`,
    list([
      link(en.get.title, getUrl(), en.get.body),
      link(en.store.appStoreAlt, siteConfig.appStore),
      link(en.store.googlePlayAlt, siteConfig.googlePlay),
    ]),
    "## Legal",
    list(
      Object.keys(legalFiles).flatMap((kind) =>
        Object.entries({ en, zh }).map(([locale, t]) =>
          link(
            t.meta[kind].title,
            pageUrl(locale, kind),
            t.meta[kind].description
          )
        )
      )
    ),
    "## Privacy",
    `Section ${heading} of the [${en.meta.privacy.title}](${pageUrl("en", "privacy")}), last updated ${lastUpdatedOf(privacyEn)}:`,
    body,
  ]);
}

// ---- llms-full.txt ----

function homeText() {
  return [
    `# ${en.hero.headline}`,
    en.hero.bridge,
    storeLinks(),
    `## ${en.what.title}`,
    `${en.what.eyebrow}.`,
    ...en.what.items.flatMap((item) => [`### ${item.title}`, item.body]),
    `## ${en.case.title}`,
    en.case.lead,
    en.case.steps
      .map((step, i) => `${i + 1}. **${step.title}**: ${step.body}`)
      .join("\n"),
    `## ${en.tools.title}`,
    ...en.tools.cards.flatMap((card) => [
      `### ${card.name}`,
      card.line,
      card.detail,
    ]),
    `## ${en.academy.text}`,
    `## ${en.faq.title}`,
    ...en.faq.items.flatMap((item) => [`### ${item.question}`, item.answer]),
    `${en.faq.stillHaveQuestions} [${en.faq.contact}](mailto:${siteConfig.email})`,
    `## ${en.finalCta.headline}`,
    storeLinks(),
  ];
}

async function buildFull() {
  const pages = [
    [en.hero.headline, zh.hero.headline, ""],
    ...Object.keys(legalFiles).map((kind) => [
      en.meta[kind].title,
      zh.meta[kind].title,
      kind,
    ]),
  ];
  const legal = await Promise.all(
    Object.keys(legalFiles).map(async (kind) =>
      absoluteLegalLinks((await legalMarkdown(kind, "en")).trim())
    )
  );

  return document([
    title(),
    summary(),
    list(
      pages.map(
        ([enTitle, zhTitle, slug]) =>
          `- [${enTitle}](${pageUrl("en", slug)}) · [${zhTitle}](${pageUrl("zh", slug)})`
      )
    ),
    ...homeText(),
    ...legal,
  ]);
}

// ---- 写出或比对 ----

const check = process.argv.includes("--check");
const problems = [];

for (const [file, build] of Object.entries(OUTPUTS)) {
  const text = await build();
  if (!text.startsWith(`${title()}\n`)) {
    throw new Error(`${file} 第一行不是 ${title()}，不合 llmstxt.org 的格式`);
  }
  const generated = Buffer.from(text, "utf8");
  const target = path.join(ROOT, file);
  if (!check) {
    await writeFile(target, generated);
    const lines = generated.toString("utf8").split("\n").length - 1;
    console.log(`已生成 ${file}（${lines} 行）`);
    continue;
  }
  const current = await readFile(target).catch(() => null);
  if (current === null) {
    problems.push(`${file} 不存在`);
  } else if (!current.equals(generated)) {
    const ours = generated.toString("utf8").split("\n");
    const theirs = current.toString("utf8").split("\n");
    const line = ours.findIndex((text, i) => text !== theirs[i]);
    problems.push(
      `${file} 与生成结果不一致，第一处在第 ${(line === -1 ? ours.length : line) + 1} 行`
    );
  }
}

if (problems.length > 0) {
  console.error(`llms 一致性门未过，${problems.length} 处：`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    "\n这两份由 scripts/build-llms.mjs 生成，不手改。先跑 npm run llms:build，再把生成物一并提交。"
  );
  process.exit(1);
}

if (check) {
  console.log(
    "llms 一致性门通过：public/llms.txt 与 public/llms-full.txt 与生成结果逐字节一致"
  );
}
