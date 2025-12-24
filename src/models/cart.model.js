import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
          unique: true,
          sparse: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        _id: false,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

const cart = mongoose.model("cart", cartSchema);

export default cart;
