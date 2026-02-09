import Z from "zod";

export const createPaymentIntentSchema = Z.object({
  shippingMethodId: Z.string("shippingMethodId is required and must be a string"),
  couponCode: Z.string("couponCode must be a string").optional(),
});
