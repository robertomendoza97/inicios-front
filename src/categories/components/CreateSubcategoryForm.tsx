"use client";

import { CustomSelect, Divider } from "@/src/components";
import {
  CREATE_CATEGORY_LABELS,
  CREATE_SUBCATEGORY_LABELS
} from "../utils/const";
import { useCreateSubcategoryFormHook } from "../";
import { SingleCategory } from "../interfaces/category.interface";
import { SubcategorySection } from "./SubcategorySection";
import { Button, Spinner } from "flowbite-react";
import { validateSubcategoryData } from "../";
import { GENERAL_LABELS } from "@/src/utils";

interface Props {
  categories: SingleCategory[];
}
export const CreateSubcategoryForm = ({ categories }: Props) => {
  const {
    formValues,
    handleChange,
    handleSubmit,
    loading,
    showErrors,
    setFormValues
  } = useCreateSubcategoryFormHook();

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center w-1/2 max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">
        {CREATE_SUBCATEGORY_LABELS.TITLE}
      </h1>
      <div className="flex flex-col w-full max-h-full overflow-hidden">
        <CustomSelect
          name="id"
          label={"Categoria"}
          options={categories.map(c => ({ key: String(c.id!), value: c.name }))}
          onChange={handleChange}
          errorMessage="Debe seleccionar una categoria"
          showErrorMessage={showErrors}
          value={String(formValues.id)}
        />
        <Divider />
        <SubcategorySection category={formValues} setCategory={setFormValues} />
      </div>

      <Button
        type="submit"
        className={`w-full ${
          validateSubcategoryData(formValues.subCategories)
            ? ""
            : "opacity-50 cursor-not-allowed"
        } `}
      >
        {loading ? <Spinner /> : GENERAL_LABELS.SEND}
      </Button>
    </form>
  );
};
