import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
};

function TableEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-white/10 bg-[#0a0a0b]/60 px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <span className="font-mono text-lg text-muted">—</span>
      </div>
      <p className="text-sm font-medium text-foreground">{message}</p>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Partage ton lien de don pour voir apparaître tes premiers résultats ici.
      </p>
    </div>
  );
}

function MobileDataList<T>({
  columns,
  rows,
  rowKey,
  emptyMessage,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="md:hidden">
        <TableEmptyState message={emptyMessage ?? "Aucune donnée"} />
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/10 md:hidden">
      {rows.map((row) => (
        <li key={rowKey(row)} className="py-4">
          <dl className="space-y-2">
            {columns.map((col) => (
              <div key={col.key} className="flex gap-3 text-sm">
                <dt className="w-24 shrink-0 text-muted">{col.header}</dt>
                <dd className="min-w-0 text-foreground">{col.render(row)}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = "Aucune donnée",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <TableEmptyState message={emptyMessage} />;
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-muted">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`pb-3 font-medium ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-white/10 last:border-0"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3 pr-4 text-foreground ${col.className ?? ""}`}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MobileDataList
        columns={columns}
        rows={rows}
        rowKey={rowKey}
        emptyMessage={emptyMessage}
      />
    </>
  );
}