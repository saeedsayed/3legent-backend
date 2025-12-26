import mongoose from "mongoose";
import roles from "../../constants/roles.constant.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
      default: "https://res.cloudinary.com/dcnwzavtg/image/upload/v1766662284/userAvatar_utssq0.png",
    },
    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpiresAt: {
      type: Date,
      select: false,
    },
    otpVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.CUSTOMER,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    wishList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wishList",
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export default user;
