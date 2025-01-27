import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";
import * as validate from "../utils/validator";

export const signUpcontroller = async (req: Request, res: Response) => {
  try {
    validate.validateSignUpData(req);

    const { emailId, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      emailId: emailId,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error: any) {
    console.log(error);

    res.status(400).send(error.message);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    validate.validateLogInData(req);

    const { emailId, password } = req.body;
    const user: any = await UserModel.findOne({ emailId });

    if (!user) throw new Error("Invalid credential");
    const isUserValid = await user.comparePassword(password);

    if (isUserValid) {
      const token = user.getJWT();
      res.cookie("token", token).json(user);
    } else {
      throw new Error("Invalid credential");
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie('token').end()
}
