import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../utils/constants";

const register = async (req: Request, res: Response) => {
  try {
    let { firstName,lastName, email, password } = req.body;

    console.log(req.body);

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "User already exists" });
    }

    if (!firstName  || !email || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    let token = jwt.sign({ email }, "secretkey", { expiresIn: "1h" });
    const newuser = await UserModel.create({
      firstName,
      lastName : lastName,
      email,
      password: hashedPassword,
    });

    res
      .status(STATUS_CODES.CREATED)
      .json({ message: "User created successfully", user: newuser,token:token });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    
    if (!email || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid credentials" }); 
    }
    if (!user) {
      return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: "User not found" });
    }
    let token = jwt.sign({ email }, "secretkey", { expiresIn: "12h" });
    res
      .status(STATUS_CODES.OK)
      .json({ message: "Login successful", user: user ,token:token});
  } catch (error) {
    console.log(error);
    
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};



export default { register, login };
