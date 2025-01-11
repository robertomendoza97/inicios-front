import { Column, CustomTable } from "@/src/components";
import { CLIENT_LABELS, formatUserForTable, IClient } from "../";
import { PATHS } from "@/src/utils";

interface Props {
  clients: IClient[];
}
export const ClientTable = ({ clients }: Props) => {
  const columns: Column[] = [
    { key: "name", name: "nombre", index: true, sort: true },
    { key: "idCard", name: "cedula", index: true, sort: true },
    { key: "email", name: "correo", index: true, sort: true },
    { key: "phone", name: "# Telefono", index: true },
    { key: "profession", name: "profesion", index: true, sort: true }
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
