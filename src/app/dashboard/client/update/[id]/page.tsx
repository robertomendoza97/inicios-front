import {
  COOKIE_UPDATE_CLIENT_DELETE_IMAGES,
  COOKIE_UPDATE_CLIENT_IMAGES,
  IAllClients,
  UpdateClientForm
} from "@/src/clients";
import { ErrorResponsePage } from "@/src/components";
import { customFetch } from "@/src/services/rest.service";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();

  const initialImages = JSON.parse(
    cookieStore.get(`${COOKIE_UPDATE_CLIENT_IMAGES}-${id}`)?.value ?? "[]"
  );
  const initialImagesToDelete = JSON.parse(
    cookieStore.get(`${COOKIE_UPDATE_CLIENT_DELETE_IMAGES}-${id}`)?.value ??
      "[]"
  );

  const { data, error } = await getClients();

  const oneClient = data.find(c => c.id === id)!;

  if (error) return <ErrorResponsePage />;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <UpdateClientForm
        clients={data}
        initialImages={
          initialImages.length > 0 ? initialImages : oneClient.images
        }
        initialImagesToDelete={initialImagesToDelete}
        client={oneClient}
      />
    </div>
  );
};

export default ClientPage;
