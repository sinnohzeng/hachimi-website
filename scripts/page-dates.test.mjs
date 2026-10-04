/**
 * 法律件日期门：同一份法律件的中英两版“最后更新”必须是同一天。sitemap 只读缺省语言
 * 那一份（lib/legal.ts 的 legalLastUpdated），两版不一致时这里报红。
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const { legalFiles, lastUpdatedOf } = await import("../lib/legal-files.ts");

for (const [kind, files] of Object.entries(legalFiles)) {
  test(`${kind} 的中英两版最后更新是同一天`, async () => {
    const dates = await Promise.all(
      Object.values(files).map(async (name) => {
        const markdown = await readFile(
          new URL(`../content/legal/${name}`, import.meta.url),
          "utf8"
        );
        const date = lastUpdatedOf(markdown);
        assert.notEqual(date, null, `content/legal/${name} 里找不到“最后更新”`);
        return date;
      })
    );
    assert.equal(new Set(dates).size, 1, `${kind}：${dates.join(" 与 ")}`);
  });
}
