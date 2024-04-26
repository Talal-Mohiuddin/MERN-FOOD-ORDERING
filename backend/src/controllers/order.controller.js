import { catchAsyncErrors } from "../middlewares/catchAysncErrors.js";
import { ErrorHandler } from "../middlewares/error.middleware.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  if (!userId) {
    return next(new ErrorHandler("Please login to place order", 401));
  }
  const { items, amount, address } = req.body;
  const newOrder = new Order({
    userId,
    items,
    amount,
    address,
  });
  if (!newOrder) {
    return next(new ErrorHandler("Order failed", 500));
  }
  await newOrder.save();

  await User.findByIdAndUpdate(userId, { cartData: {} });

  const line_items = items.map((item, index) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));
  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Delievery Charges",
      },
      unit_amount: 2 * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${process.env.RENDER_URL}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${process.env.RENDER_URL}/verify?success=false&orderId=${newOrder._id}`,
  });

  res.status(200).json({
    success: true,
    session_url: session.url,
  });
});

const VerifyOrder = catchAsyncErrors(async (req, res, next) => {
  const { success, orderId } = req.body;
  if (success) {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    res.status(200).json({
      success: true,
      message: "Paid",
    });
  } else {
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({
      success: false,
      message: "Not Paid",
    });
  }
});

const userOrders = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const orders = await Order.find({ userId });
  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

const getOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

const updateStatus = catchAsyncErrors(async (req, res, next) => {
  const { orderId, status } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  const updated = await Order.findByIdAndUpdate(orderId, { status });

  if (!updated) {
    return next(new ErrorHandler("Failed to update status", 500));
  }

  res.status(200).json({
    success: true,
    message: "Status updated",
  });
});

export { placeOrder, VerifyOrder, userOrders, getOrders, updateStatus };
