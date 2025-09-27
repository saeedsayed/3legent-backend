import {z as Z} from "zod";

export const createProductSchema = Z.object({
    name: Z.string("name is required").min(2, "name must be at least 2 characters").max(100),
    description: Z.string("description is required").min(10, "description must be at least 10 characters").max(1000),
    // price: Z.string("price is required and must be a positive number").regex(/^\d+(\.\d+)?$/, "price must be a valid number").transform((val) => parseFloat(val)).min(0.1, "price must be at least 0.1"),
    price: Z.string("price is required and must be a positive number").min(0.1, "price must be at least 0.1"),
});