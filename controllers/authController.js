import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthorizedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const { password } = req.body;
  const isFirstAccount =
    (await UserModel.countDocuments()) === 0 ? "admin" : "user";
  req.body.role = isFirstAccount;
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

  res.status(StatusCodes.OK).json({ msg: "Login successfully" });
};
