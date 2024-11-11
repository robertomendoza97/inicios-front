import { CustomInput } from "@/src/components";
import React, { Dispatch, SetStateAction } from "react";
import { CLIENTS_TABLE_LABELS } from "../utils/const";
import { IClientToCreate } from "../";

interface Props {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  handleChange: (name: string, value: string) => void;
  setFormValues: Dispatch<SetStateAction<IClientToCreate>>;
}

export const LeftSection = ({
  name,
  countryCode,
  email,
  lastName,
  handleChange,
  phone
}: Props) => {
  return (
    <div className="grow flex flex-col gap-5 w-1/2">
      <CustomInput
        value={name}
        label={CLIENTS_TABLE_LABELS.COLUMNS.NAME}
        name={"name"}
        placeholder="lamine"
        onChange={handleChange}
      />
      <CustomInput
        value={lastName}
        label={CLIENTS_TABLE_LABELS.COLUMNS.LAST_NAME}
        name={"lastName"}
        placeholder="yamal"
        onChange={handleChange}
      />
      <CustomInput
        value={email}
        label={CLIENTS_TABLE_LABELS.COLUMNS.EMAIL}
        name={"email"}
        placeholder="correo@correo.com"
        onChange={handleChange}
      />
      <CustomInput
        value={countryCode}
        label={CLIENTS_TABLE_LABELS.COLUMNS.COUNTRY_CODE}
        name={"countryCode"}
        placeholder="58"
        onChange={handleChange}
      />
      <CustomInput
        type="number"
        value={phone}
        label={CLIENTS_TABLE_LABELS.COLUMNS.NUMBER}
        name={"phone"}
        onChange={handleChange}
      />
    </div>
  );
};
