import express from 'express'
import { userAuth } from '../middlewares/auth'
import * as requestController from '../controllers/request'
const router = express.Router();

router.post("/send/:status/:toUserID", userAuth, requestController.makeRequest);

export default router;