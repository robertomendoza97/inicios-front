import { IClient } from "../interfaces/all-clients.interface";

export class UpdateClientDTO {
  name: string;
  lastName: string;
  phoneNumber1: string;
  countryCode1: string;
  phoneNumber2: string;
  countryCode2: string;
  email: string;
  guarantor: string;
  workDirection: string;
  homeDirection: string;
  profession: string;
  idCard: string;

  constructor(data: IClient) {
    this.name = data.name;
    this.lastName = data.lastName;
    this.phoneNumber1 = String(data.phoneNumber1 || "");
    this.phoneNumber2 = String(data.phoneNumber2 || "");
    this.countryCode1 = String(data.countryCode1 || "");
    this.countryCode2 = String(data.countryCode2 || "");
    this.email = data.email;
    this.guarantor = String(data.guarantor || "");
    this.workDirection = data.workDirection;
    this.homeDirection = data.homeDirection;
    this.idCard = data.idCard;
    this.profession = data.profession;
  }
}
