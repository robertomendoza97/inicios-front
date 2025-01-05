import { parse, format } from "@formkit/tempo";
import { TOTAL_INTEREST } from "./const";
import {
  ValidWeeklyQuotes,
  ValidBiweeklyQuotes
} from "../interfaces/createSaleDetails.interface";
import { QuotaToCreate } from "../interfaces/saleToCreate.interface";

interface TotalInterestArgs {
  frequency: "biweekly" | "weekly" | "full";
  quotaKey: string;
  interest: number;
}

export const getTotalInterest = ({
  frequency,
  quotaKey,
  interest
}: TotalInterestArgs) => {
  let totalInterest = 0;

  if (frequency === "biweekly" && quotaKey in TOTAL_INTEREST.biweekly) {
    TOTAL_INTEREST.biweekly[quotaKey as ValidBiweeklyQuotes];
  } else if (frequency === "weekly" && quotaKey in TOTAL_INTEREST.weekly) {
    totalInterest = TOTAL_INTEREST.weekly[quotaKey as ValidWeeklyQuotes];
  }

  return interest * totalInterest;
};

interface Args {
  startDate: string;
  frequency: "biweekly" | "weekly" | "full";
  numberOfDates: number;
  interest: number;
  total: number;
  initial: number;
}

export const getSaleQuotes = ({
  startDate,
  frequency,
  numberOfDates,
  interest,
  total,
  initial
}: Args): QuotaToCreate[] => {
  if (numberOfDates && numberOfDates > 0) {
    const interval =
      frequency === "weekly" ? 7 : frequency === "biweekly" ? 14 : 0; // Intervalo en días
    const paymentDates: QuotaToCreate[] = [];

    let currentDate = parse(startDate); // Convierte la fecha inicial
    currentDate.setDate(currentDate.getDate() + interval);

    let quotaAmount: number;

    if (frequency === "full") {
      quotaAmount = total;
    } else {
      const restOfPay = total - initial;

      const quotaKey = numberOfDates.toString();

      let totalInterest =
        (restOfPay * getTotalInterest({ frequency, quotaKey, interest })) / 100;

      // if (frequency === "biweekly" && quotaKey in TOTAL_INTEREST.biweekly) {
      //   totalInterest =
      //     (restOfPay *
      //       Number(
      //         interest *
      //           TOTAL_INTEREST.biweekly[quotaKey as ValidBiweeklyQuotes]
      //       )) /
      //     100;
      // } else if (frequency === "weekly" && quotaKey in TOTAL_INTEREST.weekly) {
      //   totalInterest =
      //     (restOfPay *
      //       Number(
      //         interest * TOTAL_INTEREST.weekly[quotaKey as ValidWeeklyQuotes]
      //       )) /
      //     100;
      // }

      quotaAmount =
        Number(restOfPay / numberOfDates) +
        Number(totalInterest / numberOfDates);
    }

    for (let i = 0; i < numberOfDates; i++) {
      // Formatea y agrega la fecha actual
      paymentDates.push({
        date: new Date(currentDate).toISOString(),
        amount: quotaAmount,
        type: "quote"
      });

      // Suma manualmente el intervalo a la fecha actual
      const jsDate = new Date(currentDate); // Convierte a objeto Date estándar
      jsDate.setDate(jsDate.getDate() + interval); // Incrementa días
      currentDate = jsDate.toISOString() as unknown as Date; // Devuelve como cadena ISO para compatibilidad
    }

    return paymentDates;
  }

  return [];
};

interface ArgsToSend {
  initial: number;
  frequency: "weekly" | "biweekly" | "full";
  quotes: QuotaToCreate[];
}

interface QuotesToSend {
  type: "full" | "quote" | "initial";
  date: string;
  amount?: number;
}

export const getSaleQuotesToSend = ({
  initial,
  frequency,
  quotes
}: ArgsToSend): QuotesToSend[] => {
  const quotesToSend: QuotesToSend[] = [];

  if (frequency === "full") {
    quotesToSend.push({ type: "full", date: new Date().toISOString() });
  } else {
    quotesToSend.push({
      type: "initial",
      date: new Date().toISOString(),
      amount: initial
    });

    for (let i = 0; i < quotes.length; i++) {
      const element = quotes[i];

      quotesToSend.push({
        type: "quote",
        date: element.date
      });
    }
  }

  return quotesToSend;
};
