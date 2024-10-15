import { SingleCategory } from "../interfaces/category.interface";

export const validateCreateCategoryData = (values: SingleCategory) => {
  let isCategoryValid = false;
  let isSubcategoryValid = true;

  if (values.name !== "") {
    isCategoryValid = true;
  }

  if (values.subCategories.length > 0) {
    if (values.subCategories.some(sc => sc.name === "")) {
      isSubcategoryValid = false;
    }
  }

  return isCategoryValid && isSubcategoryValid;
};
