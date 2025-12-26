import STATUS from "../../constants/httpStatus.constant.js";
import appError from "../../utils/appError.js";
import user from "../users/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import cart from "../carts/cart.model.js";
import wishList from "../wishlists/wishList.model.js";
import { sendOtp } from "../../utils/sendOtp.js";
import { checkCredentials, createUser } from "./auth.service.js";

// ===============================  register  ======================================
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const newUser = await createUser({ fullName, email, password });
  const token = generateToken({ _id: newUser._id, email: newUser.email });
  res.json({
    status: STATUS.SUCCESS,
    data: newUser,
    message: "user registered successfully",
    token,
  });
};
// ===============================  login  ======================================
export const login = async (req, res) => {
  const { email, password } = req.body;
  const targetUser = await checkCredentials({ email, password });
  const token = generateToken({ _id: targetUser._id, email: targetUser.email });
  res.json({
    status: STATUS.SUCCESS,
    data: targetUser,
    token,
  });
};
// =============================== sendOtpToEmail  ======================================
export const sendOtpToEmail = async (req, res, next) => {
  const { userId } = req;
  const targetUser = await user.findById(userId);
  if (!targetUser) {
    const err = appError.create("user not found", 404, STATUS.FAIL);
    return next(err);
  }
  if (targetUser.isVerified) {
    const err = appError.create(
      "your email is already verified",
      400,
      STATUS.FAIL
    );
    return next(err);
  }
  await sendOtp(targetUser, next);
  res.json({
    status: STATUS.SUCCESS,
    message: "OTP sent to your email successfully",
  });
};
// ===============================  verifyEmail  ======================================
export const verifyEmail = async (req, res, next) => {
  const {
    userId,
    body: { otp },
  } = req;
  const targetUser = await user.findById(userId).select("+otp +otpExpiresAt");
  if (!targetUser) {
    const err = appError.create("user not found", 404, STATUS.FAIL);
    return next(err);
  }
  const isCorrectOtp = await bcrypt.compare(otp, targetUser.otp);
  if (!isCorrectOtp) {
    const err = appError.create("invalid OTP", 400, STATUS.FAIL);
    return next(err);
  }
  if (targetUser.otpExpiresAt < Date.now()) {
    const err = appError.create("OTP expired", 400, STATUS.FAIL);
    return next(err);
  }
  targetUser.isVerified = true;
  targetUser.otp = undefined;
  targetUser.otpExpiresAt = undefined;
  await targetUser.save();
  res.json({
    status: STATUS.SUCCESS,
    message: "email verified successfully",
  });
};
// ===============================  forgotPassword  ======================================
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const targetUser = await user.findOne({ email }).select("+otpExpiresAt");
  if (!targetUser) {
    const err = appError.create("user not found", 404, STATUS.FAIL);
    return next(err);
  }
  await sendOtp(targetUser, next);
  res.json({
    status: STATUS.SUCCESS,
    message: "OTP sent to your email successfully",
  });
};
// ============================== verifyForgotPasswordOtp ==============================
export const verifyForgotPasswordOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  const targetUser = await user.findOne({ email }).select("+otp +otpExpiresAt");
  if (!targetUser) {
    const err = appError.create("user not found", 404, STATUS.FAIL);
    return next(err);
  }
  const isCorrectOtp = await bcrypt.compare(otp, targetUser.otp);
  if (!isCorrectOtp) {
    const err = appError.create("invalid OTP", 400, STATUS.FAIL);
    return next(err);
  }
  if (targetUser.otpExpiresAt < Date.now()) {
    const err = appError.create("OTP expired", 400, STATUS.FAIL);
    return next(err);
  }
  targetUser.otpVerified = true;
  targetUser.isVerified = true;
  targetUser.otp = undefined;
  targetUser.otpExpiresAt = undefined;
  await targetUser.save();
  res.json({
    status: STATUS.SUCCESS,
    message: "OTP verified successfully",
  });
};
// ===============================  resetPassword  ======================================
export const resetPassword = async (req, res, next) => {
  const { email, newPassword } = req.body;
  const targetUser = await user.findOne({ email }).select("+otpVerified");
  if (!targetUser) {
    const err = appError.create("user not found", 404, STATUS.FAIL);
    return next(err);
  }
  if (!targetUser.otpVerified) {
    const err = appError.create("OTP not verified", 400, STATUS.FAIL);
    return next(err);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  targetUser.password = hashedPassword;
  targetUser.passwordChangedAt = new Date();
  targetUser.otpVerified = false;
  await targetUser.save();
  res.json({
    status: STATUS.SUCCESS,
    message: "Password reset successfully",
  });
};
