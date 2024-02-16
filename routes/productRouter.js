import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { validateProductInput } from "../middleware/validationMiddleware.js";

const productRoute = Router();

productRoute
  .route("/")
  .get(getAllProducts)
  .post(validateProductInput, createProduct);
productRoute
  .route("/:id")
  .get(getSingleProduct)
  .patch(validateProductInput, updateProduct)
  .delete(deleteProduct);

export default productRoute;
