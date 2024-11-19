"use server";

import { customFetch } from "@/src/services/rest.service";
import { IOrderToCreate } from "../interfaces/create-order-form-values.interface";

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
