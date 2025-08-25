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
        required: true,
        select: false
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.CUSTOMER
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    wishList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wishList"
    },
    __v: {
        type: Number,
        select: false
    }
}, { timestamps: true })

const user = mongoose.model("user", userSchema)

export default user