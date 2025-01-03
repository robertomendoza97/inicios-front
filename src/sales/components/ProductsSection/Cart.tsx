"use client";

import { SingleProductFromAPI } from "@/src/products";
import { useSaleStore } from "@/src/store/sale-store";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

interface Props {
  product: SingleProductFromAPI;
}
export const Cart = ({ product }: Props) => {
  const addProduct = useSaleStore(state => state.addProduct);

  return (
    <div
      onClick={() => addProduct(product)}
      className="cursor-pointer bg-paletteColor1 absolute top-0 right-5 p-1  rounded-bl-lg"
    >
      <MdOutlineShoppingCartCheckout size={20} className="text-white" />
    </div>
  );
};
