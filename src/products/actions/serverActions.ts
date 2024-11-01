"use server";

import { customFetch } from "@/src/services/rest.service";
import { OneProductDetails, ProductToCreate } from "..";

export const createProductAction = async (body: ProductToCreate) => {
  const { data } = await customFetch(
    "product",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    },
    {} as Response
  );

  return data;
};

export const updateProductAction = async (
  id: string,
  body: ProductToCreate
) => {
  const { data } = await customFetch<OneProductDetails>(
    `product/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    },
    {} as OneProductDetails
  );

  return data;
};
