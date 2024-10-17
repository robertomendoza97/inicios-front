"use client";

import { useNotificationStore } from "@/src/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { CREATE_CATEGORY_LABELS, updateCategoryAction } from "..";
import { SingleCategory } from "..";

export const useUpdateCategoryHook = (categoryToUpdate: SingleCategory) => {
  const [formValues, setFormValues] = useState({
    name: categoryToUpdate.name
  });
  const [showErrors, setShowErrors] = useState(false);
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );
  const router = useRouter();

  const handleChange = (_name: string, value: string) => {
    setFormValues({ name: value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (formValues.name === "") {
      setShowErrors(true);
      return;
    }

    try {
      await updateCategoryAction(categoryToUpdate.id!, formValues.name);
      showNotification({
        text: CREATE_CATEGORY_LABELS.SUCCESS.CREATE,
        type: "success"
      });
    } catch (error) {
      showNotification({
        text: CREATE_CATEGORY_LABELS.ERROR.CREATE,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (modified) {
      onSubmit(e);
      router.refresh();
    }
  };

  useEffect(() => {
    if (
      categoryToUpdate.name !== formValues.name.trim() &&
      formValues.name.trim() !== ""
    ) {
      setModified(true);
    } else {
      setModified(false);
    }
  }, [categoryToUpdate, formValues]);

  return {
    handleChange,
    handleSubmit,
    modified,
    loading,
    formValues,
    showErrors
  };
};
