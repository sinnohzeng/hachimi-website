import type { LegalPage } from "@/lib/i18n/types";
import type { ReactNode } from "react";

export function LegalPageContent({ data }: { data: LegalPage }): ReactNode {
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
                {/* Introduction */}
                <div className="text-foreground/70 text-sm leading-relaxed">
                  {data.intro}
                </div>

                {/* Steps */}
                <div>
                  <h2 className="text-foreground mb-3 text-lg font-semibold">
                    {data.steps.heading}
                  </h2>
                  <ol className="text-foreground/70 list-inside list-decimal space-y-2 text-sm leading-relaxed">
                    {data.steps.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>

                {/* Data table */}
                <div>
                  <h2 className="text-foreground mb-3 text-lg font-semibold">
                    {data.dataTable.heading}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-foreground/10 border-b">
                          {data.dataTable.columns.map((col) => (
                            <th
                              key={col}
                              className="text-foreground/80 py-3 pr-4 text-left font-medium"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.dataTable.rows.map((row) => (
                          <tr
                            key={row.cells[0]}
                            className="border-foreground/5 border-b"
                          >
                            {row.cells.map((cell, i) => (
                              <td
                                key={`${row.cells[0]}-${i}`}
                                className={`py-3 pr-4 ${
                                  i === 0
                                    ? "text-foreground/80 font-medium"
                                    : "text-foreground/60"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Additional sections */}
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
