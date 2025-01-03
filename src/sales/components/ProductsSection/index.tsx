"use client";

import { SingleProductFromAPI } from "@/src/products";
import { SearchSection } from "./SearchSection";
import { ProductCard } from "./ProductCard";
import { useSaleStore } from "@/src/store/sale-store";
import { useEffect } from "react";
import { GENERAL_LABELS } from "@/src/utils";
import { TbMoodEmpty } from "react-icons/tb";

interface Props {
  products: SingleProductFromAPI[];
}
export const ProductSection = ({ products }: Props) => {
  const initProducts = useSaleStore(state => state.setProducts);
  const productsToShow = useSaleStore(state => state.productsToShow);

  useEffect(() => {
    initProducts(products);
  }, [initProducts, products]);

  return (
    <aside className="grow flex flex-col">
      <SearchSection />
      {productsToShow.length > 0 ? (
        <section className="px-5 grid grid-cols-3 [grid-template-rows:min-content] gap-5 grow overflow-auto pb-5">
          {productsToShow.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="text-xl flex flex-col items-center gap-2">
            <span>{GENERAL_LABELS.NO_COINCIDENCE}</span>
            <TbMoodEmpty size={50} />
          </div>
        </div>
      )}
    </aside>
  );
};
