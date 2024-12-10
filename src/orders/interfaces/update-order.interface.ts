interface OrderDetailToUpdate {
  id: number;
  quantity: number;
  costPrice: number;
}

interface OrderDetailToAdd {
  productId: string;
  quantity: number;
  costPrice: number;
}

export interface UpdateOrderDto {
  orderDetailsToUpdate: OrderDetailToUpdate[];
  orderDetailsToDelete: number[];
  orderDetailsToAdd: OrderDetailToAdd[];
}
