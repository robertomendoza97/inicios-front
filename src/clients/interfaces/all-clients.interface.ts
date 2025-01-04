export interface IClient {
  id: string;
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
  idCard: string;
}

export interface IAllClients {
  data: IClient[];
}
