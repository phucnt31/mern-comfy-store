import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  validateIdParam,
  validateProductInput,
} from "../middleware/validationMiddleware.js";

const productRoute = Router();

productRoute
  .route("/")
  .get(getAllProducts)
  .post(validateProductInput, createProduct);
productRoute
  .route("/:id")
  .get(validateIdParam, getSingleProduct)
  .patch(validateIdParam, validateProductInput, updateProduct)
  .delete(validateIdParam, deleteProduct);

export default productRoute;
