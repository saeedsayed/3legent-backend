import express from "express";
import { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { CreateProductSchema } from "../middlewares/products.middleware.js";
import { checkToken, restrictTo } from "../middlewares/auth.middleware.js";
import roles from "../utils/roles.js";

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(checkToken, restrictTo(roles.ADMIN), CreateProductSchema(), createProduct);
router.route('/:id')
    .get(getSingleProduct)
    .put(checkToken, restrictTo(roles.ADMIN), updateProduct)
    .delete(checkToken, restrictTo(roles.ADMIN), deleteProduct);

export default router;
