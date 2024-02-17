import { StatusCodes } from "http-status-codes";
import OrderModel from "../models/OrderModel.js";

export const getAllOrders = async (req, res) => {
  const orders = await OrderModel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ orders });
};

export const createOrder = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const order = await OrderModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
};
