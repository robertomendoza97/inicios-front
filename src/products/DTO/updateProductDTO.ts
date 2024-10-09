import { OneProductDetails } from "../interfaces/detail-one-product";
import { CreateProductFormValues } from "../";
import { formatNumberToPrice } from "@/src/utils";

export class UpdateProductDTO implements CreateProductFormValues {
  name: string;
  description: string;
  state: string;
  category: string;
  retailPrice: string;
  costPrice: string;
  quantity: string;
  subCategory: string;
  barCode: string;

  constructor(product: OneProductDetails) {
    this.costPrice = formatNumberToPrice(product.costPrice, "", true);
    this.description = product.description;
    this.category = String(product.subCategory.fkCategory);
    this.state = product.state;
    this.retailPrice = formatNumberToPrice(product.retailPrice, "", true);
    this.quantity = String(product.quantity);
    this.name = product.name;
    this.barCode = String(product.barCode || "");
    this.subCategory = String(product.subCategory.id);
  }
}
