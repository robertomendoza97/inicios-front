"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export interface Column {
  key: string;
  name: string;
  f?: (value: string | number) => ReactElement;
}

interface Props {
  column: Column[];
  data: Record<string, string | number>[];
  title: string;
}

export const CustomTable = ({ column, data, title }: Props) => {
  const [rows, setRows] = useState(data);
  const [search, setSearch] = useState("");

  console.log();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // setRows(data.filter(d => d.));
  };

  return (
    <section className="antialiased text-gray-600 h-full px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 flex items-center justify-between py-4 border-b border-gray-100">
            <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
            <div className="flex border-b-[1px] border-paletteColor3 gap-2 items-center px-4 py-2 rounded ">
              <input
                placeholder="Buscar"
                type="text"
                value={search}
                onChange={handleChange}
                className="outline-none bg-transparent"
              />
              <FaMagnifyingGlass className="text-paletteColor3" />
            </div>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-m font-semibold uppercase text-white bg-paletteColor1 rounded">
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
                <tbody className="text-lg divide-y divide-gray-100">
                  {rows.map(row => (
                    <tr key={row.id}>
                      {column.map(col => (
                        <td key={col.key} className="p-2 whitespace-nowrap">
                          {col.f ? col.f(row[col.key] as string) : row[col.key]}
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
