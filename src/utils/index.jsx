import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (amount) => {
  const dollarAmount = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format((amount / 100).toFixed(2));
  return dollarAmount;
};
