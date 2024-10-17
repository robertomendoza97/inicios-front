import { SingleCategory } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { CustomResponse } from "@/src/interfaces/CustomResponse";
import { CreateProductForm } from "@/src/products";

const getCategories = async (): Promise<CustomResponse<SingleCategory[]>> => {
  const { data } = await fetch(`${process.env.MY_DFS_HOST}/category`, {
    cache: "no-cache"
  }).then(resp => resp.json());

  return { data, error: false, success: true };
};

const page = async () => {
  const { data: categories, error } = await getCategories();

  if (error) return <ErrorResponsePage />;

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <CreateProductForm categories={categories} />
    </div>
  );
};

export default page;
