import { StatusCodes } from "http-status-codes";
import ProductModel from "../models/ProductModel.js";
import { PRODUCT_CATEGORY, PRODUCT_COMPANY } from "../utils/constants.js";

export const getAllProducts = async (req, res) => {
  const { search, company, category, order, shipping, price } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }
  if (company && company !== "all") {
    queryObject.company = company;
  }
  if (category && category !== "all") {
    queryObject.category = category;
  }
  if (shipping) {
    queryObject.shipping = Boolean(shipping);
  }
  if (price) {
    queryObject.price = { $lte: Number(price) };
  }

  const orderOptions = {
    low: "-price",
    high: "price",
    "a-z": "title",
    "z-a": "-title",
  };
  const orderKey = orderOptions[order] || orderOptions["a-z"];

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments(queryObject);
  const products = await ProductModel.find(queryObject)
    .sort(orderKey)
    .skip(skip)
    .limit(limit);
  const numOfPages = Math.ceil(totalProducts / limit);

  res.status(StatusCodes.OK).json({
    data: { attributes: products },
    meta: {
      pagination: {
        page,
        pageSize: limit,
        pageCount: numOfPages,
        total: totalProducts,
      },
      categories: Object.values(PRODUCT_CATEGORY),
      companies: Object.values(PRODUCT_COMPANY),
    },
  });
};

export const getFeaturedProducts = async (req, res) => {
  const featuredProducts = await ProductModel.find({ featured: true });
  res.status(StatusCodes.OK).json({ data: { attributes: featuredProducts } });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.status(StatusCodes.OK).json({ data: { attributes: product } });
};
