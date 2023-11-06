import React from "react";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

export const landingLoader = async () => {
  const resp = await customFetch.get("/products?featured=true");
  const products = resp.data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
