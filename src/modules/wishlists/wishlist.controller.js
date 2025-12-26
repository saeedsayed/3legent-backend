import { isValidObjectId } from "mongoose";
import appError from "../../utils/appError.js";
import STATUS from "../../constants/httpStatus.constant.js";
import wishList from "./wishList.model.js";
import user from "../users/user.model.js";

// ====================== Get wish list ==============================
const getWishList = async (req, res, next) => {
  try {
    let userWishList = await wishList
      .findOne({ user: req.userId })
      .populate("products");
    if (!userWishList) {
      userWishList = new wishList({ user: req.userId, products: [] });
      const documentedUser = await user.findById(req.userId);
      documentedUser.wishList = userWishList._id;
      await documentedUser.save();
      await userWishList.save();
    }
    res.json({ status: STATUS.SUCCESS, data: userWishList });
  } catch (error) {
    next(error);
  }
};
// ====================================================================
const addToWishList = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const isValidID = isValidObjectId(productId);
    if (!isValidID) {
      const err = appError.create("Invalid product ID", 400, STATUS.FAIL);
      return next(err);
    }
    const userWishList = await wishList
      .findOneAndUpdate(
        { user: req.userId },
        { $addToSet: { products: productId } },
        { new: true, upsert: true }
      )
      .populate("products");
    res.json({
      status: STATUS.SUCCESS,
      data: userWishList.products,
      message: "Product added to wish list",
    });
  } catch (error) {
    next(error);
  }
};
// ====================================================================
const removeFromWishList = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const isValidID = isValidObjectId(productId);
    if (!isValidID) {
      const err = appError.create("Invalid product ID", 400, STATUS.FAIL);
      return next(err);
    }
    const userWishList = await wishList
      .findOneAndUpdate(
        { user: req.userId },
        { $pull: { products: productId } },
        { new: true }
      )
      .populate("products");
    if (!userWishList) {
      const err = appError.create("WishList not found", 404, STATUS.FAIL);
      return next(err);
    }
    res.json({
      status: STATUS.SUCCESS,
      data: userWishList.products,
      message: "Product removed from wish list",
    });
  } catch (error) {
    next(error);
  }
};

export { getWishList, addToWishList, removeFromWishList };
