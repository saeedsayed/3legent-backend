import express from "express";
import { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { CreateProductSchema } from "../middlewares/products.middleware.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(checkToken,CreateProductSchema(),createProduct);
router.route('/:id')
    .get(getSingleProduct)
    .put(checkToken, updateProduct)
    .delete(checkToken, deleteProduct);

export default router;
