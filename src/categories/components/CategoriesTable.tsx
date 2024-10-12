"use client";

import { CustomTable } from "@/src/components";
import { CATEGORIES_LABELS, formatCategoriesRows, SingleCategory } from "../";
import { categoriesAction } from "../utils/categoriesActions";
import { PATHS } from "@/src/utils";

interface Props {
  categories: SingleCategory[];
}

export const CategoriesTable = ({ categories }: Props) => {
  const columns = [
    { key: "id", name: "ID", index: true },
    {
      key: "name",
      name: "Nombre",
      idex: true
    },
    {
      key: "numberOfSubcategories",
      name: "Cantidad de subcategorias"
    },
    {
      key: "actions",
      name: "Acciones",
      component: categoriesAction
    }
  ];

  return (
    <CustomTable
      title={CATEGORIES_LABELS.TABLE.TITLE}
      path={PATHS.CATEGORIES.CREATE}
      column={columns}
      data={formatCategoriesRows(categories)}
    />
  );
};
