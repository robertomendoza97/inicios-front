import { Column, CustomTable } from "@/src/components";
import { CLIENTS_TABLE_LABELS, formatUserForTable, IClient } from "../";
import { PATHS } from "@/src/utils";

interface Props {
  clients: IClient[];
}
export const ClientTable = ({ clients }: Props) => {
  const columns: Column[] = [{ key: "name", name: "nombre" }];

  return (
    <CustomTable
      column={columns}
      data={formatUserForTable(clients)}
      title={CLIENTS_TABLE_LABELS.TITLE}
      path={PATHS.CLIENTS.NEW_ONE}
    />
  );
};
