import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router = express.Router()

router.route("/register").post(validate(registerSchema), register)
router.route("/login").post(validate(loginSchema), login)
router.route("/logout").post(logout)

export default router