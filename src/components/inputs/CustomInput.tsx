"use client";

import { allowOnlyNumbers, formatNumberToPrice } from "@/src/utils";
import { ChangeEvent, useCallback, useEffect, useId, useState } from "react";

interface Props {
  placeholder?: string;
  value: string;
  type?: string;
  label: string;
  showErrorMessage?: boolean;
  errorMessaje?: string;
  name: string;
  textArea?: boolean;
  thousandFormat?: boolean;
  onChange: (name: string, value: string) => void;
}

export function CustomInput({
  placeholder = "",
  value,
  type = "text",
  label,
  showErrorMessage,
  errorMessaje,
  name,
  thousandFormat,
  onChange,
  textArea
}: Props) {
  const [isValid, setIsValid] = useState(true);
  const id = useId();

  const validateValue = useCallback(() => {
    if (showErrorMessage) {
      if (
        !thousandFormat &&
        (value.trim() === "" || value.trim().length < 4) &&
        !textArea
      ) {
        setIsValid(false);
      } else if (textArea && value.split(" ").length < 5) {
        setIsValid(false);
      } else if (thousandFormat && type === "number" && value === "") {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [showErrorMessage, textArea, thousandFormat, type, value]);

  const middlewareOnChange = ({
    target
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (thousandFormat) {
      value = target.value;
      target.value = value === "," ? "0," : value;

      if (value.split(",").length > 2) return;
    }

    validateValue();

    target.value = target.value.replaceAll("  ", " ");

    onChange(target.name, target.value);
  };

  const valueFormat = (value: string) => {
    if (thousandFormat && value.toString().length > 3) {
      value = formatNumberToPrice(value);
    }

    return value;
  };

  useEffect(() => {
    if (showErrorMessage) {
      validateValue();
    }
  }, [showErrorMessage, validateValue]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-paletteColor3 font-semibold" htmlFor={id}>
        {label}
      </label>
      {textArea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className="p-2 outline-none bg-gray-100 rounded resize-y max-h-32 min-h-14"
          name={name}
          onChange={middlewareOnChange}
          value={valueFormat(value)}
        />
      ) : (
        <input
          autoComplete="off"
          name={name}
          type={type === "number" ? "text" : type}
          id={id}
          onChange={middlewareOnChange}
          className="p-2 outline-none bg-gray-100 rounded"
          value={valueFormat(value)}
          placeholder={placeholder}
          onKeyDown={type === "number" ? allowOnlyNumbers : () => true}
        />
      )}

      {!isValid && <p className="text-red-500 text-sm">* {errorMessaje}</p>}
    </div>
  );
}
