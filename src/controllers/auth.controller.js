import STATUS from "../utils/httpStatus.js"
import appError from "../utils/appError.js"
import user from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
import cart from "../models/cart.model.js"
import wishList from "../models/wishList.model.js"

// =====================================================================
export const register = async (req, res, next) => {
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
    const token = generateToken({ _id: newUser._id, email: newUser.email })
    await newUser.save()
    await newCart.save()
    await newWishList.save()
    delete newUser._doc.password
    delete newUser._doc.__v
    res.json({
        status: STATUS.SUCCESS, data: newUser, message: "user registered successfully", token
    })
}
// =====================================================================
export const login = async (req, res, next) => {
    const { email, password } = req.body
    const targetUser = await user.findOne({ email }).select("+password")
    if (!targetUser) {
        const err = appError.create("invalid credentials", 400, STATUS.FAIL)
        return next(err)
    }
    const isCorrectPassword = await bcrypt.compare(password, targetUser.password)
    if (!isCorrectPassword) {
        const err = appError.create("invalid credentials", 400, STATUS.FAIL)
        return next(err)
    }
    const token = generateToken({ _id: targetUser._id, email: targetUser.email })
    delete targetUser._doc.password
    res.json({
        status: STATUS.SUCCESS,
        data: targetUser,
        token
    })
}
// =====================================================================
// export const logout = (req, res) => {
//     res.cookie('jwt', '', { maxAge: 0 })
//     res.json({ status: STATUS.SUCCESS, message: "Logged out successfully" })
// }