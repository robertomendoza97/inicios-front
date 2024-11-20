import { OrderFromAPI } from "../interfaces/all-orders.interface";

export const formarOrdersForTable = (orders: OrderFromAPI[]) => {
  return orders.map(order => ({
    id: order.id,
    provider: order.provider,
    orderDate: order.orderDate,
    receiptDate: order.receiptDate ? order.receiptDate : "-",
    state: order.state,
    products: order.products,
    actions: order.id
  }));
};
