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
  try {
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

    await request.save();
    res.json({ data: request });
  } catch (error) {
    res.status(400).json({ error: (<Error>error).message });
  }
};

export const getRequests = async (req: AuthReq, res: Response) => {
  try {
    const currentUser = req.user;

    const newRequests = await connection
      .find({ toUserId: currentUser.id, status: "interested" })
      .populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about"]);

    res.json({ data: newRequests });
  } catch (error) {
    res.status(400).json({ error: (<Error>error).message });
  }
};

export const getAllRequests = async (req: AuthReq, res: Response) => {
  try {
    const currentUser = req.user;
    const requests = await connection
      .find({
        $or: [
          { fromUserId: currentUser.id, status: "accepted" },
          { toUserId: currentUser.id, status: "accepted" },
        ],
      })
      .populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about"]);

    res.json({ data: requests });
  } catch (error) {
    res.status(400).json({ error: (<Error>error).message });
  }
};
