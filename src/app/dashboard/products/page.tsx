import { IProductsResponse, SingleProduct } from "../../../products";

const getProducts = async (): Promise<SingleProduct[]> => {
  const { data }: IProductsResponse = await fetch(
    `http://localhost:3333/administration-system/api/product`
  ).then(resp => resp.json());

  return data;
};

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col">
      {products.map(({ id, name, retailPrice }) => (
        <div key={id}>
          <div>{name}</div>
          <div>{retailPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default Products;
