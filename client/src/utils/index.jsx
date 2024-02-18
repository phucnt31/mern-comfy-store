import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: "/api/v1",
});

export const formatPrice = (amount) => {
  const dollarAmount = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format((amount / 100).toFixed(2));
  return dollarAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;

    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
