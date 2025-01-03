"use client";

import { IClient } from "@/src/clients";
import { useSaleStore } from "@/src/store/sale-store";
import { ChangeEvent, useEffect, useState } from "react";
import { CreateSaleDetails } from "../interfaces/createSaleDetails.interface";
import { formatNumberToPrice, stringThousandToNumber } from "@/src/utils";
import { getTotalPriceOfSale } from "../utils/getTotalPriceOfSale";

export const useInvoiceDetails = (clients: IClient[]) => {
  const setClient = useSaleStore(state => state.setClient);
  const products = useSaleStore(state => state.productsToSale);
  const setCreateSaleDetails = useSaleStore(
    state => state.setCreateSaleDetails
  );

  const totalPrice = getTotalPriceOfSale(products);

  const [formValues, setFormValues] = useState<CreateSaleDetails>({
    frequency: "weekly",
    interest: "",
    initial: "",
    quotes: ""
  });

  const [termToSearch, setTermToSearch] = useState("");
  const [focus, setFocus] = useState(false);

  const handleFormValues = (name: string, value: string) => {
    if (name === "initial" && stringThousandToNumber(value) > totalPrice)
      return;

    setFormValues({ ...formValues, [name]: value });
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

  const handleClient = (client: IClient) => {
    setTermToSearch("");
    setClient(client);
  };

  useEffect(() => {
    if (formValues.frequency === "full") {
      setFormValues({
        frequency: "full",
        initial: formatNumberToPrice(totalPrice),
        interest: "0",
        quotes: "0"
      });
    } else {
      setFormValues({ ...formValues, initial: "0" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.frequency, products]);

  useEffect(() => {
    setCreateSaleDetails(formValues);
  }, [formValues, setCreateSaleDetails]);

  return {
    focus,
    clientsToShow,
    handleChangeTerm,
    setFocus,
    termToSearch,
    handleClient,
    formValues,
    handleFormValues
  };
};
