import React from "react";
import { Hero } from "../components";
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
    </>
  );
};

export default Landing;
