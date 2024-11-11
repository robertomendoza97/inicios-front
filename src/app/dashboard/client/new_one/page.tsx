import { CreateClientForm, IAllClients } from "@/src/clients";
import { ErrorResponsePage } from "@/src/components";
import { customFetch } from "@/src/services/rest.service";
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

  if (error) return <ErrorResponsePage />;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <CreateClientForm clients={data} />
    </div>
  );
};

export default NewClientPage;
