export interface AllCategoriesResponse {
  data: SingleCategory[];
}

export interface SingleCategory {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  fkCategory: number;
  groups: string[];
}
