"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useState
} from "react";
import { CustomError } from "../";

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
    <div className="flex flex-col  gap-1 w-full text-gray-500">
      <label className="font-semibold text-paletteColor3" htmlFor={id}>
        {label}
      </label>
      <select
        name={name}
        id={id}
        className="p-2 outline-none bg-gray-100 rounded cursor-pointer"
        onChange={handleChange}
        value={value}
      >
        <option className="" value="" disabled>
          Seleccione una opcion
        </option>
        {options.map(op => (
          <option className="" key={op.key} value={op.key}>
            {op.value}
          </option>
        ))}
      </select>
      {!isValid && <CustomError message={errorMessage} />}
    </div>
  );
};
