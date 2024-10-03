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
import { stringThousandToNumber, useNotificationStore } from "@/src/utils/";
import { Button, Spinner } from "flowbite-react";
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
  const [loading, setLoading] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );
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

    if (loading) return;

    setLoading(true);

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
    setProperties([]);
    setShowErrors(false);
    localStorage.removeItem(CREATE_PRODUCT_PREVIEW);
    localStorage.removeItem(PRODUCT_PROPERTIES_PREVIEW);

    showNotification({ text: "Producto creado correctamente.", icon: "" });
    setLoading(false);
  };

  const handleReset = () => {
    setFormValues(INITIAL_STATE);
    setProperties([]);
    setShowErrors(false);
    localStorage.removeItem(CREATE_PRODUCT_PREVIEW);
    localStorage.removeItem(PRODUCT_PROPERTIES_PREVIEW);
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
    const productPreview = getFromLocalStorage(
      CREATE_PRODUCT_PREVIEW,
      JSON.stringify(INITIAL_STATE)
    );
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
