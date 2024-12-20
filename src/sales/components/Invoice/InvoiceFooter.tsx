import { Button } from "flowbite-react";

export const InvoiceFooter = () => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <Button>Vender</Button>
      <div className="flex justify-between items-center">
        <p>0 productos</p>
        <button>Cancelar</button>
      </div>
    </div>
  );
};
