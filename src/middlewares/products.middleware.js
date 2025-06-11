import { body } from "express-validator";

export const CreateProductSchema = () => (
    [
        body("title").notEmpty().withMessage('title is required'),
        body('price').notEmpty().withMessage('price is required'),
        body('body').notEmpty().withMessage('body is required')
    ]
)