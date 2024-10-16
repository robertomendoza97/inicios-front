"use client";
import { SingleCategory, validateSubcategoryData } from "../";

import { useNotificationStore } from "@/src/utils";
import { FormEvent, useState } from "react";
import { createSubcategoryAction, SubCategory } from "../";

const INITIAL_VALUES: SingleCategory = {
  id: 0,
  name: "",
  subCategories: []
};

export const useCreateSubcategoryFormHook = () => {
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
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

    if (!validateSubcategoryData(formValues.subCategories)) {
      setShowErrors(true);
      setLoading(false);
      return;
    }

    try {
      await createSubcategoryAction(formValues.id!, formValues.subCategories);

      showNotification({
        text: "subcategorias creadas con exito!",
        type: "success"
      });
      setFormValues(INITIAL_VALUES);
      setLoading(false);
    } catch (error) {
      showNotification({ text: "Error", type: "error" });
    }
  };

  return {
    handleChange,
    handleSubmit,
    formValues,
    loading,
    showErrors,
    setFormValues
  };
};
