import { readFileSync } from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";
import { legalFiles, type LegalKind } from "./legal-files.ts";

/**
 * 构建时把 content/legal/ 的 Markdown 渲染成 HTML，只在服务端组件里调用，
 * marked 不进客户端包。
 *
 * 渲染处理三件事：文中指向另一份法律件的相对链接改写成站内路由；表格的每个
 * td 带上对应表头作 data-label，窄屏按行堆叠成卡片（globals.css 的
 * .stack-table）；一级标题取出来作页面的 h1。
 */

const routeOfFile = new Map<string, string>(
  Object.entries(legalFiles).flatMap(([kind, files]) =>
    Object.entries(files).map(
      ([locale, file]) => [file, `/${locale}/${kind}`] as const
    )
  )
);

function siteHref(href: string): string {
  if (/^([a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return href;
  const [file = "", hash] = href.split("#");
  const route = routeOfFile.get(file);
  if (!route) {
    throw new Error(`content/legal 里的相对链接对不上站内路由：${href}`);
  }
  return hash ? `${route}#${hash}` : route;
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const marked = new Marked({
  gfm: true,
  // 联系方式那段是公司名与邮箱两行，单换行照原样断开。
  breaks: true,
  renderer: {
    link(token) {
      const text = this.parser.parseInline(token.tokens);
      return `<a href="${escapeAttribute(siteHref(token.href))}">${text}</a>`;
    },
    table(token) {
      const labels = token.header.map((cell) =>
        this.parser.parseInline(cell.tokens, this.parser.textRenderer)
      );
      const head = token.header
        .map(
          (cell) =>
            `<th role="columnheader">${this.parser.parseInline(cell.tokens)}</th>`
        )
        .join("");
      const body = token.rows
        .map(
          (row) =>
            `<tr role="row">${row
              .map(
                (cell, i) =>
                  `<td role="cell" data-label="${escapeAttribute(labels[i] ?? "")}">${this.parser.parseInline(cell.tokens)}</td>`
              )
              .join("")}</tr>`
        )
        .join("\n");
      return `<table class="stack-table" role="table"><thead role="rowgroup"><tr role="row">${head}</tr></thead><tbody role="rowgroup">${body}</tbody></table>\n`;
    },
  },
});

export function renderLegal(
  kind: LegalKind,
  locale: string
): { title: string; html: string } {
  const file = legalFiles[kind][locale === "zh" ? "zh" : "en"];
  const markdown = readFileSync(
    path.join(process.cwd(), "content", "legal", file),
    "utf8"
  );
  const tokens = marked.lexer(markdown);
  const index = tokens.findIndex(
    (token) => token.type === "heading" && token.depth === 1
  );
  if (index === -1) throw new Error(`content/legal/${file} 缺一级标题`);
  const [heading] = tokens.splice(index, 1) as [Tokens.Heading];
  return { title: heading.text, html: marked.parser(tokens) };
}
