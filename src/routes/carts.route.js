import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/carts.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.route("/")
    .get(checkToken,getCart)
    .post(checkToken,addToCart);
router.route("/:id")
    .delete(checkToken,removeFromCart);
export default router;