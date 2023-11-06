import React from "react";
import { customFetch } from "../utils";
import { Filters, PaginationContainer, ProductsContainer } from "../components";

export const productsLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const resp = await customFetch.get("/products", { params });
  return { products: resp.data.data, meta: resp.data.meta, params };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
