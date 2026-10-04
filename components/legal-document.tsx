import { renderLegal } from "@/lib/legal";
import type { LegalKind } from "@/lib/legal-files";
import type { Locale } from "@/lib/locale";
import type { ReactNode } from "react";

/**
 * 隐私政策与使用条款：构建时渲染 content/legal/ 的 Markdown。h1 用文件的
 * 一级标题，“最后更新”那一行是正文第一段，原样显示。
 */
export function LegalDocument({
  kind,
  locale,
}: {
  kind: LegalKind;
  locale: Locale;
}): ReactNode {
  const { title, html } = renderLegal(kind, locale);
  return (
    <section className="bg-background text-foreground relative w-full">
      <div className="flex items-center justify-center px-6 sm:px-8">
        <div className="w-full max-w-270">
          <div className="px-8 py-24 sm:px-12 lg:py-32">
            <article className="mx-auto max-w-3xl">
              <h1 className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <div
                className="legal-prose"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
