"use client";

import { CustomInput } from "@/src/components";
import { GENERAL_LABELS, useUIStore } from "@/src/utils";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { SingleCategory } from "../interfaces/category.interface";
import { Button } from "flowbite-react";
import { AiOutlineSave } from "react-icons/ai";

interface Props {
  subcategory?: { name: string };
  setCategory: Dispatch<SetStateAction<SingleCategory>>;
}

const INITIAL_STATE = {
  name: ""
};

export const NewSubcategory = ({
  subcategory = INITIAL_STATE,
  setCategory
}: Props) => {
  const isModalOpen = useUIStore(state => state.isModalOpen);

  const [values, setValues] = useState<{ name: string }>(subcategory);

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (values.name === "") return;

    if (subcategory.name) {
      setCategory(prevState => {
        if (
          prevState.subCategories.some(
            sc => sc.name.toLowerCase() === values.name.toLowerCase()
          )
        )
          return prevState;

        const newSubcategories = prevState.subCategories.filter(
          sc => sc.name !== subcategory.name
        );

        return {
          ...prevState,
          subCategories: [
            ...newSubcategories,
            { name: values.name.toLowerCase(), fkCategory: 0 }
          ]
        };
      });
    } else {
      setCategory(prevState => {
        if (
          prevState.subCategories.some(
            sc => sc.name.toLowerCase() === values.name.toLowerCase()
          )
        )
          return prevState;

        return {
          ...prevState,
          subCategories: [
            ...prevState.subCategories,
            { name: values.name, fkCategory: 0 }
          ]
        };
      });
    }

    setValues(INITIAL_STATE);
  };

  useEffect(() => {
    setValues(subcategory);
  }, [subcategory]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 items-stretch">
      <CustomInput
        value={values.name}
        label={"Subcategoria"}
        name="name"
        placeholder="Smartphones"
        autoFocus={isModalOpen}
        onChange={handleChange}
      />
      <Button type="submit" className="bg-secondary5 hover:!bg-secondary1">
        {GENERAL_LABELS.SAVE}
        <AiOutlineSave size={25} className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
};
