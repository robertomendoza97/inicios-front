import { SingleProduct } from "@/src/products";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { Tooltip } from "@/src/components";
import { formatNumberToPrice } from "@/src/utils";
import Link from "next/link";

interface ProductTable extends Record<string, string | number> {
  id: string;
  cod: number;
  name: string;
  stock: number;
  retailCost: string;
  actions: string;
  currency: string;
}

const DetailCell = ({ value }: { value: string | number }) => {
  return (
    <div className="flex gap-5 h-full relative">
      <Tooltip
        content={
          <Link href={`/dashboard/product/details/${value}`}>
            <MdOutlineRemoveRedEye
              onClick={() => console.log(value)}
              className="cursor-pointer w-5 h-5 hover:scale-125 transition-transform"
            />
          </Link>
        }
        text="Ver detalles"
      />
      <Tooltip
        content={
          <GrUpdate className="cursor-pointer w-5 h-5 hover:scale-125 transition-transform" />
        }
        text="Actualizar"
      />
      <Tooltip
        content={
          <BsTrash className="cursor-pointer w-5 h-5 hover:scale-125 transition-transform" />
        }
        text="Elminar"
      />
    </div>
  );
};

export const actionsFunction = (value: string | number) => {
  return <DetailCell value={value} />;
};

export const formatProducts = (products: SingleProduct[]): ProductTable[] => {
  const product = products.map(data => ({
    id: data.id,
    cod: data.systemCode,
    name: data.name,
    stock: data.quantity,
    retailCost: formatNumberToPrice(data.retailPrice),
    currency: data.currency,
    actions: data.id
  }));

  return product;
};
