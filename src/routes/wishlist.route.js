import express from "express";
import { checkToken } from "../middlewares/auth.middleware.js";
import {
  addToWishList,
  getWishList,
  removeFromWishList,
} from "../controllers/wishlist.controller.js";
const router = express.Router();
router
  .route("/")
  .get(checkToken, getWishList)
  .post(checkToken, addToWishList)
  .delete(checkToken, removeFromWishList);
export default router;
