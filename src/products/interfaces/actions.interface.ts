import { OneProductDetails, ProductToCreate } from "../";

export interface CreateActionInterface {
  (data: ProductToCreate): Promise<Response>;
}

export interface UpdateActionInterface {
  (id: string, data: ProductToCreate): Promise<OneProductDetails>;
}
