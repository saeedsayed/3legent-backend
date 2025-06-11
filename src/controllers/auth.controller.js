import { validationResult } from "express-validator"
import  STATUS  from "../utils/httpStatus.js"
import appError from "../utils/appError.js"
import user from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

// =====================================================================
export const register = async (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errMsg = result.array().map(e => (e.msg))
        const err = appError.create(errMsg.join(' & '), 400, STATUS.FAIL)
        return next(err)
    }
    const { fullName, email, password } = req.body
    const isExistingUser = await user.findOne({ email })
    if (isExistingUser) {
        const err = appError.create("email is already existing", 400, STATUS.FAIL)
        return next(err)
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new user({ fullName, email, password: hashedPassword })
    await newUser.save()
    generateToken({ _id: newUser._id, email: newUser.email }, res)
    res.json({
        status: STATUS.SUCCESS, data: {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            avatar: newUser.avatar,
            createdAt: newUser.createdAt
        }
    })
}
// =====================================================================
export const login = async (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const errMsg = result.array().map(e => (e.msg))
        const err = appError.create(errMsg.join(' & '), 400, STATUS.FAIL)
        return next(err)
    }
    const { email, password } = req.body
    const isExistingUser = await user.findOne({ email })
    if (!isExistingUser) {
        const err = appError.create("invalid credentials", 400, STATUS.FAIL)
        return next(err)
    }
    const isCorrectPassword = await bcrypt.compare(password, isExistingUser.password)
    if (!isCorrectPassword) {
        const err = appError.create("invalid credentials", 400, STATUS.FAIL)
        return next(err)
    }
    generateToken({ _id: isExistingUser._id, email: isExistingUser.email }, res)
    res.json({
        status: STATUS.SUCCESS,
        data: {
            _id: isExistingUser._id,
            fullName: isExistingUser.fullName,
            email: isExistingUser.email,
            avatar: isExistingUser.avatar,
            createdAt: isExistingUser.createdAt,
            updatedAt: isExistingUser.updatedAt
        }
    })
}
// =====================================================================
export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.json({ status: STATUS.SUCCESS, data: { message: "Logged out successfully" } })
}