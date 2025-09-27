import { isValidObjectId } from "mongoose";
import cart from "../models/cart.model.js";
import product from "../models/product.model.js";
import appError from "../utils/appError.js";
import STATUS from "../utils/httpStatus.js";

const getCartProducts = async (userCart) => {
    const arrProduct = await Promise.all(userCart.products.map(async p => {
        const productDb = await product.findById(p.productId);
        return {
            product: productDb,
            quantity: p.quantity,
        };
    }));
    return arrProduct;
};

const getCartTotalPrice = (cartProducts) => {
    return cartProducts.reduce((acc, p) => acc + p.quantity * p.product.price, 0);
};

const getCart = async (req, res, next) => {
    try {
        const userCart = await cart.findOne({ user: req.userId });
        if (!userCart) {
            const err = appError.create("Cart not found", 404, STATUS.FAIL);
            return next(err);
        }
        const cartProducts = await getCartProducts(userCart);
        res.json({ status: STATUS.SUCCESS, data: { ...userCart._doc, products: cartProducts } });
    } catch (error) {
        next(error);
    }
};
// ====================================================================
const addToCart = async (req, res, next) => {
    const { productId, quantity } = req.body;
    try {
        let userCart = await cart.findOne({ user: req.userId });
        // Create a new cart if it doesn't exist
        if (!userCart) {
            userCart = new cart({
                user: req.userId,
                products: [{ product: productId, quantity }],
                totalPrice: 0
            });
        } else {
            const productIndex = userCart.products.findIndex(p => p.productId.toString() === productId);
            // If the product is already in the cart, update the quantity
            if (productIndex > -1) {
                userCart.products[productIndex].quantity = quantity;
            } else {
                userCart.products.push({ productId, quantity });
            }
        }
        const cartProducts = await getCartProducts(userCart);
        // Calculate the total price
        userCart.totalPrice = getCartTotalPrice(cartProducts);
        await userCart.save();
        userCart._doc.products = cartProducts;
        res.json({ status: STATUS.SUCCESS, data: userCart, message: "Product added to cart" });
    } catch (error) {
        next(error);
    }
};
// ====================================================================
const removeFromCart = async (req, res, next) => {
    const { id: productId } = req.params;
    try {
        const isValidID = isValidObjectId(productId);
        if (!isValidID) {
            const err = appError.create("Invalid product ID", 400, STATUS.FAIL);
            return next(err);
        }
        const userCart = await cart.findOne({ user: req.userId });
        if (!userCart) {
            const err = appError.create("Cart not found", 404, STATUS.FAIL);
            return next(err);
        }
        userCart.products = userCart.products.filter(p => p.productId.toString() !== productId);
        const cartProducts = await getCartProducts(userCart);
        userCart.totalPrice = getCartTotalPrice(cartProducts);
        await userCart.save();
        userCart._doc.products = cartProducts;
        res.json({ status: STATUS.SUCCESS, data: userCart, message: "Product removed from cart" });
    } catch (error) {
        next(error);
    }
};

export { getCart, addToCart, removeFromCart };