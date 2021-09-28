import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import generateTokenUser from "../utils/generateTokenUser.js";
import generateTokenAdmin from "../utils/generateTokenAdmin.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("User already exists", 404));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      message: "User Created Successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } else {
    return next(new ErrorHandler("User not found", 400));
  }
});

const registerAdmin = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const adminExists = await User.findOne({ email });

  if (adminExists) {
    return next(new ErrorHandler("Admin already exists", 404));
  }

  let role = "admin";

  const admin = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  if (admin) {
    res.status(201).json({
      message: "Admin Created Successfully",
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
    });
  } else {
    return next(new ErrorHandler("Admin not found", 400));
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.comparePassword(password))) {
    res.json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateTokenUser(user._id),
    });
    res.render("dashboard");
  } else {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email }).select("+password");

  if (admin && (await admin.comparePassword(password))) {
    res.json({
      message: "Admin logged in successfully",
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateTokenAdmin(admin._id),
    });
  } else {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
});

export { registerUser, registerAdmin, authUser, authAdmin };
