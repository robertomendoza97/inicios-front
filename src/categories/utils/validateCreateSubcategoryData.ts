import { SubCategory } from "../";

export const validateSubcategoryData = (values: SubCategory[]) => {
  return values.length > 0 && values.every(sc => sc.name !== "");
};
