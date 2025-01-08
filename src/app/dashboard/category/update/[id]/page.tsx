import { AllCategoriesResponse, UpdateCategoryForm } from "@/src/categories";
import { customFetch } from "@/src/services/rest.service";

interface Props {
  params: {
    id: string;
  };
}

const getCategory = async (id: number) => {
  const {
    data: { data },
    error,
    success
  } = await customFetch<AllCategoriesResponse>(`category`, {
    cache: "no-cache"
  });

  return { data: data.filter(c => c.id === id)[0], error, success };
};

const UpdateCategoryPage = async ({ params: { id } }: Props) => {
  const { data: categoryToUpdate } = await getCategory(+id);

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateCategoryForm categoryToUpdate={categoryToUpdate} />;
    </div>
  );
};

export default UpdateCategoryPage;
