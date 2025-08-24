import express from 'express'
import { getAllUsers } from '../controllers/users.controller.js'
import { checkToken } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route("/").get(checkToken,getAllUsers)
router.route("/:id").get(checkToken,getAllUsers)

export default router