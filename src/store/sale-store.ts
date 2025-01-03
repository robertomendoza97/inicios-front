import { create } from "zustand";
import { SingleProductFromAPI } from "../products";
import { IClient } from "../clients";
import { CreateSaleDetails } from "../sales";
import { stringThousandToNumber } from "../utils";

export interface ProductToSale extends SingleProductFromAPI {
  quantityToSale: number;
}

interface State {
  termToSearch: string;
  productsToShow: SingleProductFromAPI[];
  productsToSale: ProductToSale[];
  allProducts: SingleProductFromAPI[];
  client?: IClient;
  quotes: number;
  initial: number;
  frequency: "weekly" | "biweekly" | "full";
  interest: number;
  setProducts: (products: SingleProductFromAPI[]) => void;
  addProduct: (product: SingleProductFromAPI) => void;
  updateProduct: (id: string, action: "sum" | "subtract") => void;
  deleteProduct: (id: string) => void;
  setTermToSearch: (term: string) => void;
  setClient: (client: IClient) => void;
  setCreateSaleDetails: (createSaleDTO: CreateSaleDetails) => void;
}

export const useSaleStore = create<State>()(set => ({
  termToSearch: "",
  quotes: 0,
  totalPrice: 0,
  initial: 0,
  frequency: "full",
  interest: 0,
  productsToShow: [],
  productsToSale: [],
  client: undefined,
  allProducts: [],
  setProducts: products =>
    set(state => ({
      ...state,
      allProducts: products,
      productsToShow: products
    })),
  addProduct: product =>
    set(state => {
      const exist = state.productsToSale.find(p => p.id === product.id);

      return exist || !(product.quantity > 0)
        ? state
        : {
            ...state,
            productsToSale: [
              ...state.productsToSale,
              { ...product, quantityToSale: 1 }
            ]
          };
    }),
  updateProduct: (id, action) =>
    set(state => {
      const productToUpdate = state.productsToSale.find(p => p.id === id)!;

      if (
        action === "sum" &&
        productToUpdate.quantityToSale < productToUpdate.quantity
      ) {
        productToUpdate.quantityToSale = productToUpdate?.quantityToSale + 1;
      } else if (action === "subtract") {
        productToUpdate.quantityToSale = productToUpdate?.quantityToSale - 1;
      }

      const newProducts = state.productsToSale.map(p =>
        p.id === id ? productToUpdate : p
      );

      return { ...state, productsToSale: newProducts };
    }),
  deleteProduct: (id: string) =>
    set(state => ({
      ...state,
      productsToSale: state.productsToSale.filter(p => p.id !== id)
    })),
  setTermToSearch: (term: string) =>
    set(state => {
      const newProducts = state.allProducts.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.systemCode.toString().includes(term)
      );

      return {
        ...state,
        termToSearch: term,
        productsToShow: newProducts
      };
    }),
  setClient: client => set(state => ({ ...state, client })),
  setCreateSaleDetails: createSaleDTO =>
    set(state => ({
      ...state,
      quotes: Number(createSaleDTO.quotes),
      interest: Number(createSaleDTO.interest),
      initial: stringThousandToNumber(createSaleDTO.initial),
      frequency: createSaleDTO.frequency
    }))
}));
