import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";
import { validateOrderInput } from "../middleware/validationMiddleware.js";

const orderRoute = Router();

orderRoute.route("/").get(getAllOrders).post(validateOrderInput, createOrder);

export default orderRoute;
