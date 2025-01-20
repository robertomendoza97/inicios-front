export interface AllSalesFromAPI {
  data: SaleFromAPI[];
}

export interface SaleFromAPI {
  id: string;
  total_amount: number;
  state: string;
  frequency: string;
  createdAt: Date;
  initial: number;
  quotes: number;
  updateAt: Date;
  client: Client;
  saleCollections: SaleCollection[];
  createdBy: CreatedBy;
  rest: number;
}

export interface Client {
  id: string;
  name: string;
  lastName: string;
  phoneNumber2: string;
  phoneNumber1: string;
  countryCode1: string;
  countryCode2: string;
  email: string;
  homeDirection: string;
  profession: string;
  workDirection: string;
  idCard: string;
  guarantor: null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface CreatedBy {
  id: string;
  name: string;
  last_name: string;
  phone: string;
  birthdate: Date;
  gender: string;
  identityCard: string;
  role: string;
  countryCode: string;
  deletedAt: null;
}

export enum Currency {
  Usd = "USD"
}

export interface SaleCollection {
  id: string;
  commitedDate: Date;
  paymentDate: null;
  amount: number;
  type: Type;
  currency: Currency;
  createdAt: Date;
  updateAt: Date;
  deletedAt: null;
}

export enum Type {
  Initial = "initial",
  Quote = "quote",
  Full = "full"
}
