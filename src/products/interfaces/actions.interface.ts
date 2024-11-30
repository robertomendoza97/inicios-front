import { OneProductDetails, ProductToCreate } from "../";

export interface CreateActionInterface {
  (data: ProductToCreate): Promise<{ data: unknown; error: boolean }>;
}

export interface UpdateActionInterface {
  (id: string, data: ProductToCreate): Promise<OneProductDetails>;
}
