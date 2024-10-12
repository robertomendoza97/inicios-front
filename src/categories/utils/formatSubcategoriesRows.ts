import { SingleCategory } from "../";

interface SubcategoryTable {
  category: string;
  id: string;
  subcategory: string;
  actions: string;
}

export const formatSubcategoriesRows = (categories: SingleCategory[]) => {
  const newCategories: SubcategoryTable[] = [];

  categories.forEach(c => {
    c.subCategories.forEach(sc => {
      newCategories.push({
        subcategory: sc.name,
        category: c.name,
        id: String(sc.id),
        actions: String(sc.id)
      });
    });
  });

  return newCategories;
};
