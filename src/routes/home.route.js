import express from "express";
import {
  updateHome,
  getNewsBar,
  getHeroSection,
  getFeaturedCategories,
  // getFeaturedProducts,
  getLatestProducts,
  getFeaturedBlogs,
} from "../controllers/home.controller.js";
import roles from "../constants/roles.constant.js";
import { checkToken, restrictTo } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").put(checkToken, restrictTo(roles.ADMIN), updateHome);
router.route("/newsbar").get(getNewsBar);
router.route("/hero-section").get(getHeroSection);
router.route("/featured-categories").get(getFeaturedCategories);
// router.route("/featured-products").get(getFeaturedProducts);
router.route("/latest-products").get(getLatestProducts);
router.route("/featured-blogs").get(getFeaturedBlogs);

export default router;
