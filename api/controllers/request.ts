import { Response } from "express";
import { AuthReq } from "../middlewares/auth";
import connection from "../models/Connections";
import User from "../models/User";

export const makeRequest = async (req: AuthReq, res: Response) => {
  try {
    const status = req.params.status;
    const toUserId = req.params.toUserID;
    const fromUserId = req.user._id;

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) throw new Error("User not found");

    const existingConnection = await connection.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnection) throw new Error("Request already Exists");

    const doc = new connection({ fromUserId, toUserId, status });
    await doc.save();
    res.json(doc);
  } catch (error) {
    res.status(400).send({ error: (<Error>error).message });
  }
};

export const reviewRequest = async (req: AuthReq, res: Response) => {
  const currentUser = req.user;
  let status = req.params.status;
  const requestID = req.params.requestID;

  const allowedStatus = ["accepted", "rejected"];
  if (!allowedStatus.includes(status)) {
    res.status(400).json({ message: "Invalid Status" });
  }

  const request = await connection.findOne({ _id: requestID, toUserId: currentUser._id });
  if (!request) {
    res.status(400).json({ message: "Invalid request" });
  }

  request.status = <"accepted" | "rejected" | "pending" | "interested">status;
  await request?.save();
  res.json({ data: request });
};
