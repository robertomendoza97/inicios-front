import { IUserFromAPI } from "../interfaces/all-users.interface";

export const formatUsersForTable = (users: IUserFromAPI[]) => {
  return users.map(user => ({
    ...user,
    isActive: user.isActive ? "activo" : "inactivo",
    deletedAt: user.deletedAt ? user.deletedAt : "",
    actions: user.id
  }));
};
