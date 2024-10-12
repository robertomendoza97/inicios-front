import { SubCategory } from "../";
import { ProductProperty } from "../";

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
  images: string[];
  quantity: number;
  subCategory: SubCategory;
}
