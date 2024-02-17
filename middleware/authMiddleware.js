import { UnauthorizedError } from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError("authentication invalid");
  }
  next();
};
