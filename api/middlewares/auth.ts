import jwt from 'jsonwebtoken';
import { UserModel as User } from '../models/User';
import { Request, Response, NextFunction } from 'express';

export interface authReq extends Request {
  user?: any;  
}
export const userAuth = async (req: authReq, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Login!");
    }

    const decodedObj: any = await jwt.verify(token, "abcdefghijklmnopqrstuvwxyz");

    const user = await User.findById(decodedObj._id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user 
    next();
    return;
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
};
