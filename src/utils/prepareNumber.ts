export const stringThousandToNumber = (value: string): number => {
  value = value.replaceAll(".", "");
  value = value.replaceAll(",", ".");

  return Number(value);
};
