import { z as Z } from "zod";

export const createAddressSchema = Z.object({
  title: Z.optional(Z.string().trim()),
  fullName: Z.string("fullName is required")
    .min(2, "fullName must be at least 2 characters")
    .max(150),
  phone: Z.string("phone is required").min(7, "phone must be valid"),
  email: Z.optional(Z.string().email("email must be valid")),
  address: Z.string("address is required").min(
    5,
    "address must be at least 5 characters",
  ),
  city: Z.string("city is required").min(
    2,
    "city must be at least 2 characters",
  ),
  state: Z.optional(Z.string().trim()),
  country: Z.string("country is required").min(
    2,
    "country must be at least 2 characters",
  ),
  postalCode: Z.string("postalCode is required").min(
    2,
    "postalCode must be at least 2 characters",
  ),
  isDefault: Z.optional(Z.boolean()),
});

export const updateAddressSchema = createAddressSchema.partial();

export default { createAddressSchema, updateAddressSchema };
