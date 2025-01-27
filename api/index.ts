import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/database";
import authRouter from "./routes/auth";
import profileRouter from './routes/profile'
import cookieParser from "cookie-parser";
import requestRouter from "./routes/request";
const app = express();

connectDB()
  .then(() =>
    app.listen(5000, () => {
      console.log("server running on port 5000");
    })
  )
  .catch((err: any) => {
    console.log("cant connect to database error: ", err);
  });

app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRouter);
app.use('/profile', profileRouter)
app.use('/request', requestRouter)