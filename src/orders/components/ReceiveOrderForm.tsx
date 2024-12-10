"use client";

import React from "react";
import {
  IOneOrder,
  ORDER_LABELS,
  ReceiveOrderProduct,
  useReceiveOrderHook
} from "../";
import { CustomInput, Divider } from "@/src/components";
import { Button, Spinner } from "flowbite-react";
import { GENERAL_LABELS, getFormattedDate } from "@/src/utils";

interface Props {
  order: IOneOrder;
}
export const ReceiveOrderForm = ({ order }: Props) => {
  const { formValues, handleChange, handleProduct, loading, onSubmit } =
    useReceiveOrderHook(order);
  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={onSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] min-w-[50%] p-6 bg-white flex gap-3 flex-col items-center grow max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">{ORDER_LABELS.RECEIVE.TITLE}</h1>
      <div className="w-full flex flex-col gap-5">
        <div className="flex gap-5 w-full justify-between">
          <div className="flex flex-col justify-between grow shadow rounded bg-gray-50 p-3">
            <div className="h-full flex gap-2">
              <p className="font-semibold">{ORDER_LABELS.RECEIVE.PROVIDER}</p>
              <p>{order.provider}</p>
            </div>
            <div className="h-full flex justify-between">
              <h5 className="font-semibold">
                {ORDER_LABELS.RECEIVE.ORDER_DATE}
              </h5>
              <p>{order.orderDate}</p>
            </div>
          </div>
          <div className="grow min-w-[30%]">
            <CustomInput
              min={getFormattedDate(order.orderDate)}
              max={today}
              value={formValues.receiptDate}
              type="date"
              label={ORDER_LABELS.RECEIVE.RECEIP_DATE}
              name={"receiptDate"}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <Divider />
      <ReceiveOrderProduct
        formValues={formValues}
        orderDetail={order.orderDetail}
        handleProduct={handleProduct}
      />
      <Button
        type="submit"
        className={`w-full ${
          formValues.receiptDate !== "" ? "" : "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? <Spinner /> : GENERAL_LABELS.SEND}
      </Button>
    </form>
  );
};
