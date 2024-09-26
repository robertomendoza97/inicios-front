"use client";

import { CustomInput } from "@/src/components";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { CREATE_PRODUCT_LABELS, ProductProperty } from "../";
import { AiOutlineSave } from "react-icons/ai";
import { useUIStore } from "@/src/store/ui-store";
import { Button } from "flowbite-react";

interface Props {
  setProperties: Dispatch<SetStateAction<ProductProperty[]>>;
}

const INITIAL_STATE = {
  key: "",
  value: "",
  compare: false,
  name: ""
};
export const NewProperty = ({ setProperties }: Props) => {
  const closeModal = useUIStore(state => state.toggleModal);

  const [values, setValues] = useState<ProductProperty>(INITIAL_STATE);

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (values.name === "" || values.value === "") return;

    const newProperty: ProductProperty = {
      key: values.name.replaceAll(" ", "_").toLowerCase(),
      value: values.value,
      name: values.name
    };

    setProperties(prevState => {
      if (prevState.some(prop => prop.key === newProperty.key)) {
        const propertiesFiltered = prevState.filter(
          prop => prop.key !== newProperty.key
        );
        return [...propertiesFiltered, newProperty];
      }

      return [...prevState, newProperty];
    });

    setValues(INITIAL_STATE);

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="font-semibold text-paletteColor3 text-lg">
        {CREATE_PRODUCT_LABELS.MODAL.TITLE}
      </h2>
      <div className="flex gap-5 ">
        <CustomInput
          label={CREATE_PRODUCT_LABELS.MODAL.NAME}
          value={values.name}
          name="name"
          onChange={handleChange}
          placeholder={CREATE_PRODUCT_LABELS.MODAL.PLACEHOLDER.NAME}
        />
        <CustomInput
          label={CREATE_PRODUCT_LABELS.MODAL.VALUE}
          value={values.value}
          name="value"
          onChange={handleChange}
          placeholder={CREATE_PRODUCT_LABELS.MODAL.PLACEHOLDER.VALUE}
        />
      </div>

      <Button type="submit" className="bg-secondary5 hover:!bg-secondary1">
        {CREATE_PRODUCT_LABELS.MODAL.SAVE}
        <AiOutlineSave size={25} className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
};
