import { catchAsyncErrors } from "../middlewares/catchAysncErrors.js";
import {
  ErrorHandler,
  errorMiddleware,
} from "../middlewares/error.middleware.js";
import { Food } from "../models/food.model.js";
import cloudinary from "cloudinary";

const addFood = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }
  if(!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload an image", 400));
  }
  const image = req.files.image;

  if (!image) {
    return next(new ErrorHandler("Please upload an image", 400));
  }
  const foodexist = await Food.findOne({ name });
  if (foodexist) {
    return next(new ErrorHandler("Food already exists", 400));
  }

  const format = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg",
    "image/webp",
    "image/avif",
  ];
  if (!format.includes(image.mimetype)) {
    return next(new ErrorHandler("Invalid image format", 400));
  }
  const maxSize = 2 * 1024 * 1024;
  if (image.size > maxSize) {
    return next(
      new ErrorHandler("Image size too large. Must be less than 2MB", 400)
    );
  }

  const imageUpload = await cloudinary.v2.uploader.upload(image.tempFilePath);
  if (!imageUpload) {
    return next(new ErrorHandler("Image upload failed", 500));
  }

  const food = await Food.create({
    name,
    description,
    price,
    image: imageUpload.secure_url,
    category,
  });
  res.status(201).json({
    success: true,
    message: "Food added successfully",
    food,
  });
});

const listFood = catchAsyncErrors(async (req, res, next) => {
  const foods = await Food.find();
  if (!foods) {
    return next(new ErrorHandler("No food found", 404));
  }
  res.status(200).json({
    success: true,
    foods,
  });
});

const removeFood = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const food = await Food.findById(id);
  const imageName = food.image.split("/").slice(-1)[0];
  const imageId = imageName.split(".")[0];
  const deleteImage = await cloudinary.v2.api.delete_resources([imageId]);

  if (!deleteImage) {
    return next(new ErrorHandler("Image delete failed", 500));
  }
  await Food.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Food deleted successfully",
  });
});

export { addFood, listFood, removeFood };
