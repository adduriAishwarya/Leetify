import * as userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/user/user.js";
dotenv.config();
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, user_status } = req.body;
    const user = await userService.createUser(
      firstname,
      lastname,
      email,
      password,
      user_status
    );
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    if (
      err.message ===
      "User already exists! Please login with valid credentials!"
    ) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.loginUser(email, password);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { _id, firstname, lastname, email, password } = req.body;
    const userId = req.params.id;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.findById(_id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = hashedPassword;

    await user.save();

    res.json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
