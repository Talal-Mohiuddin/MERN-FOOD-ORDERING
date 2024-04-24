import { catchAsyncErrors } from "../middlewares/catchAysncErrors";
import { ErrorHandler } from "../middlewares/error.middleware";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwtToken";

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  generateToken(user, "User registered successfully", 201, res);
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  generateToken(user, "User logged in successfully", 200, res);
});

export { registerUser, loginUser };
