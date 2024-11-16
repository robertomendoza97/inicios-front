import { Column, CustomTable } from "@/src/components";
import { PATHS } from "@/src/utils";
import React from "react";
import { ORDER_LABELS } from "../utils/const";
import { OrderFromAPI } from "../interfaces/all-orders.interface";
import { formarOrdersForTable } from "../";

interface Props {
  orders: OrderFromAPI[];
}

const columns: Column[] = [
  {
    key: "id",
    name: "id"
  },
  {
    key: "provider",
    name: "proveedor"
  },
  {
    key: "orderDate",
    name: "Fecha del pedido"
  },
  {
    key: "receiptDate",
    name: "Fecha de recibo"
  },
  {
    key: "state",
    name: "estado"
  },
  {
    key: "cantida de prod.",
    name: "products"
  }
];

export const OrdersTable = ({ orders }: Props) => {
  return (
    <CustomTable
      column={columns}
      data={formarOrdersForTable(orders)}
      title={ORDER_LABELS.ALL_ORDERS.TITLE}
      path={PATHS.ORDERS.NEW_ONE}
    />
  );
};
