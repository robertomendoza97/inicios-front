"use client";

import { allowOnlyNumbers, formatNumberToPrice } from "@/src/utils";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import { Label, Textarea, TextInput } from "flowbite-react";
import { CustomError } from "../Error";

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
  allowDecimals?: boolean;
  autoFocus?: boolean;
  max?: string;
}

const MyInput = ({
  placeholder = "",
  value,
  type = "text",
  label,
  showErrorMessage,
  errorMessaje,
  name,
  thousandFormat,
  onChange,
  textArea,
  allowDecimals,
  autoFocus,
  max
}: Props) => {
  const [isValid, setIsValid] = useState(true);
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const validateValue = useCallback(() => {
    if (showErrorMessage) {
      if (
        !thousandFormat &&
        (value.trim() === "" || value.trim().length < 4) &&
        !textArea
      ) {
        setIsValid(false);
      } else if (textArea && value.trim().split(" ").length < 5) {
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
      target.value = value === "," ? "0," : valueFormat(value);

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

    if (type === "number" && !allowDecimals) {
      value = value.split(",")[0];
    }

    return value;
  };

  useEffect(() => {
    if (showErrorMessage) {
      validateValue();
    } else {
      setIsValid(true);
    }
  }, [showErrorMessage, validateValue]);

  useEffect(() => {
    if (inputRef && autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, [autoFocus]);

  return (
    <div className="flex flex-col gap-1 w-full p-[1px]">
      <Label htmlFor={id}>{label}</Label>
      {textArea ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          name={name}
          onChange={middlewareOnChange}
          value={valueFormat(value)}
          className="max-h-32 min-h-14"
          helperText={!isValid && <CustomError message={errorMessaje || ""} />}
        />
      ) : (
        <TextInput
          ref={inputRef}
          max={max}
          autoComplete="off"
          name={name}
          type={type === "number" ? "text" : type}
          id={id}
          onChange={middlewareOnChange}
          value={valueFormat(value)}
          placeholder={placeholder}
          onKeyDown={type === "number" ? allowOnlyNumbers : () => true}
          helperText={
            !isValid &&
            errorMessaje && <CustomError message={errorMessaje || ""} />
          }
        />
      )}
    </div>
  );
};

export const CustomInput = React.memo(MyInput);
