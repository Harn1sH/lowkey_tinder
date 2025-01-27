import express from 'express'
import { userAuth } from '../middlewares/auth'
import * as requestController from '../controllers/request'
const router = express.Router();

router.post("/send/:status/:toUserID", userAuth, requestController.makeRequest);
router.post("/review/:status/:requestID", userAuth, requestController.reviewRequest);

export default router;