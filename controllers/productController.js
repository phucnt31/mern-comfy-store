import { StatusCodes } from "http-status-codes";
import ProductModel from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.status(StatusCodes.OK).json({ attributes: products });
};

export const getFeaturedProducts = async (req, res) => {
  const products = await ProductModel.find({ featured: true });
  res.status(StatusCodes.OK).json({ attributes: products });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.status(StatusCodes.OK).json(product);
};
