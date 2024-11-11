export interface IClient {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  referencePoint: string;
  profession: string;
  workDirection: string;
  guarantor: string;
  avalados: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  countryCode: string;
}

export interface IAllClients {
  data: IClient[];
}
