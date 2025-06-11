import { body } from "express-validator";
import appError from "../utils/appError.js"
import STATUS from "../utils/httpStatus.js"
import jwt from "jsonwebtoken"

export const registerSchema = () => (
    [
        body('fullName').notEmpty().withMessage('full name is required').isLength({ min: 2, max: 25 }).withMessage('full name character between 2 & 25'),
        body('email').notEmpty().withMessage('email is required').isEmail().withMessage('not valid email'),
        body('password')
            .notEmpty()
            .withMessage('password is required')
            .isStrongPassword({ minLength: 6, minSymbols: false })
            .withMessage('Password must be strong && at least one number, one upper and lower character, and minimum length is 6'),
        body('confirmPassword').custom((v, { req }) => (v === req.body.password)).withMessage('password do not match')
    ]
)
export const loginSchema = () => (
    [
        body('email').notEmpty().withMessage('email is required').isEmail().withMessage('not valid email'),
        body('password')
            .notEmpty()
            .withMessage('password is required')
    ]
)

export const checkToken = async (req, res, next) => {
    const token = req?.cookies?.jwt
    if (!token) {
        const err = appError.create("Unauthorized - No Token Provided", 401, STATUS.FAIL)
        return next(err)
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req._id = decoded._id
        next()
    } catch {
        const err = appError.create("Unauthorized - Token expired", 401, STATUS.FAIL)
        return next(err)
    }
}