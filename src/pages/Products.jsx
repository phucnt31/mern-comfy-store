import React from "react";
import { customFetch } from "../utils";
import { Filters, PaginationContainer, ProductsContainer } from "../components";

export const productsLoader = async () => {
  const resp = await customFetch.get("/products");
  console.log(resp);
  return { products: resp.data.data, meta: resp.data.meta };
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
