import { IClientToCreate } from "../";

export const validateCreateClientData = (data: IClientToCreate) => {
  return !(
    data.countryCode1 === "" ||
    data.countryCode2 === "" ||
    data.email === "" ||
    data.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ===
      null ||
    data.lastName === "" ||
    data.name === "" ||
    data.phoneNumber1 === "" ||
    data.phoneNumber1.length < 7 ||
    data.phoneNumber2 === "" ||
    data.phoneNumber2.length < 7 ||
    data.homeDirection === "" ||
    data.workDirection === "" ||
    data.profession === "" ||
    data.idCard === ""
  );
};
