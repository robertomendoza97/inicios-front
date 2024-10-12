"use server";

import { ProductToCreate } from "..";

export const createProductAction = async (body: ProductToCreate) => {
  const data = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/product`,
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

export const updateProductAction = async (
  id: string,
  body: ProductToCreate
) => {
  const data = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/product/${id}`,
    {
      method: "PATCH",
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
