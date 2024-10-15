"use server";

import { SingleCategory, SubCategory } from "../";

export const createCategoryAction = async (category: SingleCategory) => {
  const body = { name: category.name };

  const response = fetch(
    `${process.env.PROTOCOL}://${process.env.HOST}/category`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(resp => resp.json())
    .catch(err => err);

  return response;
};

export const createSubategoryAction = async (
  id: string,
  subcategories: SubCategory[]
) => {
  const subcategoriesWithFK = subcategories.map(sc => ({
    fkCategory: id,
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
