"use server";

import { ProductToCreate } from "..";

export const createProductAction = async (body: ProductToCreate) => {
  const data = await fetch(
    "http://localhost:3333/administration-system/api/product",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(resp => resp.json())
    .catch(err => err);

  return data;
};
