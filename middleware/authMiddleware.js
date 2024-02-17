import { UnauthorizedError } from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError("authentication invalid");
  }

  try {
    const { userId, email, username } = verifyToken(token);
    req.user = { userId, email, username };
    next();
  } catch (error) {
    throw new UnauthorizedError("authentication invalid");
  }
};
