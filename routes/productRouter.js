import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  getFeaturedProducts,
} from "../controllers/productController.js";
import { validateIdParam } from "../middleware/validationMiddleware.js";

const productRoute = Router();

productRoute.route("/").get(getAllProducts);
productRoute.route("/featured").get(getFeaturedProducts);
productRoute.route("/:id").get(validateIdParam, getSingleProduct);

export default productRoute;
