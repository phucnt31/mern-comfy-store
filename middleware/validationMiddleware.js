import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { PRODUCT_CATEGORY, PRODUCT_COMPANY } from "../utils/constants.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log(errorMessages);
        if (errorMessages[0].startsWith("No product")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateProductInput = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required").trim(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20, max: 400 })
    .withMessage("Description must be between 20 and 400 characters long")
    .trim(),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("company")
    .notEmpty()
    .withMessage("Company is required")
    .isIn(Object.values(PRODUCT_COMPANY))
    .withMessage("Invalid company values"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(Object.values(PRODUCT_CATEGORY))
    .withMessage("Invalid category values"),
]);

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
