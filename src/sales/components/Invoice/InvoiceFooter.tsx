"use client";

import { Button } from "flowbite-react";
import { SALES_LABELS } from "../../utils/const";
import { useSaleStore } from "@/src/store/sale-store";

export const InvoiceFooter = () => {
  const products = useSaleStore(state => state.productsToSale);

  return (
    <div className="flex gap-3 p-5">
      <Button className="grow">{SALES_LABELS.SALE}</Button>
      <Button color="failure">{SALES_LABELS.CANCEL}</Button>
    </div>
  );
};
