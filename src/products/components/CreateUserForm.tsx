"use client";

import {
  CREATE_PRODUCT_LABELS,
  CREATE_PRODUCT_PREVIEW,
  createProductAction,
  CreateProductFormValues,
  PRODUCT_PROPERTIES_PREVIEW,
  ProductProperty,
  ProductToCreate,
  PropertiesSection,
  validateData
} from "../";
import { FormEvent, useEffect, useState } from "react";
import { SingleCategory } from "@/src/categories";
import { MainSection } from "./MainSection";
import { Divider } from "@/src/components";
import { stringThousandToNumber } from "@/src/utils/";
import { Button } from "flowbite-react";
import { getFromLocalStorage } from "@/src/utils/get-from-local-storage";

const INITIAL_STATE = {
  name: "",
  description: "",
  state: "",
  category: "",
  retailPrice: "",
  costPrice: "",
  quantity: "",
  subCategory: "",
  barCode: ""
};

export const CreateUserForm = ({
  categories
}: {
  categories: SingleCategory[];
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const [formValues, setFormValues] =
    useState<CreateProductFormValues>(INITIAL_STATE);

  const [tags] = useState<string[]>([]);

  const [properties, setProperties] = useState<ProductProperty[]>([]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateData(formValues)) {
      setShowErrors(true);
      return;
    }

    const objToSend: ProductToCreate = {
      costPrice: stringThousandToNumber(formValues.costPrice),
      retailPrice: stringThousandToNumber(formValues.retailPrice),
      properties,
      quantity: Number(formValues.quantity),
      fkSubcategory: Number(formValues.subCategory),
      tags,
      images: [],
      name: formValues.name,
      description: formValues.description,
      state: formValues.state
    };

    await createProductAction(objToSend);

    setFormValues(INITIAL_STATE);
    setShowErrors(false);
  };

  useEffect(() => {
    if (JSON.stringify(formValues) !== JSON.stringify(INITIAL_STATE))
      localStorage.setItem(CREATE_PRODUCT_PREVIEW, JSON.stringify(formValues));

    if (properties.length > 0)
      localStorage.setItem(
        PRODUCT_PROPERTIES_PREVIEW,
        JSON.stringify(properties)
      );
  }, [formValues, properties]);

  useEffect(() => {
    const productPreview = getFromLocalStorage(CREATE_PRODUCT_PREVIEW, "{}");
    const propertiesPreview = getFromLocalStorage(
      PRODUCT_PROPERTIES_PREVIEW,
      "[]"
    );
    setFormValues(productPreview);
    setProperties(propertiesPreview);
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center grow max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">
        {CREATE_PRODUCT_LABELS.CREATE_PRODUCT}
      </h1>
      <div className="flex overflow-y-auto max-w-full">
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
      <Button
        type="submit"
        className={` w-full ${
          validateData(formValues) ? "" : "opacity-50 cursor-not-allowed"
        } `}
      >
        {CREATE_PRODUCT_LABELS.SEND}
      </Button>
    </form>
  );
};
