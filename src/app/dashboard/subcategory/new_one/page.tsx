import { CreateSubcategoryForm, SingleCategory } from "@/src/categories";
import { ErrorResponsePage } from "@/src/components";
import { customFetch } from "@/src/services/rest.service";
import React from "react";

const getCategories = async () => {
  const {
    data: { data },
    error,
    success
  } = await customFetch<{
    data: SingleCategory[];
  }>("category", {
    cache: "no-cache"
  });

  return { data, error, success };
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
