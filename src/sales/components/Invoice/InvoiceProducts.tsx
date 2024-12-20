import { HiBuildingStorefront } from "react-icons/hi2";

export const InvoiceProducts = () => {
  return (
    <div className="bg-gray-100 flex flex-col gap-3 items-center justify-center p-5 border-b grow">
      <HiBuildingStorefront size={50} className="text-gray-500" />
      <p>Aqui veras los productos que selecciones.</p>
    </div>
  );
};
