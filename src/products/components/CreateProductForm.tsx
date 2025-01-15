"use client";

import {
  CREATE_PRODUCT_LABELS,
  createProductAction,
  CreateProductFormValues,
  ImagesSection,
  ProductProperty,
  PropertiesSection,
  useCreateProductFormHook,
  validateData
} from "..";

import { SingleCategory } from "@/src/categories";
import { MainSection } from "./MainSection";
import { Divider } from "@/src/components";

import { Button, Spinner } from "flowbite-react";

interface Props {
  initialValues: CreateProductFormValues;
  initialProperties: ProductProperty[];
  initialImages: string[] | undefined;
  categories: SingleCategory[];
}

export const CreateProductForm = ({
  categories,
  initialImages,
  initialProperties,
  initialValues
}: Props) => {
  const {
    formValues,
    handleReset,
    loading,
    onSubmit,
    properties,
    setFormValues,
    setProperties,
    showErrors,
    images,
    handleAddImages,
    handleDeleteImages,
    loadingImages
  } = useCreateProductFormHook(
    createProductAction,
    initialValues,
    CREATE_PRODUCT_LABELS.NOTIFICATIONS.CREATED,
    "create",
    undefined,
    initialProperties,
    initialImages
  );

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center grow max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">
        {CREATE_PRODUCT_LABELS.CREATE_PRODUCT}
      </h1>
      <div className="grid grid-cols-[1fr_auto_1fr] overflow-hidden max-w-full">
        <MainSection
          formValues={formValues}
          setFormValues={setFormValues}
          showErrors={showErrors}
          categories={categories}
        />
        <Divider vertical />
        <div className="flex flex-col max-h-full overflow-y-auto">
          <PropertiesSection
            properties={properties}
            setProperties={setProperties}
          />
          <ImagesSection
            images={images}
            handleAddImages={handleAddImages}
            handleDeleteImages={handleDeleteImages}
            loadingImages={loadingImages}
          />
        </div>
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
