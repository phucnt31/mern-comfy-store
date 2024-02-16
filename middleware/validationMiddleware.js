import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { PRODUCT_CATEGORY, PRODUCT_COMPANY } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log(errorMessages);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateProductInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required").trim(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20, max: 400 })
    .withMessage("description must be between 20 and 400 characters long")
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
