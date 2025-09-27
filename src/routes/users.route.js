import express from 'express'
import { getAllUsers, updateProfilePicture } from '../controllers/users.controller.js'
import { checkToken, restrictTo } from '../middlewares/auth.middleware.js'
import roles from '../utils/roles.js'

const router = express.Router()

router.route("/").get(checkToken, restrictTo(roles.ADMIN), getAllUsers)
router.route("/:id").get(checkToken, getAllUsers)
router.route("/update-profile-picture").post(checkToken, updateProfilePicture)

export default router