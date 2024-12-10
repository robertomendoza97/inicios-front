export interface IOneOrder {
  id: number;
  orderDate: string;
  receiptDate: string | null;
  provider: string;
  state: string;
  createdAt: string;
  orderDetail: IOrderDetail[];
  receivedBy?: {
    name: string;
    last_name: string;
  };
}

export interface IOrderDetail {
  id: number;
  quantity: number;
  costPrice: number;
  damagedUnits: number;
  createdAt: string;
  updatedAt: string;
  productId: {
    id: string;
    name: string;
  };
}
