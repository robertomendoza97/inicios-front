import { CREATE_PRODUCT_LABELS, SingleProductFromAPI } from "@/src/products";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import Link from "next/link";
import { Tooltip } from "flowbite-react";
import { PATHS } from "@/src/utils";

interface ProductTable extends Record<string, string | number> {
  id: string;
  cod: number;
  name: string;
  stock: number;
  costPrice: number;
  retailPrice: number;
  actions: string;
  subCategory: string;
}

const DetailCell = ({ id }: { id: string | number }) => {
  return (
    <div className="flex justify-center gap-5 h-full relative">
      <Tooltip content={CREATE_PRODUCT_LABELS.ACTIONS.DETAILS}>
        <Link href={`${PATHS.PRODUCTS.DETAILS}${id}`}>
          <MdOutlineRemoveRedEye
            onClick={() => console.log(id)}
            size={15}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        </Link>
      </Tooltip>
      <Tooltip content={CREATE_PRODUCT_LABELS.ACTIONS.UPDATE}>
        <Link href={`${PATHS.PRODUCTS.UPDATE}${id}`}>
          <GrUpdate
            size={15}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        </Link>
      </Tooltip>
      <Tooltip content={CREATE_PRODUCT_LABELS.ACTIONS.DELETE}>
        <BsTrash
          size={15}
          className="cursor-pointer hover:scale-125 transition-transform"
        />
      </Tooltip>
    </div>
  );
};

export const actionsFunction = (value: string | number) => {
  return <DetailCell id={value} />;
};

export const formatProducts = (
  products: SingleProductFromAPI[]
): ProductTable[] => {
  const product = products.map(data => ({
    id: data.id,
    cod: data.systemCode,
    name: data.name,
    stock: data.quantity,
    costPrice: data.costPrice,
    retailPrice: data.retailPrice,
    actions: data.id,
    subCategory: data.subCategory.name
  }));

  return product;
};
