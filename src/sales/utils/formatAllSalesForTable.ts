import { format } from "@formkit/tempo";
import { SaleFromAPI } from "../";
import { formatNumberToPrice, getSimpleName } from "@/src/utils";

export const formatAllSalesForTable = (sales: SaleFromAPI[]) => {
  const FREQUENCYS: Record<string, string> = {
    full: "Contado",
    weekly: "Semanal",
    biweekly: "Quincenal"
  };

  const STATES: Record<string, string> = {
    active: "Activo",
    finished: "Finalizado"
  };

  return sales.map(s => ({
    id: s.id,
    frequency: FREQUENCYS[s.frequency],
    date: format(s.createdAt, "DD/MM/YYYY"),
    saleTo: getSimpleName(s.client.name, s.client.lastName),
    state: STATES[s.state],
    totalAmount: formatNumberToPrice(s.total_amount, "$"),
    interestRate: s.interestRate,
    saledBy: getSimpleName(s.createdBy.name, s.createdBy.last_name)
  }));
};
