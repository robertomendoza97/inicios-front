"use client";

import { CustomInput } from "@/src/components";
import { SingleCategory } from "../interfaces/category.interface";
import { GENERAL_LABELS } from "@/src/utils";
import { Button, Spinner } from "flowbite-react";
import { CREATE_CATEGORY_LABELS } from "../utils/const";
import { useUpdateCategoryHook } from "../";

interface Props {
  categoryToUpdate: SingleCategory;
}

export const UpdateCategoryForm = ({ categoryToUpdate }: Props) => {
  const {
    handleSubmit,
    formValues,
    handleChange,
    loading,
    showErrors,
    modified
  } = useUpdateCategoryHook(categoryToUpdate);

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center w-1/2 max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">
        {CREATE_CATEGORY_LABELS.UPDATE}
      </h1>
      <CustomInput
        value={formValues.name}
        label={"Categoria"}
        name="name"
        onChange={handleChange}
        showErrorMessage={showErrors}
      />
      <Button
        type="submit"
        className={`w-full ${modified ? "" : "opacity-50 cursor-not-allowed"} `}
      >
        {loading ? <Spinner /> : GENERAL_LABELS.SEND}
      </Button>
    </form>
  );
};
