import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  newsbar: {
    type: String,
    default: "",
  },
  heroImage: {
    type: [String],
    default: [],
  },
  featuredCategories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "category",
  },
  featuredProducts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "product",
  },
  featuredBlogs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "blog",
  },
  __v: {
    type: Number,
    select: false,
  },
});

const home = mongoose.model("Home", homeSchema);

export default home;
