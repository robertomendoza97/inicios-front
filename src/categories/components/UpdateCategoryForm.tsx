"use client";

import { CustomInput } from "@/src/components";
import { SingleCategory } from "../interfaces/category.interface";
import { FormEvent, useEffect, useState } from "react";
import { updateCategoryAction } from "../actions/serverActions";
import { GENERAL_LABELS, useNotificationStore } from "@/src/utils";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";

interface Props {
  categoryToUpdate: SingleCategory;
}

export const UpdateCategoryForm = ({ categoryToUpdate }: Props) => {
  const [formValues, setFormValues] = useState({ name: categoryToUpdate.name });
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
        text: "Categoria actualizada con exito",
        type: "success"
      });
    } catch (error) {
      showNotification({
        text: "Ocurrio un error al actualizar la categoria",
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
    if (JSON.stringify(categoryToUpdate) !== JSON.stringify(formValues)) {
      setModified(true);
    } else {
      setModified(false);
    }
  }, [categoryToUpdate, formValues]);

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center w-1/2 max-h-[90%]"
    >
      <CustomInput
        value={formValues.name}
        label={"Categoria"}
        name="name"
        onChange={handleChange}
        showErrorMessage={showErrors}
      />
      <Button
        type="submit"
        className={`w-full ${
          formValues.name !== "" ? "" : "opacity-50 cursor-not-allowed"
        } `}
      >
        {loading ? <Spinner /> : GENERAL_LABELS.SEND}
      </Button>
    </form>
  );
};
