import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";

export const register = async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  res.send("login");
};
