import { AllCategoriesResponse, SubAndCategoriesTable } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { customFetch } from "@/src/services/rest.service";

const getCategories = async () => {
  const {
    data: { data },
    error,
    success
  } = await customFetch<AllCategoriesResponse>(
    `${process.env.MY_DFS_HOST}/category`,
    {
      cache: "no-cache"
    },
    { data: [] }
  );

  return { data: data, error, success };
};

const Categories = async () => {
  const { data: categories, error } = await getCategories();

  if (error) return <ErrorResponsePage />;

  return <SubAndCategoriesTable categories={categories} />;
};

export default Categories;
