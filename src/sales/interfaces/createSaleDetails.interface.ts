export interface CreateSaleDetails {
  frequency: "weekly" | "biweekly" | "full";
  initial: string;
  interest: string;
  quotes: string;
}

export type ValidBiweeklyQuotes = "6" | "12" | "18" | "24";
export type ValidWeeklyQuotes = "13" | "26" | "39" | "52";
