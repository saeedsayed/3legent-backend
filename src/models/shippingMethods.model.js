import mongoose from "mongoose";

const shippingMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Shipping method name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      required: [true, "Shipping cost is required"],
      min: [0, "Cost cannot be negative"],
    },
    estimatedDeliveryDays: {
      type: Number,
      required: true,
      min: [1, "Delivery days must be at least 1"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    regions: {
      type: [String], // Example: ["US", "EU", "EG"]
      default: [],
    },
  },
  { timestamps: true }
);

const ShippingMethods =  mongoose.model("ShippingMethod", shippingMethodSchema);
export default ShippingMethods
