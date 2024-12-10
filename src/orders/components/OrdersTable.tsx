"use client";

import { Column, CustomTable } from "@/src/components";
import { PATHS } from "@/src/utils";
import { ORDER_LABELS } from "../utils/const";
import { OrderFromAPI } from "../interfaces/all-orders.interface";
import { formarOrdersForTable, orderActions } from "../";

interface Props {
  orders: OrderFromAPI[];
}

const columns: Column[] = [
  {
    key: "id",
    name: "id",
    index: true
  },
  {
    key: "provider",
    name: "proveedor",
    index: true,
    sort: true
  },
  {
    key: "orderDate",
    name: "Fecha del pedido",
    sort: true
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
    key: "products",
    name: "cantida de prod"
  },
  {
    key: "actions",
    name: "acciones",
    component: orderActions
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
