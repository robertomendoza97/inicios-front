export interface QuotaToCreate {
  date: string;
  type: "initial" | "quote" | "full";
  amount?: number;
}

export interface ProductsToSale {
  id: string;
  quantity: number;
}

export interface SaleToCreate {
  interestRate: number;
  monthlyInterest: number;
  currency?: string;
  client: string;
  quotas: QuotaToCreate[];
  products: ProductsToSale[];
  frequency: "weekly" | "biweekly" | "full";
}
