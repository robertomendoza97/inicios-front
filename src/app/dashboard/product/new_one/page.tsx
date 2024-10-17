import { SingleCategory } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { CustomResponse } from "@/src/interfaces/CustomResponse";
import { CreateProductForm } from "@/src/products";

const getCategories = async (): Promise<CustomResponse<SingleCategory[]>> => {
  try {
    const resp = await fetch(`${process.env.MY_DFS_HOST}/category`, {
      cache: "no-cache"
    });

    const { data } = await resp.json();

    return { data, error: false, success: true };
  } catch (error) {
    console.log(error);
    return { data: [], error: true, success: false };
  }
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
