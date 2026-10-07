import { LOCALES, type Locale } from "./locale.ts";

/**
 * 隐私政策与使用条款的镜像文件表。content/legal/ 下的四份与 hachimi-ios
 * docs/legal/ 同名文件逐字相同，scripts/legal-sync.mjs 负责复制与比对。
 * 文件名是“名字.语言后缀.md”，语言后缀就是 LOCALES 里的 htmlLang。
 */
const LEGAL_NAMES = {
  privacy: "privacy-policy",
  terms: "terms-and-disclaimer",
} as const;

export type LegalKind = keyof typeof LEGAL_NAMES;

export const legalFiles = Object.fromEntries(
  Object.entries(LEGAL_NAMES).map(([kind, name]) => [
    kind,
    Object.fromEntries(
      Object.entries(LOCALES).map(([locale, { htmlLang }]) => [
        locale,
        `${name}.${htmlLang}.md`,
      ])
    ),
  ])
) as Record<LegalKind, Record<Locale, string>>;

const routeOfFile = new Map<string, string>(
  Object.entries(legalFiles).flatMap(([kind, files]) =>
    Object.entries(files).map(
      ([locale, file]) => [file, `/${locale}/${kind}`] as const
    )
  )
);

/**
 * 法律件里一条链接的落点。外链、站内绝对路径与页内锚点原样返回；指向另一份法律件的
 * 相对链接改成它的站内路由，给了 `origin` 就拼成绝对网址。页面渲染（lib/legal.ts）与
 * llms 文件（scripts/build-llms.mjs）共用这一份，对不上任何一份法律件就抛错。
 */
export function legalHref(href: string, origin = ""): string {
  if (/^([a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return href;
  const [file = "", hash] = href.split("#");
  const route = routeOfFile.get(file);
  if (!route) {
    throw new Error(`content/legal 里的相对链接对不上站内路由：${href}`);
  }
  return `${origin}${route}${hash ? `#${hash}` : ""}`;
}

/** 文件里“最后更新”那一行的日期（YYYY-MM-DD），找不到返回 null。 */
export function lastUpdatedOf(markdown: string): string | null {
  const match = markdown.match(
    /^\*\*(?:最后更新|Last updated)[:：]\s*(\d{4}-\d{2}-\d{2})\*\*\s*$/m
  );
  return match?.[1] ?? null;
}
