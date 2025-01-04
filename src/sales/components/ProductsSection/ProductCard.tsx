import { SingleProductFromAPI } from "@/src/products";
import { formatNumberToPrice } from "@/src/utils";
import Image from "next/image";
import { CiImageOff } from "react-icons/ci";
import { SALES_LABELS } from "../../utils/const";
import { Cart } from "./Cart";

interface Props {
  product: SingleProductFromAPI;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="shadow-md bg-white p-5 rounded-lg flex flex-col items-center gap-2 border-paletteColor1 border relative h-fit">
      <div className="bg-slate-100 flex items-center justify-center aspect-video w-full relative">
        {product.images.length > 0 ? (
          <Image
            src={product.images[0].url}
            alt="product image"
            className="w-full aspect-video object-contain"
            width={100}
            height={50}
          />
        ) : (
          <CiImageOff size={40} className="text-gray-400" />
        )}
        <div className="absolute bottom-0 left-0 px-1 bg-paletteColor5 rounded-tr-lg text-black text-[10px]">
          # {product.systemCode}
        </div>
      </div>
      <p className="font-semibold text-paletteColor1">
        {SALES_LABELS.QUANTITY} {formatNumberToPrice(product.quantity) || 0}
      </p>
      <p className="text-center">{product.name} </p>
      <p className="font-bold">
        {formatNumberToPrice(product.retailPrice, "$")}
      </p>
      <Cart product={product} />
    </div>
  );
};
