import { SubCategory } from "./../../categories/interfaces/interfaces";

interface Properties {
  key: string;
  name: string;
  value: string;
  compare?: boolean;
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
  properties: Properties[];
  images: string[];
  quantity: number;
  subCategory: SubCategory;
}
