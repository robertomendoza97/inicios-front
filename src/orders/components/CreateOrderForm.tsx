"use client";

import { SingleProductFromAPI } from "@/src/products";
import { ORDER_LABELS } from "../utils/const";
import { OrderProductsSection } from "./OrderProductsSection";
import { CustomInput, Divider } from "@/src/components";
import {
  ICreateOrderFormValues,
  useCreateOrder,
  validateOrderFormData
} from "../";
import { Button, Spinner } from "flowbite-react";
import { GENERAL_LABELS } from "@/src/utils";

interface Props {
  products: SingleProductFromAPI[];
  initialFormValues: ICreateOrderFormValues;
}

export const CreateOrderForm = ({ products, initialFormValues }: Props) => {
  const {
    formValues,
    loading,
    showErrors,
    handleChange,
    handleReset,
    handleSubmit,
    handleAddProduct,
    handleChangeProduct,
    handleDeleteProduct
  } = useCreateOrder(initialFormValues);

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] min-w-[50%] p-6 bg-white flex gap-3 flex-col items-center grow max-h-[90%]"
    >
      <h1 className="text-3xl font-semibold">{ORDER_LABELS.NEW_ONE.TITLE}</h1>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="flex gap-5">
          <CustomInput
            value={formValues.provider}
            label={"Proveedor"}
            name={"provider"}
            onChange={handleChange}
            showErrorMessage={showErrors}
            errorMessaje="Debes indicar un proveedor"
            placeholder="amazon"
          />
          <CustomInput
            type="date"
            value={formValues.orderDate}
            label={"Fecha de pedido"}
            name={"orderDate"}
            onChange={handleChange}
            showErrorMessage={showErrors}
            errorMessaje="Debes seleccionar una fecha"
          />
        </div>
        <Divider />
        <OrderProductsSection
          showErrors={showErrors}
          products={products}
          handleAddProduct={handleAddProduct}
          formValues={formValues}
          handleChangeProduct={handleChangeProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
        <div className="flex w-full gap-4">
          <Button color="failure" type="reset" onClick={handleReset}>
            {GENERAL_LABELS.RESET}
          </Button>
          <Button
            type="submit"
            className={` w-full ${
              validateOrderFormData(formValues)
                ? ""
                : "opacity-50 cursor-not-allowed"
            } `}
          >
            {loading ? <Spinner /> : GENERAL_LABELS.SEND}
          </Button>
        </div>
      </div>
    </form>
  );
};
