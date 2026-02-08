import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false },
);

const paymentResultSchema = new mongoose.Schema(
  {
    stripePaymentIntentId: String,
    stripeChargeId: String,
    method: String,
    amount: Number,
    currency: String,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    pricing: {
      subtotal: Number,
      shipping: Number,
      discount: Number,
      total: Number,
    },

    coupon: String,

    shippingAddress: {
      fullName: String,
      phone: String,
      email: String,
      address: String,
      city: String,
      country: String,
      postalCode: String,
    },

    status: {
      type: String,
      enum: [
        "pending_payment",
        "paid",
        "payment_failed",
        "cancelled",
        "processing",
        "shipped",
        "delivered",
        "refunded",
      ],
      default: "pending_payment",
    },

    paymentIntentId: {
      type: String,
      index: true,
    },

    paymentResult: paymentResultSchema,

    stockReserved: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date, // for auto-cancel unpaid orders
      index: true,
    },

    paidAt: Date,
    cancelledAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
