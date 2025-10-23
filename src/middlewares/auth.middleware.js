import appError from "../utils/appError.js"
import STATUS from "../utils/httpStatus.js"
import jwt from "jsonwebtoken"
import user from "../models/user.model.js";

export const checkToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        const err = appError.create("Unauthorized - No Token Provided", 401, STATUS.FAIL)
        return next(err)
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded._id
        next()
    } catch {
        const err = appError.create("Unauthorized - Token expired", 401, STATUS.FAIL)
        return next(err)
    }
}

export const restrictTo = (...roles) => {
    return async (req, res, next) => {
        const requestedUser = await user.findById(req.userId)
        if (!roles.includes(requestedUser.role)) {
            const err = appError.create("Forbidden - You don't have permission", 403, STATUS.FAIL)
            return next(err)
        }
        next()
    }
}
