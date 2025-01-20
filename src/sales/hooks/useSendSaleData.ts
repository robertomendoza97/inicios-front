"use client";

import { FormEvent, useState } from "react";
import { validateSaleData } from "../utils/validateSaleData";
import { useSaleStore } from "@/src/store/sale-store";
import { createSaleAction } from "../actions/serverActions";
import { getSaleQuotesToSend, getTotalInterest } from "../utils/getSaleQuotes";
import { stringThousandToNumber, useNotificationStore } from "@/src/utils";
import { SALES_LABELS } from "../utils/const";
import { useRouter } from "next/navigation";

export const useSendSaleData = () => {
  const client = useSaleStore(state => state.client);
  const productsToSale = useSaleStore(state => state.productsToSale);
  const frequency = useSaleStore(state => state.frequency);
  const quotes = useSaleStore(state => state.quotes);
  const monthlyInterest = useSaleStore(state => state.monthlyInterest);
  const initial = useSaleStore(state => state.initial);
  const formattedQuotes = useSaleStore(state => state.formattedQuotes);
  const reset = useSaleStore(state => state.reset);
  const [loading, setLoading] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !validateSaleData({
        frequency: frequency,
        productsToSale: productsToSale,
        quotes: Number(quotes),
        client: client
      })
    )
      return;
    setLoading(true);

    const { error } = await createSaleAction({
      client: client!.id,
      frequency,
      monthlyInterest,
      interestRate: getTotalInterest({
        frequency,
        quotaKey: quotes.toString(),
        interest: monthlyInterest
      }),
      quotas: getSaleQuotesToSend({
        frequency,
        initial: stringThousandToNumber(initial),
        quotes: formattedQuotes
      }),
      currency: "USD",
      products: productsToSale.map(p => ({
        id: p.id,
        quantity: p.quantityToSale
      }))
    });

    setLoading(false);

    if (error) {
      return showNotification({
        type: "error",
        text: SALES_LABELS.NOTIFICATIONS.ERRORS.CREATION
      });
    }

    showNotification({
      type: "success",
      text: SALES_LABELS.NOTIFICATIONS.CREATION
    });

    reset();
    router.refresh();
  };

  return { handleSubmit, loading };
};
