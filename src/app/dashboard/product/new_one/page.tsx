import { SingleCategory } from "@/src/categories";
import { CreateProductForm } from "@/src/products";

const getCategories = async (): Promise<SingleCategory[]> => {
  const { data } = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category`,
    { cache: "no-cache" }
  ).then(resp => resp.json());

  return data as SingleCategory[];
};

const page = async () => {
  const categories = await getCategories();

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <CreateProductForm categories={categories} />
    </div>
  );
};

export default page;
