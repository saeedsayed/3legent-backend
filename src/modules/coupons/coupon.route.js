import express from "express";
import { checkToken, restrictTo } from "../../middlewares/auth.middleware.js";
import {
  applyCouponController,
  createCouponController,
  getAllCouponsController,
  updateCouponController,
} from "./coupon.controller.js";
import roles from "../../constants/roles.constant.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { CreateCouponSchema, updateCouponSchema } from "./coupon.validation.js";
import { paginate } from "../../middlewares/pagination.middleware.js";
import coupon from "./coupon.model.js";

const router = express.Router();

router.route("/:code").get(checkToken, applyCouponController);
router
  .route("/:id")
  .put(
    checkToken,
    restrictTo(roles.ADMIN),
    validate(updateCouponSchema),
    updateCouponController
  );
router
  .route("/")
  .get(
    checkToken,
    restrictTo(roles.ADMIN),
    paginate(coupon),
    getAllCouponsController
  )
  .post(
    checkToken,
    restrictTo(roles.ADMIN),
    validate(CreateCouponSchema),
    createCouponController
  );

export default router;
