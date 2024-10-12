import { SingleCategory } from "@/src/categories";
import { OneProductDetails } from "@/src/products";
import { UpdateProductForm } from "@/src/products/components/UpdateProductForm";

interface Props {
  params: {
    id: string;
  };
}
const getCategories = async (): Promise<SingleCategory[]> => {
  const { data } = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category`,
    { cache: "no-cache" }
  ).then(resp => resp.json());

  return data as SingleCategory[];
};

const getProductInformation = async (
  id: string
): Promise<OneProductDetails> => {
  const data = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/product/${id}`
  ).then(resp => resp.json());

  return data as OneProductDetails;
};

const UpdateProductPage = async ({ params }: Props) => {
  const categories = await getCategories();
  const details = await getProductInformation(params.id);

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateProductForm categories={categories} details={details} />;
    </div>
  );
};

export default UpdateProductPage;
