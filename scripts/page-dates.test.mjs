/**
 * 日期一致性门：lib/config.ts 的 pageDates 是 sitemap 与结构化数据的日期，
 * 必须等于页面上看得到的“最后更新”。隐私页与条款页取 content/legal/ 里
 * Markdown 的那一行，删除数据页、支持页与方法论页取 lib/i18n 的中英两句。
 * 任何一处对不上，npm run check 报红。
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const { pageDates } = await import("../lib/config.ts");
const { legalFiles, lastUpdatedOf } = await import("../lib/legal-files.ts");
const { zh } = await import("../lib/i18n/zh.ts");
const { en } = await import("../lib/i18n/en.ts");

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function iso(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * 页面可见日期转成 YYYY-MM-DD。认三种写法：“2026 年 10 月 1 日”、
 * “October 1, 2026”、“14 September 2026”；都认不出返回 null。
 */
function visibleDateOf(text) {
  const zhDate = text.match(/(\d{4}) 年 (\d{1,2}) 月 (\d{1,2}) 日/);
  if (zhDate) return iso(zhDate[1], zhDate[2], zhDate[3]);
  const names = MONTHS.join("|");
  const monthFirst = text.match(new RegExp(`(${names}) (\\d{1,2}), (\\d{4})`));
  if (monthFirst) {
    return iso(monthFirst[3], MONTHS.indexOf(monthFirst[1]) + 1, monthFirst[2]);
  }
  const dayFirst = text.match(new RegExp(`(\\d{1,2}) (${names}) (\\d{4})`));
  if (dayFirst) {
    return iso(dayFirst[3], MONTHS.indexOf(dayFirst[2]) + 1, dayFirst[1]);
  }
  return null;
}

for (const [kind, files] of Object.entries(legalFiles)) {
  test(`pageDates.${kind} 等于 Markdown 里的“最后更新”`, async () => {
    for (const name of Object.values(files)) {
      const markdown = await readFile(
        path.join(ROOT, "content/legal", name),
        "utf8"
      );
      const date = lastUpdatedOf(markdown);
      assert.notEqual(date, null, `content/legal/${name} 里找不到“最后更新”`);
      assert.equal(
        pageDates[kind],
        date,
        `pageDates.${kind} 与 content/legal/${name} 的最后更新不一致`
      );
    }
  });
}

const visible = {
  dataDeletion: (t) => t.dataDeletion.effectiveDate,
  support: (t) => t.support.effectiveDate,
  methodology: (t) => t.methodology.lastUpdated,
};

for (const [kind, pick] of Object.entries(visible)) {
  test(`pageDates.${kind} 等于页面上的中英“最后更新”`, () => {
    for (const [locale, t] of [
      ["zh", zh],
      ["en", en],
    ]) {
      const text = pick(t);
      const date = visibleDateOf(text);
      assert.notEqual(date, null, `lib/i18n/${locale}.ts 认不出日期：${text}`);
      assert.equal(
        pageDates[kind],
        date,
        `pageDates.${kind} 与 lib/i18n/${locale}.ts 的“${text}”不一致`
      );
    }
  });
}

test("三种日期写法都认得出", () => {
  assert.equal(visibleDateOf("最后更新：2026 年 10 月 1 日"), "2026-10-01");
  assert.equal(visibleDateOf("Last updated: October 1, 2026"), "2026-10-01");
  assert.equal(visibleDateOf("Last updated 14 September 2026"), "2026-09-14");
  assert.equal(visibleDateOf("Last updated soon"), null);
});
