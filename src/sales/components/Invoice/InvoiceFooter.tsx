import { Button } from "flowbite-react";
import { SALES_LABELS } from "../../utils/const";

export const InvoiceFooter = () => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <Button>{SALES_LABELS.SALE}</Button>
      <div className="flex justify-between items-center">
        <p>0 {SALES_LABELS.PRODUCTS}</p>
        <button>{SALES_LABELS.CANCEL}</button>
      </div>
    </div>
  );
};
