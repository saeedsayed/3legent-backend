import mongoose from "mongoose";
let isConnected = false;
export const connectDB = async () => {
  if (isConnected) {
    console.log("already connected to mongoDB 👍");
    return;
  }
  try {
    console.log("connecting to mongoDB ... 🤌");
    await mongoose.connect(process.env.MONGO_DB_URI);
    isConnected = true;
    console.log("mongoDB connected 👍");
  } catch (err) {
    isConnected = false;
    console.log("mongoDB connection err", err);
  }
};
