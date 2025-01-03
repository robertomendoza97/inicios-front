import { InvoiceHeader } from "./InvoiceHeader";
import { InvoiceDetails } from "./InvoiceDetails";
import { InvoiceProducts } from "./InvoiceProducts";
import { InvoiceFooter } from "./InvoiceFooter";
import { IAllClients } from "@/src/clients";
import { customFetch } from "@/src/services/rest.service";
import { ErrorResponsePage } from "@/src/components";

const getClients = async () => {
  const {
    data: { data },
    error
  } = await customFetch<IAllClients>(
    "client",
    {
      cache: "no-cache"
    },
    { data: [] }
  );

  return { data, error };
};
export const Invoice = async () => {
  const { data: clients, error } = await getClients();

  if (error) return <ErrorResponsePage />;

  return (
    <aside className="w-[40%] bg-white border-l flex flex-col h-full shrink-0">
      <InvoiceHeader />
      <InvoiceDetails clients={clients} />
      <InvoiceProducts />
      <InvoiceFooter />
    </aside>
  );
};
