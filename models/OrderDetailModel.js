import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  cartID: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productColor: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  productID: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  orderID: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: true,
  },
});

export default mongoose.model("OrderDetail", OrderDetailSchema);
