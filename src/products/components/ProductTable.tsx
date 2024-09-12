"use client";

import { CustomTable } from "@/src/components";
import { SingleProduct } from "@/src/products/";
import { actionsFunction, formatProducts } from "../utils/formatProducts";

interface Props {
  products: SingleProduct[];
}
const tableColumns = [
  { key: "cod", name: "Codigo" },
  { key: "name", name: "Nombre" },
  { key: "stock", name: "Cantidad" },
  { key: "retailCost", name: "Precio" },
  { key: "currency", name: "Moneda" },
  {
    key: "actions",
    name: "Acciones",
    f: actionsFunction
  }
];

export const ProductTable = ({ products }: Props) => {
  return (
    <div className="h-full">
      <CustomTable
        title="Productos"
        column={tableColumns}
        data={formatProducts(products)}
      />
    </div>
  );
};
