import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js"
import { loginSchema, registerSchema } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.route("/register").post(registerSchema(), register)
router.route("/login").post(loginSchema(), login)
router.route("/logout").post(logout)

export default router