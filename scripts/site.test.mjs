/**
 * 构建产物的门，跑在 `npm run build` 之后，读 out/：
 * - 404 是一份完整文档，只带 noindex，不带 canonical；
 * - 常见问题的答案与四件工具的展开文字进了静态 HTML，不开 JS 也读得到；
 * - 分享卡是 PNG，_headers 给它的路径写了 image/png；
 * - 每个页面恰好一枚 og:image 与一枚 twitter:image，指向本语言的卡图：子页一声明 openGraph
 *   就会盖掉按文件约定挂的图，漏写的页面分享出去没有卡；
 * - 浏览器地址栏的 themeColor 与 globals.css 的 --background 是同一对颜色。
 */
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const { siteConfig } = await import("../lib/config.ts");
const { zh } = await import("../lib/i18n/zh.ts");
const { en } = await import("../lib/i18n/en.ts");

const read = (path, encoding = "utf8") =>
  readFile(new URL(`../${path}`, import.meta.url), encoding);

/** 去标签、解实体、去空白后的正文，用来判断一段文字在不在页面里。 */
function textOf(html) {
  return squash(
    html
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
        String.fromCodePoint(parseInt(hex, 16))
      )
      .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
  );
}

const squash = (text) => text.replace(/[\s ]+/g, "");

test("404 是完整文档：一个标题、只有 noindex、没有 canonical", async () => {
  const html = await read("out/404.html");
  assert.match(html, /^<!DOCTYPE html><html lang="/);
  assert.equal(html.match(/<title>/g)?.length, 1);
  const robots = [...html.matchAll(/<meta name="robots" content="([^"]+)"/g)];
  assert.deepEqual(
    robots.map((match) => match[1]),
    ["noindex"]
  );
  assert.doesNotMatch(html, /rel="canonical"/);
});

for (const [locale, t] of [
  ["zh", zh],
  ["en", en],
]) {
  test(`${locale} 首页的静态 HTML 里有常见问题答案与工具展开文字`, async () => {
    const text = textOf(await read(`out/${locale}.html`));
    for (const item of t.faq.items) {
      assert.ok(text.includes(squash(item.answer)), item.question);
    }
    for (const card of t.tools.cards) {
      assert.ok(text.includes(squash(card.detail)), card.name);
    }
  });

  test(`${locale} 每个页面恰好一枚 og:image 与一枚 twitter:image，指向本语言卡图`, async () => {
    const card = `${siteConfig.url}/${locale}/opengraph-image`;
    const pages = [
      `out/${locale}.html`,
      ...(await readdir(new URL(`../out/${locale}/`, import.meta.url)))
        .filter((name) => name.endsWith(".html"))
        .map((name) => `out/${locale}/${name}`),
    ];
    assert.ok(pages.length > 1, `out/${locale}/ 下没有子页`);
    for (const page of pages) {
      const html = await read(page);
      for (const tag of [
        /<meta property="og:image" content="([^"]*)"/g,
        /<meta name="twitter:image" content="([^"]*)"/g,
      ]) {
        const found = [...html.matchAll(tag)].map((match) => match[1]);
        assert.deepEqual(found, [card], `${page} ${tag.source}`);
      }
    }
  });

  test(`${locale} 分享卡是 PNG`, async () => {
    const image = await read(`out/${locale}/opengraph-image`, null);
    assert.deepEqual(
      [...image.subarray(0, 8)],
      [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
    );
  });
}

test("_headers 给分享卡写了 image/png", async () => {
  const headers = await read("out/_headers");
  assert.match(
    headers,
    /^\/:locale\/opengraph-image\n {2}Content-Type: image\/png$/m
  );
});

test("themeColor 与 globals.css 的 --background 一致", async () => {
  const css = await read("app/globals.css");
  const background = css.match(
    /--background: light-dark\((#[0-9a-f]{6}), (#[0-9a-f]{6})\);/i
  );
  assert.ok(background, "globals.css 里找不到 --background: light-dark(…)");
  assert.deepEqual(
    [background[1], background[2]],
    [siteConfig.themeColor.light, siteConfig.themeColor.dark]
  );
});
