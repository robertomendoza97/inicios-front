import { IClient } from "../";

export const formatUserForTable = (clients: IClient[]) => {
  return clients.map(client => ({ name: client.name, id: client.id }));
};
