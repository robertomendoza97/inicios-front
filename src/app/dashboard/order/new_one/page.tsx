import { CREATE_ORDER_VALUES, CreateOrderForm } from "@/src/orders";
import { IProductsResponse } from "@/src/products";
import { customFetch } from "@/src/services/rest.service";
import { cookies } from "next/headers";
import React from "react";

const getAllProducts = async () => {
  const {
    data: { data }
  } = await customFetch<IProductsResponse>(
    "product",
    { cache: "no-cache" },
    { data: [] }
  );

  return data;
};

const INITIAL_STATE = {
  orderDate: "",
  provider: "",
  products: []
};

const NewOneOrder = async () => {
  const products = await getAllProducts();

  const cookieStore = cookies();

  const initialValues = JSON.parse(
    cookieStore.get(CREATE_ORDER_VALUES)?.value ?? JSON.stringify(INITIAL_STATE)
  );

  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <CreateOrderForm products={products} initialFormValues={initialValues} />;
    </div>
  );
};

export default NewOneOrder;
