import { ErrorResponsePage } from "@/src/components";
import { IOneOrder, ReceiveOrderForm } from "@/src/orders";
import { customFetch } from "@/src/services/rest.service";
import React from "react";
import { redirect } from "next/navigation";
import { PATHS } from "@/src/utils";

interface Props {
  params: {
    id: string;
  };
}

const getOrder = async (id: string) => {
  const { data, error } = await customFetch<IOneOrder>(`order/${id}`, {
    cache: "no-cache"
  });

  return { data, error };
};

const ReceiveOrderPage = async ({ params: { id } }: Props) => {
  const { data, error } = await getOrder(id);

  if (data.state === "received") return redirect(PATHS.ORDERS.MAIN);

  if (error) return <ErrorResponsePage />;

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <ReceiveOrderForm order={data} />;
    </div>
  );
};

export default ReceiveOrderPage;
