import { SingleCategory } from "../interfaces/category.interface";

export const formatCategoriesRows = (categories: SingleCategory[]) => {
  return categories.map(c => ({
    name: c.name,
    id: c.id || "",
    numberOfSubcategories: c.subCategories.length,
    actions: c.id || ""
  }));
};
