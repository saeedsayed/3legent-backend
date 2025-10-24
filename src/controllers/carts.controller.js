import { isValidObjectId } from "mongoose";
import cart from "../models/cart.model.js";
import appError from "../utils/appError.js";
import STATUS from "../utils/httpStatus.js";
//  ==============================  Helper Function ============================================
const getCartTotalPrice = (cartProducts) => {
  return cartProducts.reduce((acc, p) => acc + p.quantity * p.product.price, 0);
};

// ===============================  Get Cart ============================================
const getCart = async (req, res, next) => {
  try {
    const userCart = await cart
      .findOne({ user: req.userId })
      .populate("products.product");
    if (!userCart) {
      const err = appError.create("Cart not found", 404, STATUS.FAIL);
      return next(err);
    }
    res.json({ status: STATUS.SUCCESS, data: userCart });
  } catch (error) {
    next(error);
  }
};
// ==============================  Add To Cart ============================================
const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const isValidID = isValidObjectId(productId);
    if (!isValidID) {
      const err = appError.create("Invalid product ID", 400, STATUS.FAIL);
      return next(err);
    }
    const userCart = await cart
      .findOne({ user: req.userId })
      .populate("products.product");
    // Create a new cart if it doesn't exist
    if (!userCart) {
      userCart = new cart({
        user: req.userId,
        products: [{ product: productId, quantity }],
        totalPrice: 0,
      });
    } else {
      const filteredProducts = userCart.products.filter(
        (p) => p.product && p.product._id.toString() !== productId
      );
      filteredProducts.push({ product: productId, quantity });
      userCart.products = filteredProducts;
    }
    userCart.totalPrice = getCartTotalPrice(
      (await userCart.populate("products.product")).products
    );
    await userCart.save();
    res.json({
      status: STATUS.SUCCESS,
      data: userCart,
      message: "Product added to cart",
    });
  } catch (error) {
    next(error);
  }
};
// ==============================  Remove From Cart ============================================
const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const isValidID = isValidObjectId(productId);
    if (!isValidID) {
      const err = appError.create("Invalid product ID", 400, STATUS.FAIL);
      return next(err);
    }
    const userCart = await cart
      .findOne({ user: req.userId })
      .populate("products.product");
    if (!userCart) {
      const err = appError.create("Cart not found", 404, STATUS.FAIL);
      return next(err);
    }
    userCart.products = userCart.products.filter(
      (p) => p.product._id.toString() !== productId
    );
    userCart.totalPrice = getCartTotalPrice(userCart.products);
    await userCart.save();
    res.json({
      status: STATUS.SUCCESS,
      data: userCart,
      message: "Product removed from cart",
    });
  } catch (error) {
    next(error);
  }
};
// =============================  Clear Cart ===========================================
const clearCart = async (req, res, next) => {
  try {
    const userCart = await cart.findOne({ user: req.userId });
    if (!userCart) {
      const err = appError.create("Cart not found", 404, STATUS.FAIL);
      return next(err);
    }
    userCart.products = [];
    userCart.totalPrice = 0;
    await userCart.save();
    res.json({
      status: STATUS.SUCCESS,
      data: userCart,
      message: "Cart cleared",
    });
  } catch (error) {
    next(error);
  }
};

export { getCart, addToCart, removeFromCart, clearCart };
