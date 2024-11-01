import { ErrorResponsePage } from "@/src/components";
import { IProductsResponse, ProductTable } from "@/src/products";
import { customFetch } from "@/src/services/rest.service";

const getProducts = async () => {
  const {
    data: { data },
    success,
    error
  } = await customFetch<IProductsResponse>(
    "product",
    {
      cache: "no-cache"
    },
    { data: [] }
  );

  return { data, error, success };
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
