import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    description: String,
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["Tables", "Chairs", "Kids", "Sofas", "Beds"],
      default: "Tables",
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
