export interface IOrderProducts {
  quantity: string;
  costPrice: string;
  id: string;
}

export interface ICreateOrderFormValues {
  orderDate: string;
  provider: string;
  products: IOrderProducts[];
}

export interface IOrderToCreate {
  orderDate: string;
  provider: string;
  products: { quantity: number; costPrice: number; productId: string }[];
}
