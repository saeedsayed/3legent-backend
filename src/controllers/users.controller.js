import user from "../models/user.model.js"
import STATUS from "../utils/httpStatus.js"

export const getAllUsers = async (req, res, next) => {
    const allUsers = await user.find()
    res.json({ status: STATUS.SUCCESS, data: allUsers })
}