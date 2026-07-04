import type { ReactNode } from "react";

type SectionsData = {
  title: string;
  effectiveDate: string;
  sections: { heading: string; content: string }[];
};

/** Generic sections-based legal page renderer (Privacy / Terms). */
export function LegalSections({ data }: { data: SectionsData }): ReactNode {
  return (
    <section className="bg-background text-foreground relative w-full">
      <div className="flex items-center justify-center px-6 sm:px-8">
        <div className="w-full max-w-270">
          <div className="px-8 py-24 sm:px-12 lg:py-32">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {data.title}
              </h1>
              <p className="text-foreground/50 mb-12 text-sm">
                {data.effectiveDate}
              </p>

              <div className="space-y-10">
                {data.sections.map((section) => (
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
