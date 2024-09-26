import { ProductProperty } from "../";

export interface ProductToCreate {
  name: string;
  description: string;
  fkSubcategory: number;
  state: string;
  tags: string[];
  images: string[];
  retailPrice: number;
  costPrice: number;
  properties: ProductProperty[];
  quantity: number;
}
