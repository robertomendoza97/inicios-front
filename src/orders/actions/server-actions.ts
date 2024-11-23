"use server";

import { customFetch } from "@/src/services/rest.service";
import { IOrderToCreate } from "../interfaces/create-order-form-values.interface";
import { IReceiveOrderForm } from "../interfaces/receive-order-form";

export const createOrderAction = async (body: IOrderToCreate) => {
  const { data, error } = await customFetch<{
    success: boolean;
    orderId: number;
  }>(
    "order",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    },
    { orderId: 0, success: false }
  );

  return { data, error };
};

export const receiveOrderAction = async (
  id: number,
  body: IReceiveOrderForm
) => {
  const { data, error } = await customFetch(
    `order/receive/${id}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    },
    {
      success: false
    }
  );

  return { data, error };
};
