"use client";

import { FormEvent, useState } from "react";
import { validateCreateCategoryData } from "../utils/validateCreateCategoryData";
import { SingleCategory } from "../interfaces/category.interface";
import { createCategoryAction, createSubcategoryAction } from "../";
import { useNotificationStore } from "@/src/utils";

const INITIAL_VALUES: SingleCategory = {
  name: "",
  subCategories: []
};

export const useCreateCategoryFormHook = () => {
  const [formValues, setFormValues] = useState<SingleCategory>(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );

  const handleChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateCreateCategoryData(formValues)) {
      setShowErrors(true);
      setLoading(false);
      return;
    }

    try {
      const { id } = await createCategoryAction(formValues);

      await createSubcategoryAction(id, formValues.subCategories);

      showNotification({
        text: "Categoria creada con exito!",
        type: "success"
      });
      setFormValues(INITIAL_VALUES);
      setLoading(false);
    } catch (error) {
      showNotification({ text: "Error", type: "error" });
    }
  };

  return {
    formValues,
    handleChange,
    loading,
    handleSubmit,
    showErrors,
    setFormValues
  };
};
