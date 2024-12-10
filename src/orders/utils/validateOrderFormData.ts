import { stringThousandToNumber } from "@/src/utils";
import { ICreateOrderFormValues, IOneOrder, UpdateOrderDto } from "../";

export const validateOrderFormData = (formValues: ICreateOrderFormValues) => {
  let isValid = false;

  if (
    formValues.orderDate !== "" &&
    formValues.provider !== "" &&
    formValues.products.length > 0
  ) {
    isValid = true;
  }

  return (
    isValid &&
    formValues.products.every(
      product =>
        stringThousandToNumber(product.costPrice) > 0 &&
        stringThousandToNumber(product.quantity) > 0
    )
  );
};

export const validateUpdateOrderFormData = (
  order: IOneOrder,
  formValues: ICreateOrderFormValues
) => {
  const objToSend: UpdateOrderDto = {
    orderDetailsToUpdate: [],
    orderDetailsToDelete: order.orderDetail
      .filter(od => !formValues.products.find(p => od.productId.id === p.id))
      .map(od => od.id),
    orderDetailsToAdd: []
  };

  for (const product of formValues.products) {
    const oldProduct = order.orderDetail.find(
      od => od.productId.id === product.id
    );

    if (!oldProduct) {
      objToSend.orderDetailsToAdd.push({
        costPrice: stringThousandToNumber(product.costPrice),
        productId: product.id,
        quantity: stringThousandToNumber(product.quantity)
      });
    }

    if (oldProduct) {
      const canUpdate =
        Number(oldProduct.costPrice) !==
          stringThousandToNumber(product.costPrice) ||
        Number(oldProduct.quantity) !==
          stringThousandToNumber(product.quantity);

      if (canUpdate) {
        objToSend.orderDetailsToUpdate.push({
          costPrice: stringThousandToNumber(product.costPrice),
          id: product.detailId!,
          quantity: stringThousandToNumber(product.quantity)
        });
      }
    }
  }

  return {
    ...objToSend,
    valid:
      (objToSend.orderDetailsToAdd.length > 0 ||
        objToSend.orderDetailsToDelete.length > 0 ||
        objToSend.orderDetailsToUpdate.length > 0) &&
      formValues.products.every(
        product =>
          stringThousandToNumber(product.costPrice) > 0 &&
          stringThousandToNumber(product.quantity) > 0
      ) &&
      formValues.products.length > 0
  };
};
