import express, { Request, Response } from "express";
import * as authController from '../controllers/auth'

const authRouter = express.Router();

authRouter.post("/signup", authController.signUpcontroller);

authRouter.post("/login", authController.loginController);

authRouter.post("/logout", authController.logoutController);

export default authRouter;
