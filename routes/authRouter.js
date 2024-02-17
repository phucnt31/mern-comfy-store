import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginUserInput,
  validateRegisterUserInput,
} from "../middleware/validationMiddleware.js";

const authRoute = Router();

authRoute.route("/register").post(validateRegisterUserInput, register);
authRoute.route("/login").post(validateLoginUserInput, login);
authRoute.get("/logout", logout);

export default authRoute;
