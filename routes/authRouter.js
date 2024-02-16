import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const authRoute = Router();

authRoute.route("/register").post(register);
authRoute.route("/login").post(login);

export default authRoute;
