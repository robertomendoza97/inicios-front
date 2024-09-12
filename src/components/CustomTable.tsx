import { ReactElement } from "react";

export interface BaseWithId extends Record<string, unknown> {
  id: string;
}

export interface Column {
  key: string;
  name: string;
}

interface Props<T extends BaseWithId> {
  column: Column[];
  data: T[];
}

export const CustomTable = <T extends BaseWithId>({
  column,
  data
}: Props<T>) => {
  return (
    <section className="antialiased text-gray-600 h-full px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Clientes</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    {column.map(col => (
                      <th key={col.key} className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          {col.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data.map(row => (
                    <tr key={row.id}>
                      {column.map(col => (
                        <td key={col.key} className="p-2 whitespace-nowrap">
                          {row[col.key] as ReactElement}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
