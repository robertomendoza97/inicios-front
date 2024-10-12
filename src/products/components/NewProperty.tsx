"use client";

import { CustomInput } from "@/src/components";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { CREATE_PRODUCT_LABELS, ProductProperty } from "../";
import { AiOutlineSave } from "react-icons/ai";
import { useUIStore } from "@/src/store/ui-store";
import { Button, Checkbox, Label } from "flowbite-react";

interface Props {
  setProperties: Dispatch<SetStateAction<ProductProperty[]>>;
  property?: ProductProperty;
}

const INITIAL_STATE = {
  key: "",
  value: "",
  compare: false,
  name: "",
  index: false
};
export const NewProperty = ({
  setProperties,
  property = INITIAL_STATE
}: Props) => {
  const isModalOpen = useUIStore(state => state.isModalOpen);

  const [values, setValues] = useState<ProductProperty>(property);
  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleCheckbox = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      index: target.checked
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (values.name === "" || values.value === "") return;

    const newProperty: ProductProperty = {
      key: values.name.replaceAll(" ", "_").toLowerCase(),
      value: values.value,
      name: values.name,
      index: values.index
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
    const input = document.querySelector(
      ".wrapper_property_inputs > div > div > div > input"
    ) as HTMLInputElement;
    input?.focus();
  };

  useEffect(() => {
    setValues(property);
  }, [property]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="font-semibold text-paletteColor3 text-lg">
        {CREATE_PRODUCT_LABELS.MODAL.TITLE}
      </h2>
      <div className="flex gap-5 wrapper_property_inputs">
        <CustomInput
          autoFocus={isModalOpen}
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
      <div className="flex gap-2 items-center">
        <Checkbox
          id="show-in-name"
          onChange={handleCheckbox}
          checked={values.index}
        />
        <Label htmlFor="show-in-name" className="font-light">
          {CREATE_PRODUCT_LABELS.MODAL.SHOW_IN_NAME}
        </Label>
      </div>

      <Button type="submit" className="bg-secondary5 hover:!bg-secondary1">
        {CREATE_PRODUCT_LABELS.MODAL.SAVE}
        <AiOutlineSave size={25} className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
};
