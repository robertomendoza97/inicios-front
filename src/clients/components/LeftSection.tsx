import { CustomInput } from "@/src/components";
import React from "react";
import { CLIENT_LABELS } from "../utils/const";
import { GENERAL_LABELS } from "@/src/utils";

interface Props {
  name: string;
  lastName: string;
  email: string;
  phoneNumber1: string;
  countryCode1: string;
  phoneNumber2: string;
  countryCode2: string;
  profession: string;
  idCard: string;
  showErrors: boolean;
  handleChange: (name: string, value: string) => void;
}

export const LeftSection = ({
  name,
  countryCode1,
  countryCode2,
  email,
  lastName,
  handleChange,
  phoneNumber1,
  phoneNumber2,
  idCard,
  profession,
  showErrors
}: Props) => {
  return (
    <div className="grow flex flex-col gap-4 w-1/2">
      <CustomInput
        value={name}
        label={CLIENT_LABELS.COLUMNS.NAME}
        name={"name"}
        placeholder="lamine"
        onChange={handleChange}
      />
      <CustomInput
        value={lastName}
        label={CLIENT_LABELS.COLUMNS.LAST_NAME}
        name={"lastName"}
        placeholder="yamal"
        onChange={handleChange}
      />

      <div className="flex gap-4">
        <CustomInput
          value={idCard}
          label={CLIENT_LABELS.COLUMNS.ID_CARD}
          name={"idCard"}
          type="number"
          placeholder="21121121"
          onChange={handleChange}
        />
        <CustomInput
          value={profession}
          label={CLIENT_LABELS.COLUMNS.PROFESSION}
          name={"profession"}
          placeholder="futbolista"
          onChange={handleChange}
        />
      </div>
      <CustomInput
        value={email}
        label={CLIENT_LABELS.COLUMNS.EMAIL}
        name={"email"}
        isEmail
        showErrorMessage={showErrors}
        errorMessaje={GENERAL_LABELS.ERRORS.EMAIL_ERROR}
        placeholder="correo@correo.com"
        onChange={handleChange}
      />
      <div className="flex gap-4">
        <CustomInput
          type="number"
          value={countryCode1}
          label={`(1) ${CLIENT_LABELS.COLUMNS.COUNTRY_CODE}`}
          name={"countryCode1"}
          placeholder="58"
          onChange={handleChange}
        />
        <CustomInput
          type="number"
          value={phoneNumber1}
          label={CLIENT_LABELS.COLUMNS.NUMBER}
          name={"phoneNumber1"}
          min="7"
          showErrorMessage={showErrors}
          errorMessaje="Debe tener minimo 7 numeros."
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <CustomInput
          type="number"
          value={countryCode2}
          label={`(2) ${CLIENT_LABELS.COLUMNS.COUNTRY_CODE}`}
          name={"countryCode2"}
          placeholder="58"
          onChange={handleChange}
        />
        <CustomInput
          type="number"
          value={phoneNumber2}
          label={CLIENT_LABELS.COLUMNS.NUMBER}
          name={"phoneNumber2"}
          min="7"
          showErrorMessage={showErrors}
          errorMessaje="Debe tener minimo 7 numeros."
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
