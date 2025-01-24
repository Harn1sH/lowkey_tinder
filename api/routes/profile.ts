import { userAuth } from "../middlewares/auth";
import * as profileController from "../controllers/profile";
import express from "express";
const router = express.Router();

router.patch("/password", userAuth, profileController.passwordEdit);

router.patch("/edit", userAuth, profileController.profileEdit);

export default router;
