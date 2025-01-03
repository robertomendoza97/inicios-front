import { ProductToSale } from "@/src/store/sale-store";

export const getTotalPriceOfSale = (products: ProductToSale[]) => {
  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    const element = products[i];

    totalPrice = totalPrice + element.retailPrice * element.quantityToSale;
  }

  return totalPrice;
};
