import { z as Z } from "zod";

export const createProductSchema = Z.object({
  title: Z.string("title is required")
    .min(2, "title must be at least 2 characters")
    .max(100),
  description: Z.string("description is required")
    .min(10, "description must be at least 10 characters")
    .max(1000),
  price: Z.number("price is required and must be a positive number").min(
    0.1,
    "price must be at least 0.1"
  ),
  category: Z.array(Z.string()).min(1, "at least one category is required"),
  stock: Z.number("stock is required and must be a non-negative number").min(
    0,
    "stock must be at least 0"
  ),
  discount: Z.optional(
    Z.number("discount must be a non-negative number").min(
      0,
      "discount must be at least 0"
    )
  ),
  images: Z.optional(Z.array(Z.string().url("each image must be a valid URL"))),
  versions: Z.optional(
    Z.array(
      Z.object({
        version: Z.string("version must be a string"),
        versionName: Z.string("versionName must be a string").min(
          2,
          "versionName must be at least 2 characters"
        ),
      })
    )
  ),
});
