import mongoose from "mongoose";

export const connectDB = async () => {
  const connection = await mongoose.connect(
    "mongodb+srv://harnish:nxjw6a1wx5um7epC@cluster0.nkte6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("connected to ", connection.connection.host);
};

