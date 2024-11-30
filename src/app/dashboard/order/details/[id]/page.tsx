import { ErrorResponsePage } from "@/src/components";
import { IOneOrder, OrderDetails } from "@/src/orders";
import { customFetch } from "@/src/services/rest.service";
import React from "react";

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

const OrderDetailsPage = async ({ params: { id } }: Props) => {
  const { data, error } = await getOrder(id);

  if (error) return <ErrorResponsePage />;

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <OrderDetails orderDetails={data} />
    </div>
  );
};

export default OrderDetailsPage;
