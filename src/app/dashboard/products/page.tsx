import { ErrorResponsePage } from "@/src/components";
import { CustomResponse } from "@/src/interfaces/CustomResponse";
import {
  IProductsResponse,
  ProductTable,
  SingleProductFromAPI
} from "@/src/products";

const getProducts = async (): Promise<
  CustomResponse<SingleProductFromAPI[]>
> => {
  try {
    const { data }: IProductsResponse = await fetch(
      `${process.env.MY_DFS_HOST}/product`,
      { cache: "no-cache" }
    ).then(resp => resp.json());

    return { data, error: false, success: true };
  } catch (error) {
    return { data: [], error: true, success: false };
  }
};

const Products = async () => {
  const { data: products, error } = await getProducts();

  if (error) return <ErrorResponsePage />;

  return (
    <div className="flex flex-col py-5">
      <ProductTable products={products} />
    </div>
  );
};

export default Products;
