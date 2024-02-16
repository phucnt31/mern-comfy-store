import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const register = async (req, res) => {
  const { password } = req.body;
  const isFirstAccount =
    (await UserModel.countDocuments()) === 0 ? "admin" : "user";
  req.body.role = isFirstAccount;
  req.body.password = await hashPassword(password);
  const user = await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  res.send("login");
};
