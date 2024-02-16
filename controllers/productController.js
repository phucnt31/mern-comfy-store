import { StatusCodes } from "http-status-codes";
import ProductModel from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.status(StatusCodes.OK).json({ attributes: products });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.status(StatusCodes.OK).json(product);
};

export const createProduct = async (req, res) => {
  const { title, company, description, price } = req.body;
  if (!title || !company || !description || !price) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide title, company, description or price" });
    return;
  }
  const product = await ProductModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Id not match" });
    return;
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedProduct) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Product not found" });
    return;
  }
  res.status(StatusCodes.OK).json({ product: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no product with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: "product deleted" });
};
