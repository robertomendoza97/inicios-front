import { ICreateOrderFormValues } from "../";

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
      product => Number(product.costPrice) > 0 && Number(product.quantity) > 0
    )
  );
};
