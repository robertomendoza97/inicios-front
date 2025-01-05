export const getSimpleName = (name: string, lastName: string) =>
  `${name.split(" ")[0]} ${lastName.split(" ")[0]}`;
