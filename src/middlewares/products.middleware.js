import { body } from "express-validator";

export const CreateProductSchema = () => (
    [
        body("title").notEmpty().withMessage('title is required').isLength({ min: 3, max: 100 }).withMessage('title must be at least 3 characters and at most 100 characters'),
        body('price').notEmpty().withMessage('price is required').isNumeric().withMessage('price must be a number'),
        body('description').notEmpty().withMessage('description is required').isLength({ min: 5, max: 500 }).withMessage('description must be at least 5 characters and at most 500 characters')
    ]
)