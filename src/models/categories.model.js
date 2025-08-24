import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})

const category = mongoose.model("category", categoriesSchema)

export default category