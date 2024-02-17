import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const { password } = req.body;
  req.body.password = await hashPassword(password);
  await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isCorrectPassword = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isCorrectPassword) {
    throw new UnauthorizedError("Incorrect password");
  }

  const token = createJWT({
    userId: user._id,
    username: user.username,
    email: user.email,
  });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "User logged in" });
};
