import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  validateLoginUserInput,
  validateRegisterUserInput,
} from "../middleware/validationMiddleware.js";

const authRoute = Router();

authRoute.route("/register").post(validateRegisterUserInput, register);
authRoute.route("/login").post(validateLoginUserInput, login);

export default authRoute;
