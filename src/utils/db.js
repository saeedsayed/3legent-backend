import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("connecting to mongoDB ... 🤌")
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("mongoDB connected 👍")
    } catch (err) {
        console.log("mongoDB connection err", err)
    }
}