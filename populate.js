import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/ProductModel.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URL);

  const jsonProducts = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const products = jsonProducts.map((product) => {
    return { ...product };
  });
  await ProductModel.create(products);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
