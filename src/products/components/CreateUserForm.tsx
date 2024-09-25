"use client";

import {
  CREATE_PRODUCT_LABELS,
  CreateProductFormValues,
  ProductProperty,
  PropertiesSection,
  validateData
} from "../";

import { FormEvent, useState } from "react";
import { SingleCategory } from "@/src/categories";
import { MainSection } from "./MainSection";
import { Divider } from "@/src/components";
import { stringThousandToNumber } from "@/src/utils/prepareNumber";

export const CreateUserForm = ({
  categories
}: {
  categories: SingleCategory[];
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const [formValues, setFormValues] = useState<CreateProductFormValues>({
    name: "",
    description: "",
    state: "",
    category: "",
    retailPrice: "",
    costPrice: "",
    quantity: "",
    subCategory: "",
    barCode: ""
  });

  const [tags] = useState<string[]>([]);

  const [properties, setProperties] = useState<ProductProperty[]>([]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateData(formValues)) {
      setShowErrors(true);
      return;
    }

    const objToSend = {
      ...formValues,
      costPrice: stringThousandToNumber(formValues.costPrice),
      retailPrice: stringThousandToNumber(formValues.retailPrice),
      properties,
      tags
    };

    console.log(objToSend);

    // const data = await postActions({...formValues});
  };

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
      <button
        type="submit"
        className={`bg-secondary3 rounded p-2 w-full font-semibold text-white ${
          validateData(formValues) ? "" : "opacity-50 cursor-not-allowed"
        } `}
      >
        {CREATE_PRODUCT_LABELS.SEND}
      </button>
    </form>
  );
};
