import { HiBuildingStorefront } from "react-icons/hi2";
import { SALES_LABELS } from "../../utils/const";

export const InvoiceProducts = () => {
  return (
    <div className="bg-gray-100 flex flex-col gap-3 items-center justify-center p-5 border-b grow">
      <HiBuildingStorefront size={50} className="text-gray-500" />
      <p>{SALES_LABELS.HERE_SEE_PRODUCTS}</p>
    </div>
  );
};
