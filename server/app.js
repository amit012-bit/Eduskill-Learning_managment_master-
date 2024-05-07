import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./router/userRoutes.js";
import courseRoutes from "./router/courseRoutes.js";
import paymentRoutes from "./router/paymentRoutes.js";
import miscRoutes from './router/miscellaneousRoutes.js';
import errorMiddleWare from "./middlewares/error.middleware.js";
import { config } from "dotenv";

config();

const app = express();

// for cross origin request issues
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    // 
    // "http://localhost:5173"
    // allowedHeaders: ["Content-Type", "Authorization"],
    // methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// for parsing the cookies
app.use(cookieParser());

// middleware dev dependency to see log of server
app.use(morgan("dev"));

// Route to just test the server
app.use("/ping", (req, res) => {
  res.send("Pong");
});

// Routing for all user options
app.use("/api/v1/user", userRoutes);

//Routing for course options
app.use("/api/v1/courses", courseRoutes);

// Routing for payment options
app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1", miscRoutes);

// Routing for all other non existing routes
app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 PAGE NOT FOUND");
});

app.use(errorMiddleWare);

export default app;
