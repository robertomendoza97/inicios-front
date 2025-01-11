import { SubCategory, UpdateSubcategoryForm } from "@/src/categories";
import { customFetch } from "@/src/services/rest.service";

interface Props {
  params: { id: string };
}

const getSubcategory = async (id: string) => {
  const { data, error, success } = await customFetch<SubCategory>(
    `subcategory/${id}`,
    {
      cache: "no-cache"
    }
  );

  return { data, error, success };
};

const UpdateSubcategoryPage = async ({ params: { id } }: Props) => {
  const { data: subcategory } = await getSubcategory(id);

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateSubcategoryForm subcategoryToUpdate={subcategory} />
    </div>
  );
};

export default UpdateSubcategoryPage;
