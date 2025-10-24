import mongoose from "mongoose";

const versionsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  images: {
    type: [String],
    default: [],
  },
});

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
    offer: {
      type: Number,
      required: true,
      default: 0,
    },
    versions: {
      type: [versionsSchema],
      default: [],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: [
        {
          user: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
          },
        },
      ],
      default: [],
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
