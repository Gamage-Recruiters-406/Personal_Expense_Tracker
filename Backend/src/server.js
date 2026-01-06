import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './config/database.js';
import authRouters from "./routes/authRoutes.js";


dotenv.config();

connectDB()

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//router
app.use("/api/v1/useAuth", authRouters)

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Personal Expense Tracker",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode`.bgCyan.white);
    console.log(`Server is running on port ${PORT}`.bgCyan.white)
});