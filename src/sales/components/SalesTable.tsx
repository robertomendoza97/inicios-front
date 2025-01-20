import { Column, CustomTable } from "@/src/components";
import { PATHS } from "@/src/utils";
import { formatAllSalesForTable, SaleFromAPI } from "../";

const COLUMNS: Column[] = [
  {
    key: "date",
    name: "fecha de venta",
    index: true,
    sort: true
  },
  {
    key: "state",
    name: "estado"
  },
  {
    key: "totalAmount",
    name: "monto total (S/I)"
  },
  {
    key: "quotes",
    name: "cuotas"
  },
  {
    key: "frequency",
    name: "frecuencia"
  },
  {
    key: "initial",
    name: "inicial"
  },
  {
    key: "rest",
    name: "Restante total (C/i)"
  },
  {
    key: "saleTo",
    name: "vendido a",
    index: true,
    sort: true
  },
  {
    key: "saledBy",
    name: "vendido por",
    index: true
  }
];

interface Props {
  sales: SaleFromAPI[];
}

export const SalesTable = ({ sales }: Props) => {
  return (
    <div className="h-full">
      <CustomTable
        path={PATHS.SALES.NEW_ONE}
        title="Ventas"
        column={COLUMNS}
        data={formatAllSalesForTable(sales)}
      />
    </div>
  );
};
