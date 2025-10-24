import mongoose from "mongoose";

const generalSchema = new mongoose.Schema({
  newsbar: {
    type: String,
    default: "",
  },
  heroImage: {
    type: [String],
    default: [],
  },
  __v: {
    type: Number,
    select: false,
  },
});

const general = mongoose.model("General", generalSchema);

export default general;
