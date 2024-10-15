"use client";

import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { CREATE_PRODUCT_LABELS } from "../utils/const";
import {
  ImagesSection,
  MainSection,
  OneProductDetails,
  PropertiesSection,
  updateProductAction,
  useCreateProductFormHook,
  validateData
} from "..";
import { Divider } from "@/src/components";
import { Button, Spinner } from "flowbite-react";
import { SingleCategory } from "@/src/categories";
import { UpdateProductDTO } from "../DTO/updateProductDTO";
import { useRouter } from "next/navigation";

export const UpdateProductForm = ({
  categories,
  details
}: {
  categories: SingleCategory[];
  details: OneProductDetails;
}) => {
  const [modified, setModified] = useState(false);
  const router = useRouter();
  const updateProductData = useMemo(() => {
    return new UpdateProductDTO(details);
  }, [details]);

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
    updateProductAction,
    updateProductData,
    CREATE_PRODUCT_LABELS.NOTIFICATIONS.UPDATED,
    "update",
    details.id,
    details.properties,
    details.images
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (modified) {
      onSubmit(e);
      router.refresh();
    }
  };

  useEffect(() => {
    if (
      JSON.stringify(updateProductData) !== JSON.stringify(formValues) ||
      JSON.stringify(properties) !== JSON.stringify(details.properties) ||
      JSON.stringify(images) !== JSON.stringify(details.images)
    ) {
      setModified(true);
    } else {
      setModified(false);
    }
  }, [
    formValues,
    properties,
    updateProductData,
    details.properties,
    details.images,
    images
  ]);

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center grow max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">
        {CREATE_PRODUCT_LABELS.UPDATE_PRODUCT}
      </h1>
      <div className="grid grid-cols-[1fr_auto_1fr] overflow-y-auto max-w-full">
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
          className={`w-full ${
            validateData(formValues) && modified
              ? ""
              : "opacity-50 cursor-not-allowed"
          } `}
        >
          {loading ? <Spinner /> : CREATE_PRODUCT_LABELS.SEND}
        </Button>
      </div>
    </form>
  );
};
