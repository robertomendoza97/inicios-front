import { IAllOrders, OrdersTable } from "@/src/orders";
import { customFetch } from "@/src/services/rest.service";
import React from "react";

const getOrders = async () => {
  const {
    data: { data }
  } = await customFetch<IAllOrders>(
    "order",
    { cache: "no-cache" },
    { data: [] }
  );
  return data;
};

const OrdersPage = async () => {
  const orders = await getOrders();

  return <OrdersTable orders={orders} />;
};

export default OrdersPage;
