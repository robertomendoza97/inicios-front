import { SingleCategory } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { CustomResponse } from "@/src/interfaces/CustomResponse";
import { OneProductDetails } from "@/src/products";
import { UpdateProductForm } from "@/src/products/components/UpdateProductForm";

interface Props {
  params: {
    id: string;
  };
}
const getCategories = async (): Promise<CustomResponse<SingleCategory[]>> => {
  try {
    const resp = await fetch(`${process.env.MY_DFS_HOST}/category`, {
      cache: "no-cache"
    });

    const data = await resp.json();

    return { data, error: false, success: true };
  } catch (error) {
    console.log(error);
    return { data: [], error: true, success: false };
  }
};

const getProductInformation = async (
  id: string
): Promise<OneProductDetails> => {
  const data = await fetch(`${process.env.MY_DFS_HOST}/product/${id}`).then(
    resp => resp.json()
  );

  return data as OneProductDetails;
};

const UpdateProductPage = async ({ params }: Props) => {
  const { data, error } = await getCategories();
  const details = await getProductInformation(params.id);

  if (error) return <ErrorResponsePage />;

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateProductForm categories={data} details={details} />;
    </div>
  );
};

export default UpdateProductPage;
