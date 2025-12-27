import { z } from "zod";

const baseCouponSchema = {
  code: z
    .string({
      required_error: "Coupon code is required",
      invalid_type_error: "Coupon code must be a string",
    })
    .trim()
    .toUpperCase()
    .min(1, "Coupon code cannot be empty"),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .optional(),
  discountType: z.enum(
    ["percentage", "fixed"],
    "Discount type is required & must be either 'percentage' or 'fixed'"
  ),
  discountValue: z
    .number({
      required_error: "Discount value is required",
      invalid_type_error: "Discount value must be a number",
    })
    .positive("Discount value must be greater than 0"),
  minOrderAmount: z
    .number({
      invalid_type_error: "Minimum order amount must be a number",
    })
    .min(0, "Minimum order amount cannot be negative")
    .default(0),
  maxDiscountAmount: z
    .number({
      invalid_type_error: "Maximum discount amount must be a number",
    })
    .positive("Maximum discount amount must be greater than 0")
    .optional(),
  startDate: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "Start date must be a valid date",
  }),
  endDate: z.coerce.date({
    required_error: "End date is required",
    invalid_type_error: "End date must be a valid date",
  }),
  usageLimit: z
    .number({
      invalid_type_error: "Usage limit must be a number",
    })
    .int("Usage limit must be an integer")
    .positive("Usage limit must be greater than 0")
    .optional(),
  isActive: z
    .boolean({
      invalid_type_error: "IsActive must be a boolean",
    })
    .default(true),
};

export const CreateCouponSchema = z
  .object(baseCouponSchema)
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

export const updateCouponSchema = z
  .object(
    Object.fromEntries(
      Object.entries(baseCouponSchema).map(([key, schema]) => [
        key,
        schema.optional(),
      ])
    )
  )
  .refine(
    (data) =>
      !data.startDate || !data.endDate || data.endDate >= data.startDate,
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"],
    }
  );
