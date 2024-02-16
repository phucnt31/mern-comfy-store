import mongoose from "mongoose";
import { PRODUCT_CATEGORY, PRODUCT_COMPANY } from "../utils/constants.js";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    company: {
      type: String,
      enum: Object.values(PRODUCT_COMPANY),
      default: PRODUCT_COMPANY.MODENZA,
    },
    description: String,
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: Object.values(PRODUCT_CATEGORY),
      default: PRODUCT_CATEGORY.TABLES,
    },
    price: Number,
    shipping: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: [String],
      default: ["#222"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductSchema);
