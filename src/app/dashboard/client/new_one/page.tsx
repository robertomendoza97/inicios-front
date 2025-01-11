import {
  COOKIE_CLIENT_IMAGES,
  CreateClientForm,
  IAllClients
} from "@/src/clients";
import { ErrorResponsePage } from "@/src/components";
import { customFetch } from "@/src/services/rest.service";
import { cookies } from "next/headers";
import React from "react";

const getClients = async () => {
  const {
    data: { data },
    error
  } = await customFetch<IAllClients>(
    "client",
    {
      cache: "no-cache"
    },
    { data: [] }
  );

  return { data, error };
};

const NewClientPage = async () => {
  const { data, error } = await getClients();
  const cookieStore = cookies();

  if (error) return <ErrorResponsePage />;

  const initialImages = JSON.parse(
    cookieStore.get(COOKIE_CLIENT_IMAGES)?.value ?? "[]"
  );

  return (
    <div className="flex items-center justify-center w-full h-full">
      <CreateClientForm clients={data} initialImages={initialImages} />
    </div>
  );
};

export default NewClientPage;
