import express from "express";
import {
  createShippingMethod,
  deleteShippingMethod,
  getShippingMethodById,
  getShippingMethods,
  updateShippingMethod,
} from "../controllers/shippingMethods.controller.js";
import { restrictTo } from "../middlewares/auth.middleware.js";
import roles from "../constants/roles.constant.js";
const router = express.Router();

router
  .route("/")
  .get(getShippingMethods)
  .post(restrictTo(roles.ADMIN), createShippingMethod);
router
  .route("/:id")
  .get(getShippingMethodById)
  .put(restrictTo(roles.ADMIN), updateShippingMethod)
  .delete(restrictTo(roles.ADMIN), deleteShippingMethod);

export default router;
