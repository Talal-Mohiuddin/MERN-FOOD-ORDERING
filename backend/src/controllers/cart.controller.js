import { User } from "../models/user.model.js";
import { catchAsyncErrors } from "../middlewares/catchAysncErrors.js";
import { ErrorHandler } from "../middlewares/error.middleware.js";

const addToCart = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  let cartData = await user.cartData;
  if (!cartData[req.body.itemId]) {
    cartData[req.body.itemId] = 1;
  } else {
    cartData[req.body.itemId] += 1;
  }
  await User.findByIdAndUpdate(user._id, { cartData });

  res.status(200).json({
    success: true,
    message: "Item added to cart",
  });
});

const removeFromCart = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  let cartData = await user.cartData;
  if (!cartData[req.body.itemId]) {
    return next(new ErrorHandler("Item not in cart", 400));
  }
  if (cartData[req.body.itemId] === 1) {
    delete cartData[req.body.itemId];
  } else {
    cartData[req.body.itemId] -= 1;
  }
  await User.findByIdAndUpdate(user._id, { cartData });

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
  });
});

const getCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const cartData = await user.cartData;

  res.status(200).json({
    success: true,
    cartData,
  });
});

export { addToCart, removeFromCart, getCart };
