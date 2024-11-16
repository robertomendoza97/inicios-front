export interface OrderFromAPI {
  id: number;
  orderDate: string;
  receiptDate: string;
  state: string;
  products: number;
  provider: string;
  createdAt: string;
}

export interface IAllOrders {
  data: OrderFromAPI[];
}
