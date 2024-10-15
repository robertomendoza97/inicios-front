import {
  AllCategoriesResponse,
  SingleCategory,
  UpdateCategoryForm
} from "@/src/categories";

interface Props {
  params: {
    id: string;
  };
}

const getCategory = async (id: number): Promise<SingleCategory> => {
  const { data } = (await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category`,
    { cache: "no-cache" }
  ).then(resp => resp.json())) as AllCategoriesResponse;

  return data.filter(c => c.id === id)[0];
};

const UpdateCategoryPage = async ({ params: { id } }: Props) => {
  const categoryToUpdate = await getCategory(+id);

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateCategoryForm categoryToUpdate={categoryToUpdate} />;
    </div>
  );
};

export default UpdateCategoryPage;
