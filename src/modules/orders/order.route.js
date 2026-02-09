import { Router } from "express";
import { checkToken, restrictTo } from "../../middlewares/auth.middleware.js";
import {
  getOrderByIdController,
  getUserOrdersController,
  getAllOrdersController,
} from "./order.controller.js";
import roles from "../../constants/roles.constant.js";
import { paginate } from "../../middlewares/pagination.middleware.js";
import Order from "./order.model.js";

const router = Router();

router.route("/history").get(checkToken, getUserOrdersController); // for testing purpose, to get the latest order of the user, in production we can have a separate route to get the latest order of the user, or we can have a route to get all the orders of the user with pagination
router.route("/history/:id").get(checkToken, getOrderByIdController);
router
  .route("/")
  .get(
    checkToken,
    restrictTo(roles.ADMIN),
    paginate(Order),
    getAllOrdersController,
  );

export default router;
