"use client";

import {
  formatNumberToPrice,
  GENERAL_LABELS,
  getFormattedDate,
  useNotificationStore
} from "@/src/utils";
import { FormEvent, useState } from "react";
import {
  ICreateOrderFormValues,
  IOneOrder,
  ORDER_LABELS,
  updateOrderAction,
  validateUpdateOrderFormData
} from "..";
import { useRouter } from "next/navigation";

export const useUpdateOrder = (order: IOneOrder) => {
  const [formValues, setFormValues] = useState<ICreateOrderFormValues>({
    provider: order.provider,
    orderDate: getFormattedDate(order.orderDate),
    products: order.orderDetail.map(od => ({
      costPrice: formatNumberToPrice(od.costPrice),
      quantity: formatNumberToPrice(od.quantity),
      id: od.productId.id,
      detailId: od.id
    }))
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );

  const handleChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleChangeProduct = (id: string, name: string, value: string) => {
    const newProducts = formValues.products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          [name]: value
        };
      } else {
        return product;
      }
    });

    setFormValues({
      ...formValues,
      products: newProducts
    });
  };

  const handleDeleteProduct = (id: string) => {
    const newProducts = formValues.products.filter(
      product => product.id !== id
    );

    setFormValues({
      ...formValues,
      products: newProducts
    });
  };

  const handleAddProduct = (id: string) => {
    const exist = formValues.products.find(product => product.id === id);

    if (exist) return;

    const newProduct = {
      id,
      costPrice: "",
      quantity: ""
    };

    setFormValues({
      ...formValues,
      products: [...formValues.products, newProduct]
    });
  };

  const handleReset = () => {
    setFormValues({
      provider: order.provider,
      orderDate: getFormattedDate(order.orderDate),
      products: order.orderDetail.map(od => ({
        costPrice: formatNumberToPrice(od.costPrice),
        quantity: formatNumberToPrice(od.quantity),
        id: od.productId.id,
        detailId: od.id
      }))
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const objToSend = validateUpdateOrderFormData(order, formValues);
    if (!objToSend.valid) {
      setShowErrors(true);
      setLoading(false);
      return;
    }

    const { error } = await updateOrderAction(order.id, {
      orderDetailsToAdd: objToSend.orderDetailsToAdd,
      orderDetailsToDelete: objToSend.orderDetailsToDelete,
      orderDetailsToUpdate: objToSend.orderDetailsToUpdate
    });

    if (error) {
      showNotification({
        text: GENERAL_LABELS.ERRORS.NOTIFICATION_ERROR,
        type: "error"
      });
    }

    setLoading(false);
    showNotification({
      text: `${ORDER_LABELS.UPDATED.SUCCESS}`,
      type: "success"
    });

    router.refresh();
  };

  return {
    formValues,
    loading,
    showErrors,
    handleChange,
    handleChangeProduct,
    handleDeleteProduct,
    handleAddProduct,
    handleReset,
    handleSubmit
  };
};
