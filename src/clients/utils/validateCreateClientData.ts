import { IClientToCreate } from "../";

export const validateCreateClientData = (data: IClientToCreate) => {
  return !(
    data.countryCode === "" ||
    data.email === "" ||
    data.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ===
      null ||
    data.lastName === "" ||
    data.name === "" ||
    data.phoneNumber === "" ||
    data.phoneNumber.length < 7 ||
    data.referencePoint === "" ||
    data.workDirection === "" ||
    data.profession === "" ||
    data.idCard === ""
  );
};
