"use server";

import { SingleCategory, SubCategory } from "../";

export const createCategoryAction = async (category: SingleCategory) => {
  const body = { name: category.name };

  const response = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  return data;
};

export const createSubcategoryAction = async (
  id: number,
  subcategories: SubCategory[]
) => {
  const subcategoriesWithFK = subcategories.map(sc => ({
    fkCategory: +id,
    name: sc.name
  }));

  try {
    const subcategoriesFetch = subcategoriesWithFK.map(sc => {
      return fetch(
        `${process.env.PROTOCOL}://${process.env.HOST}/subcategory`,
        {
          method: "POST",
          body: JSON.stringify(sc),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    });

    await Promise.all(subcategoriesFetch);

    return { success: true, error: false };
  } catch (error) {
    return { success: false, error: true };
  }
};

export const updateCategoryAction = async (id: number, name: string) => {
  const response = await fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  return data;
};
