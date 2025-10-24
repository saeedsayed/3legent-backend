import express from "express";
import {
  getGeneral,
  updateGeneral,
} from "../controllers/general.controller.js";
const router = express.Router();

router.route("/").get(getGeneral).put(updateGeneral);

export default router;
