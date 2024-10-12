import { SingleCategory, SubAndCategoriesTable } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { CustomResponse } from "@/src/interfaces/CustomResponse";

const getCategories = async (): Promise<CustomResponse<SingleCategory[]>> => {
  const { data } = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category`,
    { cache: "no-cache" }
  ).then(resp => resp.json());

  return { data, error: false, success: true };
};

const Categories = async () => {
  const { data: categories, error } = await getCategories();

  if (error) return <ErrorResponsePage />;

  return <SubAndCategoriesTable categories={categories} />;
};

export default Categories;
