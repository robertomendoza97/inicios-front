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
  costPrice: string;
  retailPrice: number;
  properties: Properties[];
  images: string[];
  quantity: number;
}
