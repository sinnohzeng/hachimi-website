/**
 * 隐私政策与使用条款的镜像文件表。content/legal/ 下的四份与 hachimi-ios
 * docs/legal/ 同名文件逐字相同，scripts/legal-sync.mjs 负责复制与比对。
 */
export const legalFiles = {
  privacy: { zh: "privacy-policy.zh-Hans.md", en: "privacy-policy.en.md" },
  terms: {
    zh: "terms-and-disclaimer.zh-Hans.md",
    en: "terms-and-disclaimer.en.md",
  },
} as const;

export type LegalKind = keyof typeof legalFiles;

/** 文件里“最后更新”那一行的日期（YYYY-MM-DD），找不到返回 null。 */
export function lastUpdatedOf(markdown: string): string | null {
  const match = markdown.match(
    /^\*\*(?:最后更新|Last updated)[:：]\s*(\d{4}-\d{2}-\d{2})\*\*\s*$/m
  );
  return match?.[1] ?? null;
}
