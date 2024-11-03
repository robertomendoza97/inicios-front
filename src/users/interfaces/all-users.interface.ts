export interface IUserFromAPI {
  id: string;
  name: string;
  last_name: string;
  phone: string;
  birthdate: string;
  gender: string;
  identityCard: string;
  role: string;
  countryCode: string;
  deletedAt: string | null;
  email: string;
  isActive: boolean;
}

export interface IAllUsers {
  data: IUserFromAPI[];
}
