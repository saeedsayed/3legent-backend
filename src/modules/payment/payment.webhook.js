import express from "express";
import stripe from "../../utils/stripe.config.js";

const router = express.Router();

router.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "payment_intent.succeeded") {
      console.log("Payment success:", event.data.object.id);
    }

    res.json({ received: true });
  },
);

export default router;
