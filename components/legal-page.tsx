import type { LegalPage } from "@/lib/i18n/types";
import type { ReactNode } from "react";

function ContactTable({
  table,
}: {
  table: NonNullable<LegalPage["table"]>;
}): ReactNode {
  return (
    <div>
      <h2 className="text-foreground mb-3 text-lg font-semibold">
        {table.heading}
      </h2>
      {/* 窄屏按行堆叠成卡片，每格前写表头（globals.css 的 .stack-table）。 */}
      <table className="stack-table" role="table">
        <thead role="rowgroup">
          <tr role="row">
            {table.columns.map((col) => (
              <th key={col} role="columnheader">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {table.rows.map((row) => (
            <tr key={row.cells[0]} role="row">
              {row.cells.map((cell, i) => (
                <td
                  key={`${row.cells[0]}-${i}`}
                  role="cell"
                  data-label={table.columns[i]}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

                {data.table ? <ContactTable table={data.table} /> : null}

                {data.sections?.map((section) => (
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
