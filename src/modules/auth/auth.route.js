import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  sendOtpToEmail,
  verifyEmail,
  verifyForgotPasswordOtp,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyForgotPasswordOtpSchema,
} from "./auth.validator.js";
import { checkToken } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router
  .route("/verify-email")
  .get(checkToken, sendOtpToEmail)
  .post(checkToken, validate(verifyEmailSchema), verifyEmail);
router
  .route("/forgot-password")
  .post(validate(forgotPasswordSchema), forgotPassword);
router
  .route("/forgot-password/verify-otp")
  .post(validate(verifyForgotPasswordOtpSchema), verifyForgotPasswordOtp);
router
  .route("/reset-password")
  .put(validate(resetPasswordSchema), resetPassword);

export default router;
