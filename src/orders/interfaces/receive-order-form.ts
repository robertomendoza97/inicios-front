export interface IReceiveOrderForm {
  receiptDate: string;
  orderDetails: IReceiveOrderDetail[];
}

interface IReceiveOrderDetail {
  id: number;
  damagedUnits: number;
}
