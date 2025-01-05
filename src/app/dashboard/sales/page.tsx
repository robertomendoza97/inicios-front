import { ErrorResponsePage } from "@/src/components";
import { AllSalesFromAPI, SalesTable } from "@/src/sales";
import { customFetch } from "@/src/services/rest.service";

const getSales = async () => {
  const {
    data: { data },
    error
  } = await customFetch<AllSalesFromAPI>("sale", { method: "GET" });

  return { data: data, error };
};

const Sales = async () => {
  const { data, error } = await getSales();

  if (error) return <ErrorResponsePage />;

  return <SalesTable sales={data} />;
};

export default Sales;
