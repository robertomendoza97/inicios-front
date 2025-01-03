"use client";

import { CustomInput } from "@/src/components";
import { SingleProductFromAPI } from "@/src/products";
import { useState } from "react";
import { ICreateOrderFormValues } from "../interfaces/create-order-form-values.interface";
import { BsTrash } from "react-icons/bs";
import { VscEmptyWindow } from "react-icons/vsc";
import { ORDER_LABELS } from "../utils/const";
import { GENERAL_LABELS } from "@/src/utils";

interface Props {
  products: SingleProductFromAPI[];
  handleAddProduct: (id: string) => void;
  formValues: ICreateOrderFormValues;
  handleChangeProduct: (id: string, name: string, value: string) => void;
  handleDeleteProduct: (id: string) => void;
  showErrors: boolean;
}

export const OrderProductsSection = ({
  products,
  handleAddProduct,
  formValues,
  handleChangeProduct,
  handleDeleteProduct,
  showErrors
}: Props) => {
  const [productToSearch, setProductToSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const filteredProducts = products.filter(product => {
    const name = `${product.systemCode} - ${product.name} ${product.properties
      .filter(prop => prop.index)
      .map(prop => prop.value)
      .join(" | ")}`;

    return productToSearch.split(" ").every(word => name.includes(word));
  });

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      <div className="w-full relative z-20">
        <CustomInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={productToSearch}
          label={ORDER_LABELS.NEW_ONE.SEARCH_PRODUCTS}
          name={"products"}
          onChange={function (_, value: string): void {
            setProductToSearch(value);
          }}
        />
        {productToSearch.length > 3 && focus && (
          <div className="absolute bg-gray-50 border-paletteColor5 top-[100%] border w-full max-h-64 overflow-auto">
            {filteredProducts.map(product => (
              <p
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  setProductToSearch("");
                  handleAddProduct(product.id);
                }}
                className="cursor-pointer py-1 px-3 hover:bg-gray-200"
                key={product.id}
              >
                {product.systemCode} - {product.name}{" "}
                {product.properties
                  .filter(prop => prop.index)
                  .map(prop => prop.value)
                  .join(" | ")}
              </p>
            ))}
            {filteredProducts.length === 0 && (
              <p className="py-2 text-center ">
                {GENERAL_LABELS.NO_COINCIDENCE}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="max-h-full overflow-auto grow flex flex-col gap-3">
        {formValues.products.map(product => (
          <div key={product.id} className="border rounded p-3 shadow-md">
            <p className="font-bold">
              {products.find(p => p.id === product.id)?.name}:
            </p>
            <div className="flex items-start gap-5">
              <CustomInput
                value={product.quantity.toString()}
                label={ORDER_LABELS.NEW_ONE.QUANTITY}
                name={"quantity"}
                type="number"
                thousandFormat
                onChange={(name: string, value: string) => {
                  handleChangeProduct(product.id, name, value);
                }}
                showErrorMessage={showErrors}
                errorMessaje="Debe ser mayor a 0"
              />
              <CustomInput
                value={product.costPrice.toString()}
                label={ORDER_LABELS.NEW_ONE.COST_PRICE}
                name={"costPrice"}
                thousandFormat
                type="number"
                allowDecimals
                onChange={(name: string, value: string) => {
                  handleChangeProduct(product.id, name, value);
                }}
                placeholder={products
                  .find(p => p.id === product.id)
                  ?.costPrice.toString()}
                showErrorMessage={showErrors}
                errorMessaje="Debe ser mayor a 0"
              />
              <BsTrash
                size={50}
                className="rounded-full border cursor-pointer !bg-red-600 p-1 text-white !bg-paletteColor5"
                onClick={() => handleDeleteProduct(product.id)}
              />
            </div>
          </div>
        ))}
        {formValues.products.length === 0 && (
          <div className="flex animate-pulse flex-col items-center justify-center w-full h-full">
            <p>{ORDER_LABELS.NEW_ONE.ADD_PRODUCTS}</p>
            <VscEmptyWindow className="text-gray-500" size={50} />
          </div>
        )}
      </div>
    </div>
  );
};
