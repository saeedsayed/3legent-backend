import mongoose from "mongoose";
import roles from "../utils/roles.js";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.CUSTOMER
    }
}, { timestamps: true })

const user = mongoose.model("user", userSchema)

export default user