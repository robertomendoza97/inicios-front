import { CreateSubcategoryForm, SingleCategory } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { CustomResponse } from "@/src/interfaces/CustomResponse";
import React from "react";

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

const SubcategoryPage = async () => {
  const { data, error } = await getCategories();

  if (error) return <ErrorResponsePage />;

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <CreateSubcategoryForm categories={data} />;
    </div>
  );
};

export default SubcategoryPage;
