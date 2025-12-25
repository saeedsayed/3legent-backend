import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      select: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

const wishList = mongoose.model("wishList", wishListSchema);

export default wishList;
