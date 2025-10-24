import { z as Z } from "zod";

export const registerSchema = Z.object({
    email: Z.string("email is required").email(),
    fullName: Z.string("full name is required").min(2, "full name must be at least 2 characters").max(100),
    password: Z.string("password is required").min(6, "password must be at least 6 characters").max(100),
    confirmPassword: Z.string("confirm password is required").min(6, "confirm password must be at least 6 characters").max(100)
}).refine((data) => data.password === data.confirmPassword, { message: "passwords do not match", path: ["confirmPassword"] });

export const loginSchema = Z.object({
    email: Z.string("email is required").email(),
    password: Z.string("password is required").min(6, "password must be at least 6 characters").max(100),
});

export const verifyEmailSchema = Z.object({
    otp: Z.string("OTP is required").min(3, "OTP must be at least 3 characters").max(10, "OTP must be at most 10 characters"),
});

export const forgotPasswordSchema = Z.object({
    email: Z.string("email is required").email(),
});

export const verifyForgotPasswordOtpSchema = Z.object({
    email: Z.string("email is required").email(),
    otp: Z.string("OTP is required").min(3, "OTP must be at least 3 characters").max(10, "OTP must be at most 10 characters"),
});

export const resetPasswordSchema = Z.object({
    email: Z.string("email is required").email(),
    newPassword: Z.string("new password is required").min(6, "new password must be at least 6 characters").max(100),
    confirmNewPassword: Z.string("confirm new password is required").min(6, "confirm new password must be at least 6 characters").max(100)
}).refine((data) => data.newPassword === data.confirmNewPassword, { message: "passwords do not match", path: ["confirmNewPassword"] });
