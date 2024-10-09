"use client";

import { CustomTable } from "@/src/components";

import { actionsFunction, formatProducts } from "../utils/formatProducts";
import { formatNumberToPrice } from "@/src/utils";
import { PATHS } from "@/src/utils/paths";
import { SingleProductFromAPI } from "../interfaces/single-product.interface";

interface Props {
  products: SingleProductFromAPI[];
}

const tableColumns = [
  { key: "cod", name: "Codigo", index: true },
  { key: "name", name: "Nombre", sort: true, index: true },
  { key: "stock", name: "Cantidad", sort: true, index: true },
  {
    key: "costPrice",
    name: "Precio de costo",
    sort: true,
    component: (value: string | number) => (
      <>{formatNumberToPrice(+value, "$", true)}</>
    )
  },
  {
    key: "retailPrice",
    name: "Precio de venta",
    sort: true,
    component: (value: string | number) => (
      <>{formatNumberToPrice(+value, "$", true)}</>
    )
  },
  {
    key: "subCategory",
    name: "Categoria",
    sort: true,
    index: true
  },
  {
    key: "actions",
    name: "Acciones",
    component: actionsFunction
  }
];

export const ProductTable = ({ products }: Props) => {
  return (
    <div className="h-full">
      <CustomTable
        path={PATHS.PRODUCTS.CREATE}
        title="Productos"
        column={tableColumns}
        data={formatProducts(products)}
      />
    </div>
  );
};
