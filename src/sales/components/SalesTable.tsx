import { Column, CustomTable } from "@/src/components";
import { PATHS } from "@/src/utils";

const COLUMNS: Column[] = [
  {
    key: "id",
    name: "id"
  }
];

export const SalesTable = () => {
  return (
    <div className="h-full">
      <CustomTable
        path={PATHS.SALES.NEW_ONE}
        title="Ventas"
        column={COLUMNS}
        data={[]}
      />
    </div>
  );
};
