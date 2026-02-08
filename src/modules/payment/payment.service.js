import stripe from "../../utils/stripe.config.js";
import { applyCoupon, checkCoupon } from "../coupons/coupon.service.js";
import { getShippingMethodById } from "../shippingMethods/shippingMethod.service.js";
import user from "../users/user.model.js";

export const createInvoice = async (userId, shippingMethodId, couponCode) => {
  // create a bill for the user based on their cart, shipping method and coupon
  const { cart } = await user
    .findById(userId)
    .select("cart -_id")
    .populate("cart", "totalPrice");
  const { cost: shippingCost } = await getShippingMethodById(shippingMethodId);
  let totalAmount = cart.totalPrice + shippingCost; //   calculate the total amount based on cart, shipping method
  let discount = 0;
  //   chick if user have coupon
  if (couponCode && couponCode.trim() !== "") {
    await checkCoupon(couponCode);
    const coupon = await applyCoupon(couponCode, cart._id);
    totalAmount -= coupon.discount; // update the total amount after apply the coupon discount
    discount = coupon.discount;
  }
  return {
    subTotal: cart.totalPrice,
    shipping: shippingCost,
    discount,
    total: totalAmount,
    coupon: couponCode,
  };
};

export const createPaymentIntent = async (totalAmount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // convert to cents
    currency: "usd",
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    payment_method_types: ["card"],
  });
  return paymentIntent.client_secret;
};
