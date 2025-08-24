import { body } from "express-validator";

export const CreateCategorySchema = () => (
    [
        body("name").notEmpty().withMessage('name is required').isLength({ min: 3, max: 100 }).withMessage('name must be at least 3 characters and at most 100 characters'),
        body('description').notEmpty().withMessage('description is required').isLength({ min: 5, max: 500 }).withMessage('description must be at least 5 characters and at most 500 characters')
    ]
)