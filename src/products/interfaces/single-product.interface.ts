import { SubCategory } from "../";
import { ProductProperty } from "../";

interface ProductImage {
  id: string;
  url: string;
}
export interface SingleProductFromAPI {
  id: string;
  name: string;
  descripcion: string;
  fkSubcategory: string;
  state: string;
  tags: string[];
  barCode?: string;
  systemCode: number;
  currency: string;
  costPrice: number;
  retailPrice: number;
  properties: ProductProperty[];
  images: ProductImage[];
  quantity: number;
  subCategory: SubCategory;
}
