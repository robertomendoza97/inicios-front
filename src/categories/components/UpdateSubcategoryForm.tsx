"use client";

import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { SubCategory } from "../interfaces/category.interface";
import { GENERAL_LABELS, useNotificationStore } from "@/src/utils";
import { CustomInput } from "@/src/components";
import { CREATE_SUBCATEGORY_LABELS } from "../utils/const";
import { updateSubategoryAction } from "../actions/serverActions";

interface Props {
  subcategoryToUpdate: SubCategory;
}

export const UpdateSubcategoryForm = ({ subcategoryToUpdate }: Props) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: subcategoryToUpdate.name
  });
  const [showErrors, setShowErrors] = useState(false);
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );

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

    const resp = await updateSubategoryAction(
      subcategoryToUpdate.id!,
      formValues.name
    );

    if (resp.error) {
      showNotification({
        text: "Ocurrio un error al actualizar la subcategoria",
        type: "error"
      });
      setLoading(false);

      return;
    }
    showNotification({
      text: "Subcategoria actualizada con exito",
      type: "success"
    });

    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (modified) {
      await onSubmit(e);
      router.refresh();
    }
  };

  useEffect(() => {
    if (
      subcategoryToUpdate.name !== formValues.name.trim() &&
      formValues.name.trim() !== ""
    ) {
      setModified(true);
    } else {
      setModified(false);
    }
  }, [subcategoryToUpdate, formValues]);

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col items-center w-1/2 max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">
        {CREATE_SUBCATEGORY_LABELS.UPDATE}
      </h1>
      <CustomInput
        showErrorMessage={showErrors}
        value={formValues.name}
        label={"Subcategoria"}
        name="name"
        onChange={handleChange}
      />
      <Button
        type="submit"
        className={`w-full ${modified ? "" : "opacity-50 cursor-not-allowed"} `}
      >
        {loading ? <Spinner /> : GENERAL_LABELS.SEND}
      </Button>
    </form>
  );
};
