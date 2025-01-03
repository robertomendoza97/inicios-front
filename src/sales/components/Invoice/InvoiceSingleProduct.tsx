"use client";

import { ProductToSale, useSaleStore } from "@/src/store/sale-store";
import { GoPlusCircle } from "react-icons/go";
import { SlMinus } from "react-icons/sl";
import { BsTrash } from "react-icons/bs";
import { formatNumberToPrice } from "@/src/utils";

interface Props {
  productToSale: ProductToSale;
}

export const InvoiceSingleProduct = ({ productToSale }: Props) => {
  const updateProduct = useSaleStore(state => state.updateProduct);
  const deleteProduct = useSaleStore(state => state.deleteProduct);

  return (
    <div className="flex gap-1 select-none">
      <div className="w-full bg-white border rounded py-2 px-4 flex justify-between">
        <span>{productToSale.name}</span>
        <span>{formatNumberToPrice(productToSale.retailPrice, "$")}</span>
      </div>
      <div className="flex gap-1 items-center justify-center">
        {productToSale.quantityToSale > 1 ? (
          <span>
            <SlMinus
              className="cursor-pointer"
              onClick={() => updateProduct(productToSale.id, "subtract")}
            />
          </span>
        ) : (
          <span>
            <BsTrash
              className="cursor-pointer"
              onClick={() => deleteProduct(productToSale.id)}
            />
          </span>
        )}
        <span className="p-1 rounded w-8 h-8 bg-white flex items-center justify-center border select-none">
          {productToSale.quantityToSale}
        </span>
        <span>
          <GoPlusCircle
            className="cursor-pointer"
            onClick={() => updateProduct(productToSale.id, "sum")}
          />
        </span>
      </div>
    </div>
  );
};
