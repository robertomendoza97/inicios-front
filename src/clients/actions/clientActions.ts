"use server";

import { customFetch } from "@/src/services/rest.service";
import { IClientToCreate, ImagesToCreate } from "../";

interface Arg extends IClientToCreate {
  images: ImagesToCreate[];
  guarantor: string;
}

export const createClientAction = async (body: Arg) => {
  const { data, error, success } = await customFetch<{ id: string }>("client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return { data, error, success };
};
