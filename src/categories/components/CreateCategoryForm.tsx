"use client";

import { CustomInput, Divider } from "@/src/components";
import { CREATE_CATEGORY_LABELS } from "../utils/const";
import { useCreateCategoryFormHook } from "../hooks/useCreateCategoryFormHook";
import { Button, Spinner } from "flowbite-react";
import { validateCreateCategoryData } from "../utils/validateCreateCategoryData";
import { GENERAL_LABELS } from "@/src/utils";
import { SubcategorySection } from "./SubcategorySection";

export const CreateCategoryForm = () => {
  const {
    formValues,
    handleChange,
    loading,
    handleSubmit,
    showErrors,
    setFormValues
  } = useCreateCategoryFormHook();

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center w-1/2 max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">{CREATE_CATEGORY_LABELS.TITLE}</h1>
      <div className="flex flex-col w-full max-h-full overflow-hidden">
        <div className="w-full">
          <CustomInput
            placeholder={CREATE_CATEGORY_LABELS.PLACEHOLDER.NAME}
            label={CREATE_CATEGORY_LABELS.NAME}
            value={formValues.name}
            name="name"
            onChange={handleChange}
            showErrorMessage={showErrors}
            errorMessaje={GENERAL_LABELS.VALIDATE_INPUTS.NOT_EMPTY}
          />
        </div>
        <Divider />
        <SubcategorySection setCategory={setFormValues} category={formValues} />
      </div>
      <Button
        type="submit"
        className={`w-full ${
          validateCreateCategoryData(formValues)
            ? ""
            : "opacity-50 cursor-not-allowed"
        } `}
      >
        {loading ? <Spinner /> : GENERAL_LABELS.SEND}
      </Button>
    </form>
  );
};
