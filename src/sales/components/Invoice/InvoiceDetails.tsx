"use client";

import { CustomInput, CustomSelect } from "@/src/components";
import { Button, TextInput, Tooltip } from "flowbite-react";
import { FaUserPlus } from "react-icons/fa6";
import { QUOTES_MAPPER, SALES_LABELS } from "../../utils/const";
import { IClient } from "@/src/clients";
import { formatNumberToPrice, GENERAL_LABELS, PATHS } from "@/src/utils";
import { useInvoiceDetails } from "../../";
import { useSaleStore } from "@/src/store/sale-store";
import Link from "next/link";

interface Props {
  clients: IClient[];
}
export const InvoiceDetails = ({ clients }: Props) => {
  const client = useSaleStore(state => state.client);
  const frequency = useSaleStore(state => state.frequency);

  const interest = useSaleStore(state => state.monthlyInterest);
  const initial = useSaleStore(state => state.initial);
  const quotes = useSaleStore(state => state.quotes);

  const {
    clientsToShow,
    focus,
    termToSearch,
    handleChangeTerm,
    setFocus,
    handleClient,
    handleFormValues,
    handleStartDate
  } = useInvoiceDetails(clients);

  const today = new Date();
  const maxDate = new Date(today);
  const minDate = new Date(today);
  maxDate.setDate(today.getDate() + 3);
  minDate.setDate(today.getDate() - 2);
  const maxDateString = maxDate.toISOString().split("T")[0];
  const minDateString = minDate.toISOString().split("T")[0];

  return (
    <div className="p-5 pt-3 flex flex-col gap-4 border-b">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <CustomSelect
            name={"frequency"}
            label={SALES_LABELS.FREQUENCY}
            options={[
              { key: "biweekly", value: "Quincenal" },
              { key: "weekly", value: "Semanal" },
              { key: "full", value: "Contado" }
            ]}
            onChange={handleFormValues}
            value={frequency}
          />
          <CustomSelect
            disabled={frequency === "full"}
            name={"monthlyInterest"}
            label={SALES_LABELS.INTEREST}
            options={[
              { key: "10", value: "10%" },
              { key: "5", value: "5%" },
              { key: "0", value: "0" }
            ]}
            onChange={handleFormValues}
            value={interest.toString()}
          />
        </div>
        <div className="flex gap-3">
          <CustomInput
            disabled={frequency === "full"}
            value={formatNumberToPrice(initial)}
            label={SALES_LABELS.INITIAL}
            name={"initial"}
            type="number"
            allowDecimals
            thousandFormat
            onChange={handleFormValues}
          />
          <CustomSelect
            disabled={frequency === "full"}
            name={"quotes"}
            label={SALES_LABELS.QUOTES}
            options={QUOTES_MAPPER[frequency] || [{ key: "0", value: "0" }]}
            onChange={handleFormValues}
            value={quotes.toString()}
          />
        </div>
      </div>
      <div className="flex gap-5 items-center justify-between">
        <div className="relative grow">
          <TextInput
            className="w-full"
            placeholder={
              client
                ? `${client.name} ${client.lastName} - ${client.idCard}`
                : SALES_LABELS.PLACEHOLDERS.CLIENT
            }
            onChange={handleChangeTerm}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={termToSearch}
          />
          {termToSearch.length > 3 && focus && (
            <div className="bg-white border absolute top-[100%] w-full left-0 z-40">
              {clientsToShow.map(c => (
                <div
                  onMouseDown={e => e.preventDefault()}
                  key={c.id}
                  onClick={() => handleClient(c)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span>{`${c.name} ${c.lastName} - ${c.idCard}`}</span>
                  <span></span>
                </div>
              ))}
              {clientsToShow.length === 0 && termToSearch.length > 3 && (
                <p className="py-2 text-center ">
                  {GENERAL_LABELS.NO_COINCIDENCE}
                </p>
              )}
            </div>
          )}
        </div>
        <Tooltip content="Fecha a partir de la cual se calcularan las cuotas.">
          <TextInput
            type="date"
            className="w-10"
            min={minDateString}
            max={maxDateString}
            onChange={handleStartDate}
            disabled={frequency === "full"}
          />
        </Tooltip>
        <Button>
          <FaUserPlus className="mr-1" />
          <Link href={PATHS.CLIENTS.NEW_ONE} target="_blank">
            {SALES_LABELS.NEW}
          </Link>
        </Button>
      </div>
    </div>
  );
};
