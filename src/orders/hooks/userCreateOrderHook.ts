"use client";

import { stringThousandToNumber, useNotificationStore } from "@/src/utils";
import { FormEvent, useState } from "react";
import {
  createOrderAction,
  ICreateOrderFormValues,
  validateOrderFormData
} from "../";

export const useCreateOrder = (initialFormValues: ICreateOrderFormValues) => {
  const [formValues, setFormValues] = useState(initialFormValues);
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
    setFormValues(initialFormValues);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (!validateOrderFormData(formValues)) {
      setShowErrors(true);
      setLoading(false);
      return;
    }

    const objToSend = {
      ...formValues,
      orderDate: new Date(formValues.orderDate).toISOString(),
      products: formValues.products.map(product => ({
        productId: product.id,
        quantity: stringThousandToNumber(product.quantity),
        costPrice: stringThousandToNumber(product.costPrice)
      }))
    };

    const { data, error } = await createOrderAction(objToSend);

    if (error) {
      showNotification({ text: "ocurro un error", type: "error" });
    }

    setLoading(false);
    showNotification({ text: data.orderId.toString(), type: "success" });
    handleReset();
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
