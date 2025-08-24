import express from "express";
import { getCategories, updateCategory, createCategory, deleteCategory } from "../controllers/categories.controller.js";
import { checkToken, restrictTo } from "../middlewares/auth.middleware.js";
import { CreateCategorySchema } from "../middlewares/categories.middleware.js";
import roles from "../utils/roles.js";

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(checkToken, CreateCategorySchema(), createCategory);
router.route('/:id')
    .put(checkToken, restrictTo(roles.ADMIN), updateCategory)
    .delete(checkToken, restrictTo(roles.ADMIN), deleteCategory);

export default router;
