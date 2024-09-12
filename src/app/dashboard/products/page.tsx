import { IProductsResponse, SingleProduct } from "@/src/products";
import { ProductTable } from "@/src/products/components/ProductTable";

const getProducts = async (): Promise<SingleProduct[]> => {
  const { data }: IProductsResponse = await fetch(
    `http://localhost:3333/administration-system/api/product`
  ).then(resp => resp.json());

  return data;
};

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col py-5">
      <ProductTable products={products} />
    </div>
  );
};

export default Products;
