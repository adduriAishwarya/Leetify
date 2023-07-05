import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user/user.js";
import * as dotenv from "dotenv";
dotenv.config();

export const createUser = async (
  firstname,
  lastname,
  email,
  password,
  user_status
) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error(
      "User already exists! Please login with valid credentials!",
      "UserExists"
    );
  }
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    user_status,
  });
  await user.save();
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid login credentials");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return { token, user };
};
