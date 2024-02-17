import { StatusCodes } from "http-status-codes";
import OrderModel from "../models/OrderModel.js";
import OrderDetailModel from "../models/OrderDetailModel.js";
import { BadRequestError } from "../errors/customErrors.js";
import ProductModel from "../models/ProductModel.js";

export const getAllOrders = async (req, res) => {
  const orders = await OrderModel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ orders });
};

export const createOrder = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { address, cartItems, chargeTotal, name, numItemsInCart, orderTotal } =
    req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }

  for (const item in cartItems) {
    const {
      amount,
      cartID,
      company,
      image,
      price,
      productColor,
      productID,
      title,
    } = item;
    const dbProduct = await ProductModel.findOne({ _id: productID });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id: ${productID}`);
    }
    await OrderDetailModel.create({
      amount,
      cartID,
      company,
      price,
      productColor,
      productID,
      title,
    });
  }

  const order = await OrderModel.create({
    address,
    chargeTotal,
    name,
    numItemsInCart,
    orderTotal,
  });
  res.status(StatusCodes.CREATED).json({ order });
};
