import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required:true,
      default:
        "https://cane-line.eu/cdn/shop/files/50804T_P144COB_3492_1512x.png?v=1755173957",
    },
    category: {
      type: [String],
      required: true,
      ref: "category",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    versions: {
      type: [
        {
          version: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
          versionName: String,
        },
      ],
      default: [],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

export default product;
