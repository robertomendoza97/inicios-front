import { getSimpleName } from "@/src/utils";
import { IClient } from "../";

export const formatUserForTable = (clients: IClient[]) =>
  clients.map(client => ({
    name: getSimpleName(client.name, client.lastName),
    id: client.id,
    idCard: client.idCard,
    email: client.email,
    phone: `+${client.countryCode} ${client.phoneNumber}`,
    profession: client.profession
  }));
