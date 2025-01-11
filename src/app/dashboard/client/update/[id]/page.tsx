import { IAllClients, UpdateClientForm } from "@/src/clients";
import { ErrorResponsePage } from "@/src/components";
import { customFetch } from "@/src/services/rest.service";

interface props {
  params: { id: string };
}

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

const ClientPage = async ({ params: { id } }: props) => {
  const { data, error } = await getClients();

  const oneClient = data.find(c => c.id === id)!;

  if (error) return <ErrorResponsePage />;

  return (
    <UpdateClientForm clients={data} initialImages={[]} client={oneClient} />
  );
};

export default ClientPage;
