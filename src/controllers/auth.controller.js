import { validationResult } from "express-validator"
import STATUS from "../utils/httpStatus.js"
import appError from "../utils/appError.js"
import user from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
import cart from "../models/cart.model.js"
import wishList from "../models/wishList.model.js"

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
    const newCart = new cart({ user: newUser._id, products: [], totalPrice: 0 })
    const newWishList = new wishList({ user: newUser._id, products: [] })
    newUser.cart = newCart._id
    newUser.wishList = newWishList._id
    generateToken({ _id: newUser._id, email: newUser.email }, res)
    await newUser.save()
    await newCart.save()
    await newWishList.save()
    delete newUser._doc.password
    delete newUser._doc.__v
    res.json({
        status: STATUS.SUCCESS, data: newUser
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
    console.log('{ email, password }', { email, password })
    const isExistingUser = await user.findOne({ email }).select("+password")
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
    delete isExistingUser._doc.password
    res.json({
        status: STATUS.SUCCESS,
        data: isExistingUser
    })
}
// =====================================================================
export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.json({ status: STATUS.SUCCESS, data: { message: "Logged out successfully" } })
}