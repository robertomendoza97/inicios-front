export interface QuotaToCreate {
  date: string;
  type: "initial" | "quote" | "full";
  amount?: number;
}

export interface SaleToCreate {
  interestRate: number;
  currency?: string;
  client: string;
  quotas: QuotaToCreate[];
  frequency: "weekly" | "biweekly" | "full";
}
