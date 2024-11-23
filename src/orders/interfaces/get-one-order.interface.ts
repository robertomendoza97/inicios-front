export interface IOneOrder {
  id: number;
  orderDate: Date;
  receiptDate: string | null;
  provider: string;
  state: string;
  createdAt: Date;
  orderDetail: IOrderDetail[];
}

export interface IOrderDetail {
  id: number;
  quantity: number;
  costPrice: number;
  damagedUnits: number;
  createdAt: Date;
  updatedAt: Date;
  productId: {
    name: string;
  };
}
