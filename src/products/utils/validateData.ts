import { CreateProductFormValues } from "../";

export const validateData = ({
  name,
  description,
  quantity,
  category,
  costPrice,
  state,
  retailPrice
}: CreateProductFormValues) => {
  return !(
    name === "" ||
    name.length < 5 ||
    description === "" ||
    description.split(" ").length < 5 ||
    quantity === "" ||
    costPrice === "" ||
    retailPrice === "" ||
    state === "" ||
    category === ""
  );
};
