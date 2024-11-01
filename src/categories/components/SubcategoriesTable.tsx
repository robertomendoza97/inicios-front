"use client";

import { CustomTable } from "@/src/components";
import {
  formatSubcategoriesRows,
  SingleCategory,
  SUBCATEGORIES_LABELS,
  subcategoriesAction
} from "../";
import { PATHS } from "@/src/utils";

interface Props {
  categories: SingleCategory[];
}

export const SubcategoriesTable = ({ categories }: Props) => {
  const columns = [
    { key: "id", name: "ID", index: true },
    {
      key: "subcategory",
      name: "Nombre",
      index: true
    },
    {
      key: "category",
      name: "categoria",
      index: true
    },
    {
      key: "actions",
      name: "Acciones",
      component: subcategoriesAction
    }
  ];

  return (
    <CustomTable
      title={SUBCATEGORIES_LABELS.TABLE.TITLE}
      path={PATHS.SUBCATEGORIES.CREATE}
      column={columns}
      data={formatSubcategoriesRows(categories)}
    />
  );
};
