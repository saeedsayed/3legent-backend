import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const review = model("review", reviewSchema);

export default review;
