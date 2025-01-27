import { NextFunction } from "express";
import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "rejected", "interested"],
        message: `{VALUE} is not a valid status type`,
      },
    },
  },
  { timestamps: true }
);

connectionSchema.pre('save', function (next) {
  if (this.fromUserId.equals(this.toUserId)) throw new Error("Cannot send request to yourself");
  
  next()
})
 
connectionSchema.index({ fromUserId: 1, toUserId: 1 });

const connectionModel = mongoose.model("Connections", connectionSchema);

export default connectionModel;
