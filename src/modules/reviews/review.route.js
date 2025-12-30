import express from "express";
import { checkToken } from "../../middlewares/auth.middleware.js";
import {
  addReviewController,
  getProductReviewsController,
  removeReviewController,
  updateReviewController,
} from "./review.controller.js";

const router = express.Router();

router
  .route("/:productId")
  .get(getProductReviewsController)
  .post(checkToken, addReviewController);
router
  .route("/:reviewId")
  .delete(checkToken, removeReviewController)
  .put(checkToken, updateReviewController);

export default router;
