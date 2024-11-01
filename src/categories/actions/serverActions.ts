"use server";

import { customFetch } from "@/src/services/rest.service";
import {
  ICreateCategoryResponse,
  ICreateSubcategoryResponse,
  SingleCategory,
  SubCategory
} from "../";

export const createCategoryAction = async (category: SingleCategory) => {
  const body = { name: category.name };

  const { data } = await customFetch<ICreateCategoryResponse>(`category`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });

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

  const subcategoriesFetch = subcategoriesWithFK.map(sc => {
    return customFetch<ICreateSubcategoryResponse>(`subcategory`, {
      method: "POST",
      body: JSON.stringify(sc),
      headers: {
        "Content-Type": "application/json"
      }
    });
  });

  await Promise.all(subcategoriesFetch);

  return { success: true, error: false };
};

export const updateCategoryAction = async (id: number, name: string) => {
  const { data } = await customFetch(`category/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return data;
};

export const updateSubategoryAction = async (id: number, name: string) => {
  const { data, error } = await customFetch<SubCategory>(`subcategory/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return { data, error };
};
