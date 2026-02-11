import express from "express";
import {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
} from "./address.controller.js";
import { checkToken } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createAddressSchema,
  updateAddressSchema,
} from "./address.validator.js";

const router = express.Router();

router
  .route("/")
  .get(checkToken, getAddresses)
  .post(checkToken, validate(createAddressSchema), createAddress);

router
  .route("/:id")
  .get(checkToken, getAddress)
  .put(checkToken, validate(updateAddressSchema), updateAddress)
  .delete(checkToken, deleteAddress);

export default router;
