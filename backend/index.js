import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONT_END_URL, process.env.Dashboard_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Database connected");
    });
    app.on("error", (error) => {
      console.log("Error connecting to MongoDB");
      throw error;
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    throw error;
  }
}

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

const _dirname = path.resolve();

import foodRoutes from "./src/routes/food.route.js";
app.use("/api/food", foodRoutes);

import userRoutes from "./src/routes/user.route.js";
app.use("/api/user", userRoutes);

import cartRoutes from "./src/routes/cart.route.js";
app.use("/api/cart", cartRoutes);

import orderRoutes from "./src/routes/order.route.js";
app.use("/api/order", orderRoutes);

app.use(express.static(path.join(_dirname, "../frontend/dist")));
app.use(express.static(path.join(_dirname, "../Dashboard/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "../frontend/dist/index.html"))
);

app.use(errorMiddleware);
export default app;
