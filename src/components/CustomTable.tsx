"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { TableHeadCell } from "./";
import Link from "next/link";

export interface Column {
  key: string;
  name: string;
  component?: (value: string | number) => ReactElement;
  sort?: boolean;
  index?: boolean;
}

interface Props {
  column: Column[];
  data: Record<string, string | number>[];
  title: string;
  path: string;
}

export const CustomTable = ({ column, data, title, path }: Props) => {
  const [rows, setRows] = useState(data);
  const [search, setSearch] = useState("");

  const indexColumns = column.reduce<string[]>((acc, column) => {
    if (column.index) {
      acc.push(column.key);
    }

    return acc;
  }, []);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);

    if (Boolean(indexColumns.length)) {
      setRows(
        data.filter(d =>
          indexColumns.some(cs =>
            d[cs]?.toString().toLowerCase().includes(value.toLowerCase())
          )
        )
      );
    }
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
              <table className="table-auto w-full border-b-[1px]">
                <thead className="text-m font-semibold uppercase text-white bg-paletteColor1 rounded">
                  <tr>
                    {column.map(col => (
                      <TableHeadCell
                        key={col.key}
                        rows={rows}
                        col={col}
                        setRows={setRows}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody className="text-lg divide-y divide-gray-100">
                  {rows.map(row => (
                    <tr key={row.id}>
                      {column.map(col => (
                        <td
                          key={col.key}
                          className="p-2 whitespace-nowrap text-center"
                        >
                          {col.component
                            ? col.component(row[col.key] as string)
                            : row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between w-full mt-2 items-center">
                <Link
                  href={path}
                  className="px-4 py-2 bg-paletteColor5 rounded  text-lg"
                >
                  Crear registro
                </Link>
                <div>paginador</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
