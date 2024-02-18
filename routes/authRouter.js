import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginUserInput,
  validateRegisterUserInput,
} from "../middleware/validationMiddleware.js";
import rateLimiter from "express-rate-limit";

const authRoute = Router();
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

authRoute
  .route("/register")
  .post(apiLimiter, validateRegisterUserInput, register);
authRoute.route("/login").post(apiLimiter, validateLoginUserInput, login);
authRoute.get("/logout", logout);

export default authRoute;
