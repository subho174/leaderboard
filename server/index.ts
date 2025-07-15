import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/connectDB";
import cors from "cors";
import userRouter from "./src/routes/user.route";
import claimRouter from "./src/routes/claim.route";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN!,
  })
);
app.use([userRouter, claimRouter]);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
