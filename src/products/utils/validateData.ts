import { CreateProductFormValues } from "../";

export const validateData = ({
  name,
  description,
  quantity,
  category,
  costPrice,
  state,
  retailPrice,
  subCategory
}: CreateProductFormValues) => {
  return !(
    name === "" ||
    name.length < 5 ||
    description === "" ||
    description.trim().split(" ").length < 5 ||
    quantity === "" ||
    costPrice === "" ||
    retailPrice === "" ||
    state === "" ||
    category === "" ||
    subCategory === "" ||
    costPrice === "0" ||
    retailPrice === "0"
  );
};
