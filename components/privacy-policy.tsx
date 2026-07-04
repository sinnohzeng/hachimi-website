import type { Translations } from "@/lib/i18n";
import type { ReactNode } from "react";

export function PrivacyPolicy({ t }: { t: Translations }): ReactNode {
  return (
    <section className="bg-background text-foreground relative w-full">
      <div className="flex items-center justify-center px-6 sm:px-8">
        <div className="w-full max-w-270">
          <div className="px-8 py-24 sm:px-12 lg:py-32">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {t.privacy.title}
              </h1>
              <p className="text-foreground/50 mb-12 text-sm">
                {t.privacy.effectiveDate}
              </p>

              <div className="space-y-10">
                {t.privacy.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-foreground mb-3 text-lg font-semibold">
                      {section.heading}
                    </h2>
                    <div className="text-foreground/70 text-sm leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
