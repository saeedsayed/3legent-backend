import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { checkToken, restrictTo } from "../middlewares/auth.middleware.js";
import roles from "../constants/roles.constant.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProductSchema } from "../validators/product.validator.js";
import { paginate } from "../middlewares/pagination.middleware.js";
import product from "../models/product.model.js";
import { filter } from "../middlewares/filter.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(filter, paginate(product), getAllProducts)
  .post(
    checkToken,
    restrictTo(roles.ADMIN),
    validate(createProductSchema),
    createProduct
  );
router
  .route("/:id")
  .get(getSingleProduct)
  .put(checkToken, restrictTo(roles.ADMIN), updateProduct)
  .delete(checkToken, restrictTo(roles.ADMIN), deleteProduct);

export default router;
