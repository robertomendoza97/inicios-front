import { CustomTable } from "@/src/components";
import { IProductsResponse } from "@/src/products/";
import { SingleProduct } from "@/src/products/";

const getProducts = async (): Promise<SingleProduct[]> => {
  const { data }: IProductsResponse = await fetch(
    `http://localhost:3333/administration-system/api/product`
  ).then(resp => resp.json());

  return data;
};

const tableColumns = [
  { key: "cod", name: "Codigo" },
  { key: "name", name: "Nombre" },
  { key: "stock", name: "Cantidad" },
  { key: "retailCost", name: "Precio" },
  { key: "details", name: "Detalles" }
];

export const ProductTable = async () => {
  const products = await getProducts();

  return (
    <div>
      <CustomTable column={tableColumns} data={products} />
    </div>
  );
};
