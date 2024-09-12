"use client";

import { CustomTable } from "@/src/components";
import { SingleProduct } from "@/src/products/";
import { actionsFunction, formatProducts } from "../utils/formatProducts";
import { formatNumberToPrice } from "@/src/utils";
import { PATHS } from "@/src/utils/paths";

interface Props {
  products: SingleProduct[];
}

const tableColumns = [
  { key: "cod", name: "Codigo" },
  { key: "name", name: "Nombre", sort: true, index: true },
  { key: "stock", name: "Cantidad", sort: true, index: true },
  {
    key: "retailCost",
    name: "Precio",
    sort: true,
    component: (value: string | number) => <>{formatNumberToPrice(+value)}</>
  },
  { key: "currency", name: "Moneda", index: true },
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
        path={PATHS.ADD_USER}
        title="Productos"
        column={tableColumns}
        data={formatProducts(products)}
      />
    </div>
  );
};
