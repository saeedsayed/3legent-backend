import { Router } from "express";
import express from "express";
import { checkToken } from "../../middlewares/auth.middleware.js";
import { createPaymentIntentController } from "./payment.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPaymentIntentSchema } from "./payment.validation.js";
import stripe from "../../utils/stripe.config.js";

const router = Router();

router
  .route("/create-payment-intent")
  .post(
    checkToken,
    validate(createPaymentIntentSchema),
    createPaymentIntentController,
  );

// router.route(
//   "/webhook").post(
//   express.raw({ type: "application/json" }),
//   (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     let event;

//     console.log("type of req-body webhook=>",typeof req.body)

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET,
//       );
//       console.log("webhook_event", event);
//     } catch (err) {
//       console.error("Webhook signature verification failed.", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === "payment_intent.succeeded") {
//       console.log("Payment success:", event.data.object.id);
//     }

//     res.json({ received: true });
//   },
// );

export default router;
