import {z as Z} from "zod";

export const createProductSchema = Z.object({
    title: Z.string("title is required").min(2, "title must be at least 2 characters").max(100),
    description: Z.string("description is required").min(10, "description must be at least 10 characters").max(1000),
    price: Z.number("price is required and must be a positive number").min(0.1, "price must be at least 0.1"),
});