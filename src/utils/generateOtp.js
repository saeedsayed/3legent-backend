import bcrypt from "bcryptjs";
const generateOtp = async (digits = 3, expireIn = 3 * 60 * 1000) => {
  const otp = Math.floor(
    Math.pow(10, digits - 1) +
      Math.random() * (Math.pow(10, digits) - Math.pow(10, digits - 1))
  ).toString();
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);
  const otpExpiresAt = new Date(Date.now() + expireIn); // expireDate in minutes
  return { otp, hashedOtp, otpExpiresAt };
};

export default generateOtp;
