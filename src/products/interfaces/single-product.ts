import { BaseWithId } from "@/src/components/CustomTable";

export interface SingleProduct extends BaseWithId {
  id: string;
  name: string;
  description: string;
  state: string;
  tags: string[];
  barCode: string | null;
  systemCode: number;
  costPrice: number;
  retailPrice: number;
  properties: Property[];
  quantity: number;
  created_at: Date;
  update_at: Date;
  deletedAt: string | null;
  subCategory: SubCategory;
  images: Image[];
}

interface Image {
  id: number;
  url: string;
}

interface Property {
  key: string;
  value: string;
  name: string;
  compare?: boolean;
}

interface SubCategory {
  id: number;
  name: string;
  fkCategory: number;
  groups: string[];
}
