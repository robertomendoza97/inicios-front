import { SingleCategory } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { OneProductDetails } from "@/src/products";
import { UpdateProductForm } from "@/src/products/components/UpdateProductForm";
import { customFetch } from "@/src/services/rest.service";

interface Props {
  params: {
    id: string;
  };
}
const getCategories = async () => {
  const {
    data: { data },
    error,
    success
  } = await customFetch<{
    data: SingleCategory[];
  }>("category", {
    cache: "no-cache"
  });

  return { data, error, success };
};

const getProductInformation = async (id: string) => {
  const { data, error, success } = await customFetch<OneProductDetails>(
    `product/${id}`,
    {
      cache: "no-cache"
    }
  );

  return { data, error, success };
};

const UpdateProductPage = async ({ params }: Props) => {
  const { data, error } = await getCategories();
  const { data: details, error: productError } = await getProductInformation(
    params.id
  );

  if (error || productError) return <ErrorResponsePage />;

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateProductForm categories={data} details={details} />;
    </div>
  );
};

export default UpdateProductPage;
