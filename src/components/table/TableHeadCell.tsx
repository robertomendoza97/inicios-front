"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { Column } from "./CustomTable";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  col: Column;
  setAllRows: Dispatch<SetStateAction<Record<string, string | number>[]>>;
  rows: Record<string, string | number>[];
}

export const TableHeadCell = ({ col, setAllRows, rows }: Props) => {
  const [sorted, setSorted] = useState<boolean>(true);

  const handleSort = (key: string) => {
    const newRows = rows.sort((a, b) => {
      const aString = String(a[key]);
      const bString = String(b[key]);

      return sorted
        ? bString.localeCompare(aString, undefined, {
            numeric: true,
            sensitivity: "base"
          })
        : aString.localeCompare(bString, undefined, {
            numeric: true,
            sensitivity: "base"
          });
    });

    setAllRows([...newRows]);

    setSorted(!sorted);
  };

  return (
    <th key={col.key} className="p-2 whitespace-nowrap text-white">
      <div
        onClick={() => col.sort && handleSort(col.key)}
        className={`font-semibold flex items-center justify-center gap-1  ${
          col.sort && "cursor-pointer"
        }`}
      >
        {col.sort && (
          <IoIosArrowDown
            className={`transition-[transform] ${sorted ? "scale-[-1]" : ""}`}
          />
        )}
        {col.name}
      </div>
    </th>
  );
};
