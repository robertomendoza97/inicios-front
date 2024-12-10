"use client";

import { FormEvent, useState } from "react";
import { IOneOrder, ORDER_LABELS, receiveOrderAction } from "..";
import {
  GENERAL_LABELS,
  PATHS,
  stringThousandToNumber,
  useNotificationStore
} from "@/src/utils";
import { useRouter } from "next/navigation";

export const useReceiveOrderHook = (order: IOneOrder) => {
  const [loading, setLoading] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    receiptDate: "",
    orderDetails: order.orderDetail.map(od => ({
      id: od.id,
      damagedUnits: od.damagedUnits
    }))
  });

  const handleChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleProduct = (id: number, name: string, value: string) => {
    const productToChange = order.orderDetail.find(od => od.id === id)!;

    if (stringThousandToNumber(value) > productToChange.quantity) return;

    const newDetails = formValues.orderDetails.map(od =>
      Number(od.id) === Number(id)
        ? { ...od, [name]: stringThousandToNumber(value) }
        : od
    );

    setFormValues({
      ...formValues,
      orderDetails: newDetails
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formValues.receiptDate === "") return;
    setLoading(true);

    const objToSend = {
      receiptDate: new Date(formValues.receiptDate).toISOString(),
      orderDetails: formValues.orderDetails.filter(od => od.damagedUnits > 0)
    };

    const { error } = await receiveOrderAction(order.id, objToSend);

    if (error) {
      showNotification({
        text: GENERAL_LABELS.ERRORS.NOTIFICATION_ERROR,
        type: "error"
      });
      setLoading(false);

      return;
    }

    showNotification({ type: "success", text: ORDER_LABELS.RECEIVE.SUCCESS });
    setLoading(false);
    router.push(PATHS.ORDERS.MAIN);
  };

  return { formValues, handleChange, handleProduct, loading, onSubmit };
};
