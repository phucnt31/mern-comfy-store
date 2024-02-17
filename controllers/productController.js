import { StatusCodes } from "http-status-codes";
import ProductModel from "../models/ProductModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllProducts = async (req, res) => {
  console.log(req);
  const products = await ProductModel.find({});
  res.status(StatusCodes.OK).json({ attributes: products });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.status(StatusCodes.OK).json(product);
};

export const createProduct = async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ product: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductModel.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "product deleted" });
};
