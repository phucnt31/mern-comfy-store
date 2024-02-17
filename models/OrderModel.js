import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    address: String,
    chargeTotal: Number,
    name: String,
    numItemsInCart: Number,
    orderTotal: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
