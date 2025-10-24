import { z as Z } from "zod";
export const createCategorySchema = Z.object({
  name: Z.string("name is required")
    .min(2, "name must be at least 2 characters")
    .max(100),
  description: Z.string("description is required")
    .min(10, "description must be at least 10 characters")
    .max(500),
});
