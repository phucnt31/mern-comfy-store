import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

const orderRoute = Router();

orderRoute.route("/").get(getAllOrders).post(createOrder);

export default orderRoute;
