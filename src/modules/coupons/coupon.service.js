import STATUS from "../../constants/httpStatus.constant.js";
import appError from "../../utils/appError.js";
import calculateCartSubTotal from "../../utils/calculateCartSubTotal.js";
import cart from "../carts/cart.model.js";
import coupon from "./coupon.model.js";

export const checkCoupon = async (code) => {
  const couponDocument = await coupon.findOne({ code });
  if(!couponDocument){
    const err = appError.create("invalid coupon code",404, STATUS.FAIL)
    throw err
  }
  const isStarted = new Date(couponDocument.startDate) < new Date();
  const isExpire = new Date(couponDocument.endDate) < new Date();
  if (
    !couponDocument ||
    !couponDocument.isActive ||
    couponDocument.usedCount >= couponDocument.usageLimit ||
    !isStarted
  ) {
    const err = appError.create("invalid coupon", 400, STATUS.FAIL);
    throw err;
  }
  if (isExpire) {
    const err = appError.create("expire coupon", 400, STATUS.FAIL);
    throw err;
  }
  return couponDocument;
};

export const applyCoupon = async (code, cartId) => {
  const couponDocument = await coupon.findOne({ code });
  const cartDocument = await cart.findById(cartId).populate("products.product");
  if (cartDocument.products.length === 0) {
    const err = appError.create("the cart is empty", 400, STATUS.FAIL);
    throw err;
  }
  if (cartDocument?.totalPrice < couponDocument.minOrderAmount) {
    const err = appError.create(
      `Minimum order amount is ${couponDocument.minOrderAmount}`,
      400,
      STATUS.FAIL
    );
    throw err;
  }
  const subTotal = calculateCartSubTotal(cartDocument.products);
  let discount = 0;
  if (couponDocument.discountType === "percentage") {
    discount = (subTotal * couponDocument.discountValue) / 100;
    if (discount > couponDocument.maxDiscountAmount) {
      discount = couponDocument.maxDiscountAmount;
    }
  } else {
    discount = couponDocument.discountValue;
  }
  const total = subTotal - discount;
  return {
    subTotal,
    discount,
    total,
    coupon: code,
  };
};

export const createCoupon = async (couponData) => {
  const couponDocument = await coupon.findOne({ code: couponData.code });
  if (couponDocument) {
    const err = appError.create(
      "The coupon code already exists",
      400,
      STATUS.FAIL
    );
    throw err;
  }
  const newCoupon = new coupon(couponData);
  newCoupon.save();
  return newCoupon;
};
