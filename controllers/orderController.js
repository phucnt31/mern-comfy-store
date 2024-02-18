import { StatusCodes } from "http-status-codes";
import OrderModel from "../models/OrderModel.js";
import OrderDetailModel from "../models/OrderDetailModel.js";
import { BadRequestError } from "../errors/customErrors.js";
import ProductModel from "../models/ProductModel.js";

export const getAllOrders = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalOrders = await OrderModel.countDocuments(queryObject);
  const orders = await OrderModel.find(queryObject).skip(skip).limit(limit);
  const numOfPages = Math.ceil(totalOrders / limit);

  res.status(StatusCodes.OK).json({
    data: { attributes: orders },
    meta: {
      pagination: {
        page,
        pageSize: limit,
        pageCount: numOfPages,
        total: totalOrders,
      },
    },
  });
};

export const createOrder = async (req, res) => {
  const { address, cartItems, chargeTotal, name, numItemsInCart, orderTotal } =
    req.body.data;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }

  const order = await OrderModel.create({
    address,
    chargeTotal,
    name,
    numItemsInCart,
    orderTotal,
    createdBy: req.user.userId,
  });

  for (const item of cartItems) {
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
      image,
      price,
      productColor,
      productID,
      title,
      orderID: order._id,
    });
  }

  res.status(StatusCodes.CREATED).json({ order });
};
