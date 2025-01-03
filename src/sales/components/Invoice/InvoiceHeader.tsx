import { SALES_LABELS } from "../../utils/const";

export const InvoiceHeader = () => {
  return (
    <div className="flex justify-between items-center font-semibold text-lg py-2 px-5 border-b">
      <h2>{SALES_LABELS.INVOICE}</h2>
    </div>
  );
};
