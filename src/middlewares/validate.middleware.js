import { ZodError } from "zod";
import appError from "../utils/appError.js";
import STATUS from "../constants/httpStatus.constant.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorsMsg = JSON.parse(error.message).map((e) => e.message);
      const err = appError.create(errorsMsg.join(" & "), 400, STATUS.FAIL);
      return next(err);
    }
    next(error);
  }
};
