"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  CreateProductFormValues,
  ProductProperty,
  validateData,
  ProductToCreate,
  CREATE_PRODUCT_PREVIEW,
  PRODUCT_PROPERTIES_PREVIEW,
  CreateActionInterface,
  UpdateActionInterface
} from "..";
import {
  stringThousandToNumber,
  useNotificationStore,
  getFromLocalStorage
} from "@/src/utils/";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { UpdateProductDTO } from "../DTO/updateProductDTO";

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

export const useProductForm = (
  action: CreateActionInterface | UpdateActionInterface,
  initialFormValues: CreateProductFormValues = INITIAL_STATE,
  successMessage: string,
  type: "create" | "update",
  id?: string,
  initialProperties: ProductProperty[] = []
) => {
  const [formValues, setFormValues] =
    useState<CreateProductFormValues>(initialFormValues);
  const [properties, setProperties] =
    useState<ProductProperty[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );

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
      tags: [],
      images: [],
      name: formValues.name,
      description: formValues.description,
      state: formValues.state
    };

    if (type === "create") {
      await (action as CreateActionInterface)(objToSend);

      setFormValues(initialFormValues);
      setProperties(initialProperties);
    } else if (type === "update" && id) {
      const newProduct = await (action as UpdateActionInterface)(id, objToSend);

      const formattedNewProduct = new UpdateProductDTO(newProduct);
      setFormValues(formattedNewProduct);
      setProperties(newProduct.properties);
    }

    setShowErrors(false);
    if (type) {
      localStorage.removeItem(CREATE_PRODUCT_PREVIEW);
      localStorage.removeItem(PRODUCT_PROPERTIES_PREVIEW);
    }

    showNotification({
      text: successMessage,
      icon: <IoMdCheckmarkCircleOutline size={30} className="text-green-500" />
    });
    setLoading(false);
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    setProperties(initialProperties);
    setShowErrors(false);

    if (type === "create") {
      localStorage.removeItem(CREATE_PRODUCT_PREVIEW);
      localStorage.removeItem(PRODUCT_PROPERTIES_PREVIEW);
    }
  };

  useEffect(() => {
    if (
      JSON.stringify(formValues) !== JSON.stringify(INITIAL_STATE) &&
      type === "create"
    )
      localStorage.setItem(CREATE_PRODUCT_PREVIEW, JSON.stringify(formValues));

    if (properties.length > 0 && type === "create")
      localStorage.setItem(
        PRODUCT_PROPERTIES_PREVIEW,
        JSON.stringify(properties)
      );
  }, [formValues, properties, type]);

  useEffect(() => {
    if (type === "create") {
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
    }
  }, [type]);

  return {
    formValues,
    setFormValues,
    properties,
    setProperties,
    loading,
    showErrors,
    onSubmit,
    handleReset
  };
};
