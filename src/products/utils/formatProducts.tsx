import { SingleProductFromAPI } from "@/src/products";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { Tooltip } from "@/src/components";
import Link from "next/link";

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

const DetailCell = ({ value }: { value: string | number }) => {
  return (
    <div className="flex justify-center gap-5 h-full relative">
      <Tooltip
        content={
          <Link href={`/dashboard/product/details/${value}`}>
            <MdOutlineRemoveRedEye
              onClick={() => console.log(value)}
              size={15}
              className="cursor-pointer hover:scale-125 transition-transform"
            />
          </Link>
        }
        text="Ver detalles"
      />
      <Tooltip
        content={
          <GrUpdate
            size={15}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        }
        text="Actualizar"
      />
      <Tooltip
        content={
          <BsTrash
            size={15}
            className="cursor-pointer hover:scale-125 transition-transform"
          />
        }
        text="Elminar"
      />
    </div>
  );
};

export const actionsFunction = (value: string | number) => {
  return <DetailCell value={value} />;
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
