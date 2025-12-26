import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
    tags: [
    {
      type: String,
      required: true,
    },
  ],
    __v: {
    type: Number,
    select: false,
  },
});

const blog = mongoose.model("blog", blogSchema);
export default blog;
