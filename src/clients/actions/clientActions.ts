"use server";

import { customFetch } from "@/src/services/rest.service";
import { IClientToCreate, ImagesToCreate } from "../";

interface Arg extends IClientToCreate {
  images: ImagesToCreate[];
}

export const createClientAction = async (body: Arg) => {
  const { data, error, success, message } = await customFetch("client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return { data, error, success, message };
};

export const updateClientAction = async (id: string, body: Arg) => {
  const { data, error, success, message } = await customFetch(`client/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return { data, error, success, message };
};
