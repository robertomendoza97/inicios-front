"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useState
} from "react";
import { CustomError } from "../";
import { Label, Select } from "flowbite-react";

interface Props {
  name: string;
  label: string;
  options: { key: string; value: string }[];
  onChange: (name: string, value: string) => void;
  errorMessage: string;
  showErrorMessage: boolean;
  value: string;
}

export const CustomSelect = ({
  name,
  label,
  options,
  onChange,
  errorMessage,
  showErrorMessage,
  value
}: Props) => {
  const [isValid, setIsValid] = useState(true);

  const id = useId();

  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    onChange(target.name, target.value);
  };

  const validateSelect = useCallback(() => {
    if (!Boolean(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [value]);

  useEffect(() => {
    if (showErrorMessage) {
      validateSelect();
    }
  }, [showErrorMessage, validateSelect]);

  return (
    <div className="flex flex-col gap-1 w-full p-[1px]">
      <Label htmlFor={id}>{label}</Label>
      <Select name={name} id={id} onChange={handleChange} value={value}>
        <option value="" disabled>
          Seleccione una opcion
        </option>
        {options.map(op => (
          <option key={op.key} value={op.key}>
            {op.value}
          </option>
        ))}
      </Select>
      {!isValid && <CustomError message={errorMessage} />}
    </div>
  );
};
