import { CustomSelect } from "@/src/components";
import { SALES_LABELS } from "../../utils/const";
import { Button, TextInput } from "flowbite-react";
import { FaUserPlus } from "react-icons/fa6";
import { HiBuildingStorefront } from "react-icons/hi2";
import { InvoiceHeader } from "./InvoiceHeader";
import { InvoiceDetails } from "./InvoiceDetails";
import { InvoiceProducts } from "./InvoiceProducts";
import { InvoiceFooter } from "./InvoiceFooter";

export const Invoice = () => {
  return (
    <aside className="w-[40%] bg-white border-l flex flex-col h-full">
      <InvoiceHeader />
      <InvoiceDetails />
      <InvoiceProducts />
      <InvoiceFooter />
    </aside>
  );
};
