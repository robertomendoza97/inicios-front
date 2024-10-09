"use client";

import {
  CREATE_PRODUCT_LABELS,
  createProductAction,
  PropertiesSection,
  useProductForm,
  validateData
} from "..";

import { SingleCategory } from "@/src/categories";
import { MainSection } from "./MainSection";
import { Divider } from "@/src/components";

import { Button, Spinner } from "flowbite-react";

export const CreateProductForm = ({
  categories
}: {
  categories: SingleCategory[];
}) => {
  const {
    formValues,
    handleReset,
    loading,
    onSubmit,
    properties,
    setFormValues,
    setProperties,
    showErrors
  } = useProductForm(
    createProductAction,
    undefined,
    CREATE_PRODUCT_LABELS.NOTIFICATIONS.CREATED,
    "create"
  );

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center grow max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">
        {CREATE_PRODUCT_LABELS.CREATE_PRODUCT}
      </h1>
      <div className="grid grid-cols-[1fr_auto_1fr] overflow-y-auto max-w-full">
        <MainSection
          formValues={formValues}
          setFormValues={setFormValues}
          showErrors={showErrors}
          categories={categories}
        />
        <Divider vertical />

        <PropertiesSection
          properties={properties}
          setProperties={setProperties}
        />
      </div>
      <div className="flex w-full gap-4">
        <Button color="failure" type="reset" onClick={handleReset}>
          {CREATE_PRODUCT_LABELS.RESET}
        </Button>
        <Button
          type="submit"
          className={` w-full ${
            validateData(formValues) ? "" : "opacity-50 cursor-not-allowed"
          } `}
        >
          {loading ? <Spinner /> : CREATE_PRODUCT_LABELS.SEND}
        </Button>
      </div>
    </form>
  );
};
