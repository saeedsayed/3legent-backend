import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        select: false
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
            unique: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        _id: false
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    __v: {
        type: Number,
        select: false
    }
}, { timestamps: true });

// cartSchema.path("products").validate(function (products) {
//     const productIds = products.map(p => p.product.toString());
//     return productIds.length === new Set(productIds).size; // ensures uniqueness
// }, "Duplicate product found in cart");

const cart = mongoose.model("cart", cartSchema);

export default cart;