"use client";

import { Column, CustomTable } from "@/src/components";
import {
  CLIENT_LABELS,
  clientsActionsFunction,
  formatUserForTable,
  IClient
} from "../";
import { PATHS } from "@/src/utils";

interface Props {
  clients: IClient[];
}

export const ClientTable = ({ clients }: Props) => {
  const columns: Column[] = [
    { key: "name", name: "nombre", index: true, sort: true },
    { key: "idCard", name: "cedula", index: true, sort: true },
    { key: "email", name: "correo", index: true, sort: true },
    { key: "phone", name: "# telefono", index: true },
    { key: "profession", name: "profesion", index: true, sort: true },
    { key: "actions", name: "acciones", component: clientsActionsFunction }
  ];

  return (
    <CustomTable
      column={columns}
      data={formatUserForTable(clients)}
      title={CLIENT_LABELS.TITLE}
      path={PATHS.CLIENTS.NEW_ONE}
    />
  );
};
