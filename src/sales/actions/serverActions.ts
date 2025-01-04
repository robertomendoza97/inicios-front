"use server";

import { customFetch } from "@/src/services/rest.service";
import { SaleToCreate } from "../";

export const createSaleAction = async (body: SaleToCreate) => {
  const { data, error } = await customFetch<{ id: string }>("sale", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return { data, error };
};
