import { isValidObjectId } from "mongoose";
import product from "../models/product.model.js";
import appError from "../utils/appError.js";
import STATUS from "../utils/httpStatus.js";
import wishList from "../models/wishList.model.js";

const getWishListProducts = async (userWishList) => {
    const arrProduct = await Promise.all(userWishList.products.map(async productId => {
        const productDb = await product.findById(productId);
        return productDb;
    }));
    return arrProduct;
};

const getWishList = async (req, res, next) => {
    try {
        const userWishList = await wishList.findOne({ user: req._id });
        if (!userWishList) {
            const err = appError.create("WishList not found", 404, STATUS.FAIL);
            return next(err);
        }
        const wishListProducts = await getWishListProducts(userWishList);
        res.json({ status: STATUS.SUCCESS, data: wishListProducts });
    } catch (error) {
        next(error);
    }
};
// ====================================================================
const addToWishList = async (req, res, next) => {
    const { productId } = req.body;
    try {
        let userWishList = await wishList.findOne({ user: req._id });
        // Create a new wish list if it doesn't exist
        if (!userWishList) {
            userWishList = new wishList({
                user: req._id,
                products: [productId],
            });
        } else {
            const productIndex = userWishList.products.findIndex(p => p._id.toString() === productId);
            // If the product is already in the wish list, do nothing
            if (productIndex > -1) {
                const err = appError.create("Product is already in the wish list", 400, STATUS.FAIL);
                return next(err);
            } else {
                userWishList.products.push(productId);
            }
        }
        await userWishList.save();
        const wishListProducts = await getWishListProducts(userWishList);
        res.json({ status: STATUS.SUCCESS, data: wishListProducts, message: "Product added to wish list" });
    } catch (error) {
        next(error);
    }
};
// ====================================================================
const removeFromWishList = async (req, res, next) => {
    const { id: productId } = req.params;
    try {
        const isValidID = isValidObjectId(productId);
        if (!isValidID) {
            const err = appError.create("Invalid product ID", 400, STATUS.FAIL);
            return next(err);
        }
        const userWishList = await wishList.findOne({ user: req._id });
        if (!userWishList) {
            const err = appError.create("WishList not found", 404, STATUS.FAIL);
            return next(err);
        }
        userWishList.products = userWishList.products.filter(p => p._id.toString() !== productId);
        await userWishList.save();
        const wishListProducts = await getWishListProducts(userWishList);
        res.json({ status: STATUS.SUCCESS, data: wishListProducts, message: "Product removed from wish list" });
    } catch (error) {
        next(error);
    }
};


export { getWishList, addToWishList, removeFromWishList };