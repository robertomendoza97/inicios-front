import { IClientToCreate, ImagesToCreate } from "./client-to-create.interface";

interface Args extends IClientToCreate {
  images: ImagesToCreate[];
}

export interface ICreateClientAction {
  (data: Args): Promise<{
    data: unknown;
    error: boolean;
    success: boolean;
    message?: string;
  }>;
}

export interface IUpdateClientAction {
  (id: string, data: Args): Promise<{
    data: unknown;
    error: boolean;
    success: boolean;
    message?: string;
  }>;
}
