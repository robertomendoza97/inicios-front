import { CreateSubcategoryForm, SingleCategory } from "@/src/categories";
import { CustomResponse } from "@/src/interfaces/CustomResponse";
import React from "react";

const getCategories = async (): Promise<CustomResponse<SingleCategory[]>> => {
  const { data } = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category`,
    { cache: "no-cache" }
  ).then(resp => resp.json());

  return { data, error: false, success: true };
};

const SubcategoryPage = async () => {
  const { data } = await getCategories();

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <CreateSubcategoryForm categories={data} />;
    </div>
  );
};

export default SubcategoryPage;
