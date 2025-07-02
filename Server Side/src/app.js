import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./middlewares/logger.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(logger);

// Import routes
import userRouter from "./routes/user.routes.js";
import roomRouter from "./routes/room.routes.js";

// routes Decelaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);

app.use(errorHandler);

export default app;
