"use client";

import { HiBuildingStorefront } from "react-icons/hi2";
import { SALES_LABELS } from "../../utils/const";
import { Tabs } from "flowbite-react";
import { useSaleStore } from "@/src/store/sale-store";
import { InvoiceSingleProduct } from "./InvoiceSingleProduct";
import { getSaleQuotes, getTotalPriceOfSale } from "../../";
import { InvoiceQuota } from "./InvoiceQuota";
import { TbMoneybag } from "react-icons/tb";

export const InvoiceProducts = () => {
  const productsToSale = useSaleStore(state => state.productsToSale);
  const numberOfQuotes = useSaleStore(state => state.quotes);
  const frequency = useSaleStore(state => state.frequency);
  const initial = useSaleStore(state => state.initial);
  const interest = useSaleStore(state => state.interest);

  let allProductsQuantity = 0;

  for (let i = 0; i < productsToSale.length; i++) {
    const element = productsToSale[i];

    allProductsQuantity = allProductsQuantity + element.quantityToSale;
  }

  const quotes = getSaleQuotes({
    frequency,
    interest,
    numberOfDates: numberOfQuotes,
    startDate: new Date().toISOString(),
    total: getTotalPriceOfSale(productsToSale),
    initial
  });

  return (
    <div className="bg-gray-100 p-5 border-b grow overflow-hidden">
      <Tabs variant="fullWidth">
        <Tabs.Item title={` ${SALES_LABELS.PRODUCTS} (${allProductsQuantity})`}>
          {productsToSale.length > 0 ? (
            <div className="flex flex-col gap-2">
              {productsToSale.map(pts => (
                <InvoiceSingleProduct key={pts.id} productToSale={pts} />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col overflow-auto">
              <HiBuildingStorefront size={50} className="text-gray-500" />
              <p>{SALES_LABELS.HERE_SEE_PRODUCTS}</p>
            </div>
          )}
        </Tabs.Item>
        <Tabs.Item title="Cuotas">
          {quotes.length > 0 ? (
            <div className="flex flex-col gap-2">
              {quotes.map((q, i) => (
                <InvoiceQuota key={q.date} {...q} index={++i} />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col overflow-auto">
              <TbMoneybag size={50} className="text-gray-500" />
              <p>{SALES_LABELS.HERE_SEE_QUOTES}</p>
            </div>
          )}
        </Tabs.Item>
      </Tabs>
    </div>
  );
};
