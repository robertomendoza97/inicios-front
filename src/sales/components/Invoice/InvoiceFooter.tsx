"use client";

import { Button } from "flowbite-react";
import { SALES_LABELS } from "../../utils/const";
import { useSaleStore } from "@/src/store/sale-store";
import { validateSaleData } from "../../utils/validateSaleData";
import { useSendSaleData } from "../../";

export const InvoiceFooter = () => {
  const state = useSaleStore(state => state);

  const { handleSubmit, loading } = useSendSaleData();

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-5">
      <Button
        className="grow"
        type="submit"
        disabled={
          !validateSaleData({
            frequency: state.frequency,
            productsToSale: state.productsToSale,
            quotes: state.quotes,
            client: state.client
          }) || loading
        }
      >
        {SALES_LABELS.SALE}
      </Button>
      <Button color="failure" onClick={() => window.print()}>
        {SALES_LABELS.CANCEL}
      </Button>
    </form>
  );
};
