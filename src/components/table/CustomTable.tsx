"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { COMPONENTS_LABELS, TABLE_COUNT_OPTIONS, TableHeadCell } from "../";
import Link from "next/link";
import { Button, Pagination, Select, Table, TextInput } from "flowbite-react";
import "./styles.css";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(TABLE_COUNT_OPTIONS[0]);
  const [allRows, setAllRows] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(
    data.slice(0, TABLE_COUNT_OPTIONS[0])
  );
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
      console.log(indexColumns);

      const newRows = data.filter(d =>
        indexColumns.some(cs =>
          d[cs]?.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setAllRows(newRows);

      setRowsPerPage(newRows.slice(0, count));
    }
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  const handleCount = (event: ChangeEvent<HTMLSelectElement>) => {
    setCount(+event.target.value);
  };

  useEffect(() => {
    const newRows = allRows.slice(0, count);
    setRowsPerPage(newRows);
    setCurrentPage(1);
  }, [count, allRows]);

  useEffect(() => {
    const newRows = allRows.slice(
      (currentPage - 1) * count,
      currentPage * count
    );

    setRowsPerPage(newRows);
  }, [currentPage, allRows, count]);

  return (
    <section className="antialiased text-gray-600 h-full px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 flex items-center justify-between py-4 border-b border-gray-100">
            <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
            <TextInput
              rightIcon={FaMagnifyingGlass}
              placeholder={COMPONENTS_LABELS.SEARCH}
              type="text"
              value={search}
              onChange={handleChange}
            />
          </header>
          <div className="p-3">
            <div className="overflow-x-auto flex flex-col gap-5">
              <Table striped>
                <Table.Head className="bg-paletteColor1">
                  {column.map(col => (
                    <TableHeadCell
                      key={col.key}
                      rows={rowsPerPage}
                      col={col}
                      setRows={setRowsPerPage}
                    />
                  ))}
                </Table.Head>
                <Table.Body>
                  {rowsPerPage.map(row => (
                    <Table.Row key={row.id}>
                      {column.map(col => (
                        <Table.Cell
                          key={col.key}
                          className="p-2 whitespace-nowrap text-center"
                        >
                          {col.component
                            ? col.component(row[col.key] as string)
                            : row[col.key]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div className="flex justify-between w-full mt-2 items-center px-5 pb-5">
                <Link href={path}>
                  <Button>{COMPONENTS_LABELS.CREATE_RECORD}</Button>
                </Link>
                <div className="flex items-center gap-5">
                  <Select defaultValue={count} onChange={handleCount}>
                    {TABLE_COUNT_OPTIONS.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  <Pagination
                    className="paginator"
                    currentPage={currentPage}
                    totalPages={Math.ceil(allRows.length / count)}
                    showIcons
                    onPageChange={onPageChange}
                    nextLabel={COMPONENTS_LABELS.NEXT}
                    previousLabel={COMPONENTS_LABELS.PREVIOUS}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
