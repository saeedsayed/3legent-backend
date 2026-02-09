import express from "express";
import stripe from "../../utils/stripe.config.js";
import {
  handleFailedPayment,
  handleSuccessfulPayment,
} from "./payment.service.js";

const router = express.Router();

router.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "payment_intent.succeeded") {
      await handleSuccessfulPayment(event.data.object);
    }

    if (event.type === "payment_intent.payment_failed") {
      await handleFailedPayment(event.data.object);
    }

    res.json({ received: true });
  },
);

export default router;
