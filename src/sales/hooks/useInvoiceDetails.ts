"use client";

import { IClient } from "@/src/clients";
import { useSaleStore } from "@/src/store/sale-store";
import { ChangeEvent, useEffect, useState } from "react";
import { formatNumberToPrice, stringThousandToNumber } from "@/src/utils";
import { getTotalPriceOfSale } from "../utils/getTotalPriceOfSale";

export const useInvoiceDetails = (clients: IClient[]) => {
  const setClient = useSaleStore(state => state.setClient);
  const formatQuotes = useSaleStore(state => state.formatQuotes);
  const products = useSaleStore(state => state.productsToSale);
  const frequency = useSaleStore(state => state.frequency);
  const quotes = useSaleStore(state => state.quotes);
  const monthlyInterest = useSaleStore(state => state.monthlyInterest);
  const startDate = useSaleStore(state => state.startDate);
  const initial = useSaleStore(state => state.initial);
  const setStartDate = useSaleStore(state => state.setStartDate);
  const setCreateSaleDetails = useSaleStore(
    state => state.setCreateSaleDetails
  );

  const totalPrice = getTotalPriceOfSale(products);

  const [termToSearch, setTermToSearch] = useState("");
  const [focus, setFocus] = useState(false);

  const handleFormValues = (name: string, value: string) => {
    if (name === "initial" && stringThousandToNumber(value) > totalPrice)
      return;

    setCreateSaleDetails({
      name: name,
      value: name === "frequency" ? value : stringThousandToNumber(value)
    });
  };

  const handleChangeTerm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setTermToSearch(e.target.value.replace(/^a-zA-Z0-9\s/g, ""));
  };

  const clientsToShow = clients.filter(
    c =>
      c.name.includes(termToSearch) ||
      c.lastName.includes(termToSearch) ||
      c.idCard.includes(termToSearch)
  );

  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setStartDate(e.target.value);
  };

  const handleClient = (client: IClient) => {
    setTermToSearch("");
    setClient(client);
  };

  useEffect(() => {
    if (frequency === "full") {
      setCreateSaleDetails({
        name: "initial",
        value: formatNumberToPrice(totalPrice)
      });
    } else {
      setCreateSaleDetails({ name: "initial", value: 0 });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, products]);

  useEffect(() => {
    formatQuotes();
  }, [
    frequency,
    quotes,
    initial,
    monthlyInterest,
    startDate,
    products,
    formatQuotes
  ]);

  return {
    focus,
    clientsToShow,
    handleChangeTerm,
    setFocus,
    termToSearch,
    handleClient,
    handleFormValues,
    handleStartDate
  };
};
