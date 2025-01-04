"use client";

import { Button } from "flowbite-react";
import { SALES_LABELS } from "../../utils/const";
import { useSaleStore } from "@/src/store/sale-store";
import { validateSaleData } from "../../utils/validateSaleData";

export const InvoiceFooter = () => {
  const state = useSaleStore(state => state);

  console.log(state);

  return (
    <div className="flex gap-3 p-5">
      <Button
        className="grow"
        disabled={
          !validateSaleData({
            frequency: state.frequency,
            productsToSale: state.productsToSale,
            quotes: state.quotes,
            client: state.client
          })
        }
      >
        {SALES_LABELS.SALE}
      </Button>
      <Button color="failure">{SALES_LABELS.CANCEL}</Button>
    </div>
  );
};
