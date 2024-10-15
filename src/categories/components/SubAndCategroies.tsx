"use client";

import { Tabs } from "flowbite-react";
import { SingleCategory } from "../interfaces/category.interface";
import { CategoriesTable } from "../";
import { SubcategoriesTable } from "./SubcategoriesTable";

interface Props {
  categories: SingleCategory[];
}

export const SubAndCategoriesTable = ({ categories }: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      <Tabs className="w-full" variant="fullWidth">
        <Tabs.Item title="Categorias">
          <CategoriesTable categories={categories} />
        </Tabs.Item>
        <Tabs.Item title="SubCategorias">
          <SubcategoriesTable categories={categories} />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};
