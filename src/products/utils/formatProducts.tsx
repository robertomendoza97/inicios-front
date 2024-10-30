import { SingleProductFromAPI } from "@/src/products";

interface ProductTable extends Record<string, string | number> {
  id: string;
  cod: number;
  name: string;
  stock: number;
  costPrice: number;
  retailPrice: number;
  actions: string;
  subCategory: string;
}

export const formatProducts = (
  products: SingleProductFromAPI[] = []
): ProductTable[] => {
  const product = products.map(data => {
    let productName = data.name;
    const productPropertiesToAddName = data.properties.filter(
      prop => prop.index
    );

    if (productPropertiesToAddName.length > 0) {
      productName = `${productName} - ${productPropertiesToAddName
        .map(prop => prop.value)
        .join(" | ")}`;
    }

    return {
      id: data.id,
      cod: data.systemCode,
      name: productName,
      stock: data.quantity,
      costPrice: data.costPrice,
      retailPrice: data.retailPrice,
      actions: data.id,
      subCategory: data.subCategory.name
    };
  });

  return product;
};
