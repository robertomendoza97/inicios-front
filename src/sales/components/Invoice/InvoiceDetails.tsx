"use client";

import { CustomInput, CustomSelect } from "@/src/components";
import { Button, TextInput } from "flowbite-react";
import { FaUserPlus } from "react-icons/fa6";
import { SALES_LABELS } from "../../utils/const";

export const InvoiceDetails = () => {
  return (
    <div className="p-5 flex flex-col gap-5 border-b">
      <div className="flex gap-5">
        <CustomSelect
          name={""}
          label={SALES_LABELS.INTEREST}
          options={[
            { key: "30", value: "30%" },
            { key: "5", value: "5%" }
          ]}
          onChange={function (name: string, value: string): void {}}
          value={""}
        />
        <CustomSelect
          name={""}
          label={SALES_LABELS.FREQUENCY}
          options={[
            { key: "biweekly", value: "Quincenal" },
            { key: "weekly", value: "Semanal" }
          ]}
          onChange={function (name: string, value: string): void {}}
          value={""}
        />
        <CustomInput
          value={""}
          label={SALES_LABELS.INITIAL}
          name={""}
          type="number"
          allowDecimals
          thousandFormat
          onChange={function (name: string, value: string): void {}}
        />
      </div>
      <div className="flex gap-5 items-center justify-between">
        <div className="relative grow">
          <TextInput
            className="w-full"
            placeholder={SALES_LABELS.PLACEHOLDERS.CLIENT}
          />
        </div>
        <Button>
          <FaUserPlus className="mr-1" />
          {SALES_LABELS.NEW}
        </Button>
      </div>
    </div>
  );
};
