import STATUS from "../../constants/httpStatus.constant.js";
import { placeOrder } from "../orders/order.service.js";
import { createInvoice, createPaymentIntent } from "./payment.service.js";

export const createPaymentIntentController = async (req, res) => {
  const { shippingMethodId, couponCode = "" } = req.body;
  const { userId } = req;
  const invoice = await createInvoice(userId, shippingMethodId, couponCode); // create an invoice for the order
  const { clientSecret, paymentIntentId } = await createPaymentIntent(
    // create a payment intent for the order
    invoice.total,
  );
  const order = await placeOrder({
    // place the order with pending payment status, the order will be updated to paid after receiving the webhook event from stripe
    userId,
    shippingMethodId,
    pricing: {
      subTotal: invoice.subTotal,
      shipping: invoice.shipping,
      discount: invoice.discount,
      total: invoice.total,
    },
    paymentIntentId: paymentIntentId,
    couponCode: couponCode || null,
  });
  res.json({
    status: STATUS.SUCCESS,
    data: {
      clientSecret,
      orderId: order._id,
      ...invoice, // the invoice details => [subTotal, shipping, discount, total, coupon]
    },
  });
};
