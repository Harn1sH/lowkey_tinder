import { Response } from "express";
import { authReq } from "../middlewares/auth";
import { validateEditProfileData } from "../utils/validator";

export const profileEdit = async(req: authReq, res: Response) => {
  try {
   const currentUser = req.user;

    const isEditAllowed = validateEditProfileData(req);
    if (isEditAllowed) {
      Object.keys(req.body).forEach((key) => {
        currentUser[key] = req.body[key];
      });

      await currentUser.save();
      res.json(currentUser);
    }
    else throw new Error("Edit is not allowed");

  } catch (error) {
    res.status(400).send(error);
  }
};

export const passwordEdit = async (req: authReq, res: Response) => {
  const { password } = req.body;
  const currentUser = req.user;

  currentUser.password = password
  await currentUser.save();
  res.json(currentUser);
}
