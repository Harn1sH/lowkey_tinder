import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: `{VALUE} is not a valid status type`,
      },
    },
  },
  { timestamps: true }
);

const connectionModel = mongoose.model("Connections", connectionSchema);

export default connectionModel;
