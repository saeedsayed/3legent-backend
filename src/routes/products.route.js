import express from "express";
import { getAllProducts, getSingleProduct, createProduct, updateProduct } from "../controllers/products.controller.js";
import { CreateProductSchema } from "../middlewares/products.middleware.js";

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(CreateProductSchema(),createProduct);
router.route('/:id')
    .get(getSingleProduct)
    .put(updateProduct);

export default router;
