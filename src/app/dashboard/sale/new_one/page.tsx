import { ErrorResponsePage } from "@/src/components";
import { IProductsResponse } from "@/src/products";
import { Invoice, ProductSection } from "@/src/sales";
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

const NewSalePage = async () => {
  const { data: products, error } = await getProducts();

  if (error) return <ErrorResponsePage />;

  return (
    <div className="w-full h-full flex">
      <ProductSection products={products} />
      <Invoice />
    </div>
  );
};

export default NewSalePage;
