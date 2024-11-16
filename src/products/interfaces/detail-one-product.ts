import { SubCategory } from "@/src/categories";
import { ProductProperty } from "./product-property.interace";

export interface OneProductDetails {
  id: string;
  name: string;
  description: string;
  state: string;
  tags: string[];
  barCode: null;
  currency: string;
  systemCode: number;
  costPrice: number;
  retailPrice: number;
  properties: ProductProperty[];
  quantity: number;
  created_at: string;
  update_at: string | null;
  deletedAt: string | null;
  subCategory: SubCategory;
  images: string[];
  category: string;
}
