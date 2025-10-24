import express from "express";
import {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";
import { checkToken, restrictTo } from "../middlewares/auth.middleware.js";
import roles from "../utils/roles.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCategorySchema } from "../validators/category.validator.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(checkToken, validate(createCategorySchema), createCategory);
router
  .route("/:id")
  .put(checkToken, restrictTo(roles.ADMIN), updateCategory)
  .delete(checkToken, restrictTo(roles.ADMIN), deleteCategory);

export default router;
