import express from "express";
import {
  createShippingMethod,
  deleteShippingMethod,
  getShippingMethodById,
  getShippingMethods,
  updateShippingMethod,
} from "../controllers/shippingMethods.controller.js";
import { checkToken, restrictTo } from "../middlewares/auth.middleware.js";
import roles from "../constants/roles.constant.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createShippingMethodSchema, updateShippingMethodSchema } from "../validators/shippingMethods.validator.js";
const router = express.Router();

router
  .route("/")
  .get(getShippingMethods)
  .post(checkToken, restrictTo(roles.ADMIN), validate(createShippingMethodSchema), createShippingMethod);
router
  .route("/:id")
  .get(getShippingMethodById)
  .put(checkToken, restrictTo(roles.ADMIN), validate(updateShippingMethodSchema), updateShippingMethod)
  .delete(checkToken, restrictTo(roles.ADMIN), deleteShippingMethod);

export default router;
