import { IOneOrder, UpdateOrderForm } from "@/src/orders";
import { IProductsResponse } from "@/src/products";
import { customFetch } from "@/src/services/rest.service";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const getAllProducts = async () => {
  const {
    data: { data }
  } = await customFetch<IProductsResponse>(
    "product",
    { cache: "no-cache" },
    { data: [] }
  );

  return data;
};

const getOrder = async (id: string) => {
  const { data, error } = await customFetch<IOneOrder>(`order/${id}`, {
    cache: "no-cache"
  });

  return { data, error };
};

const UpdateOneOrder = async ({ params: { id } }: Props) => {
  const products = await getAllProducts();
  const order = await getOrder(id);

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <UpdateOrderForm products={products} order={order.data} />
    </div>
  );
};

export default UpdateOneOrder;
