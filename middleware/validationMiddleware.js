import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("No product")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateIdParam = withValidationErrors([
  param("id")
    .isMongoId()
    .withMessage("invalid MongoDB id")
    .custom(async (value) => {
      const product = await ProductModel.findById(value);
      if (!product) {
        throw new NotFoundError(`No product with id ${value}`);
      }
    }),
]);

export const validateRegisterUserInput = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 10 })
    .withMessage("Username must be between 4 and 10 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
]);

export const validateLoginUserInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateOrderInput = withValidationErrors([
  body("data.address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5, max: 40 })
    .withMessage("Address must be between 5 and 40 characters long"),
  body("data.name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 25 })
    .withMessage("Name must be between 3 and 25 characters long"),
]);
