import { SingleCategory } from "@/src/categories";
import { CreateUserForm } from "@/src/products";

const getCategories = async (): Promise<SingleCategory[]> => {
  const { data } = await fetch(
    "http://localhost:3333/administration-system/api/category",
    { cache: "no-cache" }
  ).then(resp => resp.json());

  return data as SingleCategory[];
};

const page = async () => {
  const categories = await getCategories();

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <CreateUserForm categories={categories} />
    </div>
  );
};

export default page;
