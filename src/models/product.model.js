import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: null,
    }
})

const product = mongoose.model("product", productSchema)

export default product