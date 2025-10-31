import STATUS from "../constants/httpStatus.constant.js";
import {
  otpDigits,
  otpExpiresIn,
  timeBetweenSendingEachOTP,
} from "../constants/otp.constant.js";
import appError from "./appError.js";
import generateOtp from "./generateOtp.js";
import sendEmail from "./sendEmail.js";

export const sendOtp = async (user, next) => {
  const lastSentSince = Date.now() - new Date(user.otpExpiresAt - otpExpiresIn);
  if (lastSentSince < timeBetweenSendingEachOTP) {
    const waitingFor = Math.ceil(
      (timeBetweenSendingEachOTP - lastSentSince) / 1000
    );
    const err = appError.create(
      `please wait for ${waitingFor} seconds before requesting a new OTP`,
      400,
      STATUS.FAIL
    );
   return next(err);

  }
  const { otp, hashedOtp, otpExpiresAt } = await generateOtp(
    otpDigits,
    otpExpiresIn
  );
  user.otp = hashedOtp;
  user.otpExpiresAt = otpExpiresAt;
  console.log('user.email', user.email)
  await sendEmail({
    to: user.email,
    subject: "Your OTP Code",
    html: `<p style="font-size: 16px; text-align: center;">Your OTP code is <b style="font-size: 24px; display:block">👉 ${otp} 👈</b> It will expire in 10 minutes.</p>`,
  });
  await user.save();
};
