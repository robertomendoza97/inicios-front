import { IClient } from "@/src/clients";
import { ProductToSale } from "@/src/store/sale-store";

interface Args {
  productsToSale: ProductToSale[];
  client?: IClient;
  quotes: number;
  frequency: "weekly" | "biweekly" | "full";
}

export const validateSaleData = ({
  client,
  frequency,
  quotes,
  productsToSale
}: Args) => {
  let isValid = true;

  if (frequency !== "full") {
    isValid = quotes > 0;
  }

  return client && isValid && productsToSale.length > 0;
};
