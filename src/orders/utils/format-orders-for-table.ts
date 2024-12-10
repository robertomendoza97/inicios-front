import { OrderFromAPI } from "../interfaces/all-orders.interface";
import { ORDER_LABELS } from "./const";

export const formarOrdersForTable = (orders: OrderFromAPI[]) => {
  return orders.map(order => ({
    id: order.id,
    provider: order.provider,
    orderDate: order.orderDate,
    receiptDate: order.receiptDate ? order.receiptDate : "-",
    state:
      ORDER_LABELS.STATES[
        order.state.toUpperCase() as "PENDING" | "RECEIVED" | "CANCELED"
      ],
    products: order.products,
    actions: `${order.id}%${order.state}`
  }));
};
