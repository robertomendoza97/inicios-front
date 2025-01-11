export interface IClient {
  id: string;
  name: string;
  lastName: string;
  phoneNumber1: string;
  phoneNumber2: string;
  email: string;
  homeDirection: string;
  profession: string;
  workDirection: string;
  guarantor: string;
  avalados: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  countryCode1: string;
  countryCode2: string;
  idCard: string;
}

export interface IAllClients {
  data: IClient[];
}
