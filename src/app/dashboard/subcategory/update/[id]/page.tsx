import { SubCategory, UpdateSubcategoryForm } from "@/src/categories";

interface Props {
  params: { id: string };
}

const getSubcategory = async (id: string): Promise<SubCategory> => {
  const resp = await fetch(
    `${process.env.PROJECT_PROTOCOL}://${process.env.PROJECT_HOST}/subcategory/${id}`,
    { cache: "no-cache" }
  );

  const data = (await resp.json()) as SubCategory;

  return data;
};

const UpdateSubcategoryPage = async ({ params: { id } }: Props) => {
  const subcategory = await getSubcategory(id);

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateSubcategoryForm subcategoryToUpdate={subcategory} />
    </div>
  );
};

export default UpdateSubcategoryPage;
