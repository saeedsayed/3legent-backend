import mongoose from "mongoose";
import STATUS from "../../constants/httpStatus.constant.js";
import appError from "../../utils/appError.js";
import ShippingMethods from "./shippingMethod.model.js";

export const getShippingMethodById = async (shippingMethodId) => {
    if(!mongoose.isValidObjectId(shippingMethodId)){
        const err = appError.create("Invalid shipping method ID", 400, STATUS.FAIL);
        throw err;
    }
  const shippingMethod = await ShippingMethods.findById(shippingMethodId);
  if (!shippingMethod) {
    const err = appError.create("Shipping method not found", 404, STATUS.FAIL);
    throw err;
  }
  return shippingMethod;
};
