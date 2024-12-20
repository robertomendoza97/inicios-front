"use client";

import { CustomSelect } from "@/src/components";
import { Button, TextInput } from "flowbite-react";
import { FaUserPlus } from "react-icons/fa6";

export const InvoiceDetails = () => {
  return (
    <div className="p-5 flex flex-col gap-5 border-b">
      <div className="flex gap-5">
        <CustomSelect
          name={""}
          label={"Tasa de interes"}
          options={[
            { key: "30", value: "30%" },
            { key: "5", value: "5%" }
          ]}
          onChange={function (name: string, value: string): void {
            throw new Error("Function not implemented.");
          }}
          value={""}
        />
        <CustomSelect
          name={""}
          label={"Frecuencia"}
          options={[
            { key: "biweekly", value: "Quincenal" },
            { key: "weekly", value: "Semanal" }
          ]}
          onChange={function (name: string, value: string): void {
            throw new Error("Function not implemented.");
          }}
          value={""}
        />
      </div>
      <div className="flex gap-5 items-center justify-between">
        <div className="relative grow">
          <TextInput className="w-full" placeholder="Cliente" />
        </div>
        <Button>
          <FaUserPlus className="mr-1" />
          Nuevo
        </Button>
      </div>
    </div>
  );
};
