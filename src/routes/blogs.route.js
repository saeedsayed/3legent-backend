import express from "express";
import { createBlog, deleteBlogById, getBlogById, getBlogs, updateBlog } from "../controllers/blogs.controller.js";
import { checkToken, restrictTo } from "../middlewares/auth.middleware.js";
import roles from "../utils/roles.js";
import { validate } from "../middlewares/validate.middleware.js";
import blogSchema from "../validators/blog.validator.js";
const router = express.Router();
router
  .route("/")
  .get(getBlogs)
  .post(checkToken, restrictTo(roles.ADMIN), validate(blogSchema), createBlog);
router
  .route("/:id")
  .get(getBlogById)
  .put(updateBlog)
  .delete(deleteBlogById);
export default router;
