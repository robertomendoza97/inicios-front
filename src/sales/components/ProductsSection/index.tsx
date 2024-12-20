import { SingleProductFromAPI } from "@/src/products";
import { SearchSection } from "./SearchSection";
import { ProductCard } from "./ProductCard";

interface Props {
  products: SingleProductFromAPI[];
}
export const ProductSection = ({ products }: Props) => {
  return (
    <aside className="grow flex flex-col">
      <SearchSection />
      <section className="px-5 flex flex-wrap gap-5 grow overflow-auto pb-5">
        {products.map(product => (
          <ProductCard product={product} />
        ))}
      </section>
    </aside>
  );
};
