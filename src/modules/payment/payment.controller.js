import STATUS from "../../constants/httpStatus.constant.js";
import { createInvoice, createPaymentIntent } from "./payment.service.js";

export const createPaymentIntentController = async (req, res) => {
  const { shippingMethodId, couponCode = "" } = req.body;
  const { userId } = req;
  const invoice = await createInvoice(userId, shippingMethodId, couponCode);
  const clientSecret = await createPaymentIntent(invoice.total);
  res.json({
    status: STATUS.SUCCESS,
    data: {
      clientSecret,
      ...invoice,
    },
  });
};
